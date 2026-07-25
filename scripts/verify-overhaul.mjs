import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { chromium, webkit } from "playwright";
import { createEmptyJourneyState } from "../src/state/journey/schema.js";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..");
const BASE_URL = (process.env.BASE_URL || "http://127.0.0.1:5175").replace(
  /\/+$/,
  ""
);
const RUN_ID = new Date().toISOString().replace(/[:.]/g, "-");
const OUTPUT_DIR = path.resolve(
  process.env.QA_OUTPUT_DIR ||
    path.join(os.tmpdir(), "escuela-sabatica-overhaul-qa", RUN_ID)
);
const ACTION_TIMEOUT = Number(process.env.QA_TIMEOUT_MS || 12_000);
const NAVIGATION_TIMEOUT = Number(
  process.env.QA_NAVIGATION_TIMEOUT_MS || 20_000
);
const TOLERANCE_PX = 2;
const QA_NOW_ISO =
  process.env.QA_NOW || "2026-07-25T12:00:00.000-07:00";
const QA_NOW_MS = Date.parse(QA_NOW_ISO);

if (Number.isNaN(QA_NOW_MS)) {
  throw new Error(`QA_NOW is not a valid date: ${QA_NOW_ISO}`);
}

const browserFactories = [
  ["chromium", chromium],
  ["webkit", webkit],
];

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const routes = [
  {
    name: "today",
    path: "/hoy",
    heading: /Todo lo que entra deja huella/i,
    primaryDestination: "Hoy",
    title: /^Hoy · Escuela Sabática$/,
  },
  {
    name: "mosaic",
    path: "/mosaico",
    heading: /Tu Corinto está tomando forma/i,
    primaryDestination: "Mosaico",
    title: /^Mosaico del trimestre · Escuela Sabática$/,
  },
  {
    name: "sabbath",
    path: "/sabado",
    heading: /El folio espera tu primera pieza/i,
    primaryDestination: "Sábado",
    title: /^Folio del sábado · Escuela Sabática$/,
  },
  {
    name: "lessons",
    path: "/lecciones",
    heading: /Las cartas abiertas/i,
    title: /^Lecciones del trimestre · Escuela Sabática$/,
  },
  {
    name: "lesson-l4",
    path: "/leccion/l4",
    heading: /Tu Cuerpo, Su Templo/i,
    title:
      /^Recorrido de la lección · Tu Cuerpo, Su Templo · Escuela Sabática$/,
  },
  {
    name: "teacher-l4",
    path: "/maestro/l4",
    heading: /Tu Cuerpo, Su Templo/i,
    title:
      /^Guía para el maestro · Tu Cuerpo, Su Templo · Escuela Sabática$/,
  },
  {
    name: "presentation-l4",
    path: "/presentar/l4",
    heading: /Primero elige qué mostrar/i,
    title:
      /^Vista para presentar · Tu Cuerpo, Su Templo · Escuela Sabática$/,
  },
  {
    name: "settings",
    path: "/ajustes",
    heading: /Ajustes y privacidad/i,
    title: /^Ajustes y privacidad · Escuela Sabática$/,
  },
];

const results = {
  baseUrl: BASE_URL,
  qaNow: QA_NOW_ISO,
  outputDir: OUTPUT_DIR,
  startedAt: new Date().toISOString(),
  checks: [],
  failures: [],
  warnings: [],
};

function relativeUrl(routePath) {
  return new URL(routePath, `${BASE_URL}/`).href;
}

async function createQaContext(browser, options = {}) {
  const context = await browser.newContext(options);
  await context.addInitScript(({ now }) => {
    const NativeDate = Date;
    function FixedDate(...args) {
      if (!new.target) return new NativeDate(now).toString();
      return new NativeDate(...(args.length ? args : [now]));
    }
    Object.setPrototypeOf(FixedDate, NativeDate);
    FixedDate.prototype = NativeDate.prototype;
    FixedDate.now = () => now;
    window.Date = FixedDate;
  }, { now: QA_NOW_MS });
  return context;
}

function isInsideProject(candidate) {
  const relative = path.relative(PROJECT_ROOT, candidate);
  return (
    relative === "" ||
    (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))
  );
}

function recordPass(name, detail = {}) {
  results.checks.push({ name, ...detail, status: "pass" });
  process.stdout.write(`PASS ${name}\n`);
}

function recordFailure(name, error, detail = {}) {
  const message = error instanceof Error ? error.message : String(error);
  const entry = { name, message, ...detail, status: "fail" };
  results.checks.push(entry);
  results.failures.push(entry);
  process.stderr.write(`FAIL ${name}: ${message}\n`);
}

function recordWarning(name, detail) {
  const entry = { name, detail };
  results.warnings.push(entry);
  process.stderr.write(`WARN ${name}: ${detail}\n`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function createPageDiagnostics(page) {
  const diagnostics = {
    consoleErrors: [],
    consoleWarnings: [],
    pageErrors: [],
    requestFailures: [],
  };

  page.on("console", (message) => {
    const entry = {
      type: message.type(),
      text: message.text(),
      location: message.location(),
    };
    if (message.type() === "error") diagnostics.consoleErrors.push(entry);
    if (message.type() === "warning") diagnostics.consoleWarnings.push(entry);
  });
  page.on("pageerror", (error) => {
    diagnostics.pageErrors.push({
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  });
  page.on("requestfailed", (request) => {
    const failure = request.failure();
    const message = failure?.errorText || "request failed";
    // Browsers report aborted Vite HMR and document requests during intentional
    // navigation. They are not runtime failures in the rendered route.
    if (message === "net::ERR_ABORTED" || message.includes("cancelled")) return;
    diagnostics.requestFailures.push({
      url: request.url(),
      method: request.method(),
      message,
    });
  });

  return diagnostics;
}

async function waitForRoute(page) {
  await page.locator("main h1").first().waitFor({
    state: "visible",
    timeout: ACTION_TIMEOUT,
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(700);
}

async function inspectLandmarks(page, expectedHeading, primaryDestination) {
  const mainCount = await page.locator("main#contenido-principal").count();
  assert(mainCount === 1, `expected one main landmark, found ${mainCount}`);

  const visibleHeadings = page.locator("main h1:visible");
  const headingCount = await visibleHeadings.count();
  assert(headingCount >= 1, "no visible h1 in the main landmark");
  const heading = (await visibleHeadings.first().innerText()).trim();
  assert(
    expectedHeading.test(heading),
    `unexpected route heading ${JSON.stringify(heading)}`
  );

  const navCount = await page.locator("nav[aria-label]:visible").count();
  assert(navCount >= 1, "no visible labelled navigation landmark");

  if (primaryDestination) {
    const active = page
      .getByRole("link", { name: new RegExp(`^${primaryDestination}$`, "i") })
      .filter({ visible: true });
    const activeCount = await active.count();
    assert(activeCount >= 1, `no visible ${primaryDestination} destination`);
    const current = await active.first().getAttribute("aria-current");
    assert(
      current === "page",
      `${primaryDestination} is not marked aria-current="page"`
    );
  }

  return { heading, mainCount, navCount };
}

async function inspectHorizontalOverflow(page) {
  return page.evaluate((tolerance) => {
    const root = document.documentElement;
    const body = document.body;
    const viewportWidth = root.clientWidth;
    const scrollWidth = Math.max(root.scrollWidth, body?.scrollWidth || 0);
    const offenders = [];

    if (scrollWidth > viewportWidth + tolerance) {
      for (const element of document.querySelectorAll("body *")) {
        const style = getComputedStyle(element);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.position === "fixed"
        ) {
          continue;
        }
        const rect = element.getBoundingClientRect();
        if (
          rect.width > 0 &&
          (rect.right > viewportWidth + tolerance || rect.left < -tolerance)
        ) {
          offenders.push({
            tag: element.tagName.toLowerCase(),
            id: element.id || null,
            className:
              typeof element.className === "string"
                ? element.className.slice(0, 160)
                : null,
            left: Math.round(rect.left * 10) / 10,
            right: Math.round(rect.right * 10) / 10,
            width: Math.round(rect.width * 10) / 10,
          });
          if (offenders.length === 12) break;
        }
      }
    }

    return {
      viewportWidth,
      scrollWidth,
      overflow: scrollWidth - viewportWidth,
      offenders,
    };
  }, TOLERANCE_PX);
}

async function inspectSvgIntegrity(page) {
  return page.evaluate(() => {
    const idOwners = new Map();
    for (const element of document.querySelectorAll("svg[id], svg [id]")) {
      const owners = idOwners.get(element.id) || [];
      owners.push(element);
      idOwners.set(element.id, owners);
    }

    const duplicateIds = Array.from(idOwners.entries())
      .filter(([, owners]) => owners.length > 1)
      .map(([id, owners]) => ({ id, count: owners.length }));

    const references = [];
    const brokenReferences = [];
    const crossSvgReferences = [];
    const urlPattern = /url\(\s*["']?#([^)"'\s]+)["']?\s*\)/g;

    for (const svg of document.querySelectorAll("svg")) {
      for (const element of svg.querySelectorAll("*")) {
        for (const attribute of element.attributes) {
          const ids = [];
          let match;
          urlPattern.lastIndex = 0;
          while ((match = urlPattern.exec(attribute.value))) ids.push(match[1]);
          if (
            (attribute.name === "href" ||
              attribute.name === "xlink:href") &&
            attribute.value.startsWith("#")
          ) {
            ids.push(attribute.value.slice(1));
          }
          if (
            attribute.name === "aria-labelledby" ||
            attribute.name === "aria-describedby"
          ) {
            ids.push(...attribute.value.trim().split(/\s+/).filter(Boolean));
          }

          for (const id of ids) {
            const target = document.getElementById(id);
            const reference = {
              id,
              sourceTag: element.tagName.toLowerCase(),
              attribute: attribute.name,
            };
            references.push(reference);
            if (!target) {
              brokenReferences.push(reference);
            } else if (target.closest("svg") !== svg) {
              crossSvgReferences.push(reference);
            }
          }
        }
      }
    }

    return {
      svgCount: document.querySelectorAll("svg").length,
      idCount: Array.from(idOwners.values()).reduce(
        (sum, owners) => sum + owners.length,
        0
      ),
      referenceCount: references.length,
      duplicateIds,
      brokenReferences,
      crossSvgReferences,
    };
  });
}

async function inspectUnresolvedTemplateTokens(page) {
  return page.evaluate(() => {
    const visibleText = document.querySelector("main")?.innerText || "";
    return visibleText.match(/\{(?:name|nombre)\}/gi) || [];
  });
}

async function inspectRoute(page, route, engineName, viewport) {
  const checkName = `${engineName}/${viewport.name}/${route.name}`;
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    const response = await page.goto(relativeUrl(route.path), {
      waitUntil: "domcontentloaded",
    });
    assert(response, "navigation returned no response");
    assert(
      response.status() < 400,
      `navigation returned HTTP ${response.status()}`
    );
    await waitForRoute(page);

    const landmarks = await inspectLandmarks(
      page,
      route.heading,
      route.primaryDestination
    );
    const routeHeadingFocused = await page.evaluate(() => {
      const heading = document.querySelector(
        "main [data-route-heading], main h1"
      );
      return Boolean(heading && document.activeElement === heading);
    });
    assert(routeHeadingFocused, "keyboard focus did not reach the route heading");
    if (route.title) {
      const documentTitle = await page.title();
      assert(
        route.title.test(documentTitle),
        `unexpected document title ${JSON.stringify(documentTitle)}`
      );
    }
    if (route.name === "settings") {
      const fileInput = page.getByLabel("Seleccionar archivo de respaldo");
      assert(
        (await fileInput.getAttribute("type")) === "file",
        "backup chooser is not a file input"
      );
      assert(
        (await fileInput.getAttribute("tabindex")) === "-1",
        "visually hidden backup chooser remains in sequential focus order"
      );
    }
    const overflow = await inspectHorizontalOverflow(page);
    assert(
      overflow.overflow <= TOLERANCE_PX,
      `horizontal overflow is ${overflow.overflow}px; offenders: ${JSON.stringify(
        overflow.offenders
      )}`
    );

    const svg = await inspectSvgIntegrity(page);
    assert(
      svg.duplicateIds.length === 0,
      `duplicate SVG IDs: ${JSON.stringify(svg.duplicateIds)}`
    );
    assert(
      svg.brokenReferences.length === 0,
      `broken SVG references: ${JSON.stringify(svg.brokenReferences)}`
    );
    assert(
      svg.crossSvgReferences.length === 0,
      `cross-instance SVG references: ${JSON.stringify(svg.crossSvgReferences)}`
    );

    const unresolvedTokens = await inspectUnresolvedTemplateTokens(page);
    assert(
      unresolvedTokens.length === 0,
      `unresolved visible template tokens: ${unresolvedTokens.join(", ")}`
    );

    assert(
      diagnostics.pageErrors.length === 0,
      `page errors: ${JSON.stringify(diagnostics.pageErrors)}`
    );
    assert(
      diagnostics.consoleErrors.length === 0,
      `console errors: ${JSON.stringify(diagnostics.consoleErrors)}`
    );
    assert(
      diagnostics.requestFailures.length === 0,
      `request failures: ${JSON.stringify(diagnostics.requestFailures)}`
    );
    if (diagnostics.consoleWarnings.length) {
      recordWarning(
        `${checkName} console warnings`,
        JSON.stringify(diagnostics.consoleWarnings)
      );
    }

    const screenshot = path.join(
      OUTPUT_DIR,
      engineName,
      `${viewport.name}-${viewport.width}x${viewport.height}-${route.name}.png`
    );
    await fs.mkdir(path.dirname(screenshot), { recursive: true });
    await page.screenshot({
      path: screenshot,
      fullPage: true,
      animations: "disabled",
    });

    recordPass(checkName, {
      path: route.path,
      viewport,
      landmarks,
      overflow,
      svg,
      diagnostics,
      screenshot,
    });
  } catch (error) {
    const screenshot = path.join(
      OUTPUT_DIR,
      engineName,
      `${viewport.name}-${viewport.width}x${viewport.height}-${route.name}-FAIL.png`
    );
    await fs.mkdir(path.dirname(screenshot), { recursive: true });
    try {
      await page.screenshot({
        path: screenshot,
        fullPage: true,
        animations: "disabled",
      });
    } catch {
      // The page may have closed because the browser process failed.
    }
    recordFailure(checkName, error, {
      path: route.path,
      viewport,
      diagnostics,
      screenshot,
    });
  }
}

async function verifyDirectRouteReload(browser, engineName) {
  const checkName = `${engineName}/direct-route-reload`;
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    const directPath =
      "/leccion/l4/episodio/influencia?profundidad=minute";
    const response = await page.goto(relativeUrl(directPath), {
      waitUntil: "domcontentloaded",
    });
    assert(response?.status() < 400, `direct route returned ${response?.status()}`);
    await waitForRoute(page);
    await page.reload({ waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    await page
      .getByRole("heading", { name: /Todo lo que entra deja huella/i })
      .waitFor({ state: "visible" });
    assert(
      new URL(page.url()).pathname ===
        "/leccion/l4/episodio/influencia",
      `reload escaped the direct route: ${page.url()}`
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors after reload: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, { url: page.url(), diagnostics });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function longRunningAnimations(page) {
  return page.evaluate(() =>
    document
      .getAnimations({ subtree: true })
      .map((animation) => {
        const timing = animation.effect?.getComputedTiming?.() || {};
        return {
          playState: animation.playState,
          duration:
            typeof timing.duration === "number" ? timing.duration : null,
          iterations:
            timing.iterations === Infinity ? "Infinity" : timing.iterations,
          target:
            animation.effect?.target instanceof Element
              ? {
                  tag: animation.effect.target.tagName.toLowerCase(),
                  id: animation.effect.target.id || null,
                  className:
                    typeof animation.effect.target.className === "string"
                      ? animation.effect.target.className.slice(0, 120)
                      : null,
                }
              : null,
        };
      })
      .filter(
        (item) =>
          item.playState === "running" &&
          (item.iterations === "Infinity" || (item.duration || 0) > 100)
      )
  );
}

async function inspectReducedVesselRoute(page, routePath, expectedRootMode) {
  await page.goto(relativeUrl(routePath), { waitUntil: "domcontentloaded" });
  await page.locator("main h1").first().waitFor({
    state: "visible",
    timeout: ACTION_TIMEOUT,
  });
  await page.locator("svg.vessel[data-motion-mode]").first().waitFor({
    state: "attached",
    timeout: ACTION_TIMEOUT,
  });

  const sample = () =>
    page.locator("svg.vessel[data-motion-mode]").evaluateAll((vessels) => ({
      rootMode: document.documentElement.dataset.motion,
      vessels: vessels.map((vessel) => ({
        mode: vessel.dataset.motionMode,
        progress: vessel.dataset.fractureProgress,
        settled: vessel.dataset.fractureSettled,
      })),
    }));

  const immediate = await sample();
  await page.waitForTimeout(140);
  const later = await sample();
  const animations = await longRunningAnimations(page);

  assert(
    immediate.rootMode === expectedRootMode,
    `${routePath} root motion mode is ${immediate.rootMode}, expected ${expectedRootMode}`
  );
  assert(immediate.vessels.length > 0, `${routePath} rendered no vessel`);
  assert(
    immediate.vessels.every(
      (vessel) =>
        vessel.mode === "reduced" && vessel.settled === "true"
    ),
    `${routePath} did not immediately settle all vessels: ${JSON.stringify(
      immediate.vessels
    )}`
  );
  assert(
    JSON.stringify(immediate.vessels) === JSON.stringify(later.vessels),
    `${routePath} vessel geometry changed after reduction: ${JSON.stringify({
      immediate: immediate.vessels,
      later: later.vessels,
    })}`
  );
  assert(
    animations.length === 0,
    `${routePath} retains long-running motion: ${JSON.stringify(animations)}`
  );

  return { routePath, immediate, later, animations };
}

async function verifyReducedMotion(browser, engineName) {
  const systemCheck = `${engineName}/reduced-motion-system`;
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    assert(
      await page.evaluate(() =>
        matchMedia("(prefers-reduced-motion: reduce)").matches
      ),
      "browser does not expose the requested reduced-motion preference"
    );
    const samples = [];
    for (const routePath of ["/hoy", "/mosaico", "/leccion/l4"]) {
      samples.push(
        await inspectReducedVesselRoute(page, routePath, "system")
      );
    }
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in reduced motion: ${JSON.stringify(diagnostics)}`
    );
    const screenshot = path.join(
      OUTPUT_DIR,
      engineName,
      "reduced-motion-system.png"
    );
    await fs.mkdir(path.dirname(screenshot), { recursive: true });
    await page.screenshot({
      path: screenshot,
      fullPage: true,
      animations: "disabled",
    });
    recordPass(systemCheck, { samples, diagnostics, screenshot });
  } catch (error) {
    recordFailure(systemCheck, error, { diagnostics });
  } finally {
    await context.close();
  }

  const settingCheck = `${engineName}/reduced-motion-setting`;
  const settingContext = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
    reducedMotion: "no-preference",
  });
  const settingPage = await settingContext.newPage();
  const settingDiagnostics = createPageDiagnostics(settingPage);
  settingPage.setDefaultTimeout(ACTION_TIMEOUT);
  settingPage.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await settingPage.goto(relativeUrl("/ajustes"), {
      waitUntil: "domcontentloaded",
    });
    await waitForRoute(settingPage);
    const toggle = settingPage.getByRole("checkbox", {
      name: /Reducir movimiento/i,
    });
    await toggle.check();
    await settingPage.waitForFunction(
      () => document.documentElement.dataset.motion === "reduce"
    );
    const samples = [];
    for (const routePath of ["/hoy", "/mosaico", "/leccion/l4"]) {
      samples.push(
        await inspectReducedVesselRoute(settingPage, routePath, "reduce")
      );
    }
    assert(
      settingDiagnostics.pageErrors.length === 0 &&
        settingDiagnostics.consoleErrors.length === 0,
      `runtime errors in reduced motion: ${JSON.stringify(settingDiagnostics)}`
    );
    recordPass(settingCheck, {
      samples,
      diagnostics: settingDiagnostics,
    });
  } catch (error) {
    recordFailure(settingCheck, error, {
      diagnostics: settingDiagnostics,
    });
  } finally {
    await settingContext.close();
  }
}

async function verifyAmbientMotionBudget(browser, engineName) {
  const checkName = `${engineName}/ambient-motion-budget`;
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/hoy"), { waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    const animations = await longRunningAnimations(page);
    const ambientLoops = animations.filter(
      (animation) => animation.iterations === "Infinity"
    );
    assert(
      ambientLoops.length <= 1,
      `more than one ambient loop owns the viewport: ${JSON.stringify(
        ambientLoops
      )}`
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors while measuring motion: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, { ambientLoops, diagnostics });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function inspectPrimaryTokenContrast(page) {
  return page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const parse = (value) => {
      const node = document.createElement("span");
      node.style.color = value.trim();
      document.body.appendChild(node);
      const rgb = getComputedStyle(node).color.match(/\d+(?:\.\d+)?/g);
      node.remove();
      return rgb.slice(0, 3).map(Number);
    };
    const luminance = ([red, green, blue]) => {
      const channels = [red, green, blue].map((channel) => {
        const value = channel / 255;
        return value <= 0.04045
          ? value / 12.92
          : ((value + 0.055) / 1.055) ** 2.4;
      });
      return (
        0.2126 * channels[0] +
        0.7152 * channels[1] +
        0.0722 * channels[2]
      );
    };
    const contrast = (left, right) => {
      const a = luminance(parse(left));
      const b = luminance(parse(right));
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    };
    const values = {
      ground: root.getPropertyValue("--bg-0"),
      text: root.getPropertyValue("--text"),
      clay: root.getPropertyValue("--clay"),
      clayInk: root.getPropertyValue("--clay-ink"),
    };
    return {
      mode: document.documentElement.dataset.mode,
      values,
      textContrast: contrast(values.text, values.ground),
      actionContrast: contrast(values.clayInk, values.clay),
    };
  });
}

async function verifyDayTheme(browser, engineName) {
  const checkName = `${engineName}/theme-persistence-and-primary-contrast`;
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/hoy"), { waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    const night = await inspectPrimaryTokenContrast(page);
    assert(night.mode === "night", "night theme was not the initial saved mode");
    assert(
      night.textContrast >= 4.5,
      `night body contrast is ${night.textContrast.toFixed(2)}:1`
    );
    assert(
      night.actionContrast >= 4.5,
      `night action contrast is ${night.actionContrast.toFixed(2)}:1`
    );

    await page.goto(relativeUrl("/ajustes"), {
      waitUntil: "domcontentloaded",
    });
    await waitForRoute(page);
    await page.getByRole("button", { name: "Día", exact: true }).click();
    await page.waitForFunction(
      () => document.documentElement.dataset.mode === "day"
    );
    await page.goto(relativeUrl("/hoy"), { waitUntil: "domcontentloaded" });
    await waitForRoute(page);

    const day = await inspectPrimaryTokenContrast(page);

    assert(day.mode === "day", "day theme did not survive navigation");
    assert(
      day.textContrast >= 4.5,
      `day body contrast is ${day.textContrast.toFixed(2)}:1`
    );
    assert(
      day.actionContrast >= 4.5,
      `day action contrast is ${day.actionContrast.toFixed(2)}:1`
    );
    const overflow = await inspectHorizontalOverflow(page);
    assert(
      overflow.overflow <= TOLERANCE_PX,
      `day theme has ${overflow.overflow}px horizontal overflow`
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in day theme: ${JSON.stringify(diagnostics)}`
    );
    const screenshot = path.join(OUTPUT_DIR, engineName, "day-theme-today.png");
    await fs.mkdir(path.dirname(screenshot), { recursive: true });
    await page.screenshot({
      path: screenshot,
      fullPage: true,
      animations: "disabled",
    });
    recordPass(checkName, { night, day, overflow, diagnostics, screenshot });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

function seededLegacyEntries() {
  const kit = {
    v: 1,
    started: false,
    userName: "",
    kitName: "Mi Templo",
    slots: {
      influencia: null,
      tolerancia: null,
      restauracion: null,
      pleito: null,
      pertenencia: null,
      huida: null,
      precio: null,
      paso: null,
    },
    slotTags: {},
    extra: {},
    surpriseIdx: 0,
    patternSeen: false,
    completedAt: null,
    qaSentinel: "preserve-this-exact-v1-record",
  };
  return {
    "escuela:kit:l4": JSON.stringify(kit),
    "escuela:settings":
      '{"mode":"night","haptics":false,"maestro":false,"qaSentinel":"preserve-settings"}',
    "escuela:streak":
      '{"days":["2026-07-24"],"qaSentinel":"preserve-streak"}',
  };
}

function makeLegacyKit({ kitName, slots, completed = false }) {
  return {
    v: 1,
    started: Object.values(slots).some(Boolean),
    userName: "",
    kitName,
    slots,
    slotTags: {},
    extra: {},
    surpriseIdx: 0,
    patternSeen: false,
    completedAt: completed ? Date.parse("2026-07-25T12:00:00.000Z") : null,
  };
}

function makeSeededJourney(mutator) {
  const state = createEmptyJourneyState({
    now: "2026-07-25T12:00:00.000Z",
    writerId: "browser-qa",
  });
  state.revision = 7;
  mutator?.(state);
  return state;
}

async function installJourneySeed(context, state, legacyEntries = {}) {
  await context.addInitScript(
    ({ journeyState, legacy }) => {
      if (sessionStorage.getItem("__qa_seeded_v2__")) return;
      for (const [key, value] of Object.entries(legacy)) {
        localStorage.setItem(key, value);
      }
      localStorage.setItem(
        "escuela:journey:2026-Q3",
        JSON.stringify(journeyState)
      );
      localStorage.removeItem("escuela:journey:2026-Q3:backup");
      sessionStorage.setItem("__qa_seeded_v2__", "1");
    },
    { journeyState: state, legacy: legacyEntries }
  );
}

async function verifyPrivateJourneyFlow(browser, engineName) {
  const checkName = `${engineName}/private-journey-completion`;
  const legacyEntries = seededLegacyEntries();
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  await context.addInitScript((entries) => {
    if (sessionStorage.getItem("__qa_seeded_journey__")) return;
    for (const [key, value] of Object.entries(entries)) {
      localStorage.setItem(key, value);
    }
    localStorage.removeItem("escuela:journey:2026-Q3");
    localStorage.removeItem("escuela:journey:2026-Q3:backup");
    sessionStorage.setItem("__qa_seeded_journey__", "1");
  }, legacyEntries);
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(
      relativeUrl(
        "/leccion/l4/episodio/influencia?profundidad=minute"
      ),
      { waitUntil: "domcontentloaded" }
    );
    await waitForRoute(page);

    await page
      .getByRole("button", { name: "Las pantallas de la madrugada" })
      .click();
    await page
      .getByRole("button", { name: /Guardar en mi templo/i })
      .click();
    await page
      .getByRole("heading", { name: /Lo que me va formando/i })
      .waitFor({ state: "visible" });

    await page.waitForFunction(() => {
      const raw = localStorage.getItem("escuela:journey:2026-Q3");
      if (!raw) return false;
      try {
        const state = JSON.parse(raw);
        return (
          state.lessons?.l4?.legacyKit?.slots?.influencia ===
            "Las pantallas de la madrugada" &&
          state.lessons?.l4?.status === "active"
        );
      } catch {
        return false;
      }
    });

    const persisted = await page.evaluate((expectedLegacy) => {
      const journeyRaw = localStorage.getItem("escuela:journey:2026-Q3");
      const backupRaw = localStorage.getItem(
        "escuela:journey:2026-Q3:backup"
      );
      const journey = journeyRaw ? JSON.parse(journeyRaw) : null;
      const backup = backupRaw ? JSON.parse(backupRaw) : null;
      const legacyNow = Object.fromEntries(
        Object.keys(expectedLegacy).map((key) => [key, localStorage.getItem(key)])
      );
      const allLegacyKeys = [];
      for (let index = 0; index < localStorage.length; index += 1) {
        const key = localStorage.key(index);
        if (
          key?.startsWith("escuela:") &&
          key !== "escuela:journey:2026-Q3" &&
          key !== "escuela:journey:2026-Q3:backup"
        ) {
          allLegacyKeys.push(key);
        }
      }
      return {
        journey,
        backup,
        legacyNow,
        allLegacyKeys: allLegacyKeys.sort(),
      };
    }, legacyEntries);

    assert(persisted.journey?.schemaVersion === 2, "v2 journey was not saved");
    assert(
      persisted.journey?.quarterId === "2026-Q3",
      "journey quarter id is wrong"
    );
    assert(
      persisted.journey.lessons.l4.legacyKit.slots.influencia ===
        "Las pantallas de la madrugada",
      "selected answer is missing from the durable lesson record"
    );
    const investment = persisted.journey.lessons.l4.investments.find(
      (item) => item.slotId === "influencia"
    );
    assert(investment, "private investment was not created");
    assert(
      investment.value?.privacy === "private",
      "investment is not marked private"
    );
    assert(
      persisted.journey.mosaic.panels.l4.inscription?.privacy === "private",
      "mosaic inscription is not marked private"
    );
    assert(
      JSON.stringify(persisted.legacyNow) === JSON.stringify(legacyEntries),
      `legacy values changed: ${JSON.stringify(persisted.legacyNow)}`
    );
    assert(
      JSON.stringify(persisted.allLegacyKeys) ===
        JSON.stringify(Object.keys(legacyEntries).sort()),
      `legacy key set changed: ${JSON.stringify(persisted.allLegacyKeys)}`
    );
    assert(
      JSON.stringify(persisted.backup?.legacySnapshot?.entries) ===
        JSON.stringify(
          Object.fromEntries(
            Object.entries(legacyEntries).sort(([left], [right]) =>
              left.localeCompare(right)
            )
          )
        ),
      "immutable backup does not contain the exact raw v1 snapshot"
    );

    const screenshot = path.join(
      OUTPUT_DIR,
      engineName,
      "private-journey-completion.png"
    );
    await fs.mkdir(path.dirname(screenshot), { recursive: true });
    await page.screenshot({
      path: screenshot,
      fullPage: true,
      animations: "disabled",
    });

    await page.reload({ waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    const afterReload = await page.evaluate(() => {
      const state = JSON.parse(
        localStorage.getItem("escuela:journey:2026-Q3")
      );
      return state.lessons.l4.legacyKit.slots.influencia;
    });
    assert(
      afterReload === "Las pantallas de la madrugada",
      "private answer did not persist across reload"
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in journey flow: ${JSON.stringify(diagnostics)}`
    );

    recordPass(checkName, {
      selectedValue: afterReload,
      privacy: investment.value.privacy,
      legacyKeys: persisted.allLegacyKeys,
      diagnostics,
      screenshot,
    });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function verifyResetDoesNotResurrectLegacy(browser, engineName) {
  const checkName = `${engineName}/reset-preserves-v1-with-empty-v2`;
  const legacyEntries = seededLegacyEntries();
  const state = makeSeededJourney((journey) => {
    journey.lessons.l4.status = "active";
    journey.lessons.l4.legacyKit = makeLegacyKit({
      kitName: "Mi Templo",
      slots: {
        influencia: "Una respuesta que debe desaparecer",
        tolerancia: null,
        restauracion: null,
        pleito: null,
        pertenencia: null,
        huida: null,
        precio: null,
        paso: null,
      },
    });
  });
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  await installJourneySeed(context, state, legacyEntries);
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/ajustes"), {
      waitUntil: "domcontentloaded",
    });
    await waitForRoute(page);
    page.once("dialog", (dialog) => dialog.accept());
    await page.getByRole("button", { name: /^Reiniciar$/i }).click();
    await page
      .getByText("El recorrido nuevo fue reiniciado")
      .waitFor({ state: "visible" });
    await page.waitForFunction(() => {
      const raw = localStorage.getItem("escuela:journey:2026-Q3");
      if (!raw) return false;
      try {
        const journey = JSON.parse(raw);
        return (
          journey.schemaVersion === 2 &&
          journey.lessons?.l4?.status === "not-started" &&
          journey.lessons?.l4?.legacyKit === null
        );
      } catch {
        return false;
      }
    });

    const beforeReload = await page.evaluate((expectedLegacy) => ({
      journey: JSON.parse(localStorage.getItem("escuela:journey:2026-Q3")),
      legacy: Object.fromEntries(
        Object.keys(expectedLegacy).map((key) => [key, localStorage.getItem(key)])
      ),
    }), legacyEntries);
    assert(
      JSON.stringify(beforeReload.legacy) === JSON.stringify(legacyEntries),
      `reset changed v1 data: ${JSON.stringify(beforeReload.legacy)}`
    );

    await page.reload({ waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    const afterReload = await page.evaluate((expectedLegacy) => ({
      journey: JSON.parse(localStorage.getItem("escuela:journey:2026-Q3")),
      legacy: Object.fromEntries(
        Object.keys(expectedLegacy).map((key) => [key, localStorage.getItem(key)])
      ),
    }), legacyEntries);
    assert(
      afterReload.journey.lessons.l4.status === "not-started" &&
        afterReload.journey.lessons.l4.legacyKit === null,
      "reload migrated the preserved v1 answer back into the reset v2 journey"
    );
    assert(
      JSON.stringify(afterReload.legacy) === JSON.stringify(legacyEntries),
      `reload changed v1 data: ${JSON.stringify(afterReload.legacy)}`
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors during reset: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, {
      v2Status: afterReload.journey.lessons.l4.status,
      legacyKeys: Object.keys(afterReload.legacy).sort(),
      diagnostics,
    });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function verifyExplicitSabbathLesson(browser, engineName) {
  const checkName = `${engineName}/sabbath-explicit-lesson-context`;
  const state = makeSeededJourney((journey) => {
    journey.lessons.l3.status = "active";
    journey.lessons.l3.legacyKit = makeLegacyKit({
      kitName: "Mi Mosaico",
      slots: {
        bando: "Los que siempre tienen la razón",
        grieta: null,
        centro: null,
        leche: null,
        mente: null,
        costo: null,
        senal: null,
        paso: null,
      },
    });
  });
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  await installJourneySeed(context, state);
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/sabado/l3"), {
      waitUntil: "domcontentloaded",
    });
    await waitForRoute(page);
    await page.getByText("Unidad en Cristo", { exact: true }).first().waitFor({
      state: "visible",
    });
    assert(
      new URL(page.url()).pathname === "/sabado/l3",
      `explicit Sabbath route changed lesson: ${page.url()}`
    );
    assert(
      (await page.title()).includes("Unidad en Cristo"),
      `document title lost the explicit lesson: ${await page.title()}`
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in explicit Sabbath route: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, {
      url: page.url(),
      title: await page.title(),
      diagnostics,
    });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

function seedActiveL3(journey) {
  journey.lessons.l3.status = "active";
  journey.lessons.l3.legacyKit = makeLegacyKit({
    kitName: "Mi Mosaico",
    slots: {
      bando: "Los que siempre tienen la razón",
      grieta: null,
      centro: null,
      leche: null,
      mente: null,
      costo: null,
      senal: null,
      paso: null,
    },
  });
  journey.mosaic.panels.l3.state = "in-progress";
}

async function verifyPresentationEmptyBackLink(browser, engineName) {
  const checkName = `${engineName}/presentation-empty-preserves-lesson-context`;
  const state = makeSeededJourney(seedActiveL3);
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  await installJourneySeed(context, state);
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/presentar/l3"), {
      waitUntil: "domcontentloaded",
    });
    await page
      .getByRole("heading", { name: "Primero elige qué mostrar" })
      .waitFor({ state: "visible" });
    assert(
      (await page.title()) ===
        "Vista para presentar · Unidad en Cristo · Escuela Sabática",
      `presentation title lost l3 context: ${await page.title()}`
    );

    await page
      .getByRole("link", { name: /Volver al folio/i })
      .click();
    await page.waitForURL((url) => url.pathname === "/sabado/l3");
    const heading = page.getByRole("heading", {
      name: "Folio del sábado",
      exact: true,
    });
    await heading.waitFor({ state: "visible" });
    await page.waitForFunction(
      () => document.activeElement === document.querySelector("main h1")
    );
    assert(
      (await page.title()) ===
        "Folio del sábado · Unidad en Cristo · Escuela Sabática",
      `folio title lost l3 context: ${await page.title()}`
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in empty presentation return: ${JSON.stringify(
        diagnostics
      )}`
    );
    recordPass(checkName, {
      url: page.url(),
      title: await page.title(),
      focused: await page.evaluate(() => document.activeElement?.textContent?.trim()),
      diagnostics,
    });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function verifyPresentationCloseFocus(browser, engineName) {
  const checkName = `${engineName}/presentation-close-and-focus`;
  const state = makeSeededJourney(seedActiveL3);
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  await installJourneySeed(context, state);
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/sabado/l3"), {
      waitUntil: "domcontentloaded",
    });
    await waitForRoute(page);
    const selection = page.locator(".sbf-selector input[type='checkbox']").first();
    await selection.check();
    const openButton = page.getByRole("button", {
      name: /Abrir modo presentación/i,
    });
    await openButton.waitFor({ state: "visible" });
    assert(await openButton.isEnabled(), "presentation stayed disabled after selection");
    await openButton.click();

    await page.waitForURL((url) => url.pathname === "/presentar/l3");
    const dialog = page.getByRole("dialog", {
      name: /Unidad en Cristo/i,
    });
    await dialog.waitFor({ state: "visible" });
    await page.waitForFunction(
      () =>
        document.activeElement?.getAttribute("aria-label") ===
        "Cerrar presentación"
    );
    assert(
      (await page.title()) ===
        "Vista para presentar · Unidad en Cristo · Escuela Sabática",
      `open presentation title is wrong: ${await page.title()}`
    );
    assert(
      (await page.getByRole("dialog").count()) === 1,
      "presentation rendered more than one modal dialog"
    );

    await page.keyboard.press("Tab");
    assert(
      (await page.evaluate(
        () => document.activeElement?.getAttribute("aria-label")
      )) === "Cerrar presentación",
      "the one-control presentation dialog did not retain keyboard focus"
    );
    await page.keyboard.press("Escape");
    await page.waitForURL((url) => url.pathname === "/sabado/l3");
    await page
      .getByRole("heading", { name: "Folio del sábado", exact: true })
      .waitFor({ state: "visible" });
    await page.waitForFunction(
      () => document.activeElement === document.querySelector("main h1")
    );
    assert(
      (await page.evaluate(() => document.body.style.overflow)) === "",
      "closing presentation did not restore body scrolling"
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in presentation close flow: ${JSON.stringify(
        diagnostics
      )}`
    );
    recordPass(checkName, {
      url: page.url(),
      title: await page.title(),
      focused: await page.evaluate(() => document.activeElement?.textContent?.trim()),
      diagnostics,
    });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function verifyDelayedLazyRouteFocus(browser, engineName) {
  const checkName = `${engineName}/delayed-lazy-route-heading-focus`;
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);
  let interceptedLessonRequests = 0;

  try {
    await page.route(
      /(?:\/src\/content\/l13\.js(?:\?|$)|\/assets\/l13-[^/]+\.js(?:\?|$))/,
      async (route) => {
        interceptedLessonRequests += 1;
        await new Promise((resolve) => setTimeout(resolve, 900));
        await route.continue();
      }
    );
    await page.goto(relativeUrl("/lecciones"), {
      waitUntil: "domcontentloaded",
    });
    await waitForRoute(page);
    await page
      .getByRole("link", { name: /Gracia, Amor y Comunión/i })
      .click();
    await page.waitForURL((url) => url.pathname === "/leccion/l13");
    const heading = page.getByRole("heading", {
      name: "Gracia, Amor y Comunión",
      exact: true,
    });
    await heading.waitFor({ state: "visible" });
    await page.waitForFunction(
      () =>
        document.activeElement ===
        document.querySelector("[data-route-heading]")
    );

    assert(
      interceptedLessonRequests > 0,
      "l13 was not actually delayed, so the focus regression was not exercised"
    );
    assert(
      (await page.title()) ===
        "Recorrido de la lección · Gracia, Amor y Comunión · Escuela Sabática",
      `lazy lesson title is wrong: ${await page.title()}`
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in delayed lazy route: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, {
      interceptedLessonRequests,
      title: await page.title(),
      focused: await page.evaluate(() => document.activeElement?.textContent?.trim()),
      diagnostics,
    });
  } catch (error) {
    recordFailure(checkName, error, {
      interceptedLessonRequests,
      diagnostics,
    });
  } finally {
    await context.close();
  }
}

async function verifyCompletedToday(browser, engineName) {
  const checkName = `${engineName}/completed-today-opens-sabbath`;
  const state = makeSeededJourney((journey) => {
    journey.lessons.l4.status = "prepared";
    journey.lessons.l4.legacyKit = makeLegacyKit({
      kitName: "Mi Templo",
      completed: true,
      slots: {
        influencia: "Las pantallas de la madrugada",
        tolerancia: "Dejarlo pasar",
        restauracion: "Escuchar antes de responder",
        pleito: "Buscar tener la última palabra",
        pertenencia: "Un templo que merece cuidado",
        huida: "El aislamiento",
        precio: "Que fui comprado por precio",
        paso: "Dormir con el teléfono fuera del cuarto",
      },
    });
    journey.mosaic.panels.l4.state = "prepared";
  });
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  await installJourneySeed(context, state);
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/hoy"), { waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    await page
      .getByRole("heading", { name: "Tu folio ya tiene forma" })
      .waitFor({ state: "visible" });
    await page
      .getByRole("button", { name: /Abrir el folio del sábado/i })
      .click();
    await page.waitForURL((url) => url.pathname === "/sabado/l4");
    await page.getByText("Tu Cuerpo, Su Templo", { exact: true }).first().waitFor({
      state: "visible",
    });
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in completed Today flow: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, { url: page.url(), diagnostics });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function verifyIntentionalExitFocus(browser, engineName) {
  const checkName = `${engineName}/today-intentional-exit-focus`;
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    await page.goto(relativeUrl("/hoy"), { waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    await page
      .getByRole("button", { name: "Terminar por hoy", exact: true })
      .click();
    const heading = page.getByRole("heading", {
      name: "La piedra queda en su sitio",
      exact: true,
    });
    await heading.waitFor({ state: "visible" });
    assert(
      await heading.evaluate((element) => document.activeElement === element),
      "same-route intentional exit did not focus its heading"
    );
    assert(
      (await heading.getAttribute("id")) === "intentional-exit-title",
      "intentional exit heading lost its stable accessible id"
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in intentional exit: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, {
      focused: await page.evaluate(() => document.activeElement?.textContent?.trim()),
      diagnostics,
    });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function verifyMeaningfulInvestmentLoop(browser, engineName) {
  const checkName = `${engineName}/meaningful-investment-loop`;
  const state = makeSeededJourney((journey) => {
    seedActiveL3(journey);
  });
  const context = await createQaContext(browser, {
    viewport: { width: 390, height: 844 },
    colorScheme: "dark",
  });
  await installJourneySeed(context, state);
  const page = await context.newPage();
  const diagnostics = createPageDiagnostics(page);
  page.setDefaultTimeout(ACTION_TIMEOUT);
  page.setDefaultNavigationTimeout(NAVIGATION_TIMEOUT);

  try {
    const commitmentText = "Buscar a esa persona y hablar sin defenderme";
    await page.goto(
      relativeUrl("/leccion/l3/episodio/paso?profundidad=minute"),
      { waitUntil: "domcontentloaded" }
    );
    await waitForRoute(page);
    await page
      .getByRole("button", { name: commitmentText, exact: true })
      .click();
    await page
      .getByRole("textbox", {
        name: "La persona con la que voy a cerrar la grieta",
        exact: true,
      })
      .fill("una persona de confianza");
    await page
      .getByRole("button", { name: "Cerrar mi mosaico", exact: true })
      .click();
    await page
      .getByRole("heading", { name: "Mi paso de la semana", exact: true })
      .waitFor({ state: "visible" });
    await page.waitForFunction((expected) => {
      const raw = localStorage.getItem("escuela:journey:2026-Q3");
      if (!raw) return false;
      const journey = JSON.parse(raw);
      const commitment = journey.commitments?.find(
        (item) => item.id === "commitment:l3:paso"
      );
      return (
        commitment?.status === "open" &&
        commitment?.action?.value === expected &&
        commitment?.person?.value === "una persona de confianza"
      );
    }, commitmentText);

    await page.reload({ waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    const savedCommitment = await page.evaluate(() => {
      const journey = JSON.parse(
        localStorage.getItem("escuela:journey:2026-Q3")
      );
      return journey.commitments.find(
        (item) => item.id === "commitment:l3:paso"
      );
    });
    assert(savedCommitment, "the UI-created commitment vanished after reload");
    assert(
      savedCommitment.createdAt.startsWith("2026-07-25"),
      `commitment did not use the fixed QA clock: ${savedCommitment.createdAt}`
    );

    await page.goto(relativeUrl("/hoy"), { waitUntil: "domcontentloaded" });
    await waitForRoute(page);
    await page.getByText("Un paso que dejaste abierto").waitFor({
      state: "visible",
    });
    await page.getByText(new RegExp(commitmentText, "i")).waitFor({
      state: "visible",
    });

    await page.goto(
      relativeUrl("/leccion/l4/episodio/influencia?profundidad=minute"),
      { waitUntil: "domcontentloaded" }
    );
    await waitForRoute(page);
    await page
      .getByRole("button", { name: "Las pantallas de la madrugada" })
      .click();
    await page
      .getByRole("button", { name: /Guardar en mi templo/i })
      .click();
    await page.getByText(
      "Práctica ejercitada: Observar tu respuesta con honestidad",
      { exact: true }
    ).waitFor({ state: "visible" });

    await page.waitForFunction(() => {
      const raw = localStorage.getItem("escuela:journey:2026-Q3");
      if (!raw) return false;
      const journey = JSON.parse(raw);
      const connectionId = "l3:to:l4";
      return (
        journey.capabilities?.["notice-influence"]?.evidence?.some(
          (item) => item.id === "capability:l4:influencia"
        ) &&
        journey.mosaic?.revealedConnectionIds?.includes(connectionId) &&
        journey.mosaic?.panels?.l3?.connectionIds?.includes(connectionId) &&
        journey.mosaic?.panels?.l4?.connectionIds?.includes(connectionId)
      );
    });

    await page
      .getByRole("button", { name: /Ver el mosaico cambiado/i })
      .click();
    await page.getByText("Lo que ya estás aprendiendo a hacer").waitFor({
      state: "visible",
    });
    await page.getByText("Observar tu respuesta con honestidad", {
      exact: true,
    }).waitFor({ state: "visible" });

    const persisted = await page.evaluate(() =>
      JSON.parse(localStorage.getItem("escuela:journey:2026-Q3"))
    );
    assert(
      diagnostics.pageErrors.length === 0 &&
        diagnostics.consoleErrors.length === 0,
      `runtime errors in investment loop: ${JSON.stringify(diagnostics)}`
    );
    recordPass(checkName, {
      capabilityEvidence:
        persisted.capabilities["notice-influence"].evidence.length,
      connectionId: "l3:to:l4",
      returnThread: "commitment:l3:paso",
      commitmentCreatedThrough: "CommitDuo",
      commitmentCreatedAt: savedCommitment.createdAt,
      diagnostics,
    });
  } catch (error) {
    recordFailure(checkName, error, { diagnostics });
  } finally {
    await context.close();
  }
}

async function verifyBrowser(engineName, browserType) {
  let browser;
  try {
    browser = await browserType.launch({ headless: true });
  } catch (error) {
    recordFailure(`${engineName}/launch`, error);
    return;
  }

  try {
    for (const viewport of viewports) {
      const context = await createQaContext(browser, {
        viewport: { width: viewport.width, height: viewport.height },
        colorScheme: "dark",
      });
      try {
        for (const route of routes) {
          const page = await context.newPage();
          await inspectRoute(page, route, engineName, viewport);
          await page.close();
        }
      } finally {
        await context.close();
      }
    }

    await verifyDirectRouteReload(browser, engineName);
    await verifyReducedMotion(browser, engineName);
    await verifyAmbientMotionBudget(browser, engineName);
    await verifyDayTheme(browser, engineName);
    await verifyPrivateJourneyFlow(browser, engineName);
    await verifyResetDoesNotResurrectLegacy(browser, engineName);
    await verifyExplicitSabbathLesson(browser, engineName);
    await verifyPresentationEmptyBackLink(browser, engineName);
    await verifyPresentationCloseFocus(browser, engineName);
    await verifyDelayedLazyRouteFocus(browser, engineName);
    await verifyCompletedToday(browser, engineName);
    await verifyIntentionalExitFocus(browser, engineName);
    await verifyMeaningfulInvestmentLoop(browser, engineName);
  } finally {
    await browser.close();
  }
}

async function main() {
  if (isInsideProject(OUTPUT_DIR)) {
    throw new Error(
      `QA_OUTPUT_DIR must be outside the source tree (${PROJECT_ROOT}); received ${OUTPUT_DIR}`
    );
  }
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const response = await fetch(relativeUrl("/hoy"));
  if (!response.ok) {
    throw new Error(
      `The app is not reachable at ${BASE_URL} (HTTP ${response.status})`
    );
  }
  recordPass("server-reachable", { httpStatus: response.status });

  for (const [engineName, browserType] of browserFactories) {
    await verifyBrowser(engineName, browserType);
  }

  results.finishedAt = new Date().toISOString();
  results.summary = {
    passed: results.checks.filter((check) => check.status === "pass").length,
    failed: results.failures.length,
    warnings: results.warnings.length,
  };
  const reportPath = path.join(OUTPUT_DIR, "report.json");
  await fs.writeFile(reportPath, `${JSON.stringify(results, null, 2)}\n`);

  process.stdout.write(
    `\nQA complete: ${results.summary.passed} passed, ${results.summary.failed} failed, ${results.summary.warnings} warnings\n`
  );
  process.stdout.write(`Artifacts: ${OUTPUT_DIR}\n`);
  process.stdout.write(`Report: ${reportPath}\n`);

  if (results.failures.length) process.exitCode = 1;
}

main().catch(async (error) => {
  recordFailure("qa-harness", error);
  results.finishedAt = new Date().toISOString();
  results.summary = {
    passed: results.checks.filter((check) => check.status === "pass").length,
    failed: results.failures.length,
    warnings: results.warnings.length,
  };
  try {
    if (!isInsideProject(OUTPUT_DIR)) {
      await fs.mkdir(OUTPUT_DIR, { recursive: true });
      await fs.writeFile(
        path.join(OUTPUT_DIR, "report.json"),
        `${JSON.stringify(results, null, 2)}\n`
      );
    }
  } catch {
    // Preserve the original failure.
  }
  process.exitCode = 1;
});

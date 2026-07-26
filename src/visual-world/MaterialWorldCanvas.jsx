import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { artifactPiecesForSet } from "./artifactPieces.js";
import { visualForLesson } from "./lessonVisualManifest.js";
import { MATERIAL_TEXTURES } from "../assets/generated/visualManifest.generated.js";
import { useArtifactProgress } from "../features/artifact/ArtifactProgressContext.jsx";
import { useAppReducedMotion } from "../lib/useAppReducedMotion.js";

const EASE = (value) => 1 - Math.pow(1 - Math.max(0, Math.min(1, value)), 4);
const DARK_CLAY = new THREE.Color("#4b3329");
const FIRED_CLAY = new THREE.Color("#f3d4c4");
const FRAME_INTERVAL_MS = 1000 / 30;

function damp(rate, deltaSeconds, reduced) {
  return reduced ? 1 : 1 - Math.exp(-rate * deltaSeconds);
}

function geometryForPiece(piece) {
  const [first, ...rest] = piece.points;
  const shape = new THREE.Shape();
  shape.moveTo(first[0] * 2 - 1, 1 - first[1] * 2);
  rest.forEach(([x, y]) => shape.lineTo(x * 2 - 1, 1 - y * 2));
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.045,
    steps: 1,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.012,
    bevelThickness: 0.012,
  });
  const positions = geometry.attributes.position;
  const uvs = geometry.attributes.uv;
  for (let index = 0; index < positions.count; index += 1) {
    uvs.setXY(
      index,
      (positions.getX(index) + 1) / 2,
      (positions.getY(index) + 1) / 2
    );
  }
  uvs.needsUpdate = true;
  geometry.computeBoundingBox();
  const center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.computeVertexNormals();
  return { geometry, center };
}

function disposeMaterial(material) {
  if (Array.isArray(material)) material.forEach(disposeMaterial);
  else material?.dispose?.();
}

export default function MaterialWorldCanvas({
  lesson,
  image,
  filled = 0,
  total = 8,
  onReady,
  onFailure,
}) {
  const canvasRef = useRef(null);
  const latestRef = useRef({ filled, total });
  const wakeRef = useRef(null);
  const { preview, depth } = useArtifactProgress();
  const reduced = useAppReducedMotion();
  const visual = visualForLesson(lesson?.id);
  const pieces = artifactPiecesForSet(visual.pieceSet);

  useEffect(() => {
    latestRef.current = { filled, total, preview, depth, reduced };
    wakeRef.current?.();
  }, [depth, filled, preview, reduced, total]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image || !lesson?.id) return undefined;

    let disposed = false;
    let visible = true;
    let tabVisible = document.visibilityState !== "hidden";
    let contextLost = false;
    let frame = 0;
    let lastFrameAt = 0;
    let lastTickAt = 0;
    let fpsWindowAt = performance.now();
    let fpsFrames = 0;
    let resizeObserver;
    let intersectionObserver;
    let themeObserver;
    let composer;
    let bloomPass;
    let outputPass;
    let environmentTarget;
    const textures = [];
    const meshes = [];
    const disposables = [];
    const pointer = new THREE.Vector2(0, 0);
    const cameraTarget = new THREE.Vector3(0, 0, visual.camera.study);
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const deviceMemory = Number(navigator.deviceMemory) || null;
    const hardwareConcurrency = Number(navigator.hardwareConcurrency) || null;
    const userAgent = navigator.userAgent;
    const webkitEngine =
      /AppleWebKit/i.test(userAgent) &&
      !/(Chrome|Chromium|Edg|OPR)\//i.test(userAgent);
    const highTierCandidate =
      !mobile &&
      (deviceMemory === null || deviceMemory >= 6) &&
      hardwareConcurrency !== null &&
      hardwareConcurrency >= 6;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !mobile,
        powerPreference: "high-performance",
      });
    } catch (error) {
      onFailure?.(error);
      return undefined;
    }
    const gl = renderer.getContext();
    const rendererInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const gpuRenderer = String(
      rendererInfo
        ? gl.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL)
        : gl.getParameter(gl.RENDERER)
    );
    const softwareRenderer = /(SwiftShader|llvmpipe|software)/i.test(
      gpuRenderer
    );
    const highTier = highTierCandidate && !softwareRenderer;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.02;
    renderer.info.autoReset = false;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.8)
    );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
    camera.position.set(0, 0, visual.camera.study);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.HemisphereLight("#f3e2cf", "#13161b", 1.5);
    const raking = new THREE.DirectionalLight("#fff1d9", 3.2);
    raking.position.set(-2.7, 3.4, 4.6);
    const kiln = new THREE.PointLight("#f06132", 9, 5.2, 2);
    kiln.position.set(0.08, -0.05, 1.05);
    scene.add(ambient, raking, kiln);

    if (!webkitEngine) {
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      environmentTarget = pmrem.fromScene(room, 0.035);
      scene.environment = environmentTarget.texture;
      room.dispose();
      pmrem.dispose();
    }

    const root = new THREE.Group();
    root.rotation.x = -0.025;
    scene.add(root);

    const loader = new THREE.TextureLoader();
    const configureTexture = (texture, color = false) => {
      texture.colorSpace = color ? THREE.SRGBColorSpace : THREE.NoColorSpace;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      texture.needsUpdate = true;
      textures.push(texture);
      return texture;
    };
    const loadTexture = async (url, color = false) => {
      const texture = await loader.loadAsync(url);
      if (disposed) {
        texture.dispose();
        return texture;
      }
      return configureTexture(texture, color);
    };

    const setTheme = () => {
      const day = document.documentElement.dataset.mode === "day";
      scene.background = null;
      ambient.color.set(day ? "#fff7e9" : "#e9d6c2");
      ambient.groundColor.set(day ? "#6f746f" : "#0c0f14");
      ambient.intensity = day ? 1.85 : 1.4;
      raking.intensity = day ? 3.6 : 2.9;
      kiln.intensity = day ? 5.8 : 8.7;
      renderer.toneMappingExposure = day ? 1.12 : 0.98;
      const ground = root.getObjectByName("material-ground");
      if (ground) {
        ground.material.map = day
          ? ground.userData.dayMap
          : ground.userData.nightMap;
        ground.material.bumpMap = day
          ? ground.userData.dayMap
          : ground.userData.nightMap;
        ground.material.color.set(day ? "#d9d7d0" : "#25272c");
        ground.material.needsUpdate = true;
      }
      const guide = root.getObjectByName("material-guide");
      if (guide) {
        guide.material.color.set(day ? "#3d3835" : "#80756f");
        guide.material.opacity = day ? 0.54 : 0.3;
      }
    };

    const build = async () => {
      try {
        const [reliefMap, basaltMap, limestoneMap] = await Promise.all([
          loadTexture(image, true),
          loadTexture(MATERIAL_TEXTURES.darkGrout, true),
          loadTexture(MATERIAL_TEXTURES.coolLimestone, true),
        ]);
        if (disposed) return;
        [basaltMap, limestoneMap].forEach((texture) => {
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(1.8, 1.8);
        });

        const groundMaterial = new THREE.MeshStandardMaterial({
          color: "#25272c",
          map: basaltMap,
          bumpMap: basaltMap,
          bumpScale: 0.008,
          roughness: 0.96,
          metalness: 0,
          envMapIntensity: 0.22,
        });
        const groundGeometry = new THREE.PlaneGeometry(2.48, 2.48, 8, 8);
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.name = "material-ground";
        ground.position.z = -0.075;
        ground.userData.dayMap = limestoneMap;
        ground.userData.nightMap = basaltMap;
        root.add(ground);
        disposables.push(groundGeometry, groundMaterial);

        if (visual.progression === "remove") {
          const revealedMaterial = new THREE.MeshStandardMaterial({
            map: reliefMap,
            bumpMap: reliefMap,
            bumpScale: 0.012,
            displacementMap: reliefMap,
            displacementScale: 0.014,
            displacementBias: -0.004,
            color: "#f1d6c8",
            roughness: 0.9,
            metalness: 0,
            envMapIntensity: 0.34,
          });
          const revealedGeometry = new THREE.PlaneGeometry(2, 2, 32, 32);
          const revealed = new THREE.Mesh(
            revealedGeometry,
            revealedMaterial
          );
          revealed.position.z = -0.045;
          root.add(revealed);
          disposables.push(revealedGeometry, revealedMaterial);
        } else {
          const guideMaterial = new THREE.MeshStandardMaterial({
            map: reliefMap,
            bumpMap: reliefMap,
            bumpScale: 0.006,
            displacementMap: reliefMap,
            displacementScale: 0.006,
            displacementBias: -0.002,
            color: "#80756f",
            roughness: 0.96,
            metalness: 0,
            envMapIntensity: 0.18,
            transparent: true,
            opacity: 0.3,
            depthWrite: false,
          });
          guideMaterial.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <map_fragment>",
              `#include <map_fragment>
              float corinthGuideLuma = dot(
                diffuseColor.rgb,
                vec3(0.2126, 0.7152, 0.0722)
              );
              diffuseColor.rgb = mix(
                vec3(corinthGuideLuma),
                diffuseColor.rgb,
                0.08
              );`
            );
          };
          guideMaterial.customProgramCacheKey = () => "corinth-guide-v1";
          const guideGeometry = new THREE.PlaneGeometry(2, 2, 24, 24);
          const guide = new THREE.Mesh(guideGeometry, guideMaterial);
          guide.name = "material-guide";
          guide.position.z = -0.045;
          root.add(guide);
          disposables.push(guideGeometry, guideMaterial);
        }

        const order = visual.pieceOrder;
        pieces.forEach((piece, pieceIndex) => {
          const { geometry, center } = geometryForPiece(piece);
          const faceMaterial = new THREE.MeshStandardMaterial({
            map:
              visual.progression === "remove" ? basaltMap : reliefMap,
            bumpMap:
              visual.progression === "remove" ? basaltMap : reliefMap,
            bumpScale: 0.018,
            color: FIRED_CLAY.clone(),
            roughness: 0.88,
            metalness: 0,
            envMapIntensity: 0.42,
            transparent: true,
            depthWrite: visual.progression !== "remove",
          });
          const sideMaterial = new THREE.MeshStandardMaterial({
            color: "#372720",
            roughness: 0.98,
            metalness: 0,
            transparent: true,
            depthWrite: visual.progression !== "remove",
          });
          const mesh = new THREE.Mesh(geometry, [faceMaterial, sideMaterial]);
          mesh.position.copy(center);
          mesh.userData = {
            piece,
            pieceIndex,
            rank: order.indexOf(pieceIndex),
            center,
            progress: 0,
            faceMaterial,
            sideMaterial,
          };

          const edgeGeometry = new THREE.EdgesGeometry(geometry, 22);
          const edgeMaterial = new THREE.LineBasicMaterial({
            color:
              visual.progression === "remove" ? "#4a3028" : "#ef7045",
            transparent: true,
            opacity: 0,
            blending:
              visual.progression === "remove"
                ? THREE.NormalBlending
                : THREE.AdditiveBlending,
            depthWrite: false,
          });
          const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
          edges.userData.edgeMaterial = edgeMaterial;
          mesh.add(edges);
          root.add(mesh);
          meshes.push(mesh);
          disposables.push(
            geometry,
            faceMaterial,
            sideMaterial,
            edgeGeometry,
            edgeMaterial
          );
        });

        if (highTier) {
          composer = new EffectComposer(renderer);
          composer.addPass(new RenderPass(scene, camera));
          bloomPass = new UnrealBloomPass(
            new THREE.Vector2(1, 1),
            0.2,
            0.3,
            0.88
          );
          composer.addPass(bloomPass);
          outputPass = new OutputPass();
          composer.addPass(outputPass);
        }

        setTheme();
        onReady?.();
        renderFrame(performance.now(), true);
      } catch (error) {
        if (!disposed) onFailure?.(error);
      }
    };

    const updateSize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        mobile ? 1.35 : 1.8
      );
      if (renderer.getPixelRatio() !== pixelRatio) {
        renderer.setPixelRatio(pixelRatio);
        composer?.setPixelRatio(pixelRatio);
      }
      const pixelWidth = Math.round(
        width * pixelRatio
      );
      const pixelHeight = Math.round(
        height * pixelRatio
      );
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        renderer.setSize(width, height, false);
        composer?.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };

    const applyPieceState = (elapsed, deltaSeconds) => {
      const current = latestRef.current;
      const activePhysicalIndex =
        current.preview?.lessonId === lesson.id &&
        Number.isInteger(current.preview.pieceIndex)
          ? visual.pieceOrder[current.preview.pieceIndex]
          : null;

      meshes.forEach((mesh) => {
        const data = mesh.userData;
        const isPersisted = data.rank < current.filled;
        const isActive = data.pieceIndex === activePhysicalIndex;
        const desired = isPersisted
          ? 1
          : isActive
            ? current.preview.progress
            : 0;
        const speed = damp(4, deltaSeconds, current.reduced);
        data.progress += (desired - data.progress) * speed;
        if (Math.abs(desired - data.progress) < 0.001) data.progress = desired;
        const progress = EASE(data.progress);
        const placementProgress =
          visual.progression === "remove" ? 1 - progress : progress;
        const [entryX, entryY, entryRotation, entryTilt] = data.piece.entry;
        mesh.position.set(
          data.center.x + entryX * (1 - placementProgress),
          data.center.y + entryY * (1 - placementProgress),
          data.center.z + (1 - placementProgress) * 0.34
        );
        mesh.rotation.set(
          entryTilt * (1 - placementProgress),
          -entryTilt * 0.72 * (1 - placementProgress),
          entryRotation * (1 - placementProgress)
        );
        const settledScale = 0.84 + placementProgress * 0.16;
        mesh.scale.setScalar(settledScale);
        data.faceMaterial.color.lerpColors(
          DARK_CLAY,
          FIRED_CLAY,
          visual.progression === "remove"
            ? 0.18
            : 0.22 + progress * 0.78
        );
        data.faceMaterial.opacity =
          visual.progression === "remove"
            ? 1 - progress * 0.98
            : 0.16 + progress * 0.84;
        data.sideMaterial.opacity =
          visual.progression === "remove"
            ? 1 - progress * 0.98
            : 0.1 + progress * 0.9;
        data.faceMaterial.bumpScale = 0.008 + progress * 0.014;
        const edge = mesh.children[0]?.userData.edgeMaterial;
        if (edge) {
          const joinPulse =
            isActive && progress > 0.72
              ? Math.sin(progress * Math.PI) * 0.7
              : 0;
          const seamOpacity =
            visual.progression === "remove"
              ? 0.2 * (1 - progress)
              : 0.04 * progress;
          edge.opacity = Math.max(seamOpacity, joinPulse);
          mesh.children[0].visible = edge.opacity > 0.002;
        }
      });

      const depthKey = current.depth in visual.camera ? current.depth : "study";
      const interactiveX = current.reduced ? 0 : pointer.x;
      const interactiveY = current.reduced ? 0 : pointer.y;
      cameraTarget.z = visual.camera[depthKey];
      const ambientX = current.reduced ? 0 : Math.sin(elapsed * 0.00034) * 0.035;
      const ambientY = current.reduced ? 0 : Math.cos(elapsed * 0.00027) * 0.022;
      cameraTarget.x = interactiveX * 0.1 + ambientX;
      cameraTarget.y = interactiveY * 0.075 + ambientY;
      camera.position.lerp(
        cameraTarget,
        damp(1.35, deltaSeconds, current.reduced)
      );
      camera.lookAt(interactiveX * 0.035, interactiveY * 0.025, 0);
      raking.position.x +=
        (-2.7 + interactiveX * 1.4 - raking.position.x) *
        damp(1.68, deltaSeconds, current.reduced);
      raking.position.y +=
        (3.4 + interactiveY * 1.1 - raking.position.y) *
        damp(1.68, deltaSeconds, current.reduced);
      kiln.intensity =
        (document.documentElement.dataset.mode === "day" ? 5.6 : 8.4) +
        Math.min(current.filled, current.total) * 0.22 +
        (current.reduced ? 0 : Math.sin(elapsed * 0.0017) * 0.32);
      root.rotation.y +=
        (interactiveX * 0.035 - root.rotation.y) *
        damp(1.24, deltaSeconds, current.reduced);
      root.rotation.x +=
        (-0.025 - interactiveY * 0.025 - root.rotation.x) *
        damp(1.24, deltaSeconds, current.reduced);
    };

    const publishDiagnostics = (fps = null) => {
      window.__CORINTH_WORLD_DIAGNOSTICS__ = {
        active:
          !contextLost &&
          visible &&
          tabVisible &&
          !latestRef.current.reduced,
        lessonId: lesson.id,
        pieceSet: visual.pieceSet,
        pieceCount: meshes.length,
        renderer: contextLost ? "context-lost" : "three",
        dpr: renderer.getPixelRatio(),
        drawCalls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        fps,
        reducedMotion: latestRef.current.reduced,
        visible,
        tabVisible,
        contextLost,
        postProcessing: Boolean(composer),
        highTier,
        gpuRenderer,
        webkitEnvironmentFallback: webkitEngine,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        camera: {
          x: Number(camera.position.x.toFixed(4)),
          y: Number(camera.position.y.toFixed(4)),
          z: Number(camera.position.z.toFixed(4)),
        },
        rootRotation: {
          x: Number(root.rotation.x.toFixed(4)),
          y: Number(root.rotation.y.toFixed(4)),
        },
        guideVisible: Boolean(root.getObjectByName("material-guide")),
        pieceOpacities: meshes.map((mesh) => ({
          id: mesh.userData.piece.id,
          face: Number(mesh.userData.faceMaterial.opacity.toFixed(3)),
          side: Number(mesh.userData.sideMaterial.opacity.toFixed(3)),
        })),
      };
    };

    const updateDiagnostics = (now) => {
      fpsFrames += 1;
      if (now - fpsWindowAt < 1000) {
        const prior = window.__CORINTH_WORLD_DIAGNOSTICS__;
        if (
          !prior ||
          prior.lessonId !== lesson.id ||
          prior.renderer !== "three"
        ) {
          publishDiagnostics();
        }
        return;
      }
      const fps = Math.round((fpsFrames * 1000) / (now - fpsWindowAt));
      publishDiagnostics(fps);
      fpsFrames = 0;
      fpsWindowAt = now;
    };

    function renderFrame(now, force = false) {
      frame = 0;
      if (disposed || contextLost || !meshes.length) return;
      const current = latestRef.current;
      if (!force && (!visible || !tabVisible)) return;
      if (
        !force &&
        !current.reduced &&
        now - lastFrameAt < FRAME_INTERVAL_MS - 1
      ) {
        frame = requestAnimationFrame(renderFrame);
        return;
      }
      const deltaSeconds = lastTickAt
        ? Math.min(0.1, Math.max(0.001, (now - lastTickAt) / 1000))
        : 1 / 30;
      lastFrameAt = now;
      lastTickAt = now;
      updateSize();
      applyPieceState(now, deltaSeconds);
      renderer.info.reset();
      if (composer) composer.render();
      else renderer.render(scene, camera);
      updateDiagnostics(now);
      if (!current.reduced && visible && tabVisible) {
        frame = requestAnimationFrame(renderFrame);
      }
    }

    const wake = () => {
      if (disposed || contextLost) return;
      if (
        frame &&
        !latestRef.current.reduced &&
        visible &&
        tabVisible
      ) {
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame((now) => renderFrame(now, true));
    };
    wakeRef.current = wake;

    const onPointerMove = (event) => {
      if (!finePointer || latestRef.current.reduced) return;
      const rect = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      );
      wake();
    };
    const onPointerLeave = () => {
      pointer.set(0, 0);
      wake();
    };
    const onVisibility = () => {
      tabVisible = document.visibilityState !== "hidden";
      if (tabVisible) wake();
      else publishDiagnostics();
    };
    const onContextLost = (event) => {
      event.preventDefault();
      contextLost = true;
      cancelAnimationFrame(frame);
      frame = 0;
      publishDiagnostics();
      onFailure?.(new Error("WebGL context lost"));
    };
    const onContextRestored = () => {
      if (disposed) return;
      contextLost = false;
      lastFrameAt = 0;
      lastTickAt = 0;
      setTheme();
      onReady?.();
      wake();
    };

    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    document.addEventListener("visibilitychange", onVisibility);

    resizeObserver = new ResizeObserver(wake);
    resizeObserver.observe(canvas);
    intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wake();
        else publishDiagnostics();
      },
      { rootMargin: "80px" }
    );
    intersectionObserver.observe(canvas);
    themeObserver = new MutationObserver(() => {
      setTheme();
      wake();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mode"],
    });

    build();

    return () => {
      disposed = true;
      wakeRef.current = null;
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      themeObserver?.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((object) => {
        if (object.geometry && !disposables.includes(object.geometry)) {
          object.geometry.dispose?.();
        }
        if (object.material && !disposables.includes(object.material)) {
          disposeMaterial(object.material);
        }
      });
      disposables.forEach((value) => value.dispose?.());
      textures.forEach((texture) => texture.dispose());
      environmentTarget?.dispose();
      bloomPass?.dispose();
      outputPass?.dispose();
      composer?.dispose();
      renderer.dispose();
      if (window.__CORINTH_WORLD_DIAGNOSTICS__?.lessonId === lesson.id) {
        window.__CORINTH_WORLD_DIAGNOSTICS__ = {
          active: false,
          lessonId: lesson.id,
          renderer: "disposed",
        };
      }
    };
  }, [image, lesson?.id, onFailure, onReady, pieces, visual]);

  return (
    <canvas
      ref={canvasRef}
      className="material-world-canvas"
      aria-hidden="true"
      data-world-canvas={lesson?.id || ""}
      data-piece-set={visual.pieceSet}
    />
  );
}

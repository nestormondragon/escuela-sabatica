import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Centerpiece from "../components/Centerpiece.jsx";
import MaestroPanel from "../components/MaestroPanel.jsx";
import Icon from "../components/Icon.jsx";
import { useToast } from "../components/Toast.jsx";
import { useLockBodyScroll } from "../lib/useLockBodyScroll.js";
import { reveal, t, viewVariants, EASE_OUT } from "../lib/motion.js";
import { formatLong } from "../lib/date.js";
import { firstName } from "../lib/name.js";

/* The finished anchor: ceremony → keepable card → useful outputs. */
export default function KitDone({ lesson, state, total, maestro, onBack, onReset }) {
  const toast = useToast();
  const reduced = useReducedMotion();
  const fn = firstName(state.userName);
  const [ceremony, setCeremony] = useState(true);
  const cardRef = useRef(null);
  const out = lesson.outputs(state);
  const [drafts, setDrafts] = useState({
    oracion: out.oracion, aliento: out.aliento, accion24: out.accion24, pregunta: out.pregunta, tarjeta: out.tarjeta,
  });

  const copy = async (text) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        toast("Copiado");
        return;
      }
      throw new Error("no clipboard");
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.focus(); ta.select();
        const ok = document.execCommand("copy"); ta.remove();
        toast(ok ? "Copiado" : "Mantén pulsado el texto para copiar");
      } catch {
        toast("Mantén pulsado el texto para copiar");
      }
    }
  };

  const copyAll = () => {
    const header = `${fn ? fn.toUpperCase() + " · " : ""}${(lesson.kitName || "Mi recorrido").toUpperCase()} — Lección ${lesson.number} · ${lesson.title} · ${formatLong(lesson.forDate)}`;
    const L = [header, ""];
    L.push("Mi patrón: " + lesson.pattern(state), "");
    lesson.slots.forEach((s) => { if (state.slots[s.id]) L.push(`${s.label}: ${state.slots[s.id]}`); });
    L.push("", "Oración: " + drafts.oracion, "Mensaje de aliento: " + drafts.aliento, "Paso de 24h: " + drafts.accion24, "Pregunta para la clase: " + drafts.pregunta);
    L.push("", `Versículo: «${lesson.verse.text}» (${lesson.verse.ref})`);
    copy(L.join("\n"));
  };

  const saveImage = async () => {
    if (!cardRef.current) return;
    const fileName = `mi-${lesson.slug || "recorrido"}.png`;
    let dataUrl;
    try {
      const { toPng } = await import("html-to-image");
      dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true });
    } catch {
      toast("No se pudo crear la imagen aquí");
      return;
    }
    try {
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: lesson.kitName || "Mi recorrido", text: `${lesson.title} · ${lesson.verse.ref}` });
        return; // shared (or the OS handled it)
      }
    } catch (err) {
      if (err && (err.name === "AbortError" || err.name === "NotAllowedError")) return; // user cancelled — not an error
      // any other share failure → fall through to download
    }
    try {
      const a = document.createElement("a");
      a.href = dataUrl; a.download = fileName;
      document.body.appendChild(a); a.click(); a.remove();
      toast("Imagen descargada");
    } catch {
      toast("No se pudo descargar aquí");
    }
  };

  const downloadJSON = () => {
    try {
      const data = { lesson: `Lección ${lesson.number} · ${lesson.title}`, date: lesson.forDate, name: state.userName, slots: state.slots, extra: state.extra, outputs: drafts };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `mi-${lesson.slug || "recorrido"}.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      toast("Descargado");
    } catch { toast("Descarga no disponible aquí"); }
  };

  return (
    <>
      <AnimatePresence>
        {ceremony ? <Ceremony lesson={lesson} name={fn} reduced={reduced} onDone={() => setCeremony(false)} /> : null}
      </AnimatePresence>

      <motion.section className="view" variants={viewVariants} initial="initial" animate="animate" exit="exit">
        {/* ===== keepable card ===== */}
        <div
          id="kitPrint"
          ref={cardRef}
          style={{
            background: "radial-gradient(125% 90% at 50% 0%, var(--bg-2), var(--bg-0))",
            border: "1px solid var(--line-2)", borderRadius: "var(--radius-lg)",
            padding: "22px 20px 26px", boxShadow: "var(--shadow-lg)",
          }}
        >
          <div className="center">
            <span className="tag">{fn ? `${fn} · ${lesson.kitName}` : (lesson.kitName || "Mi recorrido")} · {lesson.title}</span>
          </div>
          <Centerpiece lesson={lesson} filled={total} size={280} />
          <p className="serif center" style={{ fontSize: "1.18rem", lineHeight: 1.5, margin: "12px auto 0", maxWidth: "34ch", fontFamily: "var(--scripture)" }}>
            {lesson.pattern(state)}
          </p>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {lesson.slots.map((s) =>
              state.slots[s.id] ? (
                <div key={s.id} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                  <span style={{ color: "var(--gold)", flex: "none", marginTop: 2 }}><Icon name={s.icon} size={16} /></span>
                  <span>
                    <span style={{ display: "block", fontFamily: "var(--ui)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)" }}>{s.label}</span>
                    <span className="serif" style={{ fontFamily: "var(--scripture)", fontSize: "1.02rem" }}>{state.slots[s.id]}</span>
                  </span>
                </div>
              ) : null
            )}
          </div>
          <div className="verse" style={{ marginTop: 16 }}>
            {lesson.verse.text}<span className="ref">{lesson.verse.ref}</span>
          </div>
        </div>

        <div className="share-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
          <button className="btn btn-primary" style={{ flex: "1 1 140px" }} onClick={saveImage}><Icon name="share" size={16} /> Compartir imagen</button>
          <button className="btn btn-ghost" style={{ flex: "1 1 120px" }} onClick={copyAll}><Icon name="copy" size={16} /> Copiar todo</button>
        </div>

        {/* ===== useful outputs ===== */}
        <div className="pause" style={{ margin: "24px 0 6px" }}><Icon name="anchor" size={16} /></div>
        <h2 className="serif center" style={{ fontSize: "1.5rem" }}>Para usar esta semana</h2>
        <p className="lead center" style={{ marginBottom: 10 }}>Edítalos y cópialos. Son tuyos.</p>

        <Output title="Mi oración en la tormenta" kicker="Para orar" id="oracion" rows={5} drafts={drafts} setDrafts={setDrafts} onCopy={copy} />
        <Output title="Mi mensaje de aliento" kicker="Para compartir (2 Cor. 1:4)" id="aliento" rows={3} drafts={drafts} setDrafts={setDrafts} onCopy={copy} />
        <Output title="Mi paso de 24 horas" kicker="Para hacer hoy" id="accion24" rows={2} drafts={drafts} setDrafts={setDrafts} onCopy={copy} />
        <Output title="Mi pregunta para la clase" kicker="Para dialogar sin sobreexponerme" id="pregunta" rows={3} drafts={drafts} setDrafts={setDrafts} onCopy={copy} />

        <div className="share-row" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
          <button className="btn btn-ghost" style={{ flex: "1 1 110px" }} onClick={() => { try { window.print(); } catch { toast("Usa el menú del navegador"); } }}><Icon name="printer" size={16} /> Imprimir</button>
          <button className="btn btn-ghost" style={{ flex: "1 1 110px" }} onClick={downloadJSON}><Icon name="download" size={16} /> Descargar</button>
        </div>

        {maestro ? (
          <div style={{ marginTop: 18 }}>
            <MaestroPanel guide={lesson.facilitator?.paso} />
            <div className="detail" style={{ marginTop: 12 }}>
              <div className="meta g">Preguntas para dialogar</div>
              <ol style={{ paddingLeft: 18, marginTop: 6, display: "flex", flexDirection: "column", gap: 8 }}>
                {lesson.discussion.map((q, i) => (
                  <li key={i} className="serif" style={{ fontFamily: "var(--scripture)", color: "var(--text-soft)" }}>{q}</li>
                ))}
              </ol>
            </div>
          </div>
        ) : null}

        <div className="station-nav">
          <button className="btn btn-ghost" onClick={onReset}><Icon name="refresh" size={16} /> Reiniciar</button>
          <button className="btn btn-ghost" onClick={onBack}><Icon name="anchor" size={16} /> {lesson.ui?.back || "Volver"}</button>
        </div>
      </motion.section>
    </>
  );
}

function Output({ title, kicker, id, rows, drafts, setDrafts, onCopy }) {
  return (
    <div style={{ background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: 16, marginBottom: 12, boxShadow: "var(--shadow)" }}>
      <div className="tag" style={{ color: "var(--muted)" }}>{kicker}</div>
      <h4 className="serif" style={{ fontSize: "1.14rem", margin: "2px 0 6px" }}>{title}</h4>
      <textarea
        rows={rows}
        value={drafts[id]}
        onChange={(e) => setDrafts((d) => ({ ...d, [id]: e.target.value }))}
        style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 12, background: "color-mix(in srgb, var(--bg-0) 55%, transparent)", padding: "11px 13px", fontFamily: "var(--scripture)", fontSize: "1rem", color: "var(--text)", lineHeight: 1.55 }}
      />
      <div style={{ marginTop: 8 }}>
        <button className="btn btn-ghost" style={{ minHeight: 42, padding: "9px 16px" }} onClick={() => onCopy(drafts[id])}><Icon name="copy" size={15} /> Copiar</button>
      </div>
    </div>
  );
}

function Ceremony({ lesson, name, reduced, onDone }) {
  useLockBodyScroll(true);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onDone();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onDone]);
  useEffect(() => {
    let cancelled = false;
    const timers = [];
    // one gentle gold confetti at the apex
    timers.push(setTimeout(async () => {
      if (cancelled || reduced) return;
      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({ particleCount: 46, spread: 70, startVelocity: 32, gravity: 0.9, scalar: 0.9, origin: { y: 0.62 }, colors: ["#e6b25a", "#ffd98a", "#f2a487", "#cdd7e8"] });
      } catch { /* ignore */ }
    }, reduced ? 0 : 1500));
    timers.push(setTimeout(() => { if (!cancelled) onDone(); }, reduced ? 400 : 3600));
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [reduced, onDone]);

  return (
    <motion.div
      onClick={onDone}
      role="dialog" aria-modal="true" aria-live="polite" aria-label={`${lesson.kitName} · completo`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: "fixed", inset: 0, zIndex: 92, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 28, background: "radial-gradient(125% 90% at 50% 30%, var(--bg-1), var(--bg-0))" }}
    >
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ ...t.springSoft, delay: 0.1 }}>
        <Centerpiece lesson={lesson} filled={lesson.slots.length} size={280} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6, ease: EASE_OUT }} className="center">
        <div className="tag">Completo · {lesson.slots.length} de {lesson.slots.length}</div>
        {name ? (
          <p className="serif" style={{ marginTop: 8, fontSize: "1.15rem", color: "var(--gold)" }}>{name}, lo lograste.</p>
        ) : null}
        <p className="scripture" style={{ marginTop: 8 }}>{lesson.verse.text}</p>
        <div className="tag" style={{ marginTop: 8, color: "var(--gold)" }}>{lesson.verse.ref}</div>
      </motion.div>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="btn btn-primary" onClick={onDone}>
        Ver mi ancla <Icon name="arrow" size={18} />
      </motion.button>
    </motion.div>
  );
}

/* =================================================================
   storage.js — safe, namespaced persistence
   Falls back to in-memory when localStorage is unavailable
   (private mode, embedded webviews, etc.) so the app never crashes.
   ================================================================= */

const mem = new Map();

let canUse = false;
try {
  const k = "__es_probe__";
  window.localStorage.setItem(k, "1");
  window.localStorage.removeItem(k);
  canUse = true;
} catch {
  canUse = false;
}

export const persistent = canUse;

export function readJSON(key, fallback = null) {
  try {
    if (canUse) {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }
    return mem.has(key) ? JSON.parse(mem.get(key)) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    const raw = JSON.stringify(value);
    if (canUse) window.localStorage.setItem(key, raw);
    else mem.set(key, raw);
  } catch {
    try {
      mem.set(key, JSON.stringify(value));
    } catch {
      /* give up silently */
    }
  }
}

export function readString(key, fallback = "") {
  try {
    if (canUse) return window.localStorage.getItem(key) ?? fallback;
    return mem.has(key) ? mem.get(key) : fallback;
  } catch {
    return fallback;
  }
}

export function writeString(key, value) {
  try {
    if (canUse) window.localStorage.setItem(key, value);
    else mem.set(key, value);
  } catch {
    /* ignore */
  }
}

export function remove(key) {
  try {
    if (canUse) window.localStorage.removeItem(key);
    else mem.delete(key);
  } catch {
    /* ignore */
  }
}

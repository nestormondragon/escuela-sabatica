import React from "react";

/* =================================================================
   Icon — a small, stroke-based icon set (Lucide/Phosphor style).
   No emoji-as-icon. Inherits color via currentColor; sized in px.
   ================================================================= */

const PATHS = {
  cloud: "M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.34 9.5 4 4 0 0 0 7 17.5M8 19l-1 2M12 19l-1 2M16 19l-1 2",
  wave: "M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2",
  hand: "M8 13V5a1.5 1.5 0 0 1 3 0v5m0-1V4a1.5 1.5 0 0 1 3 0v6m0-2.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1a6 6 0 0 1-5.2-3l-2-3.4a1.5 1.5 0 0 1 2.5-1.6L8 11",
  rock: "M3 18l4-9 4 5 3-7 7 11z",
  path: "M6 20c0-4 3-5 3-9s-2-4-2-6m9 21c0-3-3-4-3-7s2-3 2-5",
  release: "M12 3v9m0 0l-3-3m3 3l3-3M5 15a7 7 0 0 0 14 0",
  sunrise: "M12 3v3m6.4 2.6l-2 2M21 13h-3M6 13H3m3.6-4.4l-2-2M8 18a4 4 0 0 1 8 0M3 21h18",
  footstep: "M7 4c1.5 0 2.5 1.5 2.5 4S8.5 14 7 14s-2.5-2-2.5-5S5.5 4 7 4zM16 10c1.4 0 2 1.5 2 3.5S17 18 16 18s-2-1-2-3 .6-5 2-5zM5 17h4v2a2 2 0 0 1-4 0zM14 20h4v1a2 2 0 0 1-4 0z",
  anchor: "M12 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 0v13M5 12a7 7 0 0 0 14 0M5 12H3m16 0h2M8 9H6m12 0h-2",
  check: "M4 12l5 5L20 6",
  spark: "M12 3v4m0 10v4m9-9h-4M7 12H3m13.5-6.5l-3 3m-5 5l-3 3m11 0l-3-3m-5-5l-3-3",
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  copy: "M9 9h10v12H9zM5 15H4V3h12v1",
  book: "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2V5zm2 12h12",
  share: "M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  close: "M6 6l12 12M18 6L6 18",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3",
  heart: "M12 21s-7-4.5-9.5-8.5C1 9 3 5 6.5 5 9 5 12 8 12 8s3-3 5.5-3C21 5 23 9 21.5 12.5 19 16.5 12 21 12 21z",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM16 8l-2 6-6 2 2-6 6-2z",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M5 19h14",
  printer: "M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v6H8z",
  refresh: "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5",
  sun: "M12 4V2m0 20v-2m8-8h2M2 12h2m13.6-5.6l1.4-1.4M5 19l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  moon: "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z",
  chevron: "M9 6l6 6-6 6",
  sparkles: "M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6zM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z",
  feather: "M20 4C14 4 4 9 4 20l8-8m4-4l-4 4m4-4h-4v4",
  flame: "M12 3c3 4 5 6 5 10a5 5 0 0 1-10 0c0-2 1-3 1-5 1 1 2 1 2 3 1-2 1-5 2-8z",
};

export default function Icon({ name, size = 20, stroke = 1.7, className = "", style }) {
  const d = PATHS[name] || PATHS.spark;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

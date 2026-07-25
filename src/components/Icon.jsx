import React from "react";
import {
  Anchor, ArrowCounterClockwise, ArrowLeft, ArrowRight, BookOpen, Bread,
  CaretRight, ChatCircle, Check, Clock, Cloud, Compass, Copy, Cross, Crown,
  Door, DownloadSimple, Drop, Eye, Feather, Fire, Flame, Footprints, Gift,
  Hand, HandPalm, Handshake, Heart, Key, Leaf, Lock, MapTrifold, Megaphone,
  Moon, Mountains, Path, Plant, Printer, Scroll, ShareNetwork, Shield,
  Sparkle, SquaresFour, Star, Sun, SunHorizon, Users, UsersThree, Waves, Wine, X,
} from "@phosphor-icons/react";

/* =====================================================================
   Icon — one family, one stroke weight, drawn from Phosphor.

   Lesson content refers to glyphs by short semantic names so the content
   files stay independent of the icon vendor. Anything unmapped falls back
   to a neutral mark rather than rendering nothing, and the QA gate checks
   that every name a lesson uses is actually in this map.
   ===================================================================== */

const MAP = {
  // content glyphs used by lesson slots
  cloud: Cloud, sun: Sun, moon: Moon, star: Star, anchor: Anchor,
  flame: Flame, fire: Fire, book: BookOpen, heart: Heart, shield: Shield,
  key: Key, door: Door, seed: Plant, leaf: Leaf, mountain: Mountains,
  path: Path, eye: Eye, hand: Hand, crown: Crown, gift: Gift,
  scroll: Scroll, cup: Wine, bread: Bread, water: Drop, cross: Cross,
  people: UsersThree, voice: Megaphone, clock: Clock, map: MapTrifold,
  compass: Compass, feather: Feather, wave: Waves, rock: Mountains,
  release: HandPalm, footstep: Footprints, sunrise: SunHorizon,
  handshake: Handshake, chat: ChatCircle, users: Users, sparkles: Sparkle,
  mosaic: SquaresFour,
  spark: Sparkle,

  // interface affordances
  check: Check, arrow: ArrowRight, arrowLeft: ArrowLeft, copy: Copy,
  share: ShareNetwork, close: X, lock: Lock, download: DownloadSimple,
  printer: Printer, refresh: ArrowCounterClockwise, chevron: CaretRight,
};

export default function Icon({ name, size = 20, weight = "regular", style, className }) {
  const Glyph = MAP[name] || Sparkle;
  return (
    <Glyph
      size={size}
      weight={weight}
      style={style}
      className={className}
      aria-hidden="true"
      focusable="false"
    />
  );
}

/** Names the content layer is allowed to use (checked by the QA gate). */
export const ICON_NAMES = Object.keys(MAP);

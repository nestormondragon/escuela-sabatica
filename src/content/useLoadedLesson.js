import { useEffect, useState } from "react";
import { loadLesson } from "./loadLesson.js";

export function useLoadedLesson(lessonId, locale = "es") {
  const [result, setResult] = useState(() => ({
    lesson: null,
    loading: true,
    error: null,
  }));

  useEffect(() => {
    let active = true;
    setResult({ lesson: null, loading: true, error: null });
    loadLesson(lessonId, locale)
      .then((lesson) => {
        if (active) setResult({ lesson, loading: false, error: null });
      })
      .catch((error) => {
        if (active) setResult({ lesson: null, loading: false, error });
      });
    return () => {
      active = false;
    };
  }, [lessonId, locale]);

  return result;
}

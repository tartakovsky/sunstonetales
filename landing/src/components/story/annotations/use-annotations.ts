"use client";

import { useState, useEffect, useCallback } from "react";
import type { Annotation } from "./types";
import { applyHighlights } from "./apply-highlights";

export function useAnnotations(storySlug: string, locale: string) {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  // Fetch all annotations for this story
  useEffect(() => {
    fetch(`/api/annotations?story=${encodeURIComponent(storySlug)}&locale=${encodeURIComponent(locale)}`)
      .then((r) => r.json())
      .then((data) => setAnnotations(data))
      .catch(() => {});
  }, [storySlug, locale]);

  const create = useCallback(
    async (ann: {
      spreadIdx: number;
      startOffset: number;
      endOffset: number;
      color: string;
      comment?: string;
    }) => {
      const res = await fetch("/api/annotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storySlug, locale, ...ann }),
      });
      if (!res.ok) return null;
      const created: Annotation = await res.json();
      setAnnotations((prev) => [...prev, created]);
      return created;
    },
    [storySlug, locale],
  );

  const update = useCallback(async (id: string, updates: { color?: string; comment?: string }) => {
    const res = await fetch(`/api/annotations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) return;
    const updated: Annotation = await res.json();
    setAnnotations((prev) => prev.map((a) => (a.id === id ? updated : a)));
  }, []);

  const remove = useCallback(async (id: string) => {
    const res = await fetch(`/api/annotations/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setAnnotations((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const getHighlightedHtml = useCallback(
    (html: string, spreadIdx: number) => applyHighlights(html, spreadIdx, annotations),
    [annotations],
  );

  return { annotations, create, update, remove, getHighlightedHtml };
}

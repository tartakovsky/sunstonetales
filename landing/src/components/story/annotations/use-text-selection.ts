"use client";

import { useState, useEffect, useCallback } from "react";

export interface TextSelection {
  startOffset: number;
  endOffset: number;
  text: string;
  rect: DOMRect;
}

/**
 * Tracks text selection within a container element.
 * Computes plain-text character offsets (tags stripped) for anchoring.
 */
export function useTextSelection(container: HTMLElement | null) {
  const [selection, setSelection] = useState<TextSelection | null>(null);

  const computeOffsets = useCallback(
    (sel: Selection): TextSelection | null => {
      if (!container || sel.isCollapsed) return null;

      const range = sel.getRangeAt(0);

      // Check if selection intersects our container at all
      if (!container.contains(sel.anchorNode) && !container.contains(sel.focusNode)) return null;

      // Clamp range to container boundaries when selection extends outside
      const clamped = range.cloneRange();
      if (!container.contains(range.startContainer)) {
        clamped.setStartBefore(container.firstChild!);
      }
      if (!container.contains(range.endContainer)) {
        clamped.setEndAfter(container.lastChild!);
      }

      // Compute plain-text offsets using Range.toString().length
      // This handles both text-node and element-level range boundaries
      const pre = document.createRange();
      pre.setStart(container, 0);
      pre.setEnd(clamped.startContainer, clamped.startOffset);
      const startOffset = pre.toString().length;
      pre.setEnd(clamped.endContainer, clamped.endOffset);
      const endOffset = pre.toString().length;

      if (startOffset === endOffset) return null;

      return {
        startOffset: Math.min(startOffset, endOffset),
        endOffset: Math.max(startOffset, endOffset),
        text: sel.toString(),
        rect: range.getBoundingClientRect(),
      };
    },
    [container],
  );

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  useEffect(() => {
    if (!container) return;

    // Desktop: show tooltip on mouseup after selection
    function onMouseUp() {
      // Small delay to let browser finalize the selection
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed) {
          setSelection(null);
          return;
        }
        const result = computeOffsets(sel);
        setSelection(result);
      }, 10);
    }

    // Mobile: selectionchange fires after long-press selection
    function onSelectionChange() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return;
      // Only process if selection is within our container
      if (!container!.contains(sel.anchorNode)) return;
      const result = computeOffsets(sel);
      if (result) setSelection(result);
    }

    container.addEventListener("mouseup", onMouseUp);
    document.addEventListener("selectionchange", onSelectionChange);

    return () => {
      container.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, [container, computeOffsets]);

  return { selection, clearSelection };
}

"use client";

import { useState, useEffect, useCallback, type RefObject } from "react";

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
export function useTextSelection(containerRef: RefObject<HTMLElement | null>) {
  const [selection, setSelection] = useState<TextSelection | null>(null);

  const computeOffsets = useCallback(
    (sel: Selection): TextSelection | null => {
      const container = containerRef.current;
      if (!container || sel.isCollapsed) return null;

      const range = sel.getRangeAt(0);

      // Make sure selection is inside our container
      if (!container.contains(range.commonAncestorContainer)) return null;

      // Walk all text nodes to compute global char offsets
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      let charCount = 0;
      let startOffset = -1;
      let endOffset = -1;
      let textNode: Text | null;

      while ((textNode = walker.nextNode() as Text | null)) {
        // Check if this node contains the start of the range
        if (textNode === range.startContainer) {
          startOffset = charCount + range.startOffset;
        }
        // Check if this node contains the end of the range
        if (textNode === range.endContainer) {
          endOffset = charCount + range.endOffset;
        }
        charCount += textNode.length;
      }

      if (startOffset === -1 || endOffset === -1 || startOffset === endOffset) return null;

      // Ensure start < end
      if (startOffset > endOffset) [startOffset, endOffset] = [endOffset, startOffset];

      return {
        startOffset,
        endOffset,
        text: sel.toString(),
        rect: range.getBoundingClientRect(),
      };
    },
    [containerRef],
  );

  const clearSelection = useCallback(() => {
    setSelection(null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
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
  }, [containerRef, computeOffsets]);

  return { selection, clearSelection };
}

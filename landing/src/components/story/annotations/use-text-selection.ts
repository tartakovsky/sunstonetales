"use client";

export interface TextSelection {
  startOffset: number;
  endOffset: number;
  text: string;
  rect: DOMRect;
}

/**
 * Compute plain-text character offsets for the current browser selection
 * within a container element. Returns null if no valid selection.
 */
export function getSelectionOffsets(container: HTMLElement): TextSelection | null {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed) return null;

  const range = sel.getRangeAt(0);

  // Check if selection intersects our container
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
    rect: clamped.getBoundingClientRect(),
  };
}

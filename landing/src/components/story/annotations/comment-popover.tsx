"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface CommentPopoverProps {
  rect: DOMRect;
  initialComment?: string | undefined;
  onSave: (comment: string) => void;
  onDelete?: (() => void) | undefined;
  onClose: () => void;
}

export function CommentPopover({ rect, initialComment, onSave, onDelete, onClose }: CommentPopoverProps) {
  const [text, setText] = useState(initialComment || "");
  const popoverRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    const el = popoverRef.current;
    if (!el) return;

    const elRect = el.getBoundingClientRect();
    let top = rect.bottom + 8;
    let left = rect.left + rect.width / 2 - elRect.width / 2;

    // Keep within viewport
    if (top + elRect.height > window.innerHeight - 4) top = rect.top - elRect.height - 8;
    if (left < 4) left = 4;
    if (left + elRect.width > window.innerWidth - 4) left = window.innerWidth - elRect.width - 4;

    setPos({ top, left });
  }, [rect]);

  // Close on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    const timer = setTimeout(() => document.addEventListener("mousedown", onClick), 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", onClick);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={popoverRef}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 10000,
        width: 260,
        padding: 12,
        borderRadius: 10,
        background: "rgba(30, 30, 30, 0.95)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            onSave(text);
          }
          if (e.key === "Escape") onClose();
        }}
        placeholder="Add a note..."
        rows={3}
        style={{
          resize: "vertical",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 6,
          padding: 8,
          color: "rgba(255,255,255,0.9)",
          fontSize: 14,
          fontFamily: "system-ui, sans-serif",
          outline: "none",
        }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 6 }}>
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              border: "1px solid rgba(239, 68, 68, 0.4)",
              background: "transparent",
              color: "rgba(239, 68, 68, 0.85)",
              fontSize: 13,
              cursor: "pointer",
              marginRight: "auto",
            }}
          >
            Delete
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "transparent",
            color: "rgba(255,255,255,0.7)",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(text)}
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            border: "none",
            background: "rgba(59, 130, 246, 0.85)",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>
    </div>,
    document.body,
  );
}

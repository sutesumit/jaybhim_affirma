import { useEffect } from "react";

export function useAutoResizeTextarea(
  ref: HTMLTextAreaElement | null,
  value: string
) {
  useEffect(() => {
    if (ref) {
      ref.style.height = "auto";
      ref.style.height = `${ref.scrollHeight}px`;
    }
  }, [value, ref]);
}

import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    const prev = document?.title ?? "Mini golf scores";
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

import { useEffect } from "react";

/* https://github.com/TanStack/router/discussions/1056 */

export function useTitle(title: string) {
  useEffect(() => {
    const prev = document?.title ?? "Mini golf scores";
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
}

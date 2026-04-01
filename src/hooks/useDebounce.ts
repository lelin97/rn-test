import { useEffect, useState } from "react";

type UseDebounceOptions = {
  delayMs?: number;
  skipDebounceWhenEmpty?: boolean;
};

export function useDebounce(value: string, { delayMs = 500, skipDebounceWhenEmpty = true }: UseDebounceOptions = {}): string {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    if (skipDebounceWhenEmpty && value === "") {
      setDebounced("");
      return;
    }

    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs, skipDebounceWhenEmpty]);

  return debounced;
}

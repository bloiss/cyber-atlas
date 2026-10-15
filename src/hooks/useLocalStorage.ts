import { useCallback, useState } from 'react';

const PREFIX = 'atlas:';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* stockage indisponible (navigation privée, quota…) */
  }
}

/**
 * Même modèle que l'objet `store` de l'ancien js/app.js : clés préfixées `atlas:`,
 * pour ne pas perdre la progression déjà enregistrée dans le navigateur des visiteurs.
 */
export function useLocalStorage<T>(key: string, fallback: T): [T, (next: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => read(key, fallback));

  const setStored = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (prev: T) => T)(prev) : next;
        write(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, setStored];
}

const STORAGE_KEY = "nr:hidden-sources";

function loadHidden(): Set<number> {
  if (import.meta.server) return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveHidden(set: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
}

export function useSourcePrefs() {
  const hidden = useState<Set<number>>("source-prefs", () => loadHidden());

  function isVisible(sourceId: number): boolean {
    return !hidden.value.has(sourceId);
  }

  function toggle(sourceId: number) {
    const next = new Set(hidden.value);
    if (next.has(sourceId)) {
      next.delete(sourceId);
    } else {
      next.add(sourceId);
    }
    hidden.value = next;
    saveHidden(next);
  }

  function visibleIds(allIds: number[]): number[] {
    return allIds.filter((id) => !hidden.value.has(id));
  }

  return { hidden, isVisible, toggle, visibleIds };
}

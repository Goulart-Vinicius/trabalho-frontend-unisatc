export interface IDerivedOption {
  id: string;
  label: string;
  count: number;
}

export function deriveOptions<T>(
  items: T[],
  getValue: (item: T) => string,
): IDerivedOption[] {
  const map = new Map<string, IDerivedOption>();

  for (const item of items) {
    const value = getValue(item);
    if (!value) continue;

    const existing = map.get(value);

    if (existing) {
      existing.count++;
    } else {
      map.set(value, { id: value, label: value, count: 1 });
    }
  }

  return [...map.values()].sort((a, b) =>
    a.label.localeCompare(b.label, "pt-BR"),
  );
}

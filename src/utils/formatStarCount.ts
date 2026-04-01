export function formatStarCount(count: number): string {
  if (count < 1000) {
    return String(count);
  }

  if (count < 1_000_000) {
    const value = count / 1000;
    return `${value >= 10 ? Math.round(value) : value.toFixed(1)}k`;
  }

  const value = count / 1_000_000;
  return `${value >= 10 ? Math.round(value) : value.toFixed(1)}M`;
}

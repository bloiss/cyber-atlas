/** Porte chipRow() de l'ancien app.js : une rangée de filtres "puces". */
export function ChipRow({
  values,
  current,
  onPick,
  style,
}: {
  values: readonly string[];
  current: string;
  onPick: (value: string) => void;
  style?: React.CSSProperties;
}) {
  return (
    <div className="chips" style={style}>
      {values.map((v) => (
        <button key={v} type="button" className="chip" aria-pressed={v === current} onClick={() => onPick(v)}>
          {v}
        </button>
      ))}
    </div>
  );
}

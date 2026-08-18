export type ViewMode = "list" | "grid3" | "grid5";

const OPTIONS: { value: ViewMode; label: string }[] = [
  { value: "list", label: "리스트형" },
  { value: "grid3", label: "3×3 매트릭스형" },
  { value: "grid5", label: "5×5 매트릭스형" },
];

export default function ViewSwitcher({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-pure-white p-1 ghost-border">
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-full px-3 py-1.5 text-xs transition-colors ${
              active
                ? "bg-obsidian text-pure-white"
                : "text-charcoal hover:text-obsidian"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

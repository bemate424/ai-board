export default function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-md bg-pure-white p-6 card-border">
      <p className="eyebrow mb-3 text-stone">{label}</p>
      <p
        className="text-obsidian"
        style={{
          fontSize: "48px",
          lineHeight: 1,
          letterSpacing: "-2px",
          fontWeight: 500,
        }}
      >
        {value}
      </p>
    </div>
  );
}

import type { Team } from "@/lib/types";

export default function TeamBarChart({
  data,
}: {
  data: { team: Team; count: number }[];
}) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="rounded-md bg-pure-white p-6 card-border">
      <div className="flex flex-col gap-4">
        {data.map(({ team, count }) => (
          <div key={team} className="flex items-center gap-4">
            <span className="eyebrow w-20 shrink-0 text-charcoal">{team}</span>
            <div className="relative h-2.5 flex-1 rounded-full bg-hairline">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-obsidian"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="eyebrow w-6 shrink-0 text-right text-obsidian">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

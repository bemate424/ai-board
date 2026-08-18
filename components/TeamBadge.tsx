import type { Team } from "@/lib/types";

export default function TeamBadge({ team }: { team: Team }) {
  return (
    <span className="eyebrow inline-flex items-center rounded-full border border-hairline px-2.5 py-1 text-obsidian">
      {team}
    </span>
  );
}

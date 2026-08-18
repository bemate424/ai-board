import Link from "next/link";
import type { Post } from "@/lib/types";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function PostGridCard({
  post,
  compact = false,
  onDelete,
}: {
  post: Post;
  compact?: boolean;
  onDelete?: (id: string) => void;
}) {
  return (
    <Link
      href={`/post/${post.id}`}
      className={`flex h-full flex-col rounded-md bg-pure-white card-border transition-opacity hover:opacity-90 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span
          className={`eyebrow truncate rounded-full border border-hairline text-obsidian ${
            compact ? "px-1.5 py-0.5 text-[9px]" : "px-2.5 py-1"
          }`}
        >
          {post.team}
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          {!compact && (
            <span className="eyebrow text-smoke">{formatDate(post.createdAt)}</span>
          )}
          {onDelete && (
            <button
              type="button"
              aria-label="삭제"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm("이 요청을 삭제할까요?")) {
                  onDelete(post.id);
                }
              }}
              className={`eyebrow rounded-full text-smoke transition-colors hover:text-obsidian ${
                compact ? "text-[9px]" : ""
              }`}
            >
              삭제
            </button>
          )}
        </div>
      </div>
      <h3
        className={`mb-1 font-semibold text-obsidian ${
          compact ? "line-clamp-2 text-xs" : "line-clamp-2 text-sm"
        }`}
      >
        {post.title}
      </h3>
      {!compact && (
        <p className="line-clamp-3 text-xs text-charcoal">{post.content}</p>
      )}
    </Link>
  );
}

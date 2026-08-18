import Link from "next/link";
import type { Post } from "@/lib/types";
import TeamBadge from "./TeamBadge";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function PostCard({
  post,
  onDelete,
}: {
  post: Post;
  onDelete?: (id: string) => void;
}) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block rounded-md bg-pure-white p-4 card-border transition-opacity hover:opacity-90"
    >
      <div className="mb-3 flex items-center justify-between">
        <TeamBadge team={post.team} />
        <div className="flex items-center gap-2">
          <span className="eyebrow text-smoke">{formatDate(post.createdAt)}</span>
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
              className="eyebrow rounded-full px-2 py-1 text-smoke transition-colors hover:text-obsidian"
            >
              삭제
            </button>
          )}
        </div>
      </div>
      <h3 className="mb-2 line-clamp-1 text-base font-semibold text-obsidian">
        {post.title}
      </h3>
      <p className="line-clamp-2 text-sm text-charcoal">{post.content}</p>
    </Link>
  );
}

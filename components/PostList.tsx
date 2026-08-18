"use client";

import { useState } from "react";
import type { Post } from "@/lib/types";
import PostCard from "./PostCard";
import PostGridCard from "./PostGridCard";
import ViewSwitcher, { type ViewMode } from "./ViewSwitcher";

const PAGE_SIZE: Record<ViewMode, number> = {
  list: 10,
  grid3: 9,
  grid5: 25,
};

export default function PostList({
  posts,
  onDelete,
}: {
  posts: Post[];
  onDelete?: (id: string) => void;
}) {
  const [view, setView] = useState<ViewMode>("list");
  const [page, setPage] = useState(0);

  function changeView(v: ViewMode) {
    setView(v);
    setPage(0);
  }

  const pageSize = PAGE_SIZE[view];
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  const paged = posts.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="eyebrow text-stone">
          전체 {posts.length}건의 요청
        </p>
        <ViewSwitcher value={view} onChange={changeView} />
      </div>

      {posts.length === 0 ? (
        <div className="rounded-md bg-pure-white p-10 text-center card-border">
          <p className="text-sm text-charcoal">아직 등록된 요청이 없습니다.</p>
        </div>
      ) : view === "list" ? (
        <div className="flex flex-col gap-3">
          {paged.map((post) => (
            <PostCard key={post.id} post={post} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-3 ${
            view === "grid3" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          }`}
        >
          {paged.map((post) => (
            <PostGridCard
              key={post.id}
              post={post}
              compact={view === "grid5"}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="rounded-md px-3 py-1.5 text-xs text-charcoal ghost-border disabled:opacity-40"
          >
            이전
          </button>
          <span className="eyebrow text-stone">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="rounded-md px-3 py-1.5 text-xs text-charcoal ghost-border disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

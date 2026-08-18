"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { deletePost, getPostById } from "@/lib/posts";
import type { Post } from "@/lib/types";
import TeamBadge from "@/components/TeamBadge";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

export default function PostDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null | undefined>(undefined);

  useEffect(() => {
    getPostById(params.id).then((found) => setPost(found ?? null));
  }, [params.id]);

  async function handleDelete() {
    if (!window.confirm("이 요청을 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.")) {
      return;
    }
    await deletePost(params.id);
    router.push("/");
  }

  if (post === undefined) {
    return (
      <div className="mx-auto w-full max-w-3xl flex-1 px-6 py-12 sm:px-8">
        <p className="text-sm text-charcoal">불러오는 중...</p>
      </div>
    );
  }

  if (post === null) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12 sm:px-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="eyebrow inline-flex w-fit items-center gap-1 text-stone hover:text-obsidian"
        >
          ← 목록으로
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="eyebrow rounded-md px-3 py-1.5 text-charcoal ghost-border hover:text-obsidian"
        >
          삭제하기
        </button>
      </div>

      <article className="rounded-md bg-pure-white p-8 card-border">
        <div className="mb-4 flex items-center justify-between">
          <TeamBadge team={post.team} />
          <span className="eyebrow text-smoke">{formatDate(post.createdAt)}</span>
        </div>
        <h1
          className="mb-6 text-obsidian"
          style={{
            fontSize: "30px",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            fontWeight: 600,
          }}
        >
          {post.title}
        </h1>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-charcoal">
          {post.content}
        </p>
      </article>
    </div>
  );
}

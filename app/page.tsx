"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import WelcomeModal from "@/components/WelcomeModal";
import PostList from "@/components/PostList";
import { deletePost, getPosts } from "@/lib/posts";
import type { Post } from "@/lib/types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  async function handleDelete(id: string) {
    await deletePost(id);
    setPosts(await getPosts());
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12 sm:px-8">
      <header className="flex flex-col gap-2">
        <p className="eyebrow text-charcoal">Internal · AI Request Board</p>
        <h1
          className="text-obsidian"
          style={{
            fontSize: "56px",
            lineHeight: 1,
            letterSpacing: "-3.36px",
            fontWeight: 450,
          }}
        >
          부서별 AI 요청 게시판
        </h1>
        <p className="max-w-2xl text-sm text-charcoal">
          우리 팀에 필요한 AI를 편하게 제안해주세요. 모든 요청은 익명으로
          등록됩니다.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Link
            href="/new"
            className="inline-flex rounded-md bg-obsidian px-5 py-2.5 text-sm text-pure-white transition-opacity hover:opacity-90"
          >
            신청하기
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex rounded-md px-5 py-2.5 text-sm text-charcoal ghost-border"
          >
            대시보드 보기
          </Link>
        </div>
      </header>

      <section>
        <PostList posts={posts} onDelete={handleDelete} />
      </section>

      <WelcomeModal />
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import StatCard from "@/components/StatCard";
import TeamBarChart from "@/components/TeamBarChart";
import PostCard from "@/components/PostCard";
import { deletePost, getPosts } from "@/lib/posts";
import { TEAMS } from "@/lib/types";
import type { Post } from "@/lib/types";

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  async function handleDelete(id: string) {
    await deletePost(id);
    setPosts(await getPosts());
  }

  const totalCount = posts.length;

  const participatingTeams = useMemo(
    () => new Set(posts.map((p) => p.team)).size,
    [posts]
  );

  const teamCounts = useMemo(() => {
    return TEAMS.map((team) => ({
      team,
      count: posts.filter((p) => p.team === team).length,
    })).sort((a, b) => b.count - a.count);
  }, [posts]);

  const recentPosts = posts.slice(0, 8);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12 sm:px-8">
      <header className="flex flex-col gap-2">
        <Link
          href="/"
          className="eyebrow mb-2 inline-flex w-fit items-center gap-1 text-stone hover:text-obsidian"
        >
          ← 목록으로
        </Link>
        <p className="eyebrow text-charcoal">Internal · Dashboard</p>
        <h1
          className="text-obsidian"
          style={{
            fontSize: "56px",
            lineHeight: 1,
            letterSpacing: "-3.36px",
            fontWeight: 450,
          }}
        >
          AI 요청 대시보드
        </h1>
        <p className="max-w-2xl text-sm text-charcoal">
          부서별 AI 요청 현황을 한눈에 확인해보세요.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <StatCard label="총 요청 건수" value={totalCount} />
        <StatCard label="참여 팀 수" value={`${participatingTeams} / ${TEAMS.length}`} />
      </section>

      <section>
        <p className="eyebrow mb-4 text-stone">팀별 요청 현황</p>
        <TeamBarChart data={teamCounts} />
      </section>

      <section>
        <p className="eyebrow mb-4 text-stone">최근 요청</p>
        {recentPosts.length === 0 ? (
          <div className="rounded-md bg-pure-white p-10 text-center card-border">
            <p className="text-sm text-charcoal">아직 등록된 요청이 없습니다.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

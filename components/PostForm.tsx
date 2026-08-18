"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TEAMS, type Team } from "@/lib/types";
import { createPost } from "@/lib/posts";

export default function PostForm() {
  const router = useRouter();
  const [team, setTeam] = useState<Team>(TEAMS[0]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      await createPost({ team, title: title.trim(), content: content.trim() });
      router.push("/");
    } catch {
      setError("등록에 실패했습니다. 잠시 후 다시 시도해주세요.");
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-md bg-pure-white p-6 card-border">
      <p className="eyebrow text-charcoal mb-3">요청하기</p>
      <h2
        className="mb-6 text-obsidian"
        style={{
          fontSize: "30px",
          lineHeight: 1.1,
          letterSpacing: "-1.5px",
          fontWeight: 450,
        }}
      >
        어떤 AI가 필요하신가요?
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="team" className="eyebrow text-stone">
            팀명
          </label>
          <select
            id="team"
            value={team}
            onChange={(e) => setTeam(e.target.value as Team)}
            className="rounded-md border-0 bg-paper-white px-3 py-2.5 text-sm text-obsidian ghost-border focus:outline-none focus:ring-2 focus:ring-obsidian/20"
          >
            {TEAMS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="eyebrow text-stone">
            제목
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="요청 제목을 입력해주세요"
            className="rounded-md border-0 bg-paper-white px-3 py-2.5 text-sm text-obsidian ghost-border placeholder:text-smoke focus:outline-none focus:ring-2 focus:ring-obsidian/20"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="eyebrow text-stone">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="현재 겪고 있는 어려움이나 필요한 AI 기능을 편하게 작성해주세요"
            rows={5}
            className="rounded-md border-0 bg-paper-white px-3 py-2.5 text-sm text-obsidian ghost-border placeholder:text-smoke focus:outline-none focus:ring-2 focus:ring-obsidian/20"
            required
          />
        </div>

        <p className="text-xs text-graphite">
          작성자 정보는 저장되지 않으며, 게시글은 익명으로 등록됩니다.
        </p>

        {error && <p className="text-xs text-charcoal">{error}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-obsidian px-5 py-2.5 text-sm text-pure-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "등록 중..." : "제출하기"}
          </button>
        </div>
      </form>
    </div>
  );
}

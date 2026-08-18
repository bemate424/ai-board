"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SESSION_KEY = "ai-request-board:welcome-shown";

export default function WelcomeModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(SESSION_KEY)) return;
    setOpen(true);
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }, []);

  if (!open) return null;

  function close() {
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/40 px-4">
      <div className="w-full max-w-md rounded-md bg-pure-white p-8 card-border">
        <p className="eyebrow text-charcoal mb-4">AI 요청 게시판</p>
        <h2
          className="mb-3 text-obsidian"
          style={{
            fontSize: "30px",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            fontWeight: 450,
          }}
        >
          당신의 부서는
          <br />
          AI가 필요하신가요?
        </h2>
        <p className="mb-8 text-sm text-charcoal">
          편하게 이야기해주세요! 익명으로 자유롭게 제안하거나 요청할 수
          있어요.
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/new")}
            className="rounded-md bg-obsidian px-5 py-2.5 text-sm text-pure-white transition-opacity hover:opacity-90"
          >
            신청하기
          </button>
          <button
            onClick={close}
            className="rounded-md px-5 py-2.5 text-sm text-charcoal ghost-border"
          >
            나중에 할게요
          </button>
        </div>
      </div>
    </div>
  );
}

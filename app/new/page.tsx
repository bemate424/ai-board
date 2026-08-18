import Link from "next/link";
import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-6 py-12 sm:px-8">
      <Link
        href="/"
        className="eyebrow inline-flex w-fit items-center gap-1 text-stone hover:text-obsidian"
      >
        ← 목록으로
      </Link>

      <PostForm />
    </div>
  );
}

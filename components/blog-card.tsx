import type { Post } from "@/lib/blog";

export function BlogCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[26px] bg-warm no-underline shadow-[0_18px_50px_-30px_rgba(34,29,23,.5)] ring-1 ring-ink/[.06] transition-shadow hover:shadow-[0_24px_60px_-26px_rgba(34,29,23,.5)]"
    >
      <div className={`relative w-full overflow-hidden ${large ? "aspect-[16/10]" : "aspect-[16/11]"}`}>
        <img
          src={post.cover || "/placeholder.svg"}
          alt={post.coverAlt}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-[11px] py-[5px] text-[11px] font-semibold uppercase tracking-[.1em] text-ink backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3
          className={`text-balance font-light leading-[1.14] text-ink ${large ? "text-[clamp(24px,3vw,34px)]" : "text-[21px]"}`}
        >
          {post.h1}
        </h3>
        <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-ink-soft">{post.excerpt}</p>
        <div className="mt-5 flex items-center gap-3 text-[13px] text-ink-mute">
          <span>{post.readMins} min de lectura</span>
          <span aria-hidden>·</span>
          <span className="font-medium text-clay group-hover:underline">Leer más →</span>
        </div>
      </div>
    </a>
  );
}

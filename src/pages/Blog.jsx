import { ArrowRight, Calendar, Clock } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import DarkCard from "../components/ui/DarkCard";
import { BLOG_POSTS } from "../data/blog";

export default function Blog() {
  return (
    <>
      <Seo
        title="Insights & Blog"
        description="Practical guidance on structural audits, NDT testing, redevelopment versus repair decisions, and waterproofing — from the Wise Engineering Consultants team."
        path="/blog"
      />
      <PageHero
        eyebrow="Insights"
        title="Practical guidance for building owners & societies"
        description="No jargon — just the technical background committees need to make confident decisions."
        breadcrumb={[{ label: "Blog" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2">
            {BLOG_POSTS.map((post, i) => (
              <DarkCard key={post.slug} to={`/blog/${post.slug}`} index={i} className="block h-full">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-300">
                  {post.category}
                </span>
                <h2 className="mt-5 card-title group-hover:text-brand-300 transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-300 transition-transform group-hover:translate-x-1" />
                </div>
              </DarkCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

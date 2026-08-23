import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import { BLOG_POSTS } from "../data/blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${post.slug}`} />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        breadcrumb={[{ label: "Blog", to: "/blog" }, { label: post.category }]}
      />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-3xl container-px">
          <div className="flex items-center gap-5 text-sm text-ink-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose-content mt-8 space-y-5"
          >
            {post.content.map((para, i) => (
              <p key={i} className="text-ink-700 leading-relaxed">
                {para}
              </p>
            ))}
          </motion.div>

          <Link
            to="/blog"
            className="mt-12 inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all insights
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}

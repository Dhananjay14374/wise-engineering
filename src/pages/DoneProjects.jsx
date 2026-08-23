import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import CTASection from "../components/CTASection";
import { DONE_PROJECTS } from "../data/doneProjects";

export default function DoneProjects() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DONE_PROJECTS;
    return DONE_PROJECTS.filter(
      (p) => p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <Seo
        title="Done Projects"
        description="400+ completed structural repair projects delivered by Wise Engineering Consultants across Mumbai, Thane and Palghar."
        path="/projects/done"
      />
      <PageHero
        eyebrow="Case Studies"
        title="400+ repair projects. Every one seen through to handover."
        description="A record of our completed structural repair and PMC projects — real societies, real budgets, real outcomes."
        breadcrumb={[{ label: "Projects", to: "/projects/done" }, { label: "Done Projects" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionTitle eyebrow="Our Work" title="Completed structural repair projects" />
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500/50" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or location…"
                className="w-full rounded-full border border-ink-900/10 bg-ink-50/40 py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-sm text-ink-500">No projects match "{query}".</p>
          ) : (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} status="done" index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Have a project like these in mind?"
        description="Send us your building details and we'll scope a plan, timeline and budget within days."
      />
    </>
  );
}

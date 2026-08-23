import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, IndianRupee, MapPin } from "lucide-react";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import StatusBadge from "../components/ui/StatusBadge";
import BeforeAfterComparison from "../components/BeforeAfterComparison";
import ProjectGallery from "../components/ProjectGallery";
import CTASection from "../components/CTASection";
import { DONE_PROJECTS } from "../data/doneProjects";
import { ONGOING_PROJECTS } from "../data/ongoingProjects";

const SOURCES = { done: DONE_PROJECTS, ongoing: ONGOING_PROJECTS };

export default function ProjectDetails() {
  const { status, slug } = useParams();
  const list = SOURCES[status];
  const project = list?.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/404" replace />;

  const hasBeforeAfter = (project.before?.length || 0) + (project.after?.length || 0) > 0;
  const hasPhotos = project.photos?.length > 0;

  return (
    <>
      <Seo
        title={project.name}
        description={`${project.name} — ${project.location}. ${project.scope || "A Wise Engineering Consultants repair project."}`}
        path={`/projects/${status}/${slug}`}
      />
      <PageHero
        eyebrow={status === "done" ? "Completed Project" : "Project In Progress"}
        title={project.name}
        breadcrumb={[
          { label: "Projects", to: "/projects/done" },
          { label: status === "done" ? "Done Projects" : "On Going Projects", to: `/projects/${status}` },
          { label: project.name },
        ]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center gap-3"
              >
                <StatusBadge status={status} />
                {project.confirmed && (
                  <span className="text-xs font-semibold text-ink-500">Status confirmed in source records</span>
                )}
              </motion.div>

              {(hasBeforeAfter || hasPhotos) && (
                <div className="mt-8">
                  <SectionTitle eyebrow="Photos" title={hasBeforeAfter ? "Before & After" : "Project Photos"} />
                  <div className="mt-6">
                    {hasBeforeAfter ? (
                      <BeforeAfterComparison before={project.before || []} after={project.after || []} />
                    ) : (
                      <ProjectGallery photos={project.photos} />
                    )}
                  </div>
                </div>
              )}

              {!hasBeforeAfter && !hasPhotos && (
                <div className="mt-8 rounded-2xl border border-dashed border-ink-900/15 bg-ink-50/60 p-8 text-center text-sm text-ink-500">
                  No photos are available for this project yet.
                </div>
              )}
            </div>

            <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl bg-ink-900 p-6 text-white">
                <h3 className="card-title text-white">Project Details</h3>
                <dl className="mt-4 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                    <div>
                      <dt className="text-white/45">Location</dt>
                      <dd className="text-white/85">{project.location}</dd>
                    </div>
                  </div>
                  {project.building && (
                    <div className="flex items-start gap-3">
                      <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                      <div>
                        <dt className="text-white/45">Building</dt>
                        <dd className="text-white/85">{project.building}</dd>
                      </div>
                    </div>
                  )}
                  {project.value && (
                    <div className="flex items-start gap-3">
                      <IndianRupee className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                      <div>
                        <dt className="text-white/45">Project Value</dt>
                        <dd className="text-white/85">{project.value}</dd>
                      </div>
                    </div>
                  )}
                </dl>
                {project.scope && (
                  <>
                    <div className="mt-5 h-px bg-white/10" />
                    <div className="mt-5">
                      <dt className="text-xs text-white/45">Scope of Work</dt>
                      <dd className="mt-1.5 text-sm leading-relaxed text-white/85">{project.scope}</dd>
                    </div>
                  </>
                )}
                {status === "ongoing" && typeof project.progress === "number" && (
                  <>
                    <div className="mt-5 h-px bg-white/10" />
                    <div className="mt-5">
                      <div className="flex items-center justify-between text-xs text-white/45">
                        <span>Current Progress</span>
                        <span className="font-bold text-brand-300">{project.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-brand-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection
        title="Have a similar building in mind?"
        description="Send us your building details and we'll scope a plan, timeline and budget within days."
      />
    </>
  );
}

import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import SectionTitle from "../components/ui/SectionTitle";
import ProjectCard from "../components/ProjectCard";
import CTASection from "../components/CTASection";
import { ONGOING_PROJECTS } from "../data/ongoingProjects";

export default function OngoingProjects() {
  return (
    <>
      <Seo
        title="On Going Projects"
        description={`${ONGOING_PROJECTS.length} structural repair projects currently in progress with Wise Engineering Consultants.`}
        path="/projects/ongoing"
      />
      <PageHero
        eyebrow="Currently In Progress"
        title="Projects on site right now."
        description="Active structural repair and PMC projects currently under execution."
        breadcrumb={[{ label: "Projects", to: "/projects/done" }, { label: "On Going Projects" }]}
      />

      <section className="section-pad bg-white">
        <div className="container-page">
          <SectionTitle eyebrow="Our Work" title="Projects currently under repair" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ONGOING_PROJECTS.map((project, i) => (
              <ProjectCard key={project.slug} project={project} status="ongoing" index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want your building on this list?"
        description="Send us your building details and we'll scope a plan, timeline and budget within days."
      />
    </>
  );
}

import Seo from "../components/Seo";
import HomeHero from "../sections/HomeHero";
import HomeIntro from "../sections/HomeIntro";
import HomeServices from "../sections/HomeServices";
import HomeStats from "../sections/HomeStats";
import HomeWhyChooseUs from "../sections/HomeWhyChooseUs";
import HomeIndustries from "../sections/HomeIndustries";
import HomeTimeline from "../sections/HomeTimeline";
import HomeTestimonials from "../sections/HomeTestimonials";
import HomeClients from "../sections/HomeClients";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <>
      <Seo
        title="Structural Audit & PMC Experts in Mumbai"
        description="Wise Engineering Consultants — ISO 9001:2015 certified structural audit and project management consultancy firm with 17+ years serving BMC, TMC, VVCMC, NMMC & MBMC jurisdictions."
        path="/"
      />
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeStats />
      <HomeWhyChooseUs />
      <HomeIndustries />
      <HomeTimeline />
      <HomeTestimonials />
      <HomeClients />
      <CTASection />
    </>
  );
}

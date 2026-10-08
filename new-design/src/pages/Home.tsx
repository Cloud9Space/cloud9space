import { Seo } from "@/components/kit/Seo";
import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Capabilities } from "@/components/sections/Capabilities";
import { Convergence } from "@/components/sections/Convergence";
import { Industries } from "@/components/sections/Industries";
import { ClientSuccess } from "@/components/sections/ClientSuccess";
import { AIDepth } from "@/components/sections/AIDepth";
import { GeoDepth } from "@/components/sections/GeoDepth";
import { Approach } from "@/components/sections/Approach";
import { TechEcosystem } from "@/components/sections/TechEcosystem";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { CompanyLeadership } from "@/components/sections/CompanyLeadership";
import { CareersSection } from "@/components/sections/Careers";
import { FinalCTA } from "@/components/sections/FinalCTA";

const Home = () => (
  <>
    <Seo path="/" />
    <Hero />
    <ClientStrip />
    <WhoWeAre />
    <Capabilities />
    <Convergence />
    <Industries />
    <ClientSuccess />
    <AIDepth />
    <GeoDepth />
    <Approach />
    <TechEcosystem />
    <InsightsSection />
    <CompanyLeadership />
    <CareersSection />
    <FinalCTA />
  </>
);

export default Home;

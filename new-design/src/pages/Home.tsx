import { Seo } from "@/components/kit/Seo";
import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Capabilities } from "@/components/sections/Capabilities";
import { Convergence } from "@/components/sections/Convergence";
import { Industries } from "@/components/sections/Industries";
import { AIDepth } from "@/components/sections/AIDepth";
import { GeoDepth } from "@/components/sections/GeoDepth";
import { Approach } from "@/components/sections/Approach";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { CareersSection } from "@/components/sections/Careers";
import { TeamSection } from "@/components/sections/Team";
import { FinalCTA } from "@/components/sections/FinalCTA";

const Home = () => (
  <>
    <Seo path="/" />
    <Hero />
    {/* <ClientStrip /> */}
    <WhoWeAre />
    <Capabilities />
    <Convergence />
    <Industries />
    <AIDepth />
    <GeoDepth />
    <Approach />
    <TeamSection />
    <InsightsSection />
    <CareersSection />
    <FinalCTA />
  </>
);

export default Home;

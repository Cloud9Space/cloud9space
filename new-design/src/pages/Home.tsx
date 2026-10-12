import { Seo } from "@/components/kit/Seo";
import { Hero } from "@/components/sections/Hero";
import { ClientStrip } from "@/components/sections/ClientStrip";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Capabilities } from "@/components/sections/Capabilities";
import { Convergence } from "@/components/sections/Convergence";
import { AIDepth } from "@/components/sections/AIDepth";
import { GeoDepth } from "@/components/sections/GeoDepth";
import { Approach } from "@/components/sections/Approach";
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
    <AIDepth />
    <GeoDepth />
    <Approach />
    <TeamSection />
    <FinalCTA />
  </>
);

export default Home;

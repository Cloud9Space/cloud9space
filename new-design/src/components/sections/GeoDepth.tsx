import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { GeoLayers } from "@/components/visuals/GeoLayers";
import { Parallax } from "@/components/kit/Parallax";

const geo = [
  ["Satellite imagery", "Multispectral scenes, indices, change detection"],
  ["Remote sensing", "Vegetation, water and land-cover signals"],
  ["Raster analytics", "COG, dynamic tiling, terrain and volumes"],
  ["Vector analytics", "Parcels, boundaries, routes and catchments"],
  ["Spatial databases", "PostGIS, GeoParquet, spatial indexing"],
  ["GeoAI", "Segmentation and classification on imagery"],
  ["Location intelligence", "Outlets, territories and coverage"],
  ["Geospatial dashboards", "Planning and monitoring on a map"],
  ["Large-scale rendering", "Vector tiles, deck.gl, GeoServer"],
  ["Spatial APIs", "Geocoding, distance, hazard-zone checks"],
];

export const GeoDepth = () => (
  <Section labelledBy="geo-title" className="overflow-hidden">
    <SectionHeader
      id="geo-title"
      eyebrow="Geospatial intelligence"
      title="Intelligence, with location as context."
      lead="Geospatial engineering is where Cloud9Space began, and it is what separates us from general AI and software firms. We work with imagery, terrain and vector data at production scale — and connect it to the business systems that act on it."
    />
    <div className="mt-12 grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {geo.map(([name, detail]) => (
            <div key={name} className="border-t border-border pt-3">
              <dt className="text-base font-semibold text-foreground">{name}</dt>
              <dd className="mt-1 text-sm leading-snug text-muted-foreground">{detail}</dd>
            </div>
          ))}
        </dl>
        <Link to="/geospatial" className="link-arrow mt-10">
          Geospatial Intelligence <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
      <Reveal className="lg:col-span-5" delay={120}>
        <div className="tone-ink ink-panel p-6 sm:p-8">
          <Parallax distance={30} className="mx-auto max-w-[460px]">
            <GeoLayers />
          </Parallax>
        </div>
      </Reveal>
    </div>
  </Section>
);

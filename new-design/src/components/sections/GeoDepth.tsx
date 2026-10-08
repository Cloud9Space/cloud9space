import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/kit/Section";
import { Reveal } from "@/components/kit/Reveal";
import { GeoLayers } from "@/components/visuals/GeoLayers";

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
  <Section tone="deep" labelledBy="geo-title" className="overflow-hidden">
    <div aria-hidden className="absolute inset-0 bg-grid bg-grid-fade opacity-50" />
    <div className="relative grid items-center gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <p className="eyebrow mb-4">Geospatial intelligence</p>
          <h2 id="geo-title" className="t-h2">
            Intelligence, with location as context.
          </h2>
          <p className="t-lead mt-5">
            Geospatial engineering is where Cloud9Space began, and it is what separates us from general AI and software
            firms. We work with imagery, terrain and vector data at production scale — and connect it to the business
            systems that act on it.
          </p>
        </Reveal>
        <dl className="mt-10 grid gap-x-6 gap-y-4 sm:grid-cols-2">
          {geo.map(([name, detail]) => (
            <div key={name} className="border-t border-border pt-3">
              <dt className="text-sm font-semibold text-foreground">{name}</dt>
              <dd className="mt-1 text-xs leading-snug text-muted-foreground">{detail}</dd>
            </div>
          ))}
        </dl>
        <Link to="/geospatial" className="link-arrow mt-10">
          Geospatial Intelligence <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
      <Reveal className="lg:col-span-7" delay={120}>
        <GeoLayers />
      </Reveal>
    </div>
  </Section>
);

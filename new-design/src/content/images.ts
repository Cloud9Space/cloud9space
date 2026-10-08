/**
 * Photography for the industry cards. Sources are the original Cloud9Space site assets (/assets),
 * resized to WebP. Keep alt text descriptive of what is actually in the image.
 */
import indAgriculture from "@/assets/images/ind-agriculture.webp";
import indConsumerRetail from "@/assets/images/ind-consumer-retail.webp";
import indFinancial from "@/assets/images/ind-financial-services.webp";
import indRealEstate from "@/assets/images/ind-real-estate.webp";
import indPublicHealth from "@/assets/images/ind-public-health.webp";
import indConsulting from "@/assets/images/ind-technology-consulting.webp";

export type SiteImage = { src: string; alt: string };

export const industryImages: Record<string, SiteImage> = {
  agriculture: { src: indAgriculture, alt: "Farmland with satellite, drone and analytics overlays" },
  "consumer-retail": { src: indConsumerRetail, alt: "Map application showing an outlet catchment radius" },
  "financial-services": { src: indFinancial, alt: "Farm Score dashboard with a farm risk score and field map" },
  "real-estate": { src: indRealEstate, alt: "Aerial view of residential plots with parcel boundaries" },
  "public-health": { src: indPublicHealth, alt: "Satellite basemap used for field microplanning" },
  "technology-consulting": { src: indConsulting, alt: "A team planning with charts and a world map on a table" },
};

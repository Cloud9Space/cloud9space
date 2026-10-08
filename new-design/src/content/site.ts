/**
 * Single source of truth for site content.
 *
 * Rules for editing:
 *  - Never add clients, metrics, certifications or partnerships that are not real and approved.
 *  - Items marked TODO(content) need confirmation or real input from Cloud9Space before launch.
 */

import eyLogo from "@/assets/clients/ey.png";
import kentrixLogo from "@/assets/clients/kentrix.png";
import terraHelixLogo from "@/assets/clients/terra-helix.png";

/* ------------------------------------------------------------------ */
/* Company                                                             */
/* ------------------------------------------------------------------ */

export const company = {
  brand: "Cloud9Space",
  legalName: "Cloud9Space Innovations Private Limited",
  founded: 2023,
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  email: "contact@cloud9space.com",
  phone: "+91 86690 23458",
  phoneHref: "tel:+918669023458",
  address: {
    line1: "201, 2nd Floor, Kodesk, 45 Baner Street, Baner Road",
    line2: "Opposite D-Mart (Adjacent to Manipal Hospital), Baner",
    city: "Pune",
    region: "Maharashtra",
    postalCode: "411045",
    country: "IN",
  },
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Kodesk, 45 Baner Street, Baner Road, Baner, Pune, Maharashtra 411045"),
  social: {
    linkedin: "https://www.linkedin.com/company/cloud9space/",
    instagram: "https://www.instagram.com/cloud9space_/",
  },
  // TODO(content): replace with a dedicated careers inbox or ATS link if one exists.
  careersHref: "mailto:contact@cloud9space.com?subject=Careers%20at%20Cloud9Space",
  jobsHref: "https://www.linkedin.com/company/cloud9space/jobs/",
  formEndpoint: "https://formspree.io/f/mbjnpeeb",
};

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export type CapabilitySlug = "ai" | "data" | "geospatial" | "software" | "cloud";

export type Capability = {
  slug: CapabilitySlug;
  path: string;
  num: string;
  name: string;
  navLabel: string;
  navBlurb: string;
  headline: string;
  summary: string;
  items: string[];
  /** Longer-form blocks for the capability page */
  offerings: { title: string; body: string }[];
  principles: { title: string; body: string }[];
  tech: string[];
  caseIds: string[];
};

export const capabilities: Capability[] = [
  {
    slug: "ai",
    path: "/ai",
    num: "01",
    name: "AI & Intelligent Systems",
    navLabel: "AI & Intelligent Systems",
    navBlurb: "LLM applications, agents, computer vision and MLOps",
    headline: "AI that survives contact with production.",
    summary:
      "We build AI systems that run inside real workflows: retrieval-augmented assistants over enterprise data, agents that call your systems safely, vision models on imagery, and predictive models with the evaluation and monitoring needed to trust them.",
    items: [
      "Generative AI",
      "Machine learning",
      "Computer vision",
      "NLP",
      "AI agents",
      "AI-assisted decision systems",
      "MLOps",
    ],
    offerings: [
      {
        title: "LLM & RAG applications",
        body: "Assistants and search over documents, databases and APIs, with retrieval tuned to your data, grounded answers with citations, and access control that mirrors your source systems.",
      },
      {
        title: "Agentic workflows",
        body: "Multi-step agents that plan, call tools and hand off to people. We design the tool contracts, guardrails and audit trail first, so automation stays observable and reversible.",
      },
      {
        title: "Text-to-SQL & analytics copilots",
        body: "Natural-language access to warehouses and metric layers, constrained by a semantic model so generated queries respect business definitions instead of guessing them.",
      },
      {
        title: "Computer vision & GeoAI",
        body: "Detection, segmentation and classification on photos, drone and satellite imagery — from land-parcel segmentation to vegetation and water detection.",
      },
      {
        title: "Predictive & decision models",
        body: "Classification, forecasting and scoring models embedded in operational systems, with features and labels traced back to governed data.",
      },
      {
        title: "Evaluation & MLOps",
        body: "Offline evaluation sets, regression tests for prompts and models, deployment pipelines, drift and cost monitoring. Models are versioned artefacts, not notebooks.",
      },
    ],
    principles: [
      {
        title: "Data before models",
        body: "Most AI failures are data failures. We check coverage, freshness and quality before choosing a model.",
      },
      {
        title: "Evaluate like software",
        body: "Every AI feature ships with a test set and an acceptance bar agreed with the business, and is re-run on every change.",
      },
      {
        title: "Design for the human in the loop",
        body: "Confidence, provenance and override paths are part of the interface, not an afterthought.",
      },
    ],
    tech: ["Python", "PyTorch", "TensorFlow", "LangChain", "LangGraph", "LLM APIs", "FastAPI", "MLflow-style tracking"],
    caseIds: ["growth-intelligence", "farm-score"],
  },
  {
    slug: "data",
    path: "/data-engineering",
    num: "02",
    name: "Data Engineering & Analytics",
    navLabel: "Data Engineering",
    navBlurb: "Platforms, pipelines, warehouses and data quality",
    headline: "The data foundation everything else depends on.",
    summary:
      "We design and build the pipelines, storage and metric layers that turn scattered operational data into something analysts, applications and AI models can rely on — with quality checks, lineage and cost under control.",
    items: [
      "Data platforms",
      "ETL / ELT",
      "Data lakes",
      "Data warehousing",
      "Real-time pipelines",
      "Analytics",
      "Data quality",
      "AI-ready data architecture",
    ],
    offerings: [
      {
        title: "Platform architecture",
        body: "Lakehouse and warehouse designs on Snowflake, BigQuery, Redshift or Postgres, sized to the workload rather than the vendor brochure.",
      },
      {
        title: "Batch & streaming pipelines",
        body: "Ingestion from operational databases, SaaS systems, files and devices; transformations modelled and tested in code; incremental and real-time where it matters.",
      },
      {
        title: "Metric & semantic layers",
        body: "Business metrics defined once and consumed everywhere — dashboards, APIs and AI assistants — so numbers stop drifting between teams.",
      },
      {
        title: "Data quality & observability",
        body: "Contracts, freshness and volume checks, anomaly alerts and lineage, so issues are caught in the pipeline rather than in a board meeting.",
      },
      {
        title: "Analytics products",
        body: "Decision dashboards and embedded analytics for operations, sales and field teams, built on governed data.",
      },
      {
        title: "AI-ready data",
        body: "Feature tables, document pipelines, embeddings and spatial joins prepared for machine learning and retrieval workloads.",
      },
    ],
    principles: [
      {
        title: "Model the business, not the source",
        body: "Pipelines mirror how the business thinks about customers, outlets, assets and territories.",
      },
      {
        title: "Tests in the pipeline",
        body: "Every transformation is version-controlled and tested; bad data is quarantined, not silently loaded.",
      },
      {
        title: "Cost is a design input",
        body: "Partitioning, file formats and refresh cadence are chosen with the monthly bill in mind.",
      },
    ],
    tech: ["Snowflake", "BigQuery", "Redshift", "PostgreSQL", "dbt", "Apache Iceberg", "DuckDB", "Python"],
    caseIds: ["growth-intelligence", "field-intelligence"],
  },
  {
    slug: "geospatial",
    path: "/geospatial",
    num: "03",
    name: "Geospatial Intelligence",
    navLabel: "Geospatial Intelligence",
    navBlurb: "GIS platforms, remote sensing, GeoAI and spatial APIs",
    headline: "Intelligence, with location as context.",
    summary:
      "Geospatial engineering is where Cloud9Space started. We build GIS platforms, raster and vector processing pipelines, spatial APIs and map applications that handle real-world data volumes — from satellite scenes to millions of field records.",
    items: [
      "GIS platforms",
      "Satellite & remote sensing",
      "Spatial analytics",
      "GeoAI",
      "Location intelligence",
      "Geospatial APIs",
      "Interactive mapping",
      "Raster & vector processing",
    ],
    offerings: [
      {
        title: "Satellite & remote-sensing pipelines",
        body: "Scene ingestion, cloud masking, indices and change detection on multispectral imagery, stored as cloud-optimised GeoTIFFs for fast, partial reads.",
      },
      {
        title: "Raster analytics at scale",
        body: "Dynamic tiling, terrain and elevation analysis, volume computation and zonal statistics without pre-rendering every zoom level.",
      },
      {
        title: "Vector & spatial databases",
        body: "Parcels, boundaries, outlets and routes in PostGIS and GeoParquet, with spatial indexing and joins that hold up at production volume.",
      },
      {
        title: "Geospatial APIs",
        body: "Geocoding, reverse geocoding, distance and catchment calculations, and hazard-zone checks exposed as clean, documented services.",
      },
      {
        title: "Map applications & dashboards",
        body: "Interactive web maps for planning, monitoring and field execution, using Mapbox, deck.gl, Leaflet and GeoServer where each fits best.",
      },
      {
        title: "GeoAI",
        body: "Segmentation and classification models on imagery — land parcels, vegetation, water bodies — feeding back into GIS layers and decision tools.",
      },
    ],
    principles: [
      {
        title: "Cloud-native formats",
        body: "COG, GeoParquet and tiled services so data is read in pieces, not downloaded in bulk.",
      },
      {
        title: "Spatial is a join key",
        body: "Location connects sales, assets, risk and people. We design schemas so that connection is cheap.",
      },
      {
        title: "Built for the field",
        body: "Offline capture, low-bandwidth maps and simple interfaces for people who work outdoors.",
      },
    ],
    tech: ["PostGIS", "GeoServer", "GDAL", "Rasterio", "TiTiler", "Mapbox", "deck.gl", "Leaflet", "GeoParquet", "COG"],
    caseIds: ["microplanning", "terrain-analytics", "field-intelligence"],
  },
  {
    slug: "software",
    path: "/software-engineering",
    num: "04",
    name: "Software & Platform Engineering",
    navLabel: "Software Engineering",
    navBlurb: "Web platforms, APIs, microservices and QA automation",
    headline: "Products and platforms engineered to be operated.",
    summary:
      "We build the applications that put data, AI and maps in front of users: enterprise web platforms, mobile and field apps, APIs and integrations — with automated testing and delivery pipelines from the first sprint.",
    items: [
      "Web applications",
      "Enterprise platforms",
      "API engineering",
      "Microservices",
      "Product engineering",
      "Modernisation",
      "QA automation",
      "DevOps",
    ],
    offerings: [
      {
        title: "Enterprise web platforms",
        body: "Role-based applications for operations, planning and analytics, built with React, Next.js and TypeScript on well-defined APIs.",
      },
      {
        title: "APIs & integration",
        body: "REST services and integrations with CRMs such as Salesforce, ERPs and third-party data providers, with versioning and contract tests.",
      },
      {
        title: "Mobile & field applications",
        body: "Cross-platform apps with offline-first data capture and sync, for teams working away from reliable connectivity.",
      },
      {
        title: "Product engineering",
        body: "Dedicated teams that own a product end-to-end: discovery, design, build, release and iteration alongside your product leads.",
      },
      {
        title: "Modernisation",
        body: "Incremental replacement of spreadsheet-driven processes and legacy applications, without a risky big-bang rewrite.",
      },
      {
        title: "QA automation",
        body: "Unit, integration and end-to-end test suites wired into CI so every release is checked the same way.",
      },
    ],
    principles: [
      {
        title: "Small, accountable teams",
        body: "Engineers who understand the domain, working directly with your product owners.",
      },
      {
        title: "Automate the path to production",
        body: "CI, review and automated tests from week one; manual release steps are treated as defects.",
      },
      {
        title: "Readable over clever",
        body: "Code your own team can maintain after we hand over.",
      },
    ],
    tech: ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI", "Django", "Java", "React Native"],
    caseIds: ["field-intelligence", "growth-intelligence", "microplanning"],
  },
  {
    slug: "cloud",
    path: "/cloud",
    num: "05",
    name: "Cloud Engineering",
    navLabel: "Cloud Engineering",
    navBlurb: "AWS, Azure, GCP, IaC, CI/CD and observability",
    headline: "Cloud infrastructure that is boring in the best way.",
    summary:
      "We design and run cloud environments for data-heavy and spatial workloads on AWS, Azure and Google Cloud — serverless where it simplifies, containers where it doesn't, and infrastructure as code throughout.",
    items: [
      "AWS",
      "Azure",
      "GCP",
      "Cloud-native architecture",
      "CI/CD",
      "Infrastructure automation",
      "Observability",
      "Scalable deployments",
    ],
    offerings: [
      {
        title: "Cloud-native architecture",
        body: "Serverless APIs, managed databases and container platforms chosen per workload, with clear boundaries between services.",
      },
      {
        title: "Infrastructure as code",
        body: "Reproducible environments for development, staging and production; no hand-configured servers.",
      },
      {
        title: "CI/CD",
        body: "Build, test and deployment pipelines with environment promotion, secrets management and rollback.",
      },
      {
        title: "Observability",
        body: "Logs, metrics, traces and alerts that tell you what broke and why, before users do.",
      },
      {
        title: "Spatial & data workloads",
        body: "Tile servers, raster processing and pipeline compute sized for bursty geospatial and analytics jobs.",
      },
      {
        title: "Cost & security posture",
        body: "Least-privilege access, network boundaries and cost monitoring built into the environment from the start.",
      },
    ],
    principles: [
      {
        title: "Managed where possible",
        body: "We prefer managed services that remove operational burden over self-hosted components.",
      },
      {
        title: "Everything in code",
        body: "Infrastructure, pipelines and policies are versioned and reviewed like application code.",
      },
      {
        title: "Measure before scaling",
        body: "Capacity decisions are based on observed load, not guesses.",
      },
    ],
    tech: ["AWS Lambda", "API Gateway", "Amazon RDS", "Azure", "Google Cloud", "Docker", "GitHub Actions"],
    caseIds: ["field-intelligence", "terrain-analytics"],
  },
];

export const capabilityBySlug = Object.fromEntries(capabilities.map((c) => [c.slug, c])) as Record<
  CapabilitySlug,
  Capability
>;

/* ------------------------------------------------------------------ */
/* Client success                                                      */
/* ------------------------------------------------------------------ */

export type CaseStudy = {
  id: string;
  title: string;
  sector: string;
  /** How the client is described publicly. Keep generic unless disclosure is approved. */
  client: string;
  challenge: string;
  solution: string;
  highlights: string[];
  tech: string[];
  architecture: { label: string; nodes: string[] }[];
  capabilities: CapabilitySlug[];
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "field-intelligence",
    title: "Enterprise Field Intelligence Platform",
    sector: "Enterprise · Consulting engagement",
    // TODO(content): confirm whether the client (EY engagement) may be named on this case study.
    client: "Delivered within a Big Four consulting engagement",
    challenge:
      "Field teams needed to capture location-linked operational data in areas with unreliable connectivity, and have it reach the client's CRM and GIS layers without manual re-entry.",
    solution:
      "A serverless platform on AWS: an offline-capable field application syncing through API Gateway to Lambda services, relational storage on Amazon RDS, map layers published through GeoServer, and a bi-directional Salesforce integration.",
    highlights: [
      "Offline-first capture with conflict-safe sync",
      "Serverless API layer — no servers to patch or scale manually",
      "Spatial layers served as standard OGC services",
      "CRM integration so field data lands where sales and operations already work",
    ],
    tech: ["AWS Lambda", "API Gateway", "Amazon RDS", "GeoServer", "Salesforce", "GIS"],
    architecture: [
      { label: "Capture", nodes: ["Field app (offline)", "Web console"] },
      { label: "API", nodes: ["API Gateway", "Lambda services"] },
      { label: "Data", nodes: ["Amazon RDS", "GeoServer layers"] },
      { label: "Systems", nodes: ["Salesforce", "Reporting"] },
    ],
    capabilities: ["software", "cloud", "geospatial"],
    featured: true,
  },
  {
    id: "growth-intelligence",
    title: "Growth Intelligence Platform",
    sector: "Consumer goods · Route-to-market",
    // TODO(content): confirm client naming / disclosure.
    client: "Consumer goods (FMCG) business",
    challenge:
      "Commercial teams were reading general trade, modern trade and quick-commerce performance from separate reports with inconsistent metric definitions, and had no spatial view of outlet coverage or beat execution.",
    solution:
      "A unified analytics product spanning channels — outlet secondary sales, beat and route execution, distributor financial health, pricing and market share — with metrics computed once in an API layer and visualised on interactive maps and dashboards.",
    highlights: [
      "One metric definition, served by the API and reused across every view",
      "Geospatial layers for outlet coverage, territories and beat routes",
      "Channel-specific views for general trade, modern trade and quick commerce",
      "Automated test coverage on the analytics front end",
    ],
    tech: ["Next.js", "React", "TypeScript", "deck.gl", "Mapbox", "ECharts", "TanStack Query"],
    architecture: [
      { label: "Sources", nodes: ["Sales & distributor data", "Channel feeds"] },
      { label: "Metric layer", nodes: ["Governed metric API"] },
      { label: "Experience", nodes: ["Channel dashboards", "Spatial map layers"] },
    ],
    capabilities: ["data", "geospatial", "software", "ai"],
    featured: true,
  },
  {
    id: "microplanning",
    title: "GIS Microplanning for Health Campaigns",
    sector: "Public health · Programme planning",
    client: "Health campaign planning programme",
    challenge:
      "Campaign microplans were assembled in spreadsheets: slow to build, prone to formula and data-entry errors, and blind to geography — population estimates and hard-to-reach areas were not visible on a map.",
    solution:
      "A GIS microplanning platform where planners upload Excel, GeoJSON and shapefile data, configure planning assumptions and rules, analyse the result on a map, and export the finished microplan in the format they need.",
    highlights: [
      "Multi-format ingestion: Excel, GeoJSON, shapefiles",
      "Rule and assumption configuration without code",
      "Map-based review of coverage and resource allocation",
      "Export of finalised microplans",
    ],
    tech: ["React", "Java", "Leaflet", "GeoJSON", "Shapefile", "CI/CD"],
    architecture: [
      { label: "Inputs", nodes: ["Excel", "GeoJSON", "Shapefile"] },
      { label: "Engine", nodes: ["Validation", "Rules & assumptions"] },
      { label: "Output", nodes: ["Map analysis", "Microplan export"] },
    ],
    capabilities: ["geospatial", "software"],
    featured: true,
  },
  {
    id: "terrain-analytics",
    title: "Terrain & Land Analytics for Real Estate",
    sector: "Real estate · Site analysis",
    client: "Real-estate analytics platform",
    challenge:
      "Site teams needed elevation, distance and volume measurements over large raster datasets without waiting on desktop GIS processing or paying to pre-render every tile.",
    solution:
      "A cloud raster service on Google Cloud built on cloud-optimised GeoTIFFs and dynamic tiling, providing volume computation, aerial distance and surface-elevation measurement directly in the browser.",
    highlights: [
      "COG storage for partial, on-demand reads",
      "Dynamic tiling instead of pre-rendered pyramids",
      "Volume, distance and elevation tools on live data",
    ],
    tech: ["Next.js", "Express", "Flask", "FastAPI", "Google Cloud", "COG"],
    architecture: [
      { label: "Storage", nodes: ["COG rasters"] },
      { label: "Services", nodes: ["Tile service", "Analysis API"] },
      { label: "Client", nodes: ["Web map tools"] },
    ],
    capabilities: ["geospatial", "cloud"],
  },
  {
    id: "farm-score",
    title: "Farm Score — Agri Credit & Climate Risk",
    sector: "Agriculture · Financial risk",
    client: "Agritech programme for smallholder farmers",
    challenge:
      "Smallholder and marginal farmers struggle to access fair, timely credit and insurance, and lenders lack reliable signals on farm-level climate risk.",
    solution:
      "An automated scoring and monitoring dashboard combining farm data with geospatial and climate-risk signals — floods, droughts and heatwaves — to support credit and insurance decisions.",
    highlights: [
      "Farm-level risk signals from geospatial data",
      "Exposure to flood, drought and heat events",
      "Designed for lenders and insurers serving smallholders",
    ],
    // TODO(content): add the actual technology stack used on Farm Score.
    tech: ["Remote sensing", "Risk scoring", "Dashboards"],
    architecture: [
      { label: "Signals", nodes: ["Farm data", "Satellite & climate"] },
      { label: "Model", nodes: ["Risk scoring"] },
      { label: "Use", nodes: ["Credit & insurance dashboard"] },
    ],
    capabilities: ["ai", "geospatial", "data"],
  },
];

export const caseById = Object.fromEntries(caseStudies.map((c) => [c.id, c])) as Record<string, CaseStudy>;

/** Long-running relationships that are not written up as case studies. */
export const engagements = [
  {
    name: "Kentrix.ai",
    body: "Repeat partner for geospatial software development on location-intelligence products.",
  },
  {
    name: "Terra Helix",
    body: "Dedicated engineering team working as an extension of the client's own product organisation.",
  },
  {
    name: "MapMyCrop",
    body: "AI and geospatial engineering for an agritech platform.",
  },
];

/* ------------------------------------------------------------------ */
/* Clients (logo strip)                                                */
/* ------------------------------------------------------------------ */

// TODO(content): confirm permission to display each logo publicly.
export const clientLogos = [
  { name: "EY", src: eyLogo, height: 34 },
  { name: "Kentrix.ai", src: kentrixLogo, height: 34 },
  { name: "Terra Helix", src: terraHelixLogo, height: 26 },
];

/** Clients without a usable logo file — rendered as text. */
export const clientNames = ["MapMyCrop"];

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export type Industry = {
  id: string;
  name: string;
  summary: string;
  detail: string;
  work: string[];
  caseIds: string[];
};

export const industries: Industry[] = [
  {
    id: "agriculture",
    name: "Agriculture & Agritech",
    summary: "Crop intelligence, remote sensing and farm-level risk.",
    detail:
      "Satellite-derived crop and vegetation indicators, land-parcel segmentation, water detection and climate-risk scoring for agritech platforms, lenders and insurers.",
    work: ["Farm Score risk platform", "AI & GIS for MapMyCrop"],
    caseIds: ["farm-score"],
  },
  {
    id: "consumer-retail",
    name: "Consumer Goods & Retail",
    summary: "Route-to-market analytics and territory intelligence.",
    detail:
      "Outlet-level sales intelligence, beat and route execution, distributor health and channel analytics across general trade, modern trade and quick commerce — on a map.",
    work: ["Growth Intelligence Platform"],
    caseIds: ["growth-intelligence"],
  },
  {
    id: "financial-services",
    name: "Financial Risk & Lending",
    summary: "Risk signals and data platforms for credit decisions.",
    // TODO(content): extend only with further real financial-services work.
    detail:
      "Data pipelines and scoring systems that bring geospatial and climate signals into credit and insurance workflows, starting with agricultural lending.",
    work: ["Farm Score agri-credit scoring"],
    caseIds: ["farm-score"],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    summary: "Site analysis, terrain and location intelligence.",
    detail:
      "Elevation, volume and distance analysis on large raster datasets, property boundaries and zoning layers for site selection and planning.",
    work: ["Terrain & land analytics platform"],
    caseIds: ["terrain-analytics"],
  },
  {
    id: "public-health",
    name: "Public Health & Development",
    summary: "GIS planning for field programmes.",
    detail:
      "Microplanning tools that replace spreadsheets with map-based planning of population coverage, hard-to-reach areas and resource allocation for health campaigns.",
    work: ["GIS microplanning platform"],
    caseIds: ["microplanning"],
  },
  {
    id: "technology-consulting",
    name: "Technology & Consulting",
    summary: "Specialist AI, data and GIS engineering for firms that deliver.",
    detail:
      "Engineering capacity and specialist geospatial and AI skills for consulting firms and technology companies — as project teams or embedded within their delivery.",
    work: ["Consulting engagement delivery", "Kentrix.ai", "Terra Helix"],
    caseIds: ["field-intelligence"],
  },
];

/* ------------------------------------------------------------------ */
/* Engineering approach                                                */
/* ------------------------------------------------------------------ */

export const approach = [
  {
    num: "01",
    title: "Discover",
    body: "Understand the business objective, the users, the data that exists and the constraints that matter.",
    output: "Problem statement · data audit",
  },
  {
    num: "02",
    title: "Architect",
    body: "Design the system: data flows, services, models, spatial layers and the cloud footprint.",
    output: "Architecture · delivery plan",
  },
  {
    num: "03",
    title: "Engineer",
    body: "Build software, pipelines, models and maps in short, demonstrable increments.",
    output: "Working increments",
  },
  {
    num: "04",
    title: "Validate",
    body: "Automated tests, model evaluation, security review and performance checks against agreed criteria.",
    output: "Test & evaluation reports",
  },
  {
    num: "05",
    title: "Deploy",
    body: "Infrastructure as code, CI/CD, monitoring and runbooks for a production-ready release.",
    output: "Production release",
  },
  {
    num: "06",
    title: "Scale",
    body: "Optimise cost and performance, extend features, and support the system in operation.",
    output: "Roadmap · support",
  },
];

export const engagementModels = [
  {
    title: "Outcome-based projects",
    body: "A defined problem, an agreed architecture and a team accountable for delivering it to production.",
  },
  {
    title: "Dedicated engineering teams",
    body: "A cross-functional team that works as part of your product organisation, with Cloud9Space handling hiring and continuity.",
  },
  {
    title: "Specialist augmentation",
    body: "Geospatial, data or AI engineers added to an existing team where a specific skill is missing.",
  },
];

/* ------------------------------------------------------------------ */
/* Technology ecosystem                                                */
/* ------------------------------------------------------------------ */

// TODO(content): prune anything the team does not actively use.
export const techLayers = [
  { layer: "Experience", items: ["React", "Next.js", "TypeScript", "React Native"] },
  { layer: "Services", items: ["Python", "FastAPI", "Django", "Node.js", "Java"] },
  { layer: "AI / ML", items: ["PyTorch", "TensorFlow", "LangChain", "LangGraph", "LLMs"] },
  { layer: "Data", items: ["PostgreSQL", "Snowflake", "dbt", "Apache Iceberg", "DuckDB"] },
  { layer: "Geospatial", items: ["PostGIS", "GeoServer", "GDAL", "Rasterio", "TiTiler", "GeoParquet", "Mapbox", "deck.gl"] },
  { layer: "Cloud & DevOps", items: ["AWS", "Azure", "Google Cloud", "Docker", "GitHub Actions"] },
];

/* ------------------------------------------------------------------ */
/* Insights                                                            */
/* ------------------------------------------------------------------ */

export const insightCategories = ["AI", "Data", "Geospatial", "Engineering", "Cloud"] as const;

export type Insight = {
  title: string;
  category: (typeof insightCategories)[number];
  summary: string;
  href: string;
  date: string; // ISO
  readMinutes?: number;
};

// TODO(content): add published articles only. The section shows an honest empty state until then.
export const insights: Insight[] = [];

/* ------------------------------------------------------------------ */
/* Credentials                                                         */
/* ------------------------------------------------------------------ */

export type Credential = { name: string; detail: string };

// TODO(content): add only registrations / programmes that are real and current
// (e.g. DPIIT recognition, Udyam, NVIDIA Inception, cloud partner status). Section is hidden while empty.
export const credentials: Credential[] = [];

/* ------------------------------------------------------------------ */
/* Leadership                                                          */
/* ------------------------------------------------------------------ */

export const leadership = [
  {
    name: "Shubham Shewdikar",
    role: "Founder & CEO",
    initials: "SS",
    // TODO(content): replace with an approved bio (background, prior experience, focus areas).
    bio: "Shubham founded Cloud9Space in 2023 and leads the company's technology direction and client engagements. His focus is the intersection of geospatial engineering, data platforms and applied AI — and making sure what the team builds holds up in production.",
    linkedin: "",
  },
];

/* ------------------------------------------------------------------ */
/* Careers                                                             */
/* ------------------------------------------------------------------ */

export const careerTracks = [
  { name: "AI / ML Engineering", body: "LLM applications, retrieval, evaluation, vision models and MLOps." },
  { name: "Software Engineering", body: "React, TypeScript, Python and Node.js services, APIs and integrations." },
  { name: "Data Engineering", body: "Pipelines, warehouses, metric layers and data quality." },
  { name: "GIS Engineering", body: "PostGIS, raster processing, tile services and web mapping." },
  { name: "Cloud & DevOps", body: "AWS, Azure and GCP environments, IaC, CI/CD and observability." },
  { name: "Quality Engineering", body: "Test automation across web, API and data systems." },
];

export const careerPrinciples = [
  {
    title: "Real systems, real users",
    body: "Work ships to production and is used by field teams, analysts and planners.",
  },
  {
    title: "Cross-discipline by default",
    body: "AI, data, GIS and software engineers work on the same problems, so you learn across the stack.",
  },
  {
    title: "Ownership over ceremony",
    body: "Small teams, direct client contact and room to make engineering decisions.",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const footerNav = {
  "What We Do": capabilities.map((c) => ({ label: c.navLabel, href: c.path })),
  Industries: industries.map((i) => ({ label: i.name, href: `/industries#${i.id}` })),
  Company: [
    { label: "About", href: "/about" },
    { label: "Client Success", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

// src/data/siteContent.ts

export type NavItem = {
  id: string;
  label: string;
};

export type Service = {
  id: string;           // internal id / anchor if needed
  slug: string;         // URL-friendly path piece
  title: string;
  description: string;
  longDescription: string;
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export const services: Service[] = [
  {
    id: "network-consulting",
    slug: "network-consulting",
    title: "Network Consulting",
    description:
      "Expert planning, design, and optimization of high-capacity, multi-vendor networks for carriers and service providers.",
    longDescription:
      "Who We Partner With: Leading carriers, mobile network operators, and service providers.\n\nCore Expertise: Expertly plan, design, and optimize high-capacity, multi-vendor networks that power today’s demanding digital ecosystems.\n\nNetwork Scope: From fiber-optic access layers through transport, aggregation, and core infrastructure including evolving packet and optical technologies.\n\nArchitecture Approach: Deliver fully vendor-neutral architectures that avoid vendor lock-in, promote seamless interoperability, and leverage solutions from multiple suppliers.\n\nComprehensive Services include detailed capacity planning and traffic forecasting for efficient resource allocation and scalability; robust migration strategies covering equipment swaps, technology upgrades, legacy-to-modern core evolutions, and multi-vendor integrations; and advanced optimization techniques such as AI-driven performance tuning, automation to reduce OPEX, and resilience enhancements against outages or supply chain challenges.\n\nKey Benefits Delivered: Minimize risk, service disruption, and operational complexity.\n\nEnd Result: Empower you to build agile, high-performance networks that remain scalable, resilient, cost-effective, and fully prepared for surging data demands, emerging technologies, and evolving market opportunities.",
  },

  {
    id: "network-application-consulting",
    slug: "network-application-consulting",
    title: "Network Applications Consulting",
    description:
      "Advanced network management and orchestration (MANO) consulting for automated, efficient telecom operations.",
    longDescription:
      "We support carriers, mobile operators, and service providers in selecting, integrating, and extending advanced network management and orchestration applications.\n\nFocus Areas & Platforms include OSS/BSS tools, service orchestrators, intent-based automation systems, domain orchestrators, and multi-domain management solutions.\n\nCore Value Proposition: Ensure seamless interoperability across complex multi-vendor, multi-technology environments, delivering platforms aligned with real-world network behavior.\n\nCollaboration & Gap-Bridging: Work hand-in-hand with operations, engineering, and IT teams to translate workflows, topologies, and constraints into precise software requirements. Deliver custom configurations, integrations, and extensions that eliminate manual workarounds.\n\nKey Outcomes Delivered: Reduced operational silos, faster service activation, fewer configuration errors, greater automation coverage, and stronger alignment between business intent and execution.\n\nBusiness & Operational Benefits: Enables faster innovation, lower OPEX, and more reliable service delivery within evolving telecom infrastructures.",
  },

  {
    id: "network-modernization",
    slug: "network-modernization-transformation",
    title: "Network Modernization & Transformation",
    description:
      "Comprehensive modernization from legacy platforms to agile, API-driven, automated network architectures.",
    longDescription:
      "We guide carriers, mobile operators, and service providers through full lifecycle modernization and digital transformation.\n\nInventory Cleanup & Discovery: Detailed audits of assets, dependencies, configurations, and data to eliminate redundancies and establish a clean migration baseline.\n\nStrategic Migration Roadmaps: Phased, risk-prioritized plans including hybrid transitions, cloud-native integration, and parallel running strategies.\n\nCutover Planning & Execution: Low-disruption cutover windows with rollback procedures, monitoring, simulations, and coordinated change management.\n\nGovernance & Health Management: Policy enforcement, performance monitoring, compliance controls, and continuous improvement frameworks.\n\nResult: Minimized technical debt, accelerated time-to-value, reduced OPEX through automation, enhanced service reliability, and long-term competitive advantage.",
  },

  {
    id: "operations-modernization",
    slug: "operations-modernization",
    title: "Operations Modernization",
    description:
      "Transform manual, siloed operations into automated, software-driven telecom delivery models.",
    longDescription:
      "We modernize telecom operations by shifting from manual processes to efficient, automated models.\n\nAssessment: Evaluate workflows, SLAs, KPIs, tooling, bottlenecks, and legacy dependencies.\n\nAutomation & Friction Reduction: Implement AI/ML-driven predictive analytics, anomaly detection, and automation in monitoring, alerting, and reporting.\n\nCore Process Alignment: Enhance incident management with AIOps automation and reduced MTTR; modernize change management using CI/CD pipelines, templates, rollback mechanisms, and compliance controls; improve configuration management with accurate CMDB integration.\n\nPeople, Process & Platform Alignment: Integrate ServiceNow, OSS orchestration tools, and observability stacks while fostering DevOps/DevSecOps collaboration.\n\nOutcomes: Reduced friction, improved SLA compliance, lower OPEX, faster resolution times, and scalable operational foundations.",
  },

  {
    id: "oss-bss-consulting",
    slug: "oss-bss-consulting",
    title: "OSS/BSS Consulting",
    description:
      "Assessment and modernization of OSS/BSS ecosystems for scalable, modular telecom architectures.",
    longDescription:
      "We assess your OSS/BSS landscape and guide evolution toward efficient target-state architectures.\n\nAssessment: Audit OSS (inventory, assurance, provisioning) and BSS (CRM, billing, product catalog, order management) systems, identifying silos, integration gaps, and scalability limits.\n\nTarget-State Design: Define modular, vendor-neutral architectures enabling rapid product launch, improved data governance, standards-based API integration, and multi-cloud readiness.\n\nIncremental Transformation: Phased roadmaps prioritizing quick wins such as API enablement, data cleansing pilots, and selective upgrades rather than disruptive rewrites.\n\nOutcomes: Higher data integrity, streamlined integrations, faster service activation, lower long-term OPEX, and improved revenue opportunities.",
  },

  {
    id: "resource-management",
    slug: "resource-management",
    title: "Resource Management",
    description:
      "Flexible, scalable telecom talent solutions aligned to your project timelines and budgets.",
    longDescription:
      "We provide scalable, on-demand talent solutions for carriers and service providers.\n\nResourcing Models: Embedded team support, full program leadership, and targeted short-term expertise.\n\nBenefits: Access specialized telecom skills including automation, OSS/BSS integration, cloud-native architectures, and multi-vendor design; scale up or down rapidly; reduce recruitment overhead; ensure continuity and accelerated delivery.\n\nOverall Value Delivered: Execute initiatives efficiently, maintain momentum on strategic priorities, and achieve faster time-to-value in dynamic telecom environments.",
  },

  {
    id: "network-deployment",
    slug: "network-deployment",
    title: "Network Deployment",
    description:
      "End-to-end network deployment from greenfield builds to fiber characterization and full lifecycle rollout.",
    longDescription:
      "We deliver comprehensive network deployment services across wireless, fiber, fixed, and converged infrastructures.\n\nEngineering & Design: Site surveys, feasibility studies, coverage modeling, regulatory compliance, and scalable blueprints.\n\nLong Haul Fiber Deployment & Characterization: High-capacity terrestrial and subsea fiber routes; route optimization; installation (aerial, underground, submarine); OTDR testing, insertion/return loss, dispersion analysis, PMD/PDL testing; certification for 400G/800G+ transmission.\n\nInstallation & Implementation: Hardware installation for base stations, antennas, RRUs, small cells, microwave, routing/switching; structured cabling and power integration.\n\nConfiguration & Commissioning: End-to-end testing, signal validation, performance benchmarking, staged cutovers, rollback planning.\n\nProject Management: Scheduling, risk management, transparent reporting, acceptance testing, post-deployment support.\n\nOutcomes: Accelerated time-to-market, reduced deployment risk, reliable high-performance networks, scalable infrastructure ready for future demand growth.",
  },
];


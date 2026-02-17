import NetworkConsultingImg from "../assets/NetworkConsulting.png";
import NetworkApplicationConsultingImg from "../assets/NetworkApplicationConsulting.png";
import NetworkModernizationImg from "../assets/NetworkModernization.png";
import OperationsModernizationImg from "../assets/OperationsModernization.png";
import OSSBSSConsultingImg from "../assets/OSSBSSConsulting.png";
import ResourceManagementImg from "../assets/ResourceManagement.png";
import NetworkConsultingBannerImage from "../assets/NetworkConsultingBanner.png";
import NetworkApplicationConsultingBannerImage from "../assets/NetworkApplicationConsultingBanner.png";
import NetworkModernizationBannerImage from "../assets/NetworkModernizationBanner.png";
import OperationsModernizationBannerImage from "../assets/OperationsModernizationBanner.png";
import OSSBSSConsultingBannerImage from "../assets/OSSBSSConsultingBanner.png";
import ResourceManagementBannerImage from "../assets/ResourceManagementBanner.png";
import NetWorkDeploymentBanner from "../assets/NetworkDeploymentBanner.png";


export type NavItem = {
  id: string;
  label: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;         // 🔵 added image field
  bannerImage: string; // 🔵 optional banner image field
  about: string;
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "blog", label: "Blog" },
  { id: "careers", label: "Careers" },

];

export const services: Service[] = [
{
  id: "network-consulting",
  slug: "network-consulting",
  title: "Network Consulting",
  description:
    "Expert planning, design, and optimization of high-capacity, multi-vendor networks for carriers, mobile operators, and service providers.",
  about:
    "We partner with leading carriers, mobile network operators, and service providers to design scalable, resilient, and vendor-neutral architectures that power today’s demanding digital ecosystems.",
  longDescription: `
## Who We Partner With
- Leading carriers, mobile network operators, and service providers.

## Core Expertise
- Expertly plan, design, and optimize **high-capacity, multi-vendor networks** that power today’s demanding digital ecosystems.

## Network Scope
- From fiber-optic access layers through transport, aggregation, and core infrastructure — including evolving packet and optical technologies.

## Architecture Approach
- Deliver fully **vendor-neutral architectures** that:

- Avoid vendor lock-in  
- Promote seamless interoperability  
- Leverage solutions from multiple suppliers  

## Comprehensive Services

### Capacity & Scalability
- Detailed capacity planning  
- Traffic forecasting  
- Efficient resource allocation  

### Migration & Integration
- Equipment swaps  
- Technology upgrades  
- Legacy-to-modern core evolutions  
- Multi-vendor integrations  

### Advanced Optimization
- AI-driven performance tuning  
- Automation to reduce OPEX  
- Resilience enhancements against outages and supply chain challenges  

## Key Benefits Delivered
- Minimized risk  
- Reduced service disruption  
- Lower operational complexity  

## End Result
Empowers you to build agile, high-performance networks that remain:

- Scalable  
- Resilient  
- Cost-effective  
- Fully prepared for surging data demands and emerging technologies  
`,
  image: NetworkConsultingImg,
  bannerImage: NetworkConsultingBannerImage,
},
{
  id: "network-application-consulting",
  slug: "network-application-consulting",
  title: "Network Applications Consulting",
  description:
    "Advanced network management and orchestration consulting for automated, efficient telecom operations.",
  about:
    "We support carriers, mobile operators, and service providers in selecting, integrating, and extending advanced network management and orchestration (MANO) platforms.",
  longDescription: `
## Specialized Network Application Consulting
Our expert team supports carriers, mobile operators, and service providers in selecting, integrating, and extending advanced **network management and orchestration (MANO)** applications to enable efficient, automated operations.

## Focus Areas & Platforms
- OSS/BSS tools  
- Service orchestrators  
- Intent-based automation systems  
- Domain orchestrators  
- Multi-domain management solutions  

## Core Value Proposition
We ensure seamless interoperability across complex multi-vendor, multi-technology environments — delivering platforms that truly align with your network’s real-world behavior.

## Collaboration & Gap-Bridging
- Work hand-in-hand with your operations, engineering, and IT teams  
- Translate actual workflows, topologies, constraints, and behaviors into precise software requirements  
- Deliver custom configurations, integrations, and extensions  
- Eliminate awkward workarounds and manual processes by making tooling accurately reflect how the network actually runs  

## Key Outcomes Delivered
- Reduced operational silos  
- Faster service activation  
- Fewer configuration errors  
- Greater automation coverage  
- Stronger alignment between business intent and network execution  

## Business & Operational Benefits
Enables faster innovation, lower OPEX, and more reliable service delivery within today’s complex and continuously evolving telecom infrastructures.
`,
  image: NetworkApplicationConsultingImg,
  bannerImage: NetworkApplicationConsultingBannerImage,
},

{
  id: "network-modernization",
  slug: "network-modernization-transformation",
  title: "Network Modernization & Transformation",
  description:
    "Comprehensive modernization from rigid legacy platforms to agile, automated, API-driven architectures.",
  about:
    "We guide carriers and service providers through full lifecycle network modernization and digital transformation with structured, low-risk execution.",
  longDescription: `
## Network Modernization & Digital Transformation
We guide carriers, mobile operators, and service providers through comprehensive network modernization and digital transformation — transitioning from rigid legacy platforms to agile, automated, API-driven architectures that unlock scalability, innovation, and operational efficiency.

## Our Structured Approach

### Thorough Inventory Cleanup & Discovery
- Conduct detailed audits of existing assets, dependencies, configurations, and data  
- Eliminate redundancies and resolve inconsistencies  
- Establish a clean, accurate baseline for migration  

### Strategic Migration Roadmaps
- Develop phased, risk-prioritized plans aligned to business priorities  
- Define technology sequencing and parallel running strategies  
- Support hybrid transitions and integration of modern cloud-native or software-defined components  

### Precise Cutover Planning & Execution
- Design low-disruption cutover windows  
- Build detailed checklists and rollback procedures  
- Use real-time monitoring and dry-run simulations  
- Coordinate change management to ensure minimal service impact  

### Ongoing Governance & Health Management
- Establish policy enforcement and compliance controls  
- Implement performance monitoring and change governance  
- Maintain continuous improvement processes for long-term health, security, and adaptability  

## Business Impact
This end-to-end expertise minimizes technical debt, accelerates time-to-value, reduces OPEX through automation, enhances service reliability, and positions your network for sustained growth and competitive advantage.
`,
  image: NetworkModernizationImg,
  bannerImage: NetworkModernizationBannerImage,
},

{
  id: "operations-modernization",
  slug: "operations-modernization",
  title: "Operations Modernization",
  description:
    "Transform manual, siloed operations into automated, software-driven delivery models.",
  about:
    "We modernize telecom operations by aligning people, process, and platforms to support agile, high-performance networks.",
  longDescription: `
## Expert Operations Modernization Consulting
We partner with carriers, mobile operators, and service providers to modernize operations — shifting from manual, siloed processes to efficient, automated, software-driven models that support agile, high-performance networks.

## In-Depth Analysis & Assessment
- Thoroughly evaluate operational processes, workflows, SLAs, KPIs, and existing tooling  
- Identify friction, bottlenecks, manual interventions, error-prone steps, and legacy dependencies  
- Benchmark against industry standards to highlight gaps and opportunities  

## Targeted Friction Reduction & Automation
- Eliminate redundant manual work through process re-engineering and intelligent automation  
- Implement AI/ML-driven tools for predictive analytics, anomaly detection, and proactive issue resolution  
- Automate repetitive tasks in monitoring, alerting, triage, and reporting to reduce human error and accelerate response times  

## Core Process Alignment
### Incident Management
- Streamline detection, triage, correlation, root-cause analysis, and resolution  
- Use AIOps-enabled automation, automated runbooks, and reduced MTTR  

### Change Management
- Adopt risk-based, automated change enablement  
- Implement CI/CD pipelines, pre-approved templates, impact simulation, rollback mechanisms, and compliance controls  

### Problem & Configuration Management
- Enhance root-cause elimination  
- Maintain accurate, dynamic CMDBs integrated across domains  

## Alignment of People, Process & Platforms
- Foster cross-functional collaboration between operations, engineering, DevOps, and business teams  
- Integrate modern platforms (e.g., ServiceNow, OSS orchestration tools, observability stacks) for end-to-end visibility and closed-loop automation  
- Promote a shift toward shared telemetry, accountability, DevOps/DevSecOps practices, and continuous improvement  

## Key Outcomes & Benefits Delivered
- Significantly reduced operational friction and manual effort  
- Improved SLA compliance, service reliability, and customer experience  
- Lower OPEX through automation and efficiency gains  
- Faster incident resolution, fewer escalations, and proactive operations  
- Scalable foundation for software-driven networks enabling rapid innovation  
`,
  image: OperationsModernizationImg,
  bannerImage: OperationsModernizationBannerImage,
},

{
  id: "oss-bss-consulting",
  slug: "oss-bss-consulting",
  title: "OSS/BSS Consulting",
  description:
    "Modernize and optimize OSS/BSS ecosystems with scalable, modular target-state architectures.",
  about:
    "We assess your OSS/BSS landscape and guide incremental, value-driven transformation without disrupting business continuity.",
  longDescription: `
## OSS/BSS Consulting Services
We partner with carriers, mobile operators, and service providers to assess your current OSS/BSS landscape and guide the evolution toward modern, efficient target-state architectures.

## Comprehensive Landscape Assessment
- Conduct audits of OSS (inventory, fault/performance management, provisioning, assurance) and BSS (CRM, billing, product catalog, order management, revenue assurance) systems  
- Identify pain points: data silos, legacy constraints, integration gaps, scalability limitations, and manual processes  
- Evaluate alignment with business goals and emerging requirements for automation, cloud readiness, and real-time capabilities  

## Target-State Architecture Design
Define scalable, modular architectures that enable:
- Rapid launch of new products and services  
- Improved data quality, accuracy, and governance across domains  
- Cleaner, standards-based integration patterns (APIs, microservices, event-driven flows) for reduced complexity and faster time-to-market  

We prioritize vendor-neutral, composable designs to avoid lock-in and support hybrid/multi-cloud environments.

## Practical, Incremental Transformation Approach
- Emphasize low-risk, value-driven steps over disruptive rewrites  
- Develop phased roadmaps with quick wins (data cleansing pilots, targeted API enablement, modular upgrades, selective orchestration)  
- Focus on measurable improvements in efficiency, reduced technical debt, better SLA compliance, and enhanced revenue opportunities  

## Key Outcomes & Benefits Delivered
- Higher data integrity and single source of truth for analytics and decision-making  
- Streamlined integrations that accelerate activation and reduce errors  
- Faster innovation cycles while maintaining business continuity  
- Lower long-term OPEX through automation readiness and scalable operations  
`,
  image: OSSBSSConsultingImg,
  bannerImage: OSSBSSConsultingBannerImage,
},

{
  id: "resource-management",
  slug: "resource-management",
  title: "Resource Management",
  description:
    "Flexible, scalable telecom talent solutions aligned to project timelines and budgets.",
  about:
    "We provide on-demand access to specialized telecom expertise without the overhead of permanent hires.",
  longDescription: `
## Flexible Resource Management Services
We partner with carriers, mobile operators, and service providers to deliver scalable, on-demand talent solutions that match your project needs, timelines, and budget — without the overhead of permanent hires.

## Our Resourcing Models

### Embedded Team Support
- Integrate skilled professionals directly into your teams  
- Ideal for capacity boosts, skill gaps, or ongoing operations  
- Enables knowledge transfer and seamless day-to-day collaboration  

### Program Leadership
- End-to-end leadership for large-scale initiatives  
- Program management, governance, and cross-functional coordination  
- Ideal for complex transformations, migrations, and modernizations  

### Targeted Expertise
- Short-term or milestone-based specialists for critical initiatives  
- Architecture reviews, proof-of-concepts, optimization, or high-priority troubleshooting  

## Key Benefits of Our Approach
- Access specialized telecom skills exactly when and where needed  
- Scale resources up or down quickly based on project phases and demand  
- Reduce recruitment time, onboarding delays, and long-term hiring commitments  
- Ensure continuity and minimize disruption with experienced delivery talent  
- Maintain flexibility while controlling costs — pay only for the expertise utilized  

## Overall Value Delivered
Enables you to execute initiatives efficiently, maintain momentum on strategic priorities, and achieve faster time-to-value in dynamic telecom environments.
`,
  image: ResourceManagementImg,
  bannerImage: ResourceManagementBannerImage,
},

{
  id: "network-deployment",
  slug: "network-deployment",
  title: "Network Deployment",
  description:
    "End-to-end network deployment services from greenfield builds to long-haul fiber characterization and full lifecycle rollout.",
  about:
    "We partner with carriers, mobile network operators, and service providers to deliver complete deployment execution—from engineering design through installation, integration, commissioning, and operational handoff.",
  longDescription: `
## Comprehensive Network Deployment Services
We partner with carriers, mobile network operators, and service providers to deliver end-to-end network deployment — from greenfield builds and expansions to technology upgrades — ensuring rapid, reliable rollout of high-performance connectivity across wireless, fiber, fixed, and converged infrastructures.

## Engineering & Design Phase
- Conduct detailed site surveys and feasibility studies  
- Perform coverage modeling and capacity analysis  
- Develop optimized, future-ready blueprints including power/backhaul planning and regulatory compliance  
- Support hybrid/multi-vendor environments with scalability, energy efficiency, and interoperability  

## Long Haul Fiber Deployment & Characterization
- Design and deploy high-capacity long-haul fiber optic routes (terrestrial and subsea)  
- Route planning, fiber path optimization, and redundancy strategies for reach and resilience  
- Execute installation: aerial, underground, duct, direct-buried, and submarine cable laying  
- Conduct comprehensive fiber characterization and acceptance testing:  
  - OTDR testing for loss, reflectance, and event detection  
  - End-to-end insertion loss, return loss, and chromatic dispersion measurements  
  - PMD and PDL analysis  
  - Bi-directional testing and splice verification to ITU-T and industry standards  
- Deliver detailed characterization reports, as-built documentation, and certification for high-speed coherent transmission (400G/800G+) and low-latency applications  

## Installation & Implementation
- Hardware installation for base stations, antennas, RRUs, small cells, fiber cabling, microwave links, and switching/routing equipment  
- Structured cabling, splicing, termination, labeling, and power integration (indoor/outdoor)  
- Coordinate multi-crew field operations with safety protocols, quality checkpoints, and real-time documentation  

## Configuration, Integration & Commissioning
- Configure network elements and integrate with OSS/BSS and core systems  
- End-to-end testing: turn-up, signal validation, handover verification, and performance benchmarking  
- Activate services with minimal disruption using staged cutovers and rollback planning  

## Project Management & Delivery Excellence
- Full lifecycle oversight: scheduling, resource allocation, risk management, and stakeholder reporting  
- Transparent progress tracking, change control, and acceptance testing  
- Post-deployment support, optimization, operations handover, and as-built documentation  

## Key Outcomes & Benefits
- Accelerated time-to-market for new coverage, capacity, or services  
- Reduced deployment risks, costs, and operational disruptions  
- High-quality, reliable networks with maximized uptime and performance  
- Scalable infrastructure ready for evolving demands in competitive telecom landscapes  
`,
  image: NetWorkDeploymentBanner, // 🔵 Placeholder image (swap later)
  bannerImage: NetWorkDeploymentBanner, // 🔵 Placeholder banner image (swap later)
},


];



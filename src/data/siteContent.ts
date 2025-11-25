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
      "High capacity multi-vendor carrier and service provider networks are our specialty.",
    longDescription:
      "We work with carriers and service providers to plan, design, and optimize high-capacity multi-vendor networks. From access to core, we provide vendor-neutral architecture, capacity planning, and migration strategies that keep you scalable, resilient, and ready for what’s next.",
    image: NetworkConsultingImg,
    bannerImage: NetworkConsultingBannerImage,
  },
  {
    id: "network-application-consulting",
    slug: "network-application-consulting",
    title: "Network Application Consulting",
    description:
      "We support the management of complex infrastructures with software.",
    longDescription:
      "Our team helps you select, integrate, and extend network management and orchestration applications. We bridge the gap between operations teams and software platforms so your tooling actually reflects how your network runs in the real world.",
    image: NetworkApplicationConsultingImg,
    bannerImage: NetworkApplicationConsultingBannerImage,
  },
  {
    id: "network-modernization",
    slug: "network-modernization-transformation",
    title: "Network Modernization & Transformation",
    description:
      "Growing and/or maintaining outdated technology is inefficient and lacks open APIs and common data models.",
    longDescription:
      "We guide you through the transformation from legacy platforms to modern, automated, API-driven networks. That includes inventory cleanup, migration roadmaps, cutover planning, and the governance required to keep the environment healthy over time.",
    image: NetworkModernizationImg,
    bannerImage: NetworkModernizationBannerImage,
  },
  {
    id: "operations-modernization",
    slug: "operations-modernization",
    title: "Operations Modernization",
    description:
      "We specialize in operations optimization and help with the adoption of new technologies while reducing complexity.",
    longDescription:
      "We analyze your current operational processes, SLAs, and tooling to reduce friction and manual work. From incident handling to change management, we align people, process, and platforms to support modern, software-driven networks.",
    image: OperationsModernizationImg,
    bannerImage: OperationsModernizationBannerImage,
  },
  {
    id: "oss-bss-consulting",
    slug: "oss-bss-consulting",
    title: "OSS/BSS Consulting",
    description:
      "Evaluation of the OSS/BSS ecosystem is often needed in order to optimize or create new solutions when migrating.",
    longDescription:
      "We assess your OSS/BSS landscape and help design target-state architectures that support new products, better data quality, and cleaner integration patterns. We focus on practical steps that incrementally improve operations rather than massive rewrites.",
    image: OSSBSSConsultingImg,
    bannerImage: OSSBSSConsultingBannerImage,
  },
  {
    id: "resource-management",
    slug: "resource-management",
    title: "Resource Management",
    description:
      "We provide the resources and expertise to deliver projects on time and within budget.",
    longDescription:
      "From specialized architects to delivery teams, we provide flexible resourcing models that give you the skills you need when you need them. We can embed with your teams, lead full programs, or provide targeted expertise for critical initiatives.",
    image: ResourceManagementImg,
    bannerImage: ResourceManagementBannerImage,
  },
];

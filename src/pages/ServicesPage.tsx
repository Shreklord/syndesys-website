// src/pages/ServicesPage.tsx
import type { Service } from "../data/siteContent";
import { ServicesSection } from "../components/sections/ServicesSection";
import { ServiceDetailsSection } from "../components/sections/ServiceDetailsSection";

interface ServicesPageProps {
  services: Service[];
}

export function ServicesPage({ services }: ServicesPageProps) {
  return (
    <>
      {/* Top grid summary */}
      <ServicesSection services={services} />

      {/* Detailed sections for each service */}
      <ServiceDetailsSection services={services} />
    </>
  );
}

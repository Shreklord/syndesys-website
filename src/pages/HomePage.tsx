// src/pages/HomePage.tsx
import type { Service } from "../data/siteContent";
import { HomeSection } from "../components/sections/HomeSection";
import { ServicesSection } from "../components/sections/ServicesSection";
import { AboutSection } from "../components/sections/AboutSection";
import { ContactSection } from "../components/sections/ContactSection";

interface HomePageProps {
  services: Service[];
}

export function HomePage({ services }: HomePageProps) {
  return (
    <>
      <HomeSection />
      <ServicesSection services={services} />
      <AboutSection />
      <ContactSection />
    </>
  );
}

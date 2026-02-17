import { Link } from "react-router-dom";
import type { Service } from "../../data/siteContent";
import { useFadeInOnScroll } from "../../hooks/fadeInOnScroll";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const { ref, visible } = useFadeInOnScroll();

  return (
    <section
      id="services"
      ref={ref}
      className={`
        mx-auto max-w-6xl px-4 py-24 scroll-mt-28
        transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300 mb-2">
        Services
      </p>

      {/* Orange accent line */}
      <div className="h-1 w-24 bg-orange-500 rounded-full mb-6"></div>

      <h2 className="text-2xl md:text-3xl font-semibold mb-3">
        We Just Make it Easy
      </h2>

      <p className="text-slate-300 mb-10 max-w-3xl">
        Take advantage of our unique blend of offerings, experience and passion
        to influence your growth.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((svc, index) => (
          <div
            key={svc.id}
            className={`
              rounded-2xl border border-slate-800 bg-slate-900/60 p-5
              flex flex-col
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:border-orange-500/60 hover:shadow-orange-500/20 hover:bg-slate-900
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            style={{
              transitionDelay: visible ? `${index * 120}ms` : "0ms",
            }}
          >
            {/* IMAGE */}
            <div className="w-full mb-4">
              <img
                src={svc.image}
                alt={svc.title}
                className="
                  w-full h-40 object-cover rounded-xl shadow-md 
                  transition-transform duration-300 
                  hover:scale-[1.03] hover:shadow-orange-500/20
                "
              />
            </div>

            {/* TEXT */}
            <div className="flex flex-col flex-grow">
              <h3 className="mb-2 text-lg font-semibold text-orange-300">
                {svc.title}
              </h3>
              <p className="text-sm text-slate-300">{svc.description}</p>
            </div>

            {/* READ MORE */}
            <Link
              to={`/services/${svc.slug}`}
              className="
                mt-4 inline-flex items-center text-sm font-medium
                text-cyan-300 hover:text-orange-300 transition-colors
              "
            >
              Read More
              <span className="ml-1 text-base transition-colors group-hover:text-orange-400">
                →
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

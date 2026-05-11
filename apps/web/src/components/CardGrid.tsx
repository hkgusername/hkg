import { motion } from "framer-motion";

const sections = [
  {
    slug: "/about",
    name: "About Me",
    thumb: "/emmet.jpg",
    objectPosition: "40% center",
    filter: "brightness(0.9)",
  },
  {
    slug: "/yt-videos",
    name: "Good Videos",
    thumb: "/piece.jpg",
    objectPosition: "center 50%",
    imgTransform: "scale(1.4)",
    filter: "brightness(0.95) saturate(1.2) contrast(1.25)",
  },
  {
    slug: "/travel",
    name: "hkg stats",
    thumb: "/benny.jpg",
  },
  {
    slug: "/guide",
    name: "HKG's Guide",
    thumb: "/vitr.jpg",
  },
  {
    slug: "/get-off-the-phones",
    name: "phone is cigarette for the brain",
    thumb: "/lord-business.jpg",
    objectPosition: "45% 15%",
    filter: "brightness(0.75) contrast(1.15) saturate(1.2)",
  },
  {
    slug: "/contact",
    name: "Contact Me",
    thumb: "/unikitty.jpg",
    objectPosition: "65% center",
    filter: "brightness(0.75) contrast(1.1) saturate(1.4)",
  },
];

export default function CardGrid() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {sections.map((section) => (
        <motion.div
          key={section.slug}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
        >
          <a
            href={section.slug}
            className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 hover:shadow-lg hover:shadow-black/40"
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={section.thumb}
                alt={section.name}
                style={{
                  ...(section.objectPosition ? { objectPosition: section.objectPosition } : {}),
                  ...(section.filter ? { filter: section.filter } : {}),
                  ...(section.imgTransform ? { transform: section.imgTransform } : {}),
                }}
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${section.filter ? "" : section.saturate ? "brightness-90 saturate-150" : "brightness-75"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
            </div>
            <div className="p-3">
              <h2 className="text-xs font-semibold text-white group-hover:text-neutral-200">
                {section.name}
              </h2>
            </div>
          </a>
        </motion.div>
      ))}
    </div>
  );
}

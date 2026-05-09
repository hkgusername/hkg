import { motion } from "framer-motion";

const sections = [
  {
    slug: "/about",
    name: "About Me",
    thumb:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
  },
  {
    slug: "/yt-videos",
    name: "Good YT Videos",
    thumb:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  },
  {
    slug: "/travel",
    name: "hkg stats",
    thumb:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80",
  },
  {
    slug: "/guide",
    name: "HKG's Guide",
    thumb:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
  },
  {
    slug: "/get-off-the-phones",
    name: "phone is cigarette for the brain",
    thumb:
      "https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=600&q=80",
  },
  {
    slug: "/contact",
    name: "Contact Me",
    thumb:
      "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600&q=80",
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
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 brightness-75"
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

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bird, Check, ArrowLeft } from "lucide-react";

const pigeonNames = [
  "Gerald",
  "Beatrice",
  "Montgomery",
  "Prudence",
  "Ferdinand",
  "Constance",
  "Reginald",
  "Wilhelmina",
  "Archibald",
  "Millicent",
];

const pigeonNotes: Record<string, string> = {
  Gerald: " Gerald is having a good week.",
  Beatrice: " Beatrice has an excellent sense of direction.",
  Montgomery: " Montgomery once flew through a thunderstorm without complaint.",
  Reginald: " Reginald was promoted to lead bird last spring.",
};

export default function CarrierPigeonForm() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedPigeon] = useState(
    () => pigeonNames[Math.floor(Math.random() * pigeonNames.length)]
  );

  return (
    <div>
      <div className="mb-8">
        <a
          href="/contact"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to contact
        </a>

        <div className="flex items-center gap-3 mt-6 mb-3">
          <motion.div
            animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Bird className="h-8 w-8 text-neutral-300" />
          </motion.div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Carrier Pigeon
          </h1>
        </div>
        <p className="text-sm text-neutral-500 leading-relaxed">
          A perfectly valid alternative to email. Our current fleet consists of{" "}
          {pigeonNames.length} trained birds, each certified for short to
          medium-range message delivery. Average delivery time: variable.
          Subject to weather conditions.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6"
          >
            <div className="mb-6 rounded-lg bg-amber-950/50 border border-amber-900/50 p-4">
              <p className="text-xs font-medium text-amber-400">
                Your message will be delivered by{" "}
                <span className="font-bold">{selectedPigeon}</span> — our most
                reliable bird.
                {pigeonNotes[selectedPigeon] ??
                  " A fine choice of messenger."}
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Your name (for the return leg)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A. Person"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Return address (rooftop preferred)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 3rd chimney, the tall one"
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Your message{" "}
                  <span className="font-normal text-neutral-600">
                    (max 30 words — leg capacity is limited)
                  </span>
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={200}
                  placeholder="Keep it brief. Tiny legs."
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-500 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                  Seed preference (in case of layover)
                </label>
                <select className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3.5 py-2.5 text-sm text-white outline-none focus:border-neutral-500 transition-colors">
                  <option>Millet mix (standard)</option>
                  <option>Sunflower seeds (premium)</option>
                  <option>Safflower (for the discerning pigeon)</option>
                  <option>Whatever's available, honestly</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <Bird className="h-4 w-4" />
                Dispatch {selectedPigeon}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-green-900 bg-green-950/40 p-8 text-center"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-900/50">
              <Check className="h-6 w-6 text-green-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">
              {selectedPigeon} has been dispatched.
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Your message is on its way. Please ensure adequate landing space
              is available at your location. Estimated arrival depends on wind
              conditions, snack availability, and {selectedPigeon}'s current
              mood.
            </p>
            <p className="mt-4 text-xs text-neutral-600">
              Expected delivery: somewhere between an hour and a geological
              epoch.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block text-sm text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-2"
            >
              Or try a more conventional method
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-6 text-center text-xs text-neutral-600">
        All {pigeonNames.length} birds are ethically sourced, professionally
        trained, and very serious about their work.
      </p>
    </div>
  );
}

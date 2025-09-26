import Image from "next/image";
import ContactFormButton from "./contact-form-button";

export default function Hero() {
  return (
    <section
      id="hero"
      className="card mt-4 mb-12 relative overflow-hidden shadow-md h-[calc(100vh-160px)] bg-gray-50 dark:bg-background"
    >
      <div className="p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start h-full">
        {/* Text content - takes full width on mobile, positioned more to the left on larger screens */}
        <div className="w-full md:w-3/5 z-10 pl-4 md:pl-8 lg:pl-12 flex flex-col justify-center h-full">
          <h1 className="text-black dark:text-white">
            <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-2">
              Your AI-first
            </span>
            <span className="block text-[#7A7FEE] dark:text-[#7A7FEE] text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-2">
              Development
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              Partner
            </span>
          </h1>
          <p className="mt-8 mb-10 text-base md:text-lg lg:text-xl max-w-2xl text-gray-700 dark:text-gray-300 leading-relaxed">
            We build high-quality, scalable platforms—client portals,
            marketplaces, AI automations, and SaaS—using the best tools for the
            job, no shortcuts.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <ContactFormButton />
            <a
              href="#services"
              className="btn-secondary text-black dark:text-white hover:opacity-90 transition-opacity"
            >
              Learn more
            </a>
          </div>
        </div>

        {/* Image - hidden on mobile, visible on md and up */}
        <div className="hidden md:flex md:w-2/5 md:absolute md:right-0 md:top-0 md:bottom-0 md:items-center">
          <Image
            src="/dna1.png"
            alt="DNA Pattern"
            width={500}
            height={500}
            className="w-full h-auto md:h-full md:w-auto md:object-cover md:object-left"
          />
        </div>
      </div>
    </section>
  );
}

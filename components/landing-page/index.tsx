import Header from "./header";
import Hero from "./hero";
import Projects from "./projects";
import Services from "./services";
import Faq from "./faq";
import Footer from "./footer";
import ContactFormButton from "./contact-form-button";
import StartProject from "./start-project";
import type { LandingPageProps } from "./types";

// Export individual components for flexible usage
export {
  Header,
  Hero,
  Projects,
  Services,
  Faq,
  Footer,
  ContactFormButton,
  StartProject,
};

// Main component that combines all sections
export default function LandingPage({
  showHeader = true,
  showFooter = true,
}: LandingPageProps) {
  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#111111]">
      {showHeader && <Header />}
      <div className="container pt-4">
        <Hero />
        <Services />
        <Projects />

        <Faq />
      </div>
      {showFooter && <Footer />}
    </main>
  );
}

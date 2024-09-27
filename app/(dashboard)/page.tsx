import { FeaturedBooksSection } from "@/components/home/featured-books";
import GetStartedPage from "@/components/home/get-started";
import HeroLandingPage from "@/components/home/hero-langing-page";
import HowItWorksPage from "@/components/home/how-it-works";

export default function Home() {
  return (
    <main>
      <HeroLandingPage />
      <FeaturedBooksSection />
      <HowItWorksPage />
      <GetStartedPage />
    </main>
  );
}

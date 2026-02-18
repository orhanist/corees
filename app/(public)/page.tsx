import { AboutPreview } from "@/components/public/AboutPreview";
import { DonationBanner } from "@/components/public/DonationBanner";
import { HeroSection } from "@/components/public/HeroSection";
import { HomeEventsCalendar } from "@/components/public/HomeEventsCalendar";
import { HomeContactSection } from "@/components/public/HomeContactSection";
import { ProgramsGrid } from "@/components/public/ProgramsGrid";
import { YoutubeCtaSection } from "@/components/public/YoutubeCtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProgramsGrid />
      <AboutPreview />
      <YoutubeCtaSection />
      <HomeEventsCalendar />
      <DonationBanner />
      <HomeContactSection />
    </>
  );
}

import { Footer } from "@/components";
import {
  About,
  Benefits,
  CallToAction,
  Header,
  Hero,
  TargetAudience,
} from "./components";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen dark:text-white">
      <Header />
      <main className="mt-14 grid mx-3">
        <Hero />
        <About />
        <TargetAudience />
        <Benefits />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}


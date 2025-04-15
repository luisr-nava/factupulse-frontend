import { Footer } from "@/src/components";
import {
  About,
  Benefits,
  CallToAction,
  Header,
  Hero,
  TargetAudience,
} from "./components";
// import { Footer } from "@/src/components";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 ">
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


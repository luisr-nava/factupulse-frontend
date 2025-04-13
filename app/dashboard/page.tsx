import { Dashboard } from "@/src/modules/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | FactuPulse ",
  description: "FactuPulse | Dashboard Page",
};
export default function DashboardPage() {
  return <Dashboard />;
}


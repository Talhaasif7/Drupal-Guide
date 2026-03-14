import { LandingPage } from "@/components/LandingPage";
import "../landing.css";

export const metadata = {
  title: "TalhaDrops — Drupal Contribution & GSoC Journey",
  description:
    "Follow Talha's journey contributing to Drupal core and participating in Google Summer of Code. Tutorials, war stories, and real-world CMS engineering.",
};

export default function Landing() {
  return <LandingPage />;
}

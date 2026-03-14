import { AiBlogPage } from "@/components/AiBlogPage";
import "../ai-blog.css";

export const metadata = {
  title: "From Broken to Brilliant: Building an AI-Powered Drupal 11 Site with Google Gemini | TalhaDrops",
  description:
    "A personal war-story guide to integrating Google Gemini AI into Drupal 11 using DDEV. Covers setup, troubleshooting PHP errors, model mismatches, and why Gemini beats OpenAI for Drupal.",
};

export default function AiDrupal() {
  return <AiBlogPage />;
}

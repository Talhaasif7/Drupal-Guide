import { GSoCBlogPage } from "@/components/GSoCBlogPage";
import "../gsoc-blog.css";

export const metadata = {
  title: "Engineering an AI Moderation Framework for Drupal: My GSoC Journey | TalhaDrops",
  description:
    "Google Summer of Code 2026 final submission — how I built toxic_spam_detection for Drupal: R&D with Detoxify and Hugging Face, a hybrid AI moderation pipeline, security-conscious credential handling, NLP/ML classification, and automated testing.",
  openGraph: {
    title: "Engineering an AI Moderation Framework for Drupal: My GSoC Journey",
    description:
      "From a simple API call to a full moderation pipeline — the R&D, experiments, debugging, and architectural shifts that shaped the final result.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "AI moderation framework for Drupal — GSoC 2026",
      },
    ],
  },
};

export default function GSoCBlog() {
  return <GSoCBlogPage />;
}

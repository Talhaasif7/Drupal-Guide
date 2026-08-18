import { GSoCBlogPage } from "@/components/GSoCBlogPage";
import "../gsoc-blog.css";

export const metadata = {
  title: "Talha's GSoC 2026: Toxic Content and Spam Detection for Drupal | TalhaDrops",
  description:
    "Google Summer of Code 2026 final submission — how Talha built toxic_spam_detection for Drupal: R&D with Detoxify and Hugging Face, a hybrid AI moderation pipeline, IssueSniper community tool, security-conscious credential handling, and automated testing.",
  openGraph: {
    title: "Talha's GSoC 2026: Toxic Content and Spam Detection for Drupal",
    description:
      "From searching gsocorganizations.dev and building IssueSniper to a full AI moderation pipeline for Drupal — the complete GSoC journey.",
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

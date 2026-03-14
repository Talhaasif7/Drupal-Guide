"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const posts = [
  {
    slug: "/travel-blog",
    label: "Blog 01 · Drupal + DDEV",
    title: "How to Build a Professional Travel Website with Drupal",
    excerpt:
      "From a blank computer to a fully structured travel CMS — DDEV setup, content types, Entity References, Paragraphs, Layout Builder, and Views. Zero guesswork.",
    tags: ["Drupal", "DDEV", "Tutorial", "Travel CMS"],
    readTime: "18 min",
    level: "Beginner → Intermediate",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    imgAlt: "Mountain landscape — Drupal travel website guide",
    year: "2026",
  },
  {
    slug: "/ai-drupal",
    label: "Blog 02 · Drupal AI · Gemini",
    title: "From Broken to Brilliant: Building an AI-Powered Drupal 11 Site with Google Gemini",
    excerpt:
      "A developer's honest war-story guide — PHP fatal errors, model naming mismatches, wall-of-text outputs, and the final setup that actually works with Google Gemini.",
    tags: ["Drupal AI", "Google Gemini", "Drupal 11", "DDEV"],
    readTime: "20 min",
    level: "Beginner → Advanced",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    imgAlt: "AI neural network — Drupal AI with Google Gemini",
    year: "2026",
  },
];

const timeline = [
  {
    date: "Jan 2026",
    title: "First Drupal Patch",
    desc: "Submitted first issue fix to Drupal core — a documentation improvement in the Views module.",
    icon: "🩹",
  },
  {
    date: "Feb 2026",
    title: "DDEV Local Setup Mastered",
    desc: "Built a reproducible local Drupal 11 environment and documented the full workflow.",
    icon: "🐳",
  },
  {
    date: "Mar 2026",
    title: "AI Module Integration",
    desc: "Integrated Google Gemini into Drupal 11 via the AI module — survived the white screen of death.",
    icon: "🤖",
  },
  {
    date: "GSoC 2026",
    title: "Google Summer of Code",
    desc: "Applying to contribute to Drupal's AI initiative under the GSoC program.",
    icon: "☀️",
  },
];

export function LandingPage() {
  return (
    <div className="ld-root">
      {/* ── NAV ── */}
      <nav className="ld-nav">
        <a className="ld-brand" href="#">
          <Image
            src="/drupal-mark.svg"
            alt="Drupal logo"
            width={26}
            height={26}
            priority
            className="ld-brand-logo"
          />
          Talha<span>Drops</span>
        </a>
        <div className="ld-nav-links">
          <a href="#blogs">Writing</a>
          <a href="#journey">Journey</a>
          <a href="#about">About</a>
          <ThemeToggle />
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="ld-hero">
        <div className="ld-hero-bg" aria-hidden="true">
          <div className="ld-drop-glow" />
        </div>
        <div className="ld-hero-content">
          <div className="ld-eyebrow">
            <span className="ld-badge">Drupal Contributor</span>
            <span className="ld-badge ld-badge-gsoc">GSoC 2026</span>
          </div>
          <h1>
            Hi, I&apos;m <em>Talha</em>.<br />
            I build with Drupal<br />
            and document everything.
          </h1>
          <p className="ld-hero-sub">
            A developer&apos;s public journal — contributing to Drupal core, integrating AI,
            and chasing Google Summer of Code. Every crash, every fix, every lesson: written down.
          </p>
          <div className="ld-hero-cta">
            <a href="#blogs" className="ld-btn-primary">Read the Blog</a>
            <a
              href="https://www.drupal.org"
              target="_blank"
              rel="noopener noreferrer"
              className="ld-btn-ghost"
            >
              Drupal.org ↗
            </a>
          </div>
        </div>
        <div className="ld-hero-drop" aria-hidden="true">
          <Image
            src="/drupal-mark.svg"
            alt="Drupal logo"
            width={380}
            height={380}
            className="ld-big-drop"
          />
        </div>
      </header>

      {/* ── STATS ── */}
      <section className="ld-stats">
        <div className="ld-stat">
          <span className="ld-stat-num">2</span>
          <span className="ld-stat-label">Published Guides</span>
        </div>
        <div className="ld-stat-divider" />
        <div className="ld-stat">
          <span className="ld-stat-num">38+</span>
          <span className="ld-stat-label">Min of Reading</span>
        </div>
        <div className="ld-stat-divider" />
        <div className="ld-stat">
          <span className="ld-stat-num">D11</span>
          <span className="ld-stat-label">Drupal Version</span>
        </div>
        <div className="ld-stat-divider" />
        <div className="ld-stat">
          <span className="ld-stat-num">GSoC</span>
          <span className="ld-stat-label">2026 Applicant</span>
        </div>
      </section>

      {/* ── BLOG POSTS ── */}
      <section className="ld-section" id="blogs">
        <div className="ld-section-header">
          <span className="ld-section-kicker">// Writing</span>
          <h2>Field Notes from the Trenches</h2>
          <p>Real guides built from real mistakes. No fluff, no copy-paste docs.</p>
        </div>

        <div className="ld-posts">
          {posts.map((post) => (
            <Link href={post.slug} key={post.slug} className="ld-post-card">
              <div className="ld-post-img-wrap">
                <img src={post.img} alt={post.imgAlt} loading="lazy" />
                <span className="ld-post-label">{post.label}</span>
              </div>
              <div className="ld-post-body">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="ld-post-meta">
                  <span>⏰ {post.readTime}</span>
                  <span>🎯 {post.level}</span>
                  <span>📅 {post.year}</span>
                </div>
                <div className="ld-post-tags">
                  {post.tags.map((t) => (
                    <span key={t} className="ld-tag">{t}</span>
                  ))}
                </div>
                <span className="ld-read-link">Read article →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="ld-section" id="about">
        <div className="ld-about">
          <div className="ld-about-avatar">
            <Image src="/drupal-mark.svg" alt="Talha's avatar" width={64} height={64} />
          </div>
          <div className="ld-about-text">
            <span className="ld-section-kicker">// About</span>
            <h2>Who is Talha?</h2>
            <p>
              A developer on a mission to contribute to open-source Drupal and document
              every step of the journey. From setting up a local DDEV environment to
              integrating Google Gemini AI into a Drupal 11 CMS — this blog is the
              unfiltered record of what it actually takes.
            </p>
            <p>
              Currently applying for <strong>Google Summer of Code 2026</strong> to work
              on Drupal&apos;s AI initiative. Every guide here is a real artifact from that
              journey.
            </p>
            <div className="ld-about-links">
              <a href="https://www.drupal.org" target="_blank" rel="noopener noreferrer">
                Drupal.org ↗
              </a>
              <a href="https://summerofcode.withgoogle.com" target="_blank" rel="noopener noreferrer">
                GSoC ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="ld-footer">
        <div className="ld-footer-brand">
          <Image src="/drupal-mark.svg" alt="Drupal" width={20} height={20} />
          Talha<span>Drops</span>
        </div>
        <p>Built with ♡ for the Drupal community · 2026</p>
        <p className="ld-footer-note">
          Documenting the path to GSoC — one patch at a time.
        </p>
      </footer>
    </div>
  );
}

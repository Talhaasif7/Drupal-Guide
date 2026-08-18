"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function GSoCBlogPage() {
  useEffect(() => {
    // Reading progress bar
    const bar = document.getElementById("gsocProgressBar");
    const onScroll = () => {
      if (!bar) return;
      const denom = document.documentElement.scrollHeight - window.innerHeight;
      const pct = denom > 0 ? (window.scrollY / denom) * 100 : 0;
      bar.style.width = `${Math.min(pct, 100)}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Scroll reveal
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".gsoc-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("gsoc-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    reveals.forEach((el) => io.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <>
      <div className="gsoc-progress" id="gsocProgressBar" />

      {/* NAV */}
      <nav className="gsoc-nav">
        <Link href="/landing" className="gsoc-nav-brand">← TalhaDrops</Link>
        <div className="gsoc-nav-tags">
          <span className="gsoc-nav-tag">GSoC 2026</span>
          <span className="gsoc-nav-tag">Drupal</span>
          <span className="gsoc-nav-tag">IssueSniper</span>
          <span className="gsoc-nav-tag">AI Moderation</span>
          <span className="gsoc-nav-tag">toxic_spam_detection</span>
          <ThemeToggle />
        </div>
      </nav>

      {/* HERO */}
      <header className="gsoc-hero">
        <div className="gsoc-hero-bg" aria-hidden="true" />
        <div className="gsoc-hero-grid" aria-hidden="true" />
        <div className="gsoc-hero-overlay" aria-hidden="true" />
        <div className="gsoc-hero-content">
          <div className="gsoc-hero-eyebrow">
            <span className="gsoc-hero-tag">Google Summer of Code · Final Report</span>
            <span className="gsoc-hero-tag-gsoc">GSoC 2026 · Drupal</span>
          </div>
          <h1>
            From Zero Core Commits to CTO Recognition &amp; AI Framework:<br />
            <em>My GSoC Journey with Drupal</em>
          </h1>
          <p className="gsoc-hero-sub">
            The authentic story of searching gsocorganizations.dev, building IssueSniper to solve community friction, 
            prototyping AI moderation models, and engineering toxic_spam_detection.
          </p>
          <div className="gsoc-hero-meta">
            <span className="gsoc-meta-chip">~35 min read</span>
            <span className="gsoc-meta-chip">Personal Story → Technical Architecture</span>
            <span className="gsoc-meta-chip">Drupal · PHP · AI · Open Source</span>
          </div>
        </div>
      </header>

      {/* ARTICLE */}
      <main className="gsoc-article">
        {/* Author bar */}
        <div className="gsoc-author-bar">
          <div className="gsoc-author-avatar-photo">
            <img src="/talha-avatar.png" alt="Talha Asif" />
          </div>
          <div className="gsoc-author-info">
            <small>Google Summer of Code 2026 · Final Submission</small>
            <strong>Talha Asif · toxic_spam_detection · Drupal</strong>
          </div>
        </div>

        {/* Opening quote */}
        <blockquote className="gsoc-opening-quote">
          &ldquo;I didn&apos;t start with core commits or a grand architectural blueprint. In early 2026, 
          I was just another applicant scrolling gsocorganizations.dev, feeling lost in crowded channels and intimidated 
          by unique open-source workflows. This is the story of how stepping back to understand community friction led to 
          CTO recognition, building IssueSniper, and ultimately engineering a multi-engine AI moderation framework for Drupal.&rdquo;
        </blockquote>

        {/* TOC */}
        <nav className="gsoc-toc gsoc-reveal" aria-label="Table of contents">
          <span className="gsoc-toc-title">// Table of Contents</span>
          <ol style={{ counterReset: "toc-item" }}>
            <li><a href="#search-and-noise">The Search &amp; The Crowded Noise</a></li>
            <li><a href="#turning-point">The Turning Point &amp; Pivotal Advice</a></li>
            <li><a href="#travel-breakthrough">First Breakthrough: Travel Site &amp; CTO Recognition</a></li>
            <li><a href="#prototyping-loops">Prototyping &amp; Continuous Mentor Loops</a></li>
            <li><a href="#issue-sniper">Solving Community Friction: The Story of IssueSniper</a></li>
            <li><a href="#what-i-set-out-to-build">The Project: What I Set Out to Build</a></li>
            <li><a href="#the-problem">The Problem: Moderation Is More Than a Blocklist</a></li>
            <li><a href="#rd-phase">R&amp;D Phase: Detoxify vs Hugging Face</a></li>
            <li><a href="#api-failure">Designing for API Failure</a></li>
            <li><a href="#first-version">Building the First Working Version</a></li>
            <li><a href="#debugging">Debugging: The Test That Did Nothing</a></li>
            <li><a href="#multi-engine">Expanding Beyond a Single Classifier</a></li>
            <li><a href="#hybrid">The Hybrid Waterfall Pipeline</a></li>
            <li><a href="#security">Mentor Feedback &amp; Security Design</a></li>
            <li><a href="#governance">AI Governance &amp; Controls</a></li>
            <li><a href="#testing">Testing the System</a></li>
            <li><a href="#comparison">Initial vs. Final Approach</a></li>
            <li><a href="#lessons">How My Thinking Changed &amp; Final Outcome</a></li>
          </ol>
        </nav>

        {/* ── SECTION 01 ── */}
        <div className="gsoc-divider"><span>01 · The Search</span></div>
        <section className="gsoc-section" id="search-and-noise">
          <h2>The Search &amp; The Crowded Noise</h2>
          <p>
            In early 2026, like thousands of student developers around the world, I spent my evenings refreshing{" "}
            <code>gsocorganizations.dev</code>. My goal was simple: find an open-source organization where my skills in web development, 
            PHP, and AI integrations could make a real impact.
          </p>
          <p>
            However, the reality of the GSoC search hit fast. In many of the most popular organizations I shortlisted, 
            communication channels were flooded. Discord and Slack channels had hundreds of newcomers posting identical 
            &ldquo;Hi, I want to contribute&rdquo; messages. Maintainers were overwhelmed. Simple questions often took weeks to get a reply, 
            and meaningful engagement felt nearly impossible.
          </p>
          <p>
            Then I found <strong>Drupal</strong>. Skill-wise, it was a fantastic match. But coming from the standard GitHub world—where 
            everything revolves around simple pull requests, star counts, and straightforward repository forks—Drupal presented an immediate 
            learning curve:
          </p>

          <div className="gsoc-strategy-grid gsoc-reveal">
            <div className="gsoc-strategy-card hf">
              <div className="gsoc-strategy-icon">📦</div>
              <span className="gsoc-strategy-label">Ecosystem Shift 01</span>
              <h3>GitLab Repos &amp; Issue Queues</h3>
              <p>Drupal doesn&apos;t use GitHub PRs. Contributions flow through custom GitLab instances, patch attachments, and central Issue Queues.</p>
            </div>
            <div className="gsoc-strategy-card llm">
              <div className="gsoc-strategy-icon">⚙️</div>
              <span className="gsoc-strategy-label">Ecosystem Shift 02</span>
              <h3>Decoupled Architecture</h3>
              <p>Entities, Fields, Hooks, Render Arrays, and Service Containers replace basic MVC routing. Drupal is a framework inside a CMS.</p>
            </div>
            <div className="gsoc-strategy-card hybrid">
              <div className="gsoc-strategy-icon">🤝</div>
              <span className="gsoc-strategy-label">Ecosystem Shift 03</span>
              <h3>Community &amp; Issue Credit System</h3>
              <p>Every contribution is reviewed, tested via automated testbots, and credited transparently by maintainers across the globe.</p>
            </div>
          </div>

          <p>
            Staring at Drupal&apos;s issue queue for the first time was daunting. I felt like an outsider looking into a massive, 
            twenty-year-old codebase with its own vocabulary, tooling, and culture.
          </p>
        </section>

        {/* ── SECTION 02 ── */}
        <div className="gsoc-divider"><span>02 · The Turning Point</span></div>
        <section className="gsoc-section" id="turning-point">
          <h2>The Turning Point &amp; The Past Mentee&apos;s Advice</h2>
          <p>
            By late February 2026, pressure was mounting. Time was slipping away, and many applicants were frantically hunting 
            for quick issue fixes just to show activity on their proposals. I was on the verge of giving up on Drupal and switching to another org.
          </p>
          <p>
            In a moment of frustration, I reached out on LinkedIn and Slack to a past Drupal GSoC mentee. I asked them how to stand out 
            when I didn&apos;t have years of Drupal core experience. Their answer changed everything:
          </p>
          <blockquote className="gsoc-blockquote">
            &ldquo;Do not just rush to fix random minor issues to pad your stats. Understand the Drupal ecosystem deeply first, 
            build real things on top of it, write about your learnings, and solve real friction for others.&rdquo;
          </blockquote>
          <p>
            That single piece of advice reframed my whole approach. Stop treating GSoC as a points race, and start treating it as a 
            deep learning journey.
          </p>
          <p>
            What followed was a stretch of sleepless nights. I immersed myself in Drupal documentation, video tutorials, 
            and deep-dive explorations. I used AI tools like ChatGPT and Gemini not as code generators, but as interactive tutors—interrogating 
            them on Drupal&apos;s Dependency Injection Container, Plugin API, Typed Data API, and form state lifecycles until the concepts 
            clicked into place.
          </p>
        </section>

        {/* ── SECTION 03 ── */}
        <div className="gsoc-divider"><span>03 · The First Breakthrough</span></div>
        <section className="gsoc-section" id="travel-breakthrough">
          <h2>The First Breakthrough: Travel Site &amp; Community Recognition</h2>
          <p>
            To prove to myself that I understood Drupal beyond theoretical concepts, I decided to build a full project from scratch: 
            a complete **Drupal Travel Website** featuring custom content types, taxonomy structures, dynamic views, and custom theme integrations.
          </p>
          <p>
            Instead of keeping my struggles private, I wrote an honest, unfiltered, step-by-step blog post detailing every bug I encountered, 
            every concept that tripped me up as a beginner, and how I resolved them.
          </p>

          <div className="gsoc-story-card gsoc-reveal">
            <span className="gsoc-sniper-badge">🌟 Community Impact</span>
            <h3 style={{ color: "#a78bfa", fontFamily: "var(--font-playfair), serif", fontSize: "1.4rem", margin: "0 0 10px" }}>
              Recognized by Drupal Leadership &amp; CTO
            </h3>
            <p style={{ margin: 0, color: "#d1d5db", fontSize: "0.95rem" }}>
              The reaction from the community was overwhelming. Experienced maintainers, contributors, and even Drupal&apos;s CTO and leadership 
              discovered the blog and shared my beginner&apos;s guide across official channels and social media as a recommended, authentic onboarding resource 
              for new Drupal developers!
            </p>
          </div>

          <p>
            That moment proved something crucial: open-source communities value transparency, clarity, and genuine effort far more than 
            flawless pre-existing expertise.
          </p>
        </section>

        {/* ── SECTION 04 ── */}
        <div className="gsoc-divider"><span>04 · Prototyping</span></div>
        <section className="gsoc-section" id="prototyping-loops">
          <h2>Prototyping &amp; Continuous Mentor Feedback Loops</h2>
          <p>
            With momentum on my side, I turned my attention to the GSoC project ideas list. Instead of writing a proposal based purely 
            on theoretical assumptions, I shortlisted two project ideas involving AI integrations and decided to **build working prototypes 
            for both before submitting my proposal**.
          </p>
          <p>
            For each prototype:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.2rem", color: "#9ca3af" }}>
            <li style={{ marginBottom: "8px" }}>I built minimal working PHP modules demonstrating the feasibility of the core concept.</li>
            <li style={{ marginBottom: "8px" }}>I published detailed technical blog posts breaking down the architectural choices.</li>
            <li style={{ marginBottom: "8px" }}>I shared the prototypes directly with prospective Drupal GSoC mentors for early feedback.</li>
          </ul>
          <p>
            This initiated an invaluable feedback loop. Mentors pointed out edge cases in Drupal config schema, suggested security improvements 
            for API handling, and challenged me to refine my scope. By the time the official application window opened, my proposal had been 
            revised multiple times based on real mentor input.
          </p>
        </section>

        {/* ── SECTION 05 ── */}
        <div className="gsoc-divider"><span>05 · IssueSniper</span></div>
        <section className="gsoc-section" id="issue-sniper">
          <h2>Solving Real Community Friction: The Story of <code>IssueSniper</code></h2>
          <p>
            While spending time on the Drupal issue queue, I noticed a major pain point that left dozens of new contributors frustrated:
          </p>
          <blockquote className="gsoc-blockquote">
            Whenever a good beginner issue (&ldquo;Novice&rdquo; tag) dropped on the Drupal issue queue, it was claimed by someone within seconds. 
            Newcomers who checked the queue manually once a day never stood a chance.
          </blockquote>
          <p>
            Seeing this friction firsthand, I decided to solve it. I built **IssueSniper**—a real-time alert application that constantly monitored 
            the Drupal issue queue API and immediately notified contributors via desktop and web notifications the second a new beginner-friendly 
            issue opened up.
          </p>

          <div className="gsoc-sniper-card gsoc-reveal">
            <span className="gsoc-sniper-badge">🎯 Innovation Highlight</span>
            <h3>IssueSniper: Real-Time Contribution Assistant</h3>
            <p style={{ color: "#9ca3af", fontSize: "0.92rem", lineHeight: 1.7, margin: "0 0 14px" }}>
              A specialized real-time engine built to level the playing field for new open-source contributors by eliminating 
              the issue-claiming race condition.
            </p>
            <div className="gsoc-diagram" style={{ margin: "14px 0 0", padding: "16px" }}>
              <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.76rem", lineHeight: 1.8, color: "#38bdf8" }}>
{`Drupal Issue Queue API ──► Polling / Webhook Engine ──► Novice Tag Filter
                                                              │
                                                              ▼
Desktop Alert / Sound ◄── Instant Notification Bus ◄── Match Confirmed!`}
              </pre>
            </div>
          </div>

          <p>
            I presented <strong>IssueSniper</strong> to the Drupal community and mentors, receiving enthusiastic praise. I included IssueSniper as part of 
            my final GSoC proposal as evidence of my commitment to the Drupal community ecosystem.
          </p>
          <div className="gsoc-callout gsoc-callout-win gsoc-reveal">
            <span className="gsoc-callout-icon">🏆</span>
            <div>
              <strong>Selected with Zero Prior Core Commits</strong>
              <p>When the GSoC results were announced, I was accepted into Drupal for the <code>toxic_spam_detection</code> project! 
              I achieved this with <strong>zero prior core code commits</strong>—proving that understanding community pain points, taking initiative, 
              and shipping working solutions matter far more than artificial commit metrics.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 06 ── */}
        <div className="gsoc-divider"><span>06 · The Project</span></div>
        <section className="gsoc-section" id="what-i-set-out-to-build">
          <h2>The Project: What I Set Out to Build</h2>
          <p>
            With my selection confirmed, my main GSoC project began: engineering <code>toxic_spam_detection</code>, a production-ready 
            Drupal module designed to detect potentially toxic or unwanted content using modern machine learning models.
          </p>
          <p>
            At a high level, the project description sounded deceptively straightforward:
          </p>
          <blockquote className="gsoc-blockquote">
            Take user-submitted form text, send it to an ML model, receive a toxicity score back, and decide whether to block or allow the submission.
          </blockquote>
          <p>
            However, that framing turned out to be the beginning of the engineering challenge, not the solution.
            Once I analyzed how such a system must behave inside Drupal—handling high-traffic comment queues, managing API rate limits, 
            protecting sensitive API credentials, and ensuring smooth administrator governance—the scope expanded into designing a comprehensive 
            <strong>moderation framework</strong>.
          </p>
          <div className="gsoc-callout gsoc-callout-insight gsoc-reveal">
            <span className="gsoc-callout-icon">💡</span>
            <div>
              <strong>The Core Technical Objectives</strong>
              <p>Build a multi-engine architecture: a ultra-fast BERT-based classifier, a custom LLM-based engine with structured JSON output, 
              and a hybrid waterfall pipeline—backed by settings.php secret overrides, audit logging, debounced frontend UX, and automated test coverage.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 07 ── */}
        <div className="gsoc-divider"><span>07 · The Problem</span></div>
        <section className="gsoc-section" id="the-problem">
          <h2>The Problem: Moderation Is More Than a Blocklist</h2>
          <p>
            Traditional moderation relies on simple regular expressions or static keyword blocklists. While fast, rule-based systems fail 
            miserably against human language subtleties. Context matters. Sarcasm exists. Quotes shouldn&apos;t trigger blocks. And spam tactics constantly mutate.
          </p>
          <p>Engineering an automated moderation layer requires navigating tough architectural trade-offs:</p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Moderation Design Trade-offs</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.8rem", lineHeight: 1.7, color: "#a78bfa" }}>
{`⚡ Low Latency                        🧠 Deep Context
   Fast Models  ◄──── Trade-offs ────►  LLM Reasoning

   💰 Cost &  Rate Limits
   🛡️ Reliability & Failure Handling
   👁️ Human Oversight & Transparency`}
            </pre>
          </div>

          <p>
            <strong>Latency vs. Context:</strong> Form submissions must stay snappy. Waiting 3+ seconds for an LLM response frustrates users.
          </p>
          <p>
            <strong>Cost vs. Coverage:</strong> Running heavy generative LLMs on every minor comment is economically unsustainable for open communities.
          </p>
          <p>
            <strong>Failure Resilience:</strong> An external AI outage or network hiccup must <em>never</em> crash the host Drupal website.
          </p>
          <p>
            <strong>Administrator Governance:</strong> Site owners need precise thresholds, override permissions, and detailed audit logs.
          </p>
        </section>

        {/* ── SECTION 08 ── */}
        <div className="gsoc-divider"><span>08 · R&amp;D Phase</span></div>
        <section className="gsoc-section" id="rd-phase">
          <h2>R&amp;D Phase: Exploring Detoxify and Hugging Face</h2>
          <p>
            I began by evaluating model delivery mechanisms. Two primary options emerged:
          </p>
          <div className="gsoc-strategy-grid gsoc-reveal">
            <div className="gsoc-strategy-card hf">
              <div className="gsoc-strategy-icon">🤗</div>
              <span className="gsoc-strategy-label">Option A · Initial Interest</span>
              <h3>Detoxify (Python Library)</h3>
              <p>Open-source PyTorch/Transformers library for toxicity classification. Popular in Python ML circles.</p>
            </div>
            <div className="gsoc-strategy-card llm">
              <div className="gsoc-strategy-icon">☁️</div>
              <span className="gsoc-strategy-label">Option B · Chosen Direction</span>
              <h3>Hugging Face Inference API</h3>
              <p>Hosted model inference endpoint serving <code>unitary/toxic-bert</code> over standard HTTPS for PHP.</p>
            </div>
            <div className="gsoc-strategy-card hybrid">
              <div className="gsoc-strategy-icon">🎯</div>
              <span className="gsoc-strategy-label">Key Insight</span>
              <h3>Reframing the Requirement</h3>
              <p>I didn&apos;t need to embed the Python library; I needed high-speed access to the underlying classifier model.</p>
            </div>
          </div>

          <h3>The Detoxify deployment conflict</h3>
          <p>
            Detoxify requires Python, PyTorch, and heavy model weights. Embedding it directly inside Drupal would require site administrators 
            to maintain a parallel Python virtual environment, manage inter-process communication, and handle complex server dependencies.
          </p>
          <p>By reframing the problem, I realized the underlying <code>unitary/toxic-bert</code> model could be reached via Hugging Face&apos;s hosted 
          Inference API using Drupal&apos;s native Guzzle HTTP client—delivering clean separation of concerns and effortless installation.</p>
        </section>

        {/* ── SECTION 09 ── */}
        <div className="gsoc-divider"><span>09 · Resilience</span></div>
        <section className="gsoc-section" id="api-failure">
          <h2>Designing for API Failure from the Beginning</h2>
          <p>
            External API endpoints can lag, experience rate limits (429s), or drop connections. To prevent external service hiccups from blocking 
            legitimate Drupal users, I built robust fail-safe controls into the HTTP client layer:
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Failure Handling Flow</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.8rem", lineHeight: 1.85, color: "#d1d5db" }}>
{`Form Submission
      │
      ▼
 Drupal HTTP Client (Guzzle, 5s timeout)
      │
      ▼
 External AI Service
      │
  ┌───┴───────────────────────┐
  │                           │
Success                   Failure (timeout / 429 / network)
  │                           │
  ▼                           ▼
Parse scores            Log via Drupal logger
  │                           │
  ▼                           ▼
Moderation decision     Graceful fallback → allow submission`}
            </pre>
          </div>

          <p>
            Requests carry a strict 5-second Guzzle timeout. If an API exception occurs, the system logs the incident to Drupal&apos;s watchdog 
            logger and defaults to a fail-open policy—ensuring content publishing stays smooth even during AI provider downtime.
          </p>
        </section>

        {/* ── SECTION 10 ── */}
        <div className="gsoc-divider"><span>10 · First Version</span></div>
        <section className="gsoc-section" id="first-version">
          <h2>Building the First Working Version</h2>
          <p>
            The initial working implementation established a modular architecture across four key components:
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Module Component Architecture</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.8rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`🖥️  Frontend UX        → toxic_spam_detector.js (500ms debounced async check)
         │
📋  Form Interceptor   → hook_form_alter() + server-side validation rules
         │
🔍  Scanner Plugin     → HttpApiTextScanner.php (Dependency Injection)
         │
⚙️  Config Storage     → SettingsForm.php (Schema-backed settings)`}
            </pre>
          </div>

          <h3>The Scanner Plugin</h3>
          <p>
            <code>HttpApiTextScanner</code> encapsulates request payload construction, authorization header attachment, and score calculation:
          </p>
          <pre><code>{`$response = $this->httpClient->post($endpoint, [
  'headers' => [
    'Authorization' => 'Bearer ' . $apiToken,
    'Content-Type'  => 'application/json',
  ],
  'json'    => ['inputs' => $text],
  'timeout' => 5.0,
]);

$data = json_decode((string) $response->getBody(), TRUE);
// Compare returned probability score against site threshold.`}</code></pre>
        </section>

        {/* ── SECTION 11 ── */}
        <div className="gsoc-divider"><span>11 · Debugging</span></div>
        <section className="gsoc-section" id="debugging">
          <h2>Debugging: The Test That Did Nothing</h2>
          <p>
            During early end-to-end testing, I submitted aggressive test content into a moderated form, expecting an immediate block message.
          </p>
          <p><strong>Result:</strong> The submission slipped straight through without any warning.</p>
          <p>
            Instead of wildly guessing or mutating code, I methodically traced the execution path:
          </p>

          <div className="gsoc-debug gsoc-reveal">
            <span className="gsoc-debug-label">🐛 Root Cause Uncovered</span>
            <h3>Administrator Role Permission Bypass</h3>
            <p>
              The module defines a custom <code>Bypass toxic spam detection</code> permission. Because I was testing while logged in as 
              <code>User 1</code> (Administrator), Drupal automatically granted all permission checks. The scanner wasn&apos;t failing; 
              <strong>my administrative session was silently bypassing the validation hook!</strong>
            </p>
            <span className="gsoc-fix-label">✅ The Resolution</span>
            <p>
              Created an unprivileged test user with the standard <code>Authenticated user</code> role. Testing from a clean, non-admin session 
              confirmed perfect behavior: real-time debounced warnings appeared on the client, and server-side validation cleanly intercepted forbidden posts.
            </p>
          </div>
        </section>

        {/* ── SECTION 12 ── */}
        <div className="gsoc-divider"><span>12 · Multi-Engine</span></div>
        <section className="gsoc-section" id="multi-engine">
          <h2>Expanding Beyond a Single Classifier: Multi-Engine Framework</h2>
          <p>
            A lightweight classifier like <code>toxic-bert</code> excels at detecting direct toxicity. However, it lacks deep reasoning 
            for subtle context or custom community rules. Generative LLMs offer deep reasoning but incur higher latency and API cost.
          </p>
          <p>
            To deliver the best of both worlds, I expanded the module into a <strong>Multi-Engine Moderation Framework</strong> offering three selectable strategies:
          </p>

          <div className="gsoc-strategy-grid gsoc-reveal">
            <div className="gsoc-strategy-card hf">
              <div className="gsoc-strategy-icon">⚡</div>
              <span className="gsoc-strategy-label">Strategy 01</span>
              <h3>Hugging Face Classifier</h3>
              <p>Fast <code>unitary/toxic-bert</code> model. Response times ~100ms. Perfect for high-volume content filtering.</p>
            </div>
            <div className="gsoc-strategy-card llm">
              <div className="gsoc-strategy-icon">🧠</div>
              <span className="gsoc-strategy-label">Strategy 02</span>
              <h3>Custom LLM Endpoint</h3>
              <p>Supports any OpenAI-compatible API (Ollama, vLLM, OpenAI). Custom system prompts return structured <code>{`{"toxic": true}`}</code> JSON.</p>
            </div>
            <div className="gsoc-strategy-card hybrid">
              <div className="gsoc-strategy-icon">🔀</div>
              <span className="gsoc-strategy-label">Strategy 03</span>
              <h3>Hybrid Waterfall</h3>
              <p>Classifier acts as a ultra-fast first gate; only ambiguous or borderline cases trigger the secondary LLM check.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 13 ── */}
        <div className="gsoc-divider"><span>13 · Hybrid Pipeline</span></div>
        <section className="gsoc-section" id="hybrid">
          <h2>The Hybrid Waterfall Pipeline</h2>
          <p>
            The Hybrid strategy optimizes both latency and cost. Submissions pass through a two-stage waterfall:
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Hybrid Waterfall Execution</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.8rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`👤 Form Submitted
       │
       ▼
┌───────────────────────────────────────┐
│ Stage 1: Fast Classifier Check        │
│ unitary/toxic-bert (~100ms)           │
└───────────────────────────────────────┘
       │
  ┌────┴──────────────────────────┐
  │                               │
Score ≤ Threshold             Score > Threshold
(Clearly Safe)                (Potentially Toxic)
  │                               │
  ▼                               ▼
✅ Instant Pass            ┌──────────────────────────┐
   Zero LLM Cost           │ Stage 2: LLM Context     │
                           │ Custom OpenAI Endpoint   │
                           └──────────────────────────┘
                                      │
                             ┌────────┴────────┐
                             │                 │
                           Safe              Toxic
                             │                 │
                             ▼                 ▼
                         ✅ Pass           🚫 Block & Log`}
            </pre>
          </div>
        </section>

        {/* ── SECTION 14 ── */}
        <div className="gsoc-divider"><span>14 · Security</span></div>
        <section className="gsoc-section" id="security">
          <h2>Mentor Feedback &amp; Enterprise Security Design</h2>
          <p>
            During code review, my mentor highlighted an essential requirement for enterprise Drupal deployments: 
            <em>API keys stored solely in the database can accidentally leak during DB syncs or staging exports.</em>
          </p>
          <p>
            To address this, I refactored key management to support deployment-level secret overrides in <code>settings.php</code>:
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Immutable Config Secret Overrides</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.78rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`settings.php (Environment Secret) ──► Drupal Effective Runtime Config (Immutable)
                                             │
      ┌──────────────────────────────────────┴──────────────────────────────────────┐
      │                                                                             │
🔒 Admin UI Form                                                             🔍 Scanner Execution
  Detects override via $config->get() vs \Drupal::config()                   Always uses effective
  Disables field & displays mask: ****************a1b2                      immutable token`}
            </pre>
          </div>

          <p>
            Additionally, form input masking prevents key disclosure in the browser, ensuring masked strings like <code>****************a1b2</code> are 
            never saved back as real credentials.
          </p>
        </section>

        {/* ── SECTION 15 ── */}
        <div className="gsoc-divider"><span>15 · Governance</span></div>
        <section className="gsoc-section" id="governance">
          <h2>AI Governance &amp; Administrative Controls</h2>
          <p>
            Automated AI decision-making requires human oversight, transparency, and strict data safeguards:
          </p>

          <div className="gsoc-lessons-grid gsoc-reveal">
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">⚙️ Control 01</span>
              <h3>Configurable Thresholds</h3>
              <p>Adjust sensitivity from <code>0.10</code> to <code>0.99</code> (default <code>0.80</code>) to match community norms.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">🛡️ Control 02</span>
              <h3>Enforcement Modes</h3>
              <p>Toggle between strict blocking mode vs soft warning mode for community flexibility.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">👤 Control 03</span>
              <h3>Human Overrides</h3>
              <p>Granular permissions allow trusted community moderators to bypass automated checks when needed.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">📋 Control 04</span>
              <h3>Audit Logging</h3>
              <p>Structured logging records model selection, confidence scores, and actions taken for complete accountability.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 16 ── */}
        <div className="gsoc-divider"><span>16 · Testing</span></div>
        <section className="gsoc-section" id="testing">
          <h2>Testing the System: Unit &amp; Browser Tests</h2>
          <p>
            To guarantee long-term stability across Drupal core updates, I authored comprehensive test suites:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.2rem", color: "#9ca3af" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Unit Tests (PHPUnit + Guzzle Mocks):</strong> Simulate HTTP 200 responses, rate-limit 429 errors, and network timeouts without calling live APIs.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Functional Browser Tests (Drupal WebTestBase):</strong> Automated headless browser tests verifying module installation, settings saving, permission boundaries, and form interception.
            </li>
          </ul>
        </section>

        {/* ── SECTION 17 ── */}
        <div className="gsoc-divider"><span>17 · Comparison</span></div>
        <section className="gsoc-section" id="comparison">
          <h2>Initial Approach vs. Final Approach</h2>

          <div className="gsoc-table-wrap gsoc-reveal">
            <table>
              <thead>
                <tr>
                  <th>Dimension</th>
                  <th>🔷 Initial Plan</th>
                  <th>🟢 Final Architecture</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Open Source Entry</td>
                  <td>Hunting random issue fixes</td>
                  <td>Building IssueSniper &amp; community guide featured by CTO</td>
                </tr>
                <tr>
                  <td>Model Architecture</td>
                  <td>Single Hugging Face API call</td>
                  <td>Multi-Engine: HF + Custom LLM + Hybrid Waterfall</td>
                </tr>
                <tr>
                  <td>Credential Security</td>
                  <td>Database config storage</td>
                  <td><code>settings.php</code> secret overrides + browser masking</td>
                </tr>
                <tr>
                  <td>Failure Handling</td>
                  <td>Basic try/catch block</td>
                  <td>Guzzle 5s timeouts, failure logging &amp; graceful fail-open policy</td>
                </tr>
                <tr>
                  <td>User Experience</td>
                  <td>Server submit validation only</td>
                  <td>500ms debounced real-time frontend check + server validation</td>
                </tr>
                <tr>
                  <td>Testing Coverage</td>
                  <td>Manual manual browser checks</td>
                  <td>PHPUnit Guzzle mock tests + functional web tests</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 18 ── */}
        <div className="gsoc-divider"><span>18 · Growth &amp; Outcome</span></div>
        <section className="gsoc-section" id="lessons">
          <h2>How My Thinking Changed &amp; Final Outcome</h2>
          <p>
            Looking back over my GSoC 2026 journey with Drupal, the greatest shift wasn&apos;t just in the code written—it was in how I approach 
            software engineering and open-source communities.
          </p>
          <p>
            I learned that solving real community friction (like building <strong>IssueSniper</strong> to help newcomers) opens doors that raw code commits alone cannot. 
            I learned that system failure states must be designed as carefully as happy paths. And I learned that open-source mentorship turns good ideas into enterprise-grade solutions.
          </p>

          {/* MENTOR THANK YOU */}
          <div className="gsoc-mentor-card gsoc-reveal">
            <div className="gsoc-mentor-glow" aria-hidden="true" />
            <div className="gsoc-mentor-inner">
              <div className="gsoc-mentor-icon">🤝</div>
              <div className="gsoc-mentor-text">
                <span className="gsoc-mentor-label">// A Note of Gratitude</span>
                <h3>Thank You, Pooja Sharma</h3>
                <p>
                  None of this would have achieved this depth without the constant encouragement, rigorous feedback, and guidance of my GSoC mentor, 
                  <strong> Pooja Sharma</strong>.
                </p>
                <p>
                  Her insightful questions on credential security, architecture decoupling, and Drupal best practices challenged me to elevate my work from a working prototype 
                  to a production-ready module. Thank you, Pooja, for an unforgettable GSoC experience! ✨
                </p>
              </div>
            </div>
          </div>

          {/* LINKS BOX */}
          <div className="gsoc-links-box gsoc-reveal">
            <a
              href="https://git.drupalcode.org/project/toxic_spam_detection"
              target="_blank"
              rel="noopener noreferrer"
              className="gsoc-link-btn gsoc-link-btn-repo"
            >
              📦 Project Repository ↗
            </a>
            <a
              href="https://git.drupalcode.org/project/toxic_spam_detection/-/blob/1.0.x/README.md?ref_type=heads"
              target="_blank"
              rel="noopener noreferrer"
              className="gsoc-link-btn gsoc-link-btn-case"
            >
              📜 Case Study ↗
            </a>
          </div>

          {/* TAGS */}
          <div className="gsoc-tags-wrap">
            {["GSoC 2026", "Drupal", "IssueSniper", "AI Moderation", "NLP", "toxic_spam_detection", "PHP", "Hugging Face",
              "LLM", "Hybrid Pipeline", "Security", "Open Source", "Drupal Module", "toxic-bert",
              "Prompt Engineering", "Audit Logging"].map((t) => (
              <span key={t} className="gsoc-tag">{t}</span>
            ))}
          </div>

          <p style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.75rem", color: "#4b5563", marginTop: 48 }}>
            Built through community empathy &amp; technical iteration. Documented for the next GSoC aspirant. ✦
          </p>
        </section>

        {/* CONCLUSION */}
        <div className="gsoc-conclusion gsoc-reveal">
          <h2>The Biggest Lesson for Future GSoC Aspirants</h2>
          <p>
            If you are a student preparing for Google Summer of Code: don&apos;t just chase commit counts or spam busy channels. 
            Immerse yourself in the community, listen for genuine pain points, build tools that help others, and share your learning journey transparently. 
            Smart initiative, empathy, and execution will always shine through.
          </p>
        </div>
      </main>

      <footer className="gsoc-footer">
        <p>TalhaDrops · GSoC 2026 · Drupal · <span>IssueSniper &amp; toxic_spam_detection</span></p>
        <p style={{ marginTop: 6 }}>Documenting the path to open source — one patch and tool at a time.</p>
      </footer>
    </>
  );
}

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
            Engineering an AI Moderation<br />
            Framework for Drupal:<br />
            <em>My GSoC Journey</em>
          </h1>
          <p className="gsoc-hero-sub">
            From a simple API call to a full moderation pipeline — the R&amp;D, the experiments,
            the debugging dead-ends, and the architectural shifts that shaped the final result.
          </p>
          <div className="gsoc-hero-meta">
            <span className="gsoc-meta-chip">~30 min read</span>
            <span className="gsoc-meta-chip">Intermediate → Advanced</span>
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
          What started as &ldquo;call an AI API to check text&rdquo; turned into a full moderation framework
          with multiple engines, configurable policies, security controls, frontend feedback, audit logging,
          and automated tests. This is the story of how it got there.
        </blockquote>

        {/* TOC */}
        <nav className="gsoc-toc gsoc-reveal" aria-label="Table of contents">
          <span className="gsoc-toc-title">// Table of Contents</span>
          <ol style={{ counterReset: "toc-item" }}>
            <li><a href="#what-i-set-out-to-build">What I Set Out to Build</a></li>
            <li><a href="#the-problem">The Problem: Moderation Is More Than a Blocklist</a></li>
            <li><a href="#rd-phase">R&amp;D Phase: Detoxify vs Hugging Face</a></li>
            <li><a href="#api-failure">Designing for API Failure</a></li>
            <li><a href="#first-version">Building the First Working Version</a></li>
            <li><a href="#debugging">The Test That Did Nothing</a></li>
            <li><a href="#multi-engine">Expanding Beyond a Single Classifier</a></li>
            <li><a href="#hybrid">The Hybrid Waterfall Pipeline</a></li>
            <li><a href="#security">Mentor Feedback &amp; Security Design</a></li>
            <li><a href="#governance">AI Governance &amp; Controls</a></li>
            <li><a href="#testing">Testing the System</a></li>
            <li><a href="#comparison">Initial vs. Final Approach</a></li>
            <li><a href="#lessons">How My Thinking Changed</a></li>
            <li><a href="#outcome">Final Outcome</a></li>
          </ol>
        </nav>

        {/* ── SECTION 1 ── */}
        <div className="gsoc-divider"><span>01 · Starting Point</span></div>
        <section className="gsoc-section" id="what-i-set-out-to-build">
          <h2>What I Set Out to Build</h2>
          <p>
            When I started my Google Summer of Code project with Drupal, I knew I was working on something
            that looks deceptively simple at first glance — and becomes progressively more interesting the
            longer you think about it.
          </p>
          <p>
            The project was to build <code>toxic_spam_detection</code>, a Drupal module for detecting potentially
            toxic or unwanted content using AI models. At a high level, it could sound straightforward:
          </p>
          <blockquote className="gsoc-blockquote">
            Take some text, send it to an ML API, get a score back, decide what to do.
          </blockquote>
          <p>
            But that framing turned out to be the beginning of the problem, not the solution.
            Once I started thinking about how such a system would actually live inside Drupal — serving real
            communities, handling real form submissions, running alongside real administrators — the scope
            expanded considerably.
          </p>
          <p>
            A Drupal site might need to process comments, articles, or user-generated content while keeping
            the publishing experience responsive. External AI services can be slow or unavailable. Different
            communities have different moderation philosophies. API credentials need to be protected.
            Automated decisions need to be explainable. And, most importantly, the moderation layer should
            never become the reason a legitimate user can&apos;t submit content.
          </p>
          <p>
            So the project gradually became less about <em>calling an AI API</em> and more about
            <em> designing a moderation framework</em> that fits naturally into Drupal&apos;s architecture
            and operational model. That shift shaped almost every major decision I made during the summer.
          </p>
          <div className="gsoc-callout gsoc-callout-insight gsoc-reveal">
            <span className="gsoc-callout-icon">💡</span>
            <div>
              <strong>The Final Direction</strong>
              <p>A multi-engine architecture: a fast BERT-based classifier, a configurable LLM-based engine,
              and a hybrid waterfall combining both — plus configurable moderation behavior, audit logging,
              credential protection, frontend feedback, and automated testing.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 2 ── */}
        <div className="gsoc-divider"><span>02 · The Problem</span></div>
        <section className="gsoc-section" id="the-problem">
          <h2>The Problem: Moderation Is More Than a Blocklist</h2>
          <p>
            Traditional moderation systems often start with simple mechanisms — blocklists, regular expressions,
            keyword matching. These techniques still have a place. They&apos;re fast and effective for
            well-defined patterns. But human language doesn&apos;t cooperate with clean rules.
          </p>
          <p>
            The same word can carry entirely different weight depending on context. People quote things
            without endorsing them. Sarcasm exists. Spam evolves to evade simple filters. And rule-based
            systems rarely age well when the language they&apos;re filtering continues to change.
          </p>
          <p>That made me think about moderation as a balance between several competing concerns:</p>

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
            <strong>Latency vs. context:</strong> A form submission shouldn&apos;t become frustrating because
            a moderation service takes three seconds to respond. But deeper semantic analysis often requires
            heavier models.
          </p>
          <p>
            <strong>Cost vs. coverage:</strong> Sending every piece of content to a generative model is
            expensive and often unnecessary.
          </p>
          <p>
            <strong>Failure handling:</strong> A moderation integration should not turn an AI outage into a
            Drupal outage. Timeouts, rate-limit responses, and service unavailability need deliberate
            handling — not crash-and-burn behavior.
          </p>
          <p>
            <strong>Human oversight:</strong> Administrators need real controls — thresholds, enforcement
            options, logs, and bypass permissions. This isn&apos;t optional.
          </p>
          <p>
            These constraints made the project much more interesting than a simple API wrapper — and they
            became the lens through which I evaluated every design decision.
          </p>
        </section>

        {/* ── SECTION 3 ── */}
        <div className="gsoc-divider"><span>03 · R&amp;D Phase</span></div>
        <section className="gsoc-section" id="rd-phase">
          <h2>R&amp;D Phase: Exploring Detoxify and Hugging Face</h2>
          <p>
            One of the first things I did was spend time genuinely investigating the existing landscape.
            This wasn&apos;t box-checking — the choices made here would determine the entire integration
            architecture. Two options stood out:
          </p>
          <div className="gsoc-strategy-grid gsoc-reveal">
            <div className="gsoc-strategy-card hf">
              <div className="gsoc-strategy-icon">🤗</div>
              <span className="gsoc-strategy-label">Option A · Initial Interest</span>
              <h3>Detoxify (Python Library)</h3>
              <p>Open-source, purpose-built for toxicity. Built on PyTorch + Transformers. Well-known in the ML community.</p>
            </div>
            <div className="gsoc-strategy-card llm">
              <div className="gsoc-strategy-icon">☁️</div>
              <span className="gsoc-strategy-label">Option B · Chosen Direction</span>
              <h3>Hugging Face Inference API</h3>
              <p>Hosted model inference. Same <code>unitary/toxic-bert</code> model. Callable via standard HTTP from PHP.</p>
            </div>
            <div className="gsoc-strategy-card hybrid">
              <div className="gsoc-strategy-icon">🎯</div>
              <span className="gsoc-strategy-label">Key Insight</span>
              <h3>Reframing the Requirement</h3>
              <p>I didn&apos;t need &ldquo;the library.&rdquo; I needed <em>access to a classifier</em>. Those are different problems.</p>
            </div>
          </div>

          <h3>What I initially misunderstood about Detoxify</h3>
          <p>
            My first instinct was to use the Detoxify library directly. But when I looked more carefully
            at what that would actually mean in a PHP environment, I had to confront something important:
            Detoxify is a Python library built on PyTorch and Transformers. It&apos;s not a hosted API that
            PHP can call out of the box.
          </p>
          <p>To embed it inside Drupal, I would have needed:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.2rem", color: "#9ca3af" }}>
            <li style={{ marginBottom: "6px" }}>A Python runtime alongside the PHP environment</li>
            <li style={{ marginBottom: "6px" }}>Additional dependency management (pip, virtual environments, model weights)</li>
            <li style={{ marginBottom: "6px" }}>A separate process or service layer</li>
            <li style={{ marginBottom: "6px" }}>Inter-process communication between PHP and Python</li>
            <li style={{ marginBottom: "6px" }}>A significantly more complex installation story for site administrators</li>
          </ul>
          <p>So I stepped back and asked a more useful question:</p>
          <blockquote className="gsoc-blockquote">
            Do I actually need the Python library inside Drupal, or do I need access to the model it provides?
          </blockquote>

          <h3>The shift toward Hugging Face</h3>
          <p>
            I found that the underlying <code>unitary/toxic-bert</code> model — the same model Detoxify uses — is available
            through Hugging Face&apos;s hosted inference endpoint. That gave me a much cleaner integration point.
            Instead of embedding Python inside Drupal, the module could use Drupal&apos;s normal HTTP infrastructure
            to call a hosted endpoint. The model stays outside the Drupal process. Administrators don&apos;t
            manage a second runtime. The endpoint remains configurable.
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// R&amp;D Decision Timeline</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.78rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`Week 1–2   Explored Detoxify → investigated Python library
           ↓
           Identified deployment conflict: Python runtime inside PHP app
           ↓
Week 2–3   Reframed: "classifier access" not "library embedding"
           ↓
           Discovered HF endpoint: unitary/toxic-bert on HF Inference API
           ↓
Week 3–4   First working integration: Drupal HTTP → HF endpoint
           ↓
           Added failure handling: timeouts, logging, graceful fallback
           ↓
Week 4+    Multi-engine architecture: HF + LLM + Hybrid
           ↓
           Security hardening: credential masking, settings.php overrides
           ↓
           Governance and testing: audit logs, thresholds, automated tests`}
            </pre>
          </div>

          <div className="gsoc-callout gsoc-callout-insight gsoc-reveal">
            <span className="gsoc-callout-icon">🔄</span>
            <div>
              <strong>The First Architectural Lesson</strong>
              <p>The cleanest architectural decision often comes from reframing the problem. Separating the
              <em> goal</em> (classify text for toxicity) from the <em>implementation mechanism</em> (which library
              or service achieves that) unlocked a much simpler and more maintainable path.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 4 ── */}
        <div className="gsoc-divider"><span>04 · Resilience</span></div>
        <section className="gsoc-section" id="api-failure">
          <h2>Designing for API Failure from the Beginning</h2>
          <p>
            Once the architecture depended on an external inference service, another question became
            unavoidable: <em>what happens when that service doesn&apos;t respond?</em>
          </p>
          <p>
            This question became a recurring theme. External services can be temporarily unavailable.
            Models can take longer to load on the first request. Rate limits can be hit. Network
            connectivity can fail intermittently. If the moderation code treated those cases as
            exceptional events that were never expected, a small infrastructure hiccup could affect
            the entire publishing workflow.
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
            The initial implementation used a five-second Guzzle timeout and wrapped the request in
            exception handling for network-related failures. When an external request failed, the module
            logged the problem through Drupal&apos;s logger rather than letting the exception bubble up to the user.
          </p>
          <blockquote className="gsoc-blockquote">
            A moderation service should be an important part of the workflow, but it should never become
            a fragile dependency that controls whether the application is healthy.
          </blockquote>
        </section>

        {/* ── SECTION 5 ── */}
        <div className="gsoc-divider"><span>05 · First Version</span></div>
        <section className="gsoc-section" id="first-version">
          <h2>Building the First Working Version</h2>
          <p>
            With the API strategy and failure handling in place, I moved toward a functional Drupal
            implementation. The early version was structured in clear, separable layers:
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Initial Module Structure</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.8rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`🖥️  Frontend Layer     → toxic_spam_detector.js (500ms debounce, async feedback)
         │
📋  Form Layer         → form_alter + server-side validation
         │
🔍  Core Scanner       → HttpApiTextScanner.php
         │
⚙️  Configuration     → SettingsForm.php`}
            </pre>
          </div>

          <h3>The scanner plugin</h3>
          <p>
            <code>HttpApiTextScanner</code> became the main integration point. It receives Drupal&apos;s HTTP client
            through dependency injection, builds the request payload, attaches the authorization header,
            sends the text, and interprets the returned scores.
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

// Evaluate returned scores against the configured threshold.`}</code></pre>

          <h3>Frontend feedback</h3>
          <p>
            I didn&apos;t want users to discover moderation only after a full form submission. The frontend
            used a 500 ms debounce on input events and sent an asynchronous request for validation,
            giving users feedback while they were still writing. The backend validation remained
            authoritative — client-side feedback is never the final security boundary.
          </p>
        </section>

        {/* ── SECTION 6 ── */}
        <div className="gsoc-divider"><span>06 · Debugging</span></div>
        <section className="gsoc-section" id="debugging">
          <h2>One of My Best Debugging Lessons: The Test That Did Nothing</h2>
          <p>
            After the first working implementation, I tested it end to end. I entered deliberately
            aggressive test content into a Drupal form and expected the moderation to fire.
          </p>
          <p><strong>Nothing happened.</strong> The content was accepted and saved.</p>
          <p>
            My first instinct was that something was wrong in the moderation logic. But I didn&apos;t want
            to immediately start changing code. Instead, I broke the problem down into possible failure points:
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Debugging Decision Tree</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.8rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`Test Content Not Flagged
        │
  ┌─────┴──────────────────────────┐
  │              │                 │
Field Mapping  API Failure    Permissions
  │              │                 │
Check config  Check Drupal    ✅ Found it:
body vs       logs for        Admin role
comment_body  timeouts        bypasses scanner
  │              │
Not the issue  No log entries → scanner not called at all`}
            </pre>
          </div>

          <div className="gsoc-debug gsoc-reveal">
            <span className="gsoc-debug-label">🐛 The Real Bug</span>
            <h3>Administrator Bypass Behavior</h3>
            <p>
              The module had a <code>Bypass toxic spam detection</code> permission, and I was testing while
              logged in as an administrator. Drupal&apos;s Administrator role has special behavior — it
              effectively bypasses permission checks. The scanner wasn&apos;t failing.{" "}
              <strong>My test setup was invisibly circumventing it.</strong>
            </p>
            <span className="gsoc-fix-label">✅ The Fix</span>
            <p>
              Created a dedicated unprivileged test user with the standard <code>Authenticated user</code> role
              and repeated the test from a clean session. This time the behavior matched the design: the
              frontend flagged the content, the backend validation intercepted the submission, and the user
              received the moderation message.
            </p>
          </div>

          <div className="gsoc-callout gsoc-callout-mentor gsoc-reveal">
            <span className="gsoc-callout-icon">🎓</span>
            <div>
              <strong>Broader Lesson</strong>
              <p>When testing a system that depends on framework-level behavior, test from the perspective of
              real user conditions — not from the developer&apos;s privileged account. The bug wasn&apos;t in the
              algorithm. It was in the environment I was evaluating it in. That changed how I thought about
              test isolation for the rest of the project.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 7 ── */}
        <div className="gsoc-divider"><span>07 · Multi-Engine</span></div>
        <section className="gsoc-section" id="multi-engine">
          <h2>Expanding Beyond a Single Classifier</h2>
          <p>
            Once the baseline scanner was working, I started looking at its limitations. A BERT-based
            toxicity classifier is useful because it&apos;s lightweight and focused. But it doesn&apos;t solve every
            moderation problem. A classifier is great at recognizing patterns that match its training data.
            An LLM can reason about context more flexibly — understanding nuance, community norms, or edge
            cases that a classifier might mis-score.
          </p>
          <p>That raised an architectural question:</p>
          <blockquote className="gsoc-blockquote">
            Instead of forcing every moderation decision through the same engine, could the module support
            different engines for different situations?
          </blockquote>
          <p>This was the point where the project evolved from a single scanner into a multi-engine framework. I designed three operational strategies:</p>

          <div className="gsoc-strategy-grid gsoc-reveal">
            <div className="gsoc-strategy-card hf">
              <div className="gsoc-strategy-icon">⚡</div>
              <span className="gsoc-strategy-label">Strategy 01</span>
              <h3>Hugging Face Classification</h3>
              <p>Fast, lightweight <code>unitary/toxic-bert</code> via HF inference. Simple HTTP integration, predictable response format, low operational overhead.</p>
            </div>
            <div className="gsoc-strategy-card llm">
              <div className="gsoc-strategy-icon">🧠</div>
              <span className="gsoc-strategy-label">Strategy 02</span>
              <h3>Configurable LLM</h3>
              <p>Connect to any OpenAI-compatible endpoint — hosted, local Ollama, vLLM. System prompt defines moderation policy. Returns structured <code>{`{"toxic": true}`}</code>.</p>
            </div>
            <div className="gsoc-strategy-card hybrid">
              <div className="gsoc-strategy-icon">🔀</div>
              <span className="gsoc-strategy-label">Strategy 03</span>
              <h3>Hybrid Waterfall</h3>
              <p>Classifier as initial gate → LLM only for borderline content. Best of both: speed for obvious cases, depth for ambiguous ones.</p>
            </div>
          </div>

          <h3>The Configurable LLM and prompt engineering</h3>
          <p>
            Instead of hard-coding one LLM provider, I designed the scanner around a configurable endpoint
            and system prompt. The module asks the model for a structured response:
          </p>
          <pre><code>{`{"toxic": true}
// or
{"toxic": false}`}</code></pre>
          <p>
            That gave the Drupal side a small, predictable interface regardless of how complex the reasoning
            behind it was. This was also where <strong>prompt engineering became part of the engineering design</strong>
            rather than something separate from it. The system prompt could describe the moderation policy, the
            community context, and the specific kinds of content to watch for.
          </p>
        </section>

        {/* ── SECTION 8 ── */}
        <div className="gsoc-divider"><span>08 · Hybrid Pipeline</span></div>
        <section className="gsoc-section" id="hybrid">
          <h2>The Hybrid Waterfall Pipeline</h2>
          <p>
            The most interesting design emerged from combining the two approaches. I didn&apos;t want to call
            an LLM for every piece of content — that would introduce unnecessary latency and increase
            inference cost, especially for content that&apos;s obviously fine.
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Hybrid Moderation Pipeline</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.8rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`👤 User submits content
        │
        ▼
┌─────────────────────────────────────┐
│ Stage 1: Fast Classification        │
│ HF toxic-bert (lightweight, ~100ms) │
└─────────────────────────────────────┘
        │
  ┌─────┴──────────────────────┐
  │                            │
Score ≤ threshold          Score > threshold
Clearly safe               Potentially problematic
  │                            │
  ▼                            ▼
✅ Approve directly      ┌──────────────────────────┐
   No LLM needed         │ Stage 2: LLM Context     │
                         │ Check (custom endpoint)  │
                         └──────────────────────────┘
                                    │
                           ┌────────┴────────┐
                           │                 │
                          Safe            Toxic
                           │                 │
                           ▼                 ▼
                       ✅ Allow         🚫 Flag / Block
                     (context cleared) + Audit log`}
            </pre>
          </div>

          <p>
            Instead of asking one model to do everything, I started thinking about models as <strong>stages
            in a pipeline</strong> — where the strength of one compensates for the limitation of another.
            The fast model handles the easy cases. The LLM focuses only where context actually helps.
          </p>

          <div className="gsoc-callout gsoc-callout-win gsoc-reveal">
            <span className="gsoc-callout-icon">🏆</span>
            <div>
              <strong>Why This Was the Key Architectural Shift</strong>
              <p>This design reduced LLM calls to only content that genuinely benefits from deeper reasoning.
              It lowered latency for the majority of submissions, reduced inference cost, and made the overall
              system more maintainable — each stage had a clear and focused responsibility.</p>
            </div>
          </div>

          <h3>Making configuration match the architecture</h3>
          <p>
            Adding multiple engines meant the configuration screen could become overwhelming fast. I used
            Drupal&apos;s <code>#states</code> API to dynamically show or hide configuration groups based on the
            selected strategy — administrators using only the HF strategy don&apos;t see LLM prompt settings:
          </p>
          <pre><code>{`$form['custom_llm_settings'] = [
  '#type'   => 'details',
  '#title'  => $this->t('Custom LLM Configuration'),
  '#states' => [
    'visible' => [
      ':input[name="moderation_strategy"]' => [
        ['value' => 'custom_llm'],
        ['value' => 'hybrid'],
      ],
    ],
  ],
];`}</code></pre>
        </section>

        {/* ── SECTION 9 ── */}
        <div className="gsoc-divider"><span>09 · Security</span></div>
        <section className="gsoc-section" id="security">
          <h2>Mentor Feedback Changed the Security Design</h2>
          <p>
            One of the most important changes came directly from mentor review. The initial implementation
            stored API credentials through the standard Drupal configuration UI — which worked functionally,
            but raised a more important question:
          </p>
          <blockquote className="gsoc-blockquote">
            How should a production Drupal site protect secrets while still making the module easy to configure?
          </blockquote>
          <p>
            The answer was to support file-level configuration overrides via <code>settings.php</code>,
            which is the standard Drupal pattern for deployment-time secrets. But that introduced subtleties
            worth designing around deliberately. The security design grew around three ideas:
          </p>

          <div className="gsoc-diagram gsoc-reveal">
            <span className="gsoc-diagram-label">// Credential Security Flow</span>
            <pre style={{ background: "none", border: "none", padding: 0, margin: 0, fontSize: "0.78rem", lineHeight: 1.9, color: "#d1d5db" }}>
{`🖥️ Server / Deployment
        │
   settings.php (environment secret)
        │
        ▼
⚙️  Active Drupal Config (effective values)
        │
   ┌────┴─────────────────────────┐
   │                              │
🔒 Settings Form (Browser)    🔍 HTTP Scanner
   │                              │
   Detect override?           Reads immutable config
   │                          (always uses effective value)
   ├─ Yes → Disable field
   │         Show masked value ****************a1b2
   │         "Managed externally"
   │
   └─ No  → Editable field
             Admin can update`}
            </pre>
          </div>

          <h3>Immutable vs. editable configuration</h3>
          <p>
            There&apos;s a subtle but important Drupal detail here. Editable configuration and the effective
            runtime configuration are not necessarily the same when <code>settings.php</code> overrides
            are involved. For runtime API calls, the scanner reads the <strong>effective immutable
            configuration</strong> — so if a deployment explicitly overrides the API key, the scanner
            actually uses that value, not whatever&apos;s stored in the database.
          </p>
          <pre><code>{`$isOverridden =
  $this->config('toxic_spam_detector.settings')->get('hf_token') !==
  \\Drupal::config('toxic_spam_detector.settings')->get('hf_token');`}</code></pre>

          <h3>Credential masking</h3>
          <p>
            I added masking so API keys aren&apos;t displayed in plain text through the configuration form.
            Critically, the form submission logic recognizes that a masked placeholder is a display value —
            it should never overwrite the real credential.
          </p>
          <pre><code>{`// Display: ****************a1b2
// Submission: detect mask pattern → skip credential update`}</code></pre>

          <div className="gsoc-callout gsoc-callout-mentor gsoc-reveal">
            <span className="gsoc-callout-icon">🎓</span>
            <div>
              <strong>What Mentor Review Exposed</strong>
              <p>The credential handling review didn&apos;t just catch a security gap — it changed how I think about
              the relationship between configuration storage, runtime resolution, and browser presentation.
              A good review doesn&apos;t just find bugs. It exposes assumptions the implementation is making
              without realizing it.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 10 ── */}
        <div className="gsoc-divider"><span>10 · Governance</span></div>
        <section className="gsoc-section" id="governance">
          <h2>AI Governance Became Part of the Design</h2>
          <p>
            As the module grew more capable, another question became important: <em>what controls should
            exist around an automated moderation decision?</em> I didn&apos;t want the module to behave like
            a black box where a model returns a score and the site silently acts on it.
          </p>

          <div className="gsoc-lessons-grid gsoc-reveal">
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">⚙️ Control 01</span>
              <h3>Configurable Thresholds</h3>
              <p>A confidence range from <code>0.10</code> to <code>0.99</code> with a default of <code>0.80</code>. Different communities have different moderation needs — this belongs in configuration, not code.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">🛡️ Control 02</span>
              <h3>Block or Warn</h3>
              <p>Strict blocking vs. warning-oriented behavior. Sites that want moderation assistance without immediately preventing publication can operate that way.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">👤 Control 03</span>
              <h3>Human Override</h3>
              <p>The <code>Bypass toxic spam detection</code> permission gives trusted users the ability to override automated decisions where appropriate.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">📋 Control 04</span>
              <h3>Audit Logging</h3>
              <p>Structured logs recording engine used, classification labels, confidence values, and action taken. When an admin asks <em>&ldquo;why was this blocked?&rdquo;</em> — there&apos;s an answer.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">💬 Control 05</span>
              <h3>User Transparency</h3>
              <p>Instead of making a moderation decision appear as if it came from a human, the module tells users that an automated AI check flagged their content.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">🔒 Control 06</span>
              <h3>Data Minimization</h3>
              <p>Only the text required for classification leaves the application. User IDs, session data, routing information, and other Drupal metadata stay internal.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 11 ── */}
        <div className="gsoc-divider"><span>11 · Testing</span></div>
        <section className="gsoc-section" id="testing">
          <h2>Testing: Turning the Design into Something I Could Trust</h2>
          <p>
            Once the architecture had expanded, testing became significantly more important. It was no longer
            enough to confirm that one form submission worked. There were now multiple engines, different
            moderation modes, configuration states, permission boundaries, and failure paths — all of which
            needed to work correctly in combination.
          </p>

          <h3>Unit testing the HTTP layer</h3>
          <p>
            For <code>HttpApiTextScanner</code>, I used Guzzle&apos;s mock infrastructure instead of making real
            API requests. This made the test suite fast, deterministic, and independent of external network
            availability.
          </p>

          <div className="gsoc-table-wrap gsoc-reveal">
            <table>
              <thead>
                <tr>
                  <th>Scenario</th>
                  <th>Mock Response</th>
                  <th>Expected Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Toxic content</td>
                  <td>Score <code>0.95</code></td>
                  <td>Scanner marks content as flagged</td>
                </tr>
                <tr>
                  <td>Safe content</td>
                  <td>Score <code>0.05</code></td>
                  <td>Scanner approves content normally</td>
                </tr>
                <tr>
                  <td>API failure (HTTP 429)</td>
                  <td>Rate-limit error</td>
                  <td>Graceful fallback, no fatal error</td>
                </tr>
                <tr>
                  <td>Network failure</td>
                  <td>Connection exception</td>
                  <td>Logged via Drupal logger, submission allowed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Functional browser testing</h3>
          <p>
            I also used Drupal&apos;s functional browser testing approach to validate the full end-to-end
            integration: module installation, configuration loading, settings form rendering and saving,
            moderation permissions, form validation behavior, and warning vs. blocking enforcement.
          </p>
          <div className="gsoc-callout gsoc-callout-insight gsoc-reveal">
            <span className="gsoc-callout-icon">🧪</span>
            <div>
              <strong>Why Both Levels Matter</strong>
              <p>Unit tests verify that each scanner handles mocked responses correctly in isolation.
              Browser-level tests are where you discover whether all those pieces actually work together.
              You need both, and you need to write them from the perspective of real user conditions.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 12 ── */}
        <div className="gsoc-divider"><span>12 · Comparison</span></div>
        <section className="gsoc-section" id="comparison">
          <h2>Initial Approach vs. Final Approach</h2>
          <p>
            One of the clearest ways to understand what changed during the project is to compare where I
            started with where I ended. The final architecture wasn&apos;t something I could have written
            down on the first day — it emerged from the questions the project kept forcing me to answer.
          </p>

          <div className="gsoc-table-wrap gsoc-reveal">
            <table>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>🔷 Initial Approach</th>
                  <th>🟢 Final Direction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Engine</td>
                  <td>Single Hugging Face classifier</td>
                  <td>Multi-engine: HF + custom LLM + hybrid waterfall</td>
                </tr>
                <tr>
                  <td>Moderation</td>
                  <td>Fixed threshold, simple decision</td>
                  <td>Configurable thresholds, multiple enforcement strategies</td>
                </tr>
                <tr>
                  <td>Credentials</td>
                  <td>Standard DB config storage</td>
                  <td><code>settings.php</code> overrides, masking, locked UI when overridden</td>
                </tr>
                <tr>
                  <td>Failure handling</td>
                  <td>Basic request, minimal error handling</td>
                  <td>Timeout, exception handling, logging, graceful fallback</td>
                </tr>
                <tr>
                  <td>User experience</td>
                  <td>Backend validation only</td>
                  <td>Frontend debounce feedback + authoritative backend validation</td>
                </tr>
                <tr>
                  <td>Auditing</td>
                  <td>No visibility into decisions</td>
                  <td>Optional structured moderation logs</td>
                </tr>
                <tr>
                  <td>Testing</td>
                  <td>Manual end-to-end testing</td>
                  <td>Unit tests (mocked HTTP) + functional browser tests</td>
                </tr>
                <tr>
                  <td>Architecture</td>
                  <td>API integration script</td>
                  <td>Extensible, strategy-based moderation pipeline</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── SECTION 13 ── */}
        <div className="gsoc-divider"><span>13 · Growth</span></div>
        <section className="gsoc-section" id="lessons">
          <h2>How My Engineering Thinking Changed</h2>
          <p>
            The technical implementation is only part of what I took from the project. The bigger change
            was in how I approach engineering problems.
          </p>

          <div className="gsoc-lessons-grid gsoc-reveal">
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">Lesson 01</span>
              <h3>Challenge the first interpretation</h3>
              <p>The Detoxify reframing was the clearest example — separating the <em>goal</em>, the <em>implementation mechanism</em>, and the <em>constraints of the host platform</em> revealed a much simpler path.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">Lesson 02</span>
              <h3>Failure paths are design decisions</h3>
              <p>Before this project, an API call was: <em>send → receive</em>. Now I think: what if it times out? What if the service is down? What if the token is invalid? Those questions belong in the design, not the bug list.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">Lesson 03</span>
              <h3>Test the environment, not just the code</h3>
              <p>The administrator bypass issue was the clearest example. My implementation was correct. My test setup was misleading me. Testing must reflect real user conditions.</p>
            </div>
            <div className="gsoc-lesson-card">
              <span className="gsoc-lesson-num">Lesson 04</span>
              <h3>Think in systems, not features</h3>
              <p>Instead of asking <em>&ldquo;which model is best?&rdquo;</em>, I started asking <em>&ldquo;which model is best for which part of the workflow?&rdquo;</em> That shift unlocked the hybrid pipeline design.</p>
            </div>
          </div>

          <h3>Working with my mentor</h3>
          <p>
            Mentorship was a meaningful part of how the project evolved. The strongest discussions happened
            when I could articulate what I was trying to achieve, what I&apos;d already investigated, what
            alternatives I&apos;d considered, and what trade-off I was trying to resolve. That kind of
            structured framing made feedback much more useful — we were evaluating a design together rather
            than debugging a mystery.
          </p>
          <div className="gsoc-callout gsoc-callout-mentor gsoc-reveal">
            <span className="gsoc-callout-icon">💬</span>
            <div>
              <strong>What I&apos;d Do Differently</strong>
              <p><strong>Isolate testing roles from day one.</strong> Create dedicated unprivileged test users upfront.<br />
              <strong>Introduce mock servers earlier.</strong> Local mock inference server for end-to-end dev.<br />
              <strong>Define the config contract early.</strong> Secret-management model at the start reduces later refactoring.<br />
              <strong>Treat the engine as an interface from the start.</strong> Formalizing the abstraction earlier would have made the multi-engine transition cleaner.</p>
            </div>
          </div>
        </section>

        {/* ── SECTION 14 ── */}
        <div className="gsoc-divider"><span>14 · Final Outcome</span></div>
        <section className="gsoc-section" id="outcome">
          <h2>Final Outcome</h2>
          <p>
            By the end of the project, <code>toxic_spam_detection</code> had grown well beyond the initial
            idea of connecting Drupal to a toxicity API. Here&apos;s what the final system delivers:
          </p>

          <div className="gsoc-outcome-grid gsoc-reveal">
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">🔀</span>
              <div>
                <h4>Multi-Engine Moderation</h4>
                <p>Hugging Face inference, configurable custom LLM, or a hybrid waterfall combining both strategies.</p>
              </div>
            </div>
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">⚙️</span>
              <div>
                <h4>Configurable Moderation</h4>
                <p>Confidence thresholds and enforcement behavior configurable by site administrators per community needs.</p>
              </div>
            </div>
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">🔒</span>
              <div>
                <h4>Security-Conscious Credentials</h4>
                <p><code>settings.php</code> overrides, browser masking, and locked UI when externally managed.</p>
              </div>
            </div>
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">🛡️</span>
              <div>
                <h4>Graceful Failure Handling</h4>
                <p>Timeouts, exception handling, and structured logging — external failures don&apos;t disrupt the publishing workflow.</p>
              </div>
            </div>
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">💬</span>
              <div>
                <h4>Frontend + Backend Feedback</h4>
                <p>Real-time moderation feedback via debounced frontend check, plus authoritative server-side validation.</p>
              </div>
            </div>
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">📋</span>
              <div>
                <h4>Audit Logging</h4>
                <p>Structured decision logs covering engine, labels, confidence, and action. Moderation decisions are explainable.</p>
              </div>
            </div>
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">🧪</span>
              <div>
                <h4>Automated Testing</h4>
                <p>Unit tests with mocked HTTP responses and functional browser tests covering key scenarios end-to-end.</p>
              </div>
            </div>
            <div className="gsoc-outcome-card">
              <span className="gsoc-outcome-icon">👁️</span>
              <div>
                <h4>AI Governance Controls</h4>
                <p>Configurable thresholds, enforcement modes, bypass permissions, user transparency, and data minimization.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONCLUSION */}
        <div className="gsoc-conclusion gsoc-reveal">
          <h2>The Biggest Lesson I Took Away</h2>
          <p>
            The most important thing I learned during GSoC is that the first working implementation is
            usually just the beginning of the engineering process. The project started with a fairly direct
            question:
          </p>
          <blockquote className="gsoc-blockquote">
            How can Drupal call an AI model to detect toxic content?
          </blockquote>
          <p>The questions that followed were the more valuable ones:</p>
          <p>
            <em>What happens when the service is down? What if the classifier is uncertain? What if a site
            wants a different model? How do we protect API credentials? How should administrators control
            moderation behavior? How do we test permissions correctly? How do we explain a moderation decision?
            Can a fast model reduce unnecessary LLM calls?</em>
          </p>
          <p>
            Those questions changed the shape of the solution. I didn&apos;t just learn how to integrate an AI
            API into Drupal. I learned how to keep questioning the system <em>around</em> that integration.
            The more I worked on it, the more I found myself thinking in terms of boundaries, failure modes,
            trade-offs, and long-term maintainability.
          </p>
          <p>
            Google Summer of Code gave me the chance to work on a real open-source system where &ldquo;done&rdquo;
            means something more than working on your local machine — it means thinking about how a feature
            behaves for other developers, site administrators, and end users. It means discovering where first
            assumptions were wrong. It means changing direction when a better architecture becomes clear.
          </p>
          <p>
            <strong>
              That&apos;s the kind of engineering thinking I want to carry into future projects — not just the
              ability to make something work, but the habit of asking what happens when it doesn&apos;t, who
              uses it, and what it needs to be to deserve production trust.
            </strong>
          </p>
        </div>

        {/* TAKEAWAYS */}
        <div className="gsoc-takeaways gsoc-reveal">
          <h3>✦ Key Takeaways</h3>
          <ul>
            <li><strong>Reframe the problem before choosing the solution.</strong> &ldquo;I need a classifier&rdquo; is different from &ldquo;I need this library.&rdquo;</li>
            <li><strong>Design for failure from day one.</strong> Timeouts and service outages are not edge cases — they are expected states.</li>
            <li><strong>Test as a real user, not as a developer.</strong> Framework-level behaviors (permissions, roles) are part of the system under test.</li>
            <li><strong>A pipeline of specialized models beats one model that does everything.</strong> Speed where speed matters, depth where depth matters.</li>
            <li><strong>Mentor feedback exposes assumptions.</strong> The credential security redesign came entirely from a question I hadn&apos;t thought to ask.</li>
            <li><strong>Configuration UI should communicate architecture.</strong> What administrators see shapes how they understand and operate the system.</li>
            <li><strong>Governance and auditability are not afterthoughts.</strong> Automated decisions about user content require explainability and human override mechanisms.</li>
          </ul>
        </div>

        {/* MENTOR THANK YOU */}
        <div className="gsoc-mentor-card gsoc-reveal">
          <div className="gsoc-mentor-glow" aria-hidden="true" />
          <div className="gsoc-mentor-inner">
            <div className="gsoc-mentor-icon">🤝</div>
            <div className="gsoc-mentor-text">
              <span className="gsoc-mentor-label">// A Note of Gratitude</span>
              <h3>Thank You, Pooja Sharma</h3>
              <p>
                None of this would have taken the shape it did without the consistent support of my GSoC mentor,
                <strong> Pooja Sharma</strong>. Every sync meeting, every round of feedback, every question she
                pushed back on — all of it made the project more thoughtful and the final outcome genuinely better.
              </p>
              <p>
                What I valued most wasn&apos;t just the technical direction. It was the kind of mentorship where
                you&apos;re challenged to think more clearly rather than simply told what to do. Pooja had a way
                of asking exactly the right question at the right moment — the kind that makes you realize you
                hadn&apos;t fully thought something through, and then gives you the space to figure it out.
              </p>
              <p>
                The credential security redesign, the moderation governance layer, the habit of questioning
                assumptions rather than just shipping features — a lot of that thinking came directly out of
                our sync conversations. I&apos;m genuinely grateful for her time, her patience, and her belief
                in the work.
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Thank you, Pooja. GSoC 2026 was a better experience because of you. ✨</strong>
              </p>
            </div>
          </div>
        </div>

        {/* PROJECT LINKS */}
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
          {["GSoC 2026", "Drupal", "AI Moderation", "NLP", "ML", "AI", "toxic_spam_detection", "PHP", "Hugging Face",
            "LLM", "Hybrid Pipeline", "Security", "Open Source", "Drupal Module", "toxic-bert",
            "Prompt Engineering", "Audit Logging"].map((t) => (
            <span key={t} className="gsoc-tag">{t}</span>
          ))}
        </div>

        <p style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.75rem", color: "#4b5563", marginTop: 48 }}>
          Built through iteration. Shaped by great questions. Documented for the next GSoC contributor. ✦
        </p>
      </main>

      <footer className="gsoc-footer">
        <p>TalhaDrops · GSoC 2026 · Drupal · <span>toxic_spam_detection</span></p>
        <p style={{ marginTop: 6 }}>Documenting the path to open source — one patch at a time.</p>
      </footer>
    </>
  );
}

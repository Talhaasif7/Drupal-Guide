"use client";

import { useEffect } from "react";
import Link from "next/link";

export function AiBlogPage() {
  useEffect(() => {
    const bar = document.getElementById("aiProgressBar");
    const onScroll = () => {
      if (!bar) return;
      const denom = document.documentElement.scrollHeight - window.innerHeight;
      const pct = denom > 0 ? (window.scrollY / denom) * 100 : 0;
      bar.style.width = `${Math.min(pct, 100)}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".ai-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("ai-visible");
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
      <div className="ai-progress" id="aiProgressBar" />

      {/* NAV */}
      <nav className="ai-nav">
        <Link href="/landing" className="ai-nav-brand">
          ← TalhaDrops
        </Link>
        <div className="ai-nav-tags">
          <span className="ai-nav-tag">Drupal AI</span>
          <span className="ai-nav-tag">Google Gemini</span>
          <span className="ai-nav-tag">Drupal 11</span>
          <span className="ai-nav-tag">DDEV</span>
        </div>
      </nav>

      {/* HERO */}
      <header className="ai-hero">
        <img
          className="ai-hero-img"
          src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&auto=format&fit=crop&q=85"
          alt="AI neural network abstract — Drupal AI with Google Gemini"
          loading="eager"
        />
        <div className="ai-hero-overlay" />
        <div className="ai-hero-content">
          <div className="ai-hero-eyebrow">
            <span className="ai-hero-tag">Drupal AI · Gemini · 2026</span>
          </div>
          <h1>
            From Broken to Brilliant:<br />
            <em>Building an AI-Powered Drupal 11 Site with Google Gemini</em>
          </h1>
          <p className="ai-hero-sub">
            A developer&apos;s honest war-story guide — the crashes, the fixes, and the final setup that actually works.
          </p>
          <div className="ai-hero-meta">
            <span className="ai-meta-chip">20 min read</span>
            <span className="ai-meta-chip">Beginner → Advanced</span>
            <span className="ai-meta-chip">Drupal 11 · DDEV · Gemini 1.5</span>
          </div>
        </div>
      </header>

      {/* ARTICLE */}
      <main className="ai-article">
        <div className="ai-author-bar">
          <div className="ai-author-avatar">🤖</div>
          <div className="ai-author-info">
            <small>War Stories from the Trenches</small>
            <strong>TalhaDrops · Technical Deep Dive</strong>
          </div>
        </div>

        <p>Let me be completely honest with you. The first time I tried to integrate AI into Drupal, I got a white screen of death within the first fifteen minutes. No error message. Just a blank, silent, mocking white page.</p>
        <p>That was my introduction to Drupal AI development. And if you&apos;ve landed on this guide, there&apos;s a chance you&apos;re already acquainted with that same white screen, or you&apos;re desperately trying to avoid it.</p>

        <blockquote className="ai-intro-block">
          This isn&apos;t just a documentation page with copy-paste commands. This is a real guide built from months of trial, error, crashes, and eventual triumph. I&apos;m going to take you from a fresh machine, through local setup with DDEV, all the way to a working, intelligent Drupal site powered by Google Gemini — with every gotcha documented along the way.
        </blockquote>

        <figure className="ai-img-inline ai-reveal">
          <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80" alt="AI and machine learning technology concept" loading="lazy" />
          <figcaption>AI integration in Drupal isn&apos;t just a &quot;cool feature&quot; anymore — in 2026, it&apos;s the new baseline for intelligent digital experiences.</figcaption>
        </figure>

        <div className="ai-divider"><span>Part 1 — The &quot;Why&quot;</span></div>
        <h2>Why AI and Drupal Are a Match Made in Heaven</h2>
        <p>The answer is Drupal&apos;s superpower: <strong>structured data</strong>. Drupal doesn&apos;t just store text — it stores <em>fields, relationships, taxonomies, and metadata</em>. That structure is exactly what makes AI so devastatingly effective inside Drupal.</p>

        <h3>The Power Moves AI Unlocks in Drupal</h3>
        <p><strong>Content Operations at Scale.</strong> Imagine 5,000 blog posts that need SEO meta summaries and image alt-text. Manually? That&apos;s months of work. With Drupal AI? You queue a batch process and come back after lunch.</p>
        <p><strong>Semantic Search.</strong> Standard Drupal search hunts for matching keywords. AI-powered search understands <em>intent</em>. A user searching for &quot;how to fix a leak&quot; will see plumbing guides even if the word &quot;leak&quot; never appears in the title.</p>
        <p><strong>Context-Aware CKEditor.</strong> In 2026, the text editor inside Drupal isn&apos;t just a place to type. It&apos;s an assistant that can rewrite your tone or expand a bullet list into a full paragraph — with one click.</p>

        <div className="ai-callout ai-callout-brain ai-reveal">
          <span className="ai-callout-icon">🧠</span>
          <div>
            <strong>The Key Shift in Thinking</strong>
            <p>Traditional Drupal is a <em>data bucket</em> — you pour content in and retrieve it. AI-powered Drupal is an <em>intelligent agent</em> — it understands, transforms, enriches, and acts on your content autonomously.</p>
          </div>
        </div>

        <div className="ai-divider"><span>Part 2 — The Foundation</span></div>
        <h2>Building the Local Foundation with DDEV</h2>
        <p>Here&apos;s a mistake I made early on: I tried to set up Drupal AI on a shared hosting environment first, &quot;just to test.&quot; It was a disaster. PHP version mismatches, no terminal access, Composer timeouts. Don&apos;t do this. <strong>Always build locally first.</strong></p>

        <figure className="ai-img-inline ai-reveal">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80" alt="Server and container technology — DDEV Docker local development" loading="lazy" />
          <figcaption>DDEV containers mirror production server environments exactly — no more &quot;it works on my machine&quot; excuses.</figcaption>
        </figure>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 01 · Docker</span>
          <h3>Install Docker Desktop</h3>
          <p><strong>Windows:</strong> Install Docker Desktop — check <em>&quot;Use WSL 2 instead of Hyper-V&quot;</em> during setup.</p>
          <p><strong>macOS:</strong> Docker Desktop for Mac — choose Intel or Apple Silicon version.</p>
          <p><strong>Linux:</strong> <code>sudo apt install docker.io</code></p>
          <pre><code>docker --version{"\n"}# Docker version 24.x.x — ready to go</code></pre>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 02 · DDEV + mkcert</span>
          <h3>Install DDEV and mkcert</h3>
          <pre><code>brew install ddev/ddev/ddev mkcert{"\n"}mkcert -install</code></pre>
          <div className="ai-callout ai-callout-tip" style={{ marginTop: 16 }}>
            <span className="ai-callout-icon">💡</span>
            <div><strong>Don&apos;t Skip mkcert</strong><p>Run <code>mkcert -install</code> immediately after installing. Without it, every page load throws a security warning.</p></div>
          </div>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 03 · Project Init</span>
          <h3>Create and Configure Your Project</h3>
          <pre><code>mkdir my-ai-drupal-site{"\n"}cd my-ai-drupal-site{"\n"}ddev config --project-type=drupal11 --docroot=web --create-docroot{"\n"}ddev start</code></pre>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 04 · Composer + Drush</span>
          <h3>Download Drupal Core and Drush</h3>
          <pre><code>ddev composer create drupal/recommended-project{"\n"}ddev composer require drush/drush</code></pre>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 05 · Browser Install</span>
          <h3>Run the Drupal Installer</h3>
          <pre><code>ddev launch   # Opens browser at https://my-ai-drupal-site.ddev.site</code></pre>
          <p>Choose <strong>Standard</strong> profile → on the database screen, click <strong>Save and continue without typing anything</strong> (DDEV auto-configures it) → set your site name and admin password.</p>
        </div>

        <div className="ai-divider"><span>Part 3 — AI Integration</span></div>
        <h2>Integrating AI Into Drupal — The Right Way</h2>
        <p>The Drupal AI ecosystem is built around three layers:</p>
        <div className="ai-tree ai-reveal">
          <span className="ai-tree-hl">AI Integration Stack</span><br />
          ├── <span className="ai-tree-dir">drupal/key</span>
          <span className="ai-tree-note"> ← Security layer: keeps API keys out of your database</span><br />
          ├── <span className="ai-tree-dir">drupal/ai</span>
          <span className="ai-tree-note"> ← The &quot;brain bridge&quot;: connects Drupal to any AI provider</span><br />
          └── <span className="ai-tree-dir">drupal/gemini_provider</span>
          <span className="ai-tree-note"> ← The actual connection to Google&apos;s Gemini API</span>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 06 · Modules</span>
          <h3>Install the Key Module and AI Module</h3>
          <pre><code>ddev composer require &apos;drupal/ai:^1.2&apos; drupal/key{"\n"}ddev drush en ai key -y{"\n"}ddev drush cr</code></pre>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 07 · Gemini Provider</span>
          <h3>Install the Gemini Provider Module</h3>
          <pre><code>ddev composer require &apos;drupal/gemini_provider:^1.0@RC&apos;{"\n"}ddev drush en gemini_provider -y{"\n"}ddev drush cr</code></pre>
          <div className="ai-callout ai-callout-war" style={{ marginTop: 14 }}>
            <span className="ai-callout-icon">🚨</span>
            <div><strong>War Story #1 — The RC Flag</strong><p>Without <code>@RC</code>, Composer couldn&apos;t find a stable release and threw a resolution error. Many AI modules are still in Release Candidate stage in 2026. Always check the module&apos;s Drupal.org page for the correct version flag.</p></div>
          </div>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 08–09 · API Key</span>
          <h3>Get and Store Your Google AI Studio Key</h3>
          <p>Go to <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">aistudio.google.com</a> → <strong>Get API Key</strong> → <strong>Create API key</strong>. Then in Drupal: <strong>Configuration → System → Keys → Add Key</strong>. Name it <code>gemini_api_key</code>, Key Type: Authentication, paste your key → Save.</p>
        </div>

        <div className="ai-step ai-reveal">
          <span className="ai-step-num">Step 10 · Connect</span>
          <h3>Link Gemini to Drupal&apos;s AI Layer</h3>
          <p>Go to <strong>Configuration → AI → Provider Settings</strong> → Configure Gemini Provider → select your key → set model to <code>gemini-1.5-flash</code> → Save → <code>ddev drush cr</code>.</p>
          <div className="ai-callout ai-callout-win" style={{ marginTop: 14 }}>
            <span className="ai-callout-icon">🎉</span>
            <div><strong>Your Drupal site is now thinking.</strong><p>Navigate to <strong>Configuration → AI → AI Explorer</strong> to test a prompt directly from your Drupal admin panel.</p></div>
          </div>
        </div>

        <div className="ai-divider"><span>Part 4 — Why Gemini</span></div>
        <h2>Why Gemini Beats OpenAI and Groq for Drupal</h2>

        <div className="ai-table-wrap ai-reveal">
          <table>
            <thead>
              <tr><th>Capability</th><th>Gemini 1.5 Flash</th><th>OpenAI GPT-4o</th><th>Groq (Llama)</th></tr>
            </thead>
            <tbody>
              <tr><td>Context Window</td><td>✅ 2M tokens</td><td>⚠ 128K tokens</td><td>⚠ 8K–32K tokens</td></tr>
              <tr><td>YAML Output Accuracy</td><td>✅ Excellent</td><td>⚠ Occasional errors</td><td>❌ Inconsistent</td></tr>
              <tr><td>Cost per 1M tokens</td><td>✅ ~$0.075 (Flash)</td><td>⚠ ~$5.00</td><td>✅ Free / very low</td></tr>
              <tr><td>Multimodal</td><td>✅ Native</td><td>✅ Yes</td><td>❌ Limited</td></tr>
              <tr><td>Response Speed</td><td>✅ ~2 seconds</td><td>⚠ ~8–12 seconds</td><td>✅ Very fast</td></tr>
              <tr><td>Drupal Module Support</td><td>✅ Dedicated module</td><td>✅ Yes</td><td>⚠ Via OpenAI-compatible</td></tr>
            </tbody>
          </table>
        </div>

        <h3>1. The Context Window Changes Everything</h3>
        <p>Gemini&apos;s <strong>2-million-token context window</strong> means I can paste an entire codebase, say &quot;fix the bug in the provider configuration,&quot; and Gemini reads every line. Nothing else comes close.</p>

        <h3>2. YAML Accuracy — The Silent Deal Breaker</h3>
        <div className="ai-callout ai-callout-war ai-reveal">
          <span className="ai-callout-icon">🚨</span>
          <div><strong>The Most Underrated Factor</strong><p>Drupal&apos;s entire configuration system runs on YAML. A single extra space crashes the entire site. Gemini outputs clean, valid YAML consistently. GPT-4o occasionally adds markdown code fences or misplaces indentation. In Drupal, occasionally is not good enough.</p></div>
        </div>

        <div className="ai-divider"><span>Part 5 — The Real Stuff</span></div>
        <h2>The Troubleshooting Section — My Actual War Stories</h2>

        <figure className="ai-img-inline ai-reveal">
          <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&auto=format&fit=crop&q=80" alt="Developer debugging code error on screen" loading="lazy" />
          <figcaption>Every one of these errors looked exactly like this — late at night, cold coffee, cursor blinking in an empty terminal.</figcaption>
        </figure>

        <div className="ai-trouble ai-reveal">
          <span className="ai-trouble-label">Bug 01 · PHP Fatal Error</span>
          <h3>The $configFactory Re-Declaration Error</h3>
          <p><strong>Symptom:</strong> White screen of death immediately after enabling the AI module.</p>
          <pre><code>PHP Fatal error: Cannot redeclare{"\n"}Drupal\ai\AiProviderPluginManager::$configFactory</code></pre>
          <p><strong>Root Cause:</strong> Version mismatch between <code>drupal/ai</code> and the provider module.</p>
          <span className="ai-fix-label">✅ The Fix</span>
          <pre><code>ddev composer update drupal/ai drupal/gemini_provider --with-dependencies{"\n"}ddev drush cr{"\n"}ddev drush updb -y</code></pre>
        </div>

        <div className="ai-trouble ai-reveal">
          <span className="ai-trouble-label">Bug 02 · Plugin Not Found</span>
          <h3>The Model Naming Mismatch</h3>
          <p><strong>Symptom:</strong> Every prompt returns: <code>Error: The &quot;gemini-pro&quot; plugin does not exist.</code></p>
          <p><strong>Root Cause:</strong> Google periodically renames their models. I spent <strong>three hours</strong> on this one. The connection was working perfectly. The only problem was a string.</p>
          <span className="ai-fix-label">✅ The Fix</span>
          <pre><code># Go to: Configuration → AI → Provider Settings → Gemini → Edit{"\n"}# Update model string to current value:{"\n"}model: gemini-1.5-flash   # fast, cheap tasks{"\n"}model: gemini-1.5-pro     # complex reasoning{"\n"}ddev drush cr</code></pre>
        </div>

        <div className="ai-trouble ai-reveal">
          <span className="ai-trouble-label">Bug 03 · Output Structure</span>
          <h3>The &quot;Wall of Text&quot; Problem</h3>
          <p><strong>Symptom:</strong> AI-generated content renders as one giant unformatted block in Drupal&apos;s frontend.</p>
          <p><strong>Root Cause:</strong> The AI was never told <em>how</em> to format its output. Drupal&apos;s CKEditor needs HTML structure — not raw text.</p>
          <span className="ai-fix-label">✅ The Fix — HTML-Focused System Prompts</span>
          <pre><code>You are a professional content editor for a Drupal CMS.{"\n"}Always format your output as clean, valid HTML.{"\n"}Use &lt;p&gt; tags for paragraphs.{"\n"}Use &lt;h2&gt; and &lt;h3&gt; tags for section headings.{"\n"}Never use markdown formatting (no **, no ##).{"\n"}Return ONLY the formatted HTML content, nothing else.</code></pre>
        </div>

        <div className="ai-trouble ai-reveal">
          <span className="ai-trouble-label">Bug 04 · Timeout</span>
          <h3>API Timeout Errors on Large Content Batches</h3>
          <p><strong>Symptom:</strong> <code>cURL error 28: Operation timed out after 30000 milliseconds</code></p>
          <span className="ai-fix-label">✅ The Fix</span>
          <pre><code>// In settings.php:{"\n"}$settings[&apos;http_client_config&apos;][&apos;timeout&apos;] = 120;{"\n"}{"\n"}// Run batch via Drush queue:{"\n"}ddev drush queue:run ai_automator_items --time-limit=300</code></pre>
        </div>

        <div className="ai-divider"><span>Part 6 — Automation</span></div>
        <h2>Unlocking the AI Automator — Content Intelligence at Scale</h2>
        <pre><code>ddev drush en ai_automator -y{"\n"}ddev drush cr</code></pre>
        <p>Once enabled, go to any content type&apos;s <strong>Manage fields</strong> screen. On any text field, you&apos;ll see a new <strong>AI Automator</strong> tab. Configure it with Provider: Gemini, Model: <code>gemini-1.5-flash</code>, and a prompt. Save a new piece of content. Watch the meta description field populate itself.</p>

        <div className="ai-takeaways ai-reveal">
          <h3>🏆 The Complete Checklist — From Zero to AI-Powered</h3>
          <ul>
            <li>Docker + DDEV installed — local environment running at HTTPS</li>
            <li>Drupal 11 installed via Composer using <code>drupal/recommended-project</code></li>
            <li>Key module configured — API key stored safely outside the database</li>
            <li><code>drupal/ai</code> + <code>drupal/gemini_provider</code> installed together</li>
            <li>Gemini Provider configured — pointing to <code>gemini-1.5-flash</code></li>
            <li>System prompts set to HTML output — no more wall-of-text issues</li>
            <li>AI Automator enabled — content fields populating automatically on save</li>
            <li>Configuration exported — <code>ddev drush cex -y</code> and committed to Git</li>
          </ul>
        </div>

        <div className="ai-conclusion ai-reveal">
          <h2>Conclusion — You Flipped the Switch</h2>
          <p>A few months ago, I was staring at a blank white screen, half my terminal filled with red error text, genuinely questioning whether any of this was worth it.</p>
          <p>But here&apos;s what I learned: <strong>every single one of those errors had a pattern</strong>. A version mismatch here, a missing cache clear there, a system prompt that needed one sentence of clarification. None of it was magic. None of it was unsolvable.</p>
          <p>We are at a turning point in how the web manages information. Drupal with AI isn&apos;t just a &quot;resume builder feature&quot; — it&apos;s how professional content operations will run for the next decade.</p>
          <p><strong>The site is alive. The AI is thinking. What you build next is entirely up to you. 🚀</strong></p>
        </div>

        <div className="ai-tags-wrap">
          {["Drupal AI","Google Gemini","Drupal 11","DDEV","AI Module","Gemini Provider","PHP Fatal Error","AI Automator","Drupal Tutorial","2026","LLM","Web Development"].map((t) => (
            <span key={t} className="ai-tag">{t}</span>
          ))}
        </div>

        <p style={{ textAlign: "center", fontFamily: "monospace", fontSize: "0.75rem", color: "#566880", marginTop: 48 }}>
          Built through pain. Documented with love. Share it with the next developer who hits the white screen. 🤝
        </p>
      </main>
    </>
  );
}

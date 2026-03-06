"use client";

import { useEffect } from "react";
import Image from "next/image";

export function TravelBlogPage() {
  useEffect(() => {
    const bar = document.getElementById("progressBar");
    const onScroll = () => {
      if (!bar) return;
      const denom = document.body.scrollHeight - window.innerHeight;
      const pct = denom > 0 ? (window.scrollY / denom) * 100 : 0;
      bar.style.width = `${Math.min(pct, 100)}%`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    reveals.forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <div className="progress-bar" id="progressBar" />

      <nav className="sticky-nav">
        <a className="nav-brand" href="#">
          <Image
            className="brand-logo"
            src="/drupal-mark.svg"
            alt="Drupal guide logo"
            width={24}
            height={24}
            priority
          />
          Talha<span>Dev</span>
        </a>
        <div className="nav-tags">
          <span className="nav-tag">Drupal</span>
          <span className="nav-tag">DDEV</span>
          <span className="nav-tag">Tutorial</span>
          <span className="nav-tag">Travel CMS</span>
        </div>
      </nav>

      <header className="hero">
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=80"
          alt="Mountain landscape for travel website hero"
          loading="eager"
        />
        <div className="hero-grain" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <span className="hero-kicker">Complete Guide · Drupal + DDEV</span>
          <h1>
            How to Build a <em>Professional</em> Travel Website with Drupal
          </h1>
          <p className="hero-sub">
            From a blank computer to a fully structured travel CMS — step by step, with
            zero guesswork.
          </p>
          <div className="hero-meta">
            <span>⏰ 18 min read</span>
            <span>📅 2026</span>
            <span>🎯 Beginner → Intermediate</span>
          </div>
        </div>
      </header>

      <article>
        <div className="container">
          <p>
            Imagine you want to build a travel website showcasing stunning destinations
            like Hunza Valley, Tokyo, or Santorini. You want rich destination pages,
            dynamic activity listings, flexible layouts, and a professional admin panel
            to manage it all. You don't want just a blog. You want a{" "}
            <strong>system</strong>.
          </p>

          <p>
            That system is Drupal. In this guide, I'm going to walk you through two
            things: first, how to set up Drupal on your local machine the right,
            professional way — and second, how to use that installation to build a fully
            structured travel website from the ground up.
          </p>

          <p>
            Whether you're coming from WordPress, a JavaScript stack, or you've never
            touched a CMS before — this tutorial is written for you. I won't just tell
            you <em>what</em> to click. I'll tell you <em>why</em> every decision matters.
          </p>
        </div>

        <div className="container-wide reveal">
          <div className="img-block">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=80"
              alt="Travel flat lay with map, camera and compass"
              loading="lazy"
            />
            <p className="img-caption">
              // The goal: a beautifully structured travel site powered by Drupal's
              content architecture
            </p>
          </div>
        </div>

        <div className="container">
          <h2 className="section-title reveal">Why Choose Drupal for a Travel Website?</h2>

          <p>
            Drupal is not just a blogging platform. It's a{" "}
            <strong>content management framework</strong> that excels at modeling
            structured, relational data. A travel website is the perfect use case
            because travel data is inherently relational — destinations have activities,
            activities have booking requirements, and pages need flexible layouts that
            differ per location.
          </p>

          <div className="table-wrap reveal">
            <table>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Drupal</th>
                  <th>WordPress</th>
                  <th>Custom Code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Structured content modeling</td>
                  <td>✓ Excellent</td>
                  <td>⚠ Limited</td>
                  <td>✓ Expensive</td>
                </tr>
                <tr>
                  <td>Built-in relational data</td>
                  <td>✓ Native</td>
                  <td>✗ Plugins needed</td>
                  <td>✓ Manual SQL</td>
                </tr>
                <tr>
                  <td>Scalability</td>
                  <td>✓ Enterprise-grade</td>
                  <td>⚠ Medium</td>
                  <td>✓ Team-dependent</td>
                </tr>
                <tr>
                  <td>Configuration as code</td>
                  <td>✓ Built-in</td>
                  <td>✗ Not supported</td>
                  <td>✓ Manual</td>
                </tr>
                <tr>
                  <td>Learning curve</td>
                  <td>⚠ Steeper</td>
                  <td>✓ Easy</td>
                  <td>✗ Very hard</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Prerequisites</h2>
          <ul className="styled reveal">
            <li>
              A computer running <strong>Windows, macOS, or Linux</strong>
            </li>
            <li>
              Basic familiarity with a <strong>terminal / command line</strong>
            </li>
            <li>
              A code editor like <strong>VS Code</strong>
            </li>
            <li>An internet connection for downloading packages</li>
            <li>Patience and curiosity 🙂</li>
          </ul>

          <hr className="section-divider" />

          <h2 className="section-title reveal">
            Part 1: Setting Up Drupal Locally — The Professional Way
          </h2>

          <h3 className="sub-title reveal">What Is DDEV and Why Use It?</h3>

          <p>
            PHP applications like Drupal need a full stack: a web server, a database,
            and a PHP interpreter. DDEV wraps all of these into{" "}
            <strong>Docker containers</strong>, giving you a one-command local server
            that behaves exactly like a real production environment — HTTPS certificates
            included.
          </p>
        </div>

        <div className="container-wide reveal">
          <div className="img-block">
            <img
              src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1400&q=80"
              alt="Docker containers and development environment"
              loading="lazy"
            />
            <p className="img-caption">
              // DDEV orchestrates Nginx + MariaDB + PHP inside Docker containers on your
              machine
            </p>
          </div>
        </div>

        <div className="container">
          <div className="step-card reveal">
            <span className="step-num">Step 01</span>
            <h3>Install Docker</h3>
            <p>
              <strong>Windows:</strong> Install Docker Desktop. Check{" "}
              <strong>"Use WSL 2 instead of Hyper-V"</strong> during setup.
            </p>
            <p>
              <strong>macOS:</strong> Download Docker Desktop — choose Intel or Apple
              Silicon based on your chip.
            </p>
            <p>
              <strong>Linux:</strong>
            </p>
            <pre data-lang="bash">
              <code>sudo apt-get update && sudo apt-get install docker.io</code>
            </pre>
            <p>Verify:</p>
            <pre data-lang="bash">
              <code>
                docker --version{"\n"}# Docker version 24.x.x
              </code>
            </pre>
          </div>

          <div className="step-card reveal">
            <span className="step-num">Step 02</span>
            <h3>Install DDEV</h3>
            <p>
              <strong>macOS (Homebrew):</strong>
            </p>
            <pre data-lang="bash">
              <code>brew install ddev/ddev/ddev</code>
            </pre>
            <p>
              <strong>Windows (Chocolatey):</strong>
            </p>
            <pre data-lang="powershell">
              <code>choco install ddev</code>
            </pre>
            <p>
              <strong>Linux:</strong>
            </p>
            <pre data-lang="bash">
              <code>curl -fsSL https://ddev.com/install.sh | bash</code>
            </pre>
          </div>

          <div className="step-card reveal">
            <span className="step-num">Step 03</span>
            <h3>Install mkcert — For Local HTTPS</h3>
            <p>
              Creates locally trusted HTTPS certificates so your browser doesn't throw
              "Connection not private" warnings.
            </p>
            <pre data-lang="bash">
              <code>
                brew install mkcert # macOS / Linux{"\n"}mkcert -install # Run on ALL
                platforms after installing
              </code>
            </pre>
            <div className="callout tip">
              <span className="callout-icon">💡</span>
              <div>
                <div className="callout-title">Pro Tip</div>
                Always run <code>mkcert -install</code> after installing. Without this
                step, the certificate authority won't be registered with your browser
                and HTTPS will fail silently.
              </div>
            </div>
          </div>

          <div className="step-card reveal">
            <span className="step-num">Step 04</span>
            <h3>Create Your Project and Initialize DDEV</h3>
            <pre data-lang="bash">
              <code>
                mkdir my-drupal-site{"\n"}cd my-drupal-site{"\n"}ddev config
                --project-type=drupal11 --docroot=web --create-docroot
              </code>
            </pre>
            <div className="callout info">
              <span className="callout-icon">🔎</span>
              <div>
                <div className="callout-title">What Does This Do?</div>
                <code>--project-type=drupal11</code> sets the correct PHP version.{" "}
                <code>--docroot=web</code> tells the server public files live in{" "}
                <code>/web</code> (standard Drupal convention).{" "}
                <code>--create-docroot</code> creates that folder automatically.
              </div>
            </div>
          </div>

          <div className="step-card reveal">
            <span className="step-num">Step 05</span>
            <h3>Start Environment &amp; Download Drupal via Composer</h3>
            <pre data-lang="bash">
              <code>ddev start</code>
            </pre>
            <p>Then pull Drupal (Composer is PHP's package manager — like npm for Node.js):</p>
            <pre data-lang="bash">
              <code>ddev composer create drupal/recommended-project</code>
            </pre>
            <p>Add Drush — your command-line superpower:</p>
            <pre data-lang="bash">
              <code>ddev composer require drush/drush</code>
            </pre>
          </div>

          <div className="step-card reveal">
            <span className="step-num">Step 06</span>
            <h3>Launch the Drupal Installer</h3>
            <pre data-lang="bash">
              <code>ddev launch</code>
            </pre>
            <p>This opens your browser to the installation wizard:</p>
            <ol className="styled">
              <li>
                Choose Language → <strong>English</strong>
              </li>
              <li>
                Choose Profile → <strong>Standard</strong> (recommended for beginners)
              </li>
              <li>
                Database Configuration → <strong>click "Save and continue"</strong> —
                DDEV passes credentials automatically!
              </li>
              <li>
                Configure Site → Enter your site name, admin email, and a strong admin
                password
              </li>
            </ol>
          </div>
        </div>

        <div className="container-wide reveal">
          <div className="img-block">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80"
              alt="Laptop showing a website dashboard"
              loading="lazy"
            />
            <p className="img-caption">
              // Your local Drupal admin panel — the control center for your entire travel
              site
            </p>
          </div>
        </div>

        <div className="container">
          <h3 className="sub-title reveal">Essential DDEV Commands — Save These</h3>
          <div className="cmd-grid reveal">
            <div className="cmd-item">
              <code>ddev start</code>
              <span>Wake up your local site</span>
            </div>
            <div className="cmd-item">
              <code>ddev stop</code>
              <span>Shut down to save memory</span>
            </div>
            <div className="cmd-item">
              <code>ddev drush cr</code>
              <span>Rebuild cache — use constantly</span>
            </div>
            <div className="cmd-item">
              <code>ddev describe</code>
              <span>See URLs and DB credentials</span>
            </div>
            <div className="cmd-item">
              <code>ddev restart</code>
              <span>Restart if something breaks</span>
            </div>
            <div className="cmd-item">
              <code>ddev stop --all</code>
              <span>Stop all DDEV projects</span>
            </div>
          </div>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Understanding Drupal's Architecture</h2>

          <p>
            Before building, you need a mental model of how Drupal works. This will make
            every step click into place.
          </p>

          <div className="arch-diagram reveal">
            <span className="hl">Your Travel Site</span>
            <br />
            ├── <span className="dir">Content Types</span>{" "}
            <span className="comment">← Destination, Activity</span>
            <br />
            │&nbsp;&nbsp;&nbsp;└── <span className="dir">Fields</span>{" "}
            <span className="comment">← Image, Description, Entity Reference</span>
            <br />
            ├── <span className="dir">Nodes</span>{" "}
            <span className="comment">← Hunza Valley, Tokyo, Jeep Safari...</span>
            <br />
            ├── <span className="dir">Views</span>{" "}
            <span className="comment">← Activities by Destination (smart query)</span>
            <br />
            ├── <span className="dir">Paragraphs</span>{" "}
            <span className="comment">← Text+Image LEGO blocks</span>
            <br />
            ├── <span className="dir">Layout Builder</span>{" "}
            <span className="comment">← Visual page layout editor</span>
            <br />
            └── <span className="dir">Theme</span>{" "}
            <span className="comment">← Your visual design layer</span>
          </div>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Part 2: Building the Travel Website</h2>

          <p>
            Now the fun begins. Our site will have <strong>Destination pages</strong>{" "}
            (Hunza Valley, Tokyo, Santorini), <strong>Activity listings</strong> linked to
            each destination, <strong>flexible layouts</strong> using Paragraphs, and{" "}
            <strong>smart contextual blocks</strong> using Views.
          </p>
        </div>

        <div className="container-wide reveal">
          <div className="img-grid">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80"
              alt="Mountain destination scenery like Hunza Valley"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80"
              alt="Tokyo city destination page"
              loading="lazy"
            />
          </div>
          <p className="img-caption" style={{ padding: "0 24px" }}>
            // Each Destination node will have its own rich, structured page — from
            mountain retreats to urban explorations
          </p>
        </div>

        <div className="container">
          <h3 className="sub-title reveal">Step 1: Create the 'Activity' Content Type</h3>
          <p>
            We start with Activities (the child) because Destinations will reference them
            — the child must exist before the parent can point to it.
          </p>
          <ol className="styled reveal">
            <li>Go to <strong>Structure → Content types → Add content type</strong></li>
            <li>
              Label: <code>Activity</code> — Description: "Things to do at a specific destination"
            </li>
            <li>
              Click <strong>Save and manage fields</strong>, then remove the default{" "}
              <strong>Body</strong> field
            </li>
            <li>
              Add an <strong>Image field</strong> → Label: <code>Activity Image</code>
            </li>
            <li>
              Add a <strong>Boolean field</strong> → Label: <code>Requires Booking?</code>
            </li>
          </ol>
          <div className="callout tip">
            <span className="callout-icon">💡</span>
            <div>
              <div className="callout-title">Why Remove the Body Field?</div>
              A generic text box leads to inconsistent, unsearchable content. Specific fields
              make every Activity structured identically — searchable, filterable, and scalable
              to thousands of entries.
            </div>
          </div>

          <h3 className="sub-title reveal">Step 2: Create the 'Destination' Content Type</h3>
          <ol className="styled reveal">
            <li>Go to <strong>Structure → Content types → Add content type</strong></li>
            <li>
              Label: <code>Destination</code> → Click <strong>Save and manage fields</strong>
            </li>
            <li>Remove the Body field — we'll add meaningful fields below</li>
          </ol>

          <h3 className="sub-title reveal">
            Step 3: Link Activities to Destinations via Entity Reference
          </h3>
          <p>
            This is the most important conceptual step — creating a real relationship between
            content types, like a foreign key in a database.
          </p>
          <ol className="styled reveal">
            <li>On <strong>Manage fields</strong> for Destination, click <strong>Add field</strong></li>
            <li>Under <strong>Reference</strong>, select <strong>Content</strong></li>
            <li>
              Label: <code>Related Activities</code> → Click <strong>Save and continue</strong>
            </li>
            <li>
              Set <strong>Allowed number of values</strong> to <code>Unlimited</code>
            </li>
            <li>
              Under <strong>Reference Type → Content types</strong>, check <code>Activity</code> → Save settings
            </li>
          </ol>
          <div className="callout concept">
            <span className="callout-icon">🧠</span>
            <div>
              <div className="callout-title">The Concept</div>
              You've just built a relational database structure — the same kind a backend developer builds with SQL JOIN queries. Drupal gives you this through a UI. No code required.
            </div>
          </div>
        </div>

        <div className="container-wide reveal">
          <div className="img-block">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
              alt="Network and relational data connections visualization"
              loading="lazy"
            />
            <p className="img-caption">
              // Entity Reference creates a Destination (parent) → Activity (child)
              relational structure with no SQL
            </p>
          </div>
        </div>

        <div className="container">
          <h3 className="sub-title reveal">Step 4: Install the Paragraphs Module</h3>
          <p>
            The most common beginner mistake: stuffing all destination content into one giant text box. The professional solution is <strong>Paragraphs</strong> — modular, reusable content blocks. Think of them as LEGO bricks for your page.
          </p>
          <pre data-lang="bash">
            <code>
              ddev composer require drupal/paragraphs{"\n"}ddev drush en paragraphs
              entity_reference_revisions -y
            </code>
          </pre>

          <h3 className="sub-title reveal">Step 5: Create a "Text and Image" Paragraph Type</h3>
          <ol className="styled reveal">
            <li>Go to <strong>Structure → Paragraph types → Add paragraph type</strong></li>
            <li>
              Label: <code>Text and Image</code> → Save and manage fields
            </li>
            <li>
              Add a <strong>Text field</strong> → Label: <code>Section Text</code> (formatted, long, with summary)
            </li>
            <li>
              Add an <strong>Image field</strong> → Label: <code>Section Image</code>
            </li>
            <li>
              ✓ Check <strong>"Enable Alt field"</strong> and <strong>"Alt field required"</strong> — crucial for WCAG compliance and SEO
            </li>
          </ol>

          <h3 className="sub-title reveal">Step 6: Add Paragraphs to the Destination Content Type</h3>
          <ol className="styled reveal">
            <li>Go to <strong>Structure → Content types → Destination → Manage fields</strong></li>
            <li>Click <strong>Add field</strong> → under <strong>Reference Revisions</strong>, select <strong>Paragraph</strong></li>
            <li>
              Label: <code>Page Sections</code> → Set allowed values to <code>Unlimited</code>
            </li>
            <li>Check <code>Text and Image</code> under Reference Type → Save settings</li>
          </ol>
        </div>

        <div className="container-wide reveal">
          <div className="img-grid">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=700&q=80"
              alt="Developer working at dual monitors with code"
              loading="lazy"
            />
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&q=80"
              alt="Code editor showing website development"
              loading="lazy"
            />
          </div>
          <p className="img-caption" style={{ padding: "0 24px" }}>
            // Paragraphs let each destination page have unlimited independent, richly formatted content sections
          </p>
        </div>

        <div className="container">
          <h3 className="sub-title reveal">Step 7: Enable Layout Builder</h3>
          <ol className="styled reveal">
            <li>Go to <strong>Extend</strong> and enable the <strong>Layout Builder</strong> module</li>
            <li>Navigate to <strong>Structure → Content types → Destination → Manage display</strong></li>
            <li>Check <strong>"Use Layout Builder"</strong></li>
            <li>Check <strong>"Allow each content item to have its layout customized"</strong> — Tokyo can have a completely different layout than Hunza!</li>
            <li>Click <strong>Save</strong></li>
          </ol>

          <h3 className="sub-title reveal">Step 8: Build the Global Page Template</h3>
          <p>Click the blue <strong>"Manage layout"</strong> button that now appears. You're in the Global Template editor for all Destination pages.</p>
          <ol className="styled reveal">
            <li>Click <strong>Add block</strong> → place <code>Activity Image</code> at the top</li>
            <li>Place <code>Related Activities</code> in a sidebar region</li>
            <li>Click <strong>Add block</strong> → search <code>Page Sections</code> → add it and uncheck "Display title"</li>
            <li>Click the ⚙ icon on each block → set <strong>Label</strong> to <code>- Hidden -</code></li>
            <li>Click <strong>Save layout</strong> at the top of the screen</li>
          </ol>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Step 9: Build the Smart Activities View</h2>
          <p>We want a block that <em>automatically</em> shows the right activities for whichever destination page you're viewing. This is Views — Drupal's visual query builder.</p>

          <h3 className="sub-title reveal">Create the View</h3>
          <ol className="styled reveal">
            <li>Go to <strong>Structure → Views → Add view</strong></li>
            <li>View name: <code>Activities by Destination</code> → Show: Content of type <code>Activity</code></li>
            <li>Uncheck "Create a page" → check <strong>"Create a block"</strong></li>
            <li>Block title: <code>Things to do here</code> → Display: Unformatted list of Fields</li>
            <li>Click <strong>Save and edit</strong></li>
          </ol>

          <h3 className="sub-title reveal">Add the Contextual Filter — The Smart Part</h3>
          <ol className="styled reveal">
            <li>Expand the <strong>Advanced</strong> section in the Views editor</li>
            <li>Click <strong>Add</strong> next to <strong>Contextual Filters</strong> → select <code>Related Activities</code></li>
            <li>Under "When filter value is NOT available" → select <strong>Provide default value</strong></li>
            <li>Type: <strong>Content ID from URL</strong> → Click Apply → Save the View</li>
            <li>Place the block in Layout Builder → Save layout</li>
          </ol>

          <div className="callout concept">
            <span className="callout-icon">🧠</span>
            <div>
              <div className="callout-title">The Concept</div>
              When this block loads, it reads the current page's ID from the URL and returns only the Activities linked to that Destination. Zero SQL. Zero custom code. Pure Drupal elegance.
            </div>
          </div>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Performance and SEO Optimization</h2>

          <h3 className="sub-title reveal">Cache Management</h3>
          <p>Drupal caches the Activities block uniquely per URL when you use "Content ID from URL" — so Tokyo's activities never bleed into Hunza's page. During development, clear the cache freely:</p>
          <pre data-lang="bash">
            <code>ddev drush cr # Rebuild the full render cache</code>
          </pre>

          <h3 className="sub-title reveal">Essential SEO Modules</h3>
          <pre data-lang="bash">
            <code>
              ddev composer require drupal/metatag drupal/pathauto{"\n"}ddev drush en metatag pathauto -y
            </code>
          </pre>
          <ul className="styled reveal">
            <li><strong>Metatag</strong> — Set page titles, descriptions, and Open Graph tags per content type</li>
            <li><strong>Pathauto</strong> — Auto-generates clean URLs like <code>/destinations/hunza-valley</code></li>
            <li><strong>Alt text enforcement</strong> — Already built into our Paragraph type ✓</li>
            <li><strong>Structured headings</strong> — H1 for page title, H2 for Paragraph sections</li>
          </ul>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Common Challenges and Solutions</h2>

          <div className="callout warn reveal">
            <span className="callout-icon">⚠</span>
            <div>
              <div className="callout-title">Problem: "Port 80 is already in use"</div>
              Another tool like XAMPP is occupying port 80. <strong>Fix:</strong> Run <code>ddev stop --all</code> then <code>ddev start</code>.
            </div>
          </div>

          <div className="callout warn reveal">
            <span className="callout-icon">⚠</span>
            <div>
              <div className="callout-title">Problem: File Changes Not Appearing (Windows)</div>
              Mutagen file sync can fall behind on Windows. <strong>Fix:</strong> Run <code>ddev mutagen reset</code> then <code>ddev restart</code>.
            </div>
          </div>

          <div className="callout warn reveal">
            <span className="callout-icon">⚠</span>
            <div>
              <div className="callout-title">Problem: White Screen After Installing a Module</div>
              Usually a PHP error or missing dependency. <strong>Fix:</strong> Run <code>ddev drush cr</code> first, then <code>ddev drush status</code> to diagnose.
            </div>
          </div>

          <hr className="section-divider" />

          <h2 className="section-title reveal">The Professional Finish: Configuration as Code</h2>
          <p>All your UI work — content types, fields, Paragraphs, Views, layouts — is currently stored in the database. If it gets wiped, you lose everything. Professional Drupal developers export all of this to <strong>YAML files</strong> that live in the codebase.</p>
          <pre data-lang="bash">
            <code>
              ddev drush cex -y{"\n"}# All settings saved to config/sync/ as .yml files
            </code>
          </pre>

          <pre data-lang="bash">
            <code>
              git add .{"\n"}git commit -m "feat: travel site content types, paragraphs, layout builder, views"{"\n"}git push origin main
            </code>
          </pre>

          <div className="callout concept reveal">
            <span className="callout-icon">🏆</span>
            <div>
              <div className="callout-title">The Professional Win</div>
              Anyone who clones your repository recreates the entire Drupal setup with just two commands: <code>ddev composer install</code> and <code>ddev drush cim -y</code>. Your architecture is now versionable, shareable, and safe.
            </div>
          </div>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Project Folder Structure</h2>

          <div className="arch-diagram reveal">
            <span className="hl">my-drupal-site/</span>
            <br />
            ├── <span className="dir">config/sync/</span>{" "}
            <span className="comment">← Exported YAML configuration files</span>
            <br />
            ├── <span className="dir">vendor/</span>{" "}
            <span className="comment">← PHP libraries — NEVER edit these</span>
            <br />
            ├── <span className="dir">web/</span>
            <br />
            │&nbsp;&nbsp;├── <span className="dir">core/</span>{" "}
            <span className="comment">← Drupal core — NEVER edit</span>
            <br />
            │&nbsp;&nbsp;├── <span className="dir">modules/contrib/</span>{" "}
            <span className="comment">← Paragraphs, Metatag, etc.</span>
            <br />
            │&nbsp;&nbsp;├── <span className="hl">modules/custom/</span>{" "}
            <span className="comment">← YOUR custom modules</span>
            <br />
            │&nbsp;&nbsp;├── <span className="dir">themes/contrib/</span>{" "}
            <span className="comment">← Downloaded themes</span>
            <br />
            │&nbsp;&nbsp;└── <span className="hl">themes/custom/</span>{" "}
            <span className="comment">← YOUR custom theme</span>
            <br />
            ├── <span className="hl">composer.json</span>{" "}
            <span className="comment">← Dependency manifest</span>
            <br />
            └── <span className="dir">.ddev/config.yaml</span>{" "}
            <span className="comment">← DDEV configuration</span>
          </div>

          <hr className="section-divider" />

          <h2 className="section-title reveal">Key Takeaways</h2>

          <div className="takeaway-grid reveal">
            <div className="takeaway-item">
              <span className="takeaway-icon">🐳</span>
              <div>
                <h4>Local Environment</h4>
                <p>Docker + DDEV gives you a professional, reproducible local server in minutes.</p>
              </div>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-icon">🏗</span>
              <div>
                <h4>Structured Content</h4>
                <p>Content Types + Fields replace generic text boxes with precise, queryable data.</p>
              </div>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-icon">🔗</span>
              <div>
                <h4>Relational Data</h4>
                <p>Entity References link Destinations to Activities without writing a line of SQL.</p>
              </div>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-icon">🧩</span>
              <div>
                <h4>Component Design</h4>
                <p>Paragraphs module provides modular LEGO blocks for flexible page sections.</p>
              </div>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-icon">🎨</span>
              <div>
                <h4>Visual Layouts</h4>
                <p>Layout Builder lets each destination page have a unique visual structure.</p>
              </div>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-icon">⚡</span>
              <div>
                <h4>Dynamic Content</h4>
                <p>Views + Contextual Filters auto-filter activities per destination page.</p>
              </div>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-icon">📦</span>
              <div>
                <h4>Config as Code</h4>
                <p>YAML export + Git makes your architecture portable and version-controlled.</p>
              </div>
            </div>
            <div className="takeaway-item">
              <span className="takeaway-icon">🔎</span>
              <div>
                <h4>SEO Ready</h4>
                <p>Metatag, Pathauto, and enforced alt text baked in from day one.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-wide reveal">
          <div className="img-block">
            <img
              src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=80"
              alt="Panoramic mountain landscape — the destinations your Drupal site will power"
              loading="lazy"
            />
            <p className="img-caption">
              // The destinations your Drupal site will bring to life — structured, scalable, and beautifully presented
            </p>
          </div>
        </div>

        <div className="container">
          <div className="conclusion-box reveal">
            <h2>You Built a Professional System — Not Just a Website</h2>
            <p>
              Setting up Drupal and building a travel website from scratch might have seemed overwhelming at the start. But look at what you've accomplished: a locally running Drupal installation with a professional content architecture, dynamic relational data, flexible layouts, and version-controlled configuration.
            </p>
            <p>
              The most important mindset shift to take away: <strong>think in structure, not in pages.</strong> A travel website isn't a collection of documents. It's a database of relationships — destinations, activities, media, and metadata — all connected and queryable. Drupal gives you the tools to model that professionally.
            </p>
            <p>
              You now have the foundation. Every module you add, every content type you model, and every View you build will deepen your understanding of what it means to <em>engineer</em> a content system — not just "make a website."
            </p>
            <p>Now go build something worth traveling to.</p>
            <span className="globe">🌍</span>
          </div>

          <div className="tags-section reveal">
            <span className="tag">Drupal</span>
            <span className="tag">DDEV</span>
            <span className="tag">Docker</span>
            <span className="tag">PHP</span>
            <span className="tag">CMS</span>
            <span className="tag">Tutorial</span>
            <span className="tag">Travel Website</span>
            <span className="tag">Beginner</span>
            <span className="tag">Local Dev</span>
            <span className="tag">Paragraphs</span>
            <span className="tag">Layout Builder</span>
            <span className="tag">Views</span>
            <span className="tag">Composer</span>
            <span className="tag">Drush</span>
          </div>
        </div>
      </article>

      <footer>
        Built with <span>♡</span> for developers who want to build the right way · Talha Dev · 2026
      </footer>
    </>
  );
}



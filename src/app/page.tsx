"use client";

import { FormEvent, Fragment, ReactNode, useEffect, useState } from "react";
import { FullLogo, LeafMark, LogoMark, Wordmark } from "@/components/Logo";

type Category = "Advanced" | "Facials" | "Add-ons" | "Body" | "Waxing";

const categories: { id: Category; label: string }[] = [
  { id: "Advanced", label: "Micro + Hydro" },
  { id: "Facials", label: "Facials" },
  { id: "Add-ons", label: "Add-ons" },
  { id: "Body", label: "Body" },
  { id: "Waxing", label: "Waxing" },
];

type Treatment = { name: string; price: number; duration: string; description?: string };

type MenuGroup = {
  category: Category;
  title: string;
  blurb: string;
  beloved?: boolean;
  layout: "cards" | "list";
  items: Treatment[];
};

const menu: MenuGroup[] = [
  {
    category: "Advanced",
    title: "Microdermabrasion Facials",
    blurb: "Anti-aging resurfacing that refines skin complexion and softens wrinkles, fine lines, and pores.",
    beloved: true,
    layout: "cards",
    items: [
      { name: "Microdermabrasion Facial", price: 250, duration: "90 min" },
      { name: "Microdermabrasion Clarifying Facial", price: 165, duration: "60 min" },
    ],
  },
  {
    category: "Advanced",
    title: "Hydrodermabrasion",
    blurb: "Anti-aging hydration that brightens, refines the complexion, and smooths skin tone.",
    beloved: true,
    layout: "cards",
    items: [{ name: "Hydro-Dermabrasion Facial", price: 250, duration: "90 min" }],
  },
  {
    category: "Facials",
    title: "Facials",
    blurb: "Cleansing, exfoliating, and hydrating to balance skin tone and complexion.",
    layout: "cards",
    items: [
      { name: "Gentleman’s Escape Facial", price: 200, duration: "60 min" },
      { name: "Excellence Code Facial", price: 160, duration: "60 min" },
      { name: "Time Resist Facial", price: 155, duration: "60 min" },
      { name: "Calmessence YON-KA Facial", price: 145, duration: "60 min" },
    ],
  },
  {
    category: "Add-ons",
    title: "YON-KA Add-ons",
    blurb: "Add any of these to a facial for a more targeted result.",
    layout: "cards",
    items: [
      {
        name: "Lumière Peel",
        price: 25,
        duration: "15 min",
        description: "30% AHA & BHA with 1% salicylic and glycolic acid—exfoliating and brightening to fade dark spots.",
      },
      {
        name: "Alpha Peel",
        price: 25,
        duration: "15 min",
        description: "A gentle renewing peel that refines and smooths the skin.",
      },
      {
        name: "Micro-Exfoliation",
        price: 25,
        duration: "15 min",
        description: "Exfoliating and clarifying—gently unblocks pores.",
      },
    ],
  },
  {
    category: "Body",
    title: "Luxurious Body Treatments",
    blurb: "Full-body rituals for deep relaxation and smooth, hydrated skin.",
    beloved: true,
    layout: "cards",
    items: [
      {
        name: "Body Polish & Massage",
        price: 200,
        duration: "60 min",
        description:
          "Therapeutic exfoliation and hot towel compression, followed by detoxifying bath oils and a hydrating, smoothing massage.",
      },
      {
        name: "Back Glow Facial",
        price: 145,
        duration: "60 min",
        description: "A concentrated deep pore cleanse and exfoliation designed to release muscle tension and relax.",
      },
    ],
  },
  {
    category: "Body",
    title: "Body Microdermabrasion",
    blurb: "A non-invasive treatment that refines dry, textured skin and scar tissue for a smooth, bright appearance.",
    beloved: true,
    layout: "list",
    items: [
      { name: "Back", price: 200, duration: "60 min" },
      { name: "Full arms", price: 67, duration: "45 min" },
      { name: "½ arms", price: 47, duration: "30 min" },
      { name: "Full legs", price: 100, duration: "45 min" },
      { name: "½ legs", price: 50, duration: "45 min" },
    ],
  },
  {
    category: "Waxing",
    title: "Face Waxing",
    blurb: "Quick, precise, and gentle—with soothing aftercare.",
    layout: "list",
    items: [
      { name: "Brow", price: 19, duration: "15 min" },
      { name: "Tint", price: 24, duration: "15 min" },
      { name: "Lip", price: 13, duration: "15 min" },
      { name: "Chin", price: 14, duration: "15 min" },
      { name: "Sides", price: 24, duration: "15 min" },
      { name: "Nose", price: 19, duration: "15 min" },
      { name: "Hairline", price: 15, duration: "15 min" },
      { name: "Neckline", price: 15, duration: "15 min" },
    ],
  },
  {
    category: "Waxing",
    title: "Body Waxing",
    blurb: "Silky-smooth results with a calm hand and your comfort kept close.",
    layout: "list",
    items: [
      { name: "Brazilian / Back", price: 82, duration: "30 min" },
      { name: "French bikini", price: 58, duration: "15 min" },
      { name: "Underarm", price: 30, duration: "15 min" },
      { name: "Full arm", price: 50, duration: "30 min" },
      { name: "½ arm", price: 47, duration: "15 min" },
      { name: "Full leg", price: 68, duration: "60 min" },
      { name: "½ leg", price: 48, duration: "30 min" },
      { name: "Abdomen", price: 25, duration: "15 min" },
    ],
  },
  {
    category: "Waxing",
    title: "Gentlemen’s Waxing",
    blurb: "Clean, comfortable grooming for chest, shoulders, and back.",
    layout: "list",
    items: [
      { name: "Chest", price: 68, duration: "30 min" },
      { name: "Shoulders", price: 18, duration: "15 min" },
      { name: "Back", price: 83, duration: "60 min" },
    ],
  },
];

const highlights: { category: Category; label: string; copy: string; image: string; alt: string }[] = [
  {
    category: "Advanced",
    label: "Micro + Hydrodermabrasion",
    copy: "Our most-loved anti-aging treatments to refine, brighten, and smooth.",
    image: "https://images.pexels.com/photos/20683632/pexels-photo-20683632.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    alt: "A woman receiving a microdermabrasion facial",
  },
  {
    category: "Facials",
    label: "YON-KA Facials",
    copy: "Customized facials that cleanse, exfoliate, and hydrate for balanced skin.",
    image: "https://images.pexels.com/photos/3865548/pexels-photo-3865548.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    alt: "A woman relaxing during a facial treatment",
  },
  {
    category: "Body",
    label: "Body Treatments",
    copy: "Body polish, massage, and body microdermabrasion for smooth, glowing skin.",
    image: "https://images.pexels.com/photos/10976267/pexels-photo-10976267.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    alt: "A soothing body treatment with exfoliating scrub",
  },
  {
    category: "Waxing",
    label: "Face + Body Waxing",
    copy: "From brows to full body—gentle technique and silky, lasting results.",
    image: "https://images.pexels.com/photos/15764070/pexels-photo-15764070.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
    alt: "An esthetician stirring warm wax in a studio",
  },
];

const hours = [
  { day: "Tuesday", time: "9 AM – 7 PM" },
  { day: "Thursday", time: "9 AM – 7 PM" },
  { day: "Saturday", time: "9 AM – 4 PM" },
];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const PHONE = "(203) 213-1842";
const PHONE_HREF = "tel:+12032131842";
const ADDRESS = "4130 Whitney Ave, 2nd Floor, Hamden, CT 06518";
const MAPS_URL = "https://maps.google.com/?q=4130+Whitney+Ave,+Hamden,+CT+06518";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className={diagonal ? "arrow arrow-diagonal" : "arrow"} aria-hidden="true">
      →
    </span>
  );
}

function Spark() {
  return (
    <span className="spark" aria-hidden="true">
      <LeafMark />
    </span>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={light ? "kicker kicker-light" : "kicker"}>{children}</p>;
}

function Icon({ name }: { name: "leaf" | "clock" | "path" | "home" | "pin" | "hours" | "phone" }) {
  const paths = {
    leaf: <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14Zm0 0 7-7" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
    path: <path d="M4 18c4 0 4-12 8-12s4 12 8 12" />,
    home: <path d="M4 11 12 4l8 7v8H4v-8Zm6 8v-5h4v5" />,
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    hours: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 10h16M9 3v4M15 3v4" />
      </>
    ),
    phone: (
      <path d="M6.5 3.5h3l1.5 4-2 1.2a11 11 0 0 0 6.3 6.3l1.2-2 4 1.5v3a2 2 0 0 1-2 2A16.5 16.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />
    ),
  };
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<Category | "All">("All");

  useEffect(() => {
    const pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal")).filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight,
    );
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((el) => {
      el.classList.add("reveal-pending");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function showCategory(category: Category) {
    setFilter(category);
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  }

  const visibleGroups = filter === "All" ? menu : menu.filter((group) => group.category === filter);

  function openBooking() {
    setSubmitted(false);
    setBookingOpen(true);
    setMenuOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <div className="announcement">
        <span>New location · 4130 Whitney Ave, 2nd floor, Hamden</span>
        <span className="announcement-dot">•</span>
        <span>On the Cheshire line</span>
        <a href={PHONE_HREF}>
          Call {PHONE} <Arrow />
        </a>
      </div>

      <section className="hero" id="top">
        <div className="hero-video-wrap" aria-hidden="true">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.pexels.com/videos/4264883/pexels-photo-4264883.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1260&w=2200"
          >
            <source
              src="https://videos.pexels.com/video-files/4264883/4264883-uhd_3840_2160_30fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="video-wash" />
        </div>

        <nav className="site-nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Bliss Away home">
            <LogoMark className="brand-mark" />
            <Wordmark onDark />
          </a>
          <div className="nav-links">
            <a href="#services">Treatments</a>
            <a href="#about">Meet Heidi</a>
            <a href="#visit">Visit us</a>
          </div>
          <button className="nav-book" onClick={openBooking}>
            Book a visit <Arrow />
          </button>
          <button
            className="menu-button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /> <span />
          </button>
        </nav>

        {menuOpen && (
          <div className="mobile-menu">
            <a href="#services" onClick={() => setMenuOpen(false)}>
              Treatments
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              Meet Heidi
            </a>
            <a href="#visit" onClick={() => setMenuOpen(false)}>
              Visit us
            </a>
            <button onClick={openBooking}>
              Book a visit <Arrow />
            </button>
          </div>
        )}

        <div className="hero-medallion">
          <FullLogo className="hero-logo" />
        </div>

        <div className="hero-content">
          <p className="eyebrow light-eyebrow">
            <Spark /> Facials &amp; waxing, tailored to you
          </p>
          <h1>
            Look good.
            <br />
            <em>Feel amazing.</em>
          </h1>
          <p className="hero-copy">
            A luxurious facial and waxing studio in Hamden, made for skin that wants to be understood.
          </p>
          <div className="hero-actions">
            <button className="button button-gold" onClick={openBooking}>
              Begin your ritual <Arrow />
            </button>
            <a className="text-link light-link" href="#services">
              Explore treatments <Arrow diagonal />
            </a>
          </div>
        </div>

        <div className="hero-quiet-note">
          <span className="note-line" />
          <p>
            Quietly detailed care
            <br />
            in the heart of Hamden.
          </p>
        </div>

        <a className="scroll-cue" href="#intro">
          <span>Scroll to exhale</span>
          <i />
        </a>
        <p className="video-credit">
          Treatment in motion <span>01 / 03</span>
        </p>
      </section>

      <section className="about-section" id="about">
        <div className="about-media reveal">
          <img
            src={`${basePath}/images/treatment-room.webp`}
            alt="A calm gray and white treatment room with a plum-covered bed, shelves of towels and skincare products, and a cart of wax warmers"
          />
          <div className="about-badge">
            <LogoMark className="about-badge-mark" />
            <div>
              <strong>Now open</strong>
              <span>4130 Whitney Ave · Hamden</span>
            </div>
          </div>
        </div>
        <div className="about-copy reveal">
          <Kicker>Meet your esthetician</Kicker>
          <h2>
            A peaceful escape to <em>relax &amp; recharge</em>
          </h2>
          <p>
            My passion is creating an unforgettable experience where beauty, relaxation, and self-care come together. I believe every treatment should be more than just a service—it should be a peaceful escape where you can relax, recharge, and leave feeling your absolute best.
          </p>
          <p>
            Known for my calming presence and therapeutic touch, I bring years of experience as a Licensed Esthetician. My goal is to enhance your natural beauty with a personalized experience designed around your individual needs—so you leave feeling refreshed, confident, and beautifully renewed.
          </p>
          <ul className="chip-list" aria-label="Specialties">
            <li>Customized facials</li>
            <li>Microdermabrasion</li>
            <li>Hydrodermabrasion</li>
            <li>Face + body waxing</li>
            <li>Body treatments</li>
          </ul>
          <div className="about-signoff">
            <LogoMark className="signoff-mark" />
            <div>
              <strong>Heidi Bates</strong>
              <span>Licensed Esthetician · Owner</span>
            </div>
          </div>
        </div>
      </section>

      <section className="highlights-section">
        <div className="section-head reveal">
          <Kicker>Signature treatments</Kicker>
          <h2>
            Treatments our guests <em>adore</em>
          </h2>
        </div>
        <div className="highlight-grid">
          {highlights.map((item) => (
            <button className="highlight-card reveal" key={item.category} onClick={() => showCategory(item.category)}>
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="highlight-body">
                <span className="highlight-title">{item.label}</span>
                <span className="highlight-copy">{item.copy}</span>
                <span className="highlight-link">
                  See prices <Arrow />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="menu-section" id="services">
        <div className="section-head reveal">
          <Kicker>The menu</Kicker>
          <h2>
            Every treatment, <em>thoughtfully yours</em>
          </h2>
          <p>
            Customized facials, advanced resurfacing, indulgent body treatments, and waxing from brows to back—each one designed around your individual needs.
          </p>
        </div>
        <div className="filter-pills" role="tablist" aria-label="Filter treatments">
          {[{ id: "All" as const, label: "All" }, ...categories].map((category) => {
            const groups = category.id === "All" ? menu : menu.filter((g) => g.category === category.id);
            const count = groups.reduce((total, g) => total + g.items.length, 0);
            return (
              <button
                key={category.id}
                role="tab"
                aria-selected={filter === category.id}
                className={filter === category.id ? "pill is-active" : "pill"}
                onClick={() => setFilter(category.id)}
              >
                {category.label} <span>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="menu-groups">
          {visibleGroups.map((group) => (
            <div className={`menu-group menu-group-${group.layout}`} key={group.title}>
              <div className="menu-group-head">
                <h3>
                  {group.title}
                  {group.beloved && <span className="menu-tag">Beloved</span>}
                </h3>
                <p>{group.blurb}</p>
              </div>

              {group.layout === "cards" ? (
                <div className="menu-grid">
                  {group.items.map((item) => (
                    <article className="menu-card" key={item.name}>
                      <div className="menu-card-top">
                        <span className="menu-category">{group.title}</span>
                        <LeafMark className="menu-leaf" />
                      </div>
                      <h4>{item.name}</h4>
                      {item.description ? <p>{item.description}</p> : <span className="menu-card-spacer" />}
                      <div className="menu-card-foot">
                        <span className="menu-price">
                          ${item.price}
                          <small>{item.duration}</small>
                        </span>
                        <button className="mini-book" onClick={openBooking} aria-label={`Book ${item.name}`}>
                          Book <Arrow />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <ul className="price-list">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <span className="price-name">{item.name}</span>
                      <span className="price-dots" aria-hidden="true" />
                      <span className="price-duration">{item.duration}</span>
                      <span className="price-amount">${item.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="menu-cta">
          <p>Not sure where to start? Heidi will help you choose the right treatment for your skin.</p>
          <button className="button button-ink" onClick={openBooking}>
            Book your visit <Arrow />
          </button>
        </div>
      </section>

      <section className="why-section">
        <div className="why-media reveal">
          <img
            src={`${basePath}/images/facial-treatment.webp`}
            alt="An esthetician’s gloved hands applying a treatment cream to a relaxed client’s face"
            loading="lazy"
          />
          <blockquote>
            <p>“Every treatment should be more than just a service—it should be a peaceful escape.”</p>
            <cite>Heidi Bates, Licensed Esthetician</cite>
          </blockquote>
        </div>
        <div className="why-copy reveal">
          <Kicker>The experience</Kicker>
          <h2>
            Why guests keep <em>coming back</em>
          </h2>
          <div className="feature-grid">
            <div>
              <span className="feature-icon">
                <Icon name="leaf" />
              </span>
              <h3>Designed around you</h3>
              <p>Every treatment is personalized to your skin and your individual needs.</p>
            </div>
            <div>
              <span className="feature-icon">
                <Icon name="clock" />
              </span>
              <h3>Calming, therapeutic touch</h3>
              <p>A soothing presence and unhurried care, so you can truly relax and recharge.</p>
            </div>
            <div>
              <span className="feature-icon">
                <Icon name="path" />
              </span>
              <h3>Advanced treatments</h3>
              <p>Microdermabrasion and hydrodermabrasion for visible anti-aging results.</p>
            </div>
            <div>
              <span className="feature-icon">
                <Icon name="home" />
              </span>
              <h3>A tranquil studio</h3>
              <p>From the moment you arrive, a peaceful space to leave feeling your best.</p>
            </div>
          </div>
          <button className="button button-ink" onClick={openBooking}>
            Book your escape <Arrow />
          </button>
        </div>
      </section>

      <section className="visit-section" id="visit">
        <div className="visit-copy reveal">
          <Kicker light>Visit us</Kicker>
          <h2>
            Your moment of calm, <em>on Whitney Avenue</em>
          </h2>
          <div className="info-card info-card-wide">
            <span className="info-label">
              <Icon name="pin" /> Find us
            </span>
            <p className="info-title">4130 Whitney Ave, 2nd Floor</p>
            <p>Hamden, CT 06518</p>
            <p className="info-note">
              Our new location is above Rumanoff’s Jewellers, inside W Beauty Studio on the Cheshire line.
            </p>
            <a className="info-link" href={MAPS_URL} target="_blank" rel="noreferrer">
              Get directions <Arrow diagonal />
            </a>
          </div>
          <div className="info-row">
            <div className="info-card">
              <span className="info-label">
                <Icon name="hours" /> Hours
              </span>
              <dl className="hours">
                {hours.map((row) => (
                  <Fragment key={row.day}>
                    <dt>{row.day}</dt>
                    <dd>{row.time}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
            <div className="info-card">
              <span className="info-label">
                <Icon name="phone" /> Call or text
              </span>
              <a className="info-title" href={PHONE_HREF}>
                {PHONE}
              </a>
              <p>Call to book or ask about any treatment.</p>
            </div>
          </div>
          <button className="button button-gold" onClick={openBooking}>
            Reserve your appointment <Arrow />
          </button>
        </div>
        <div className="visit-map reveal">
          <iframe
            title="Map to 4130 Whitney Ave, Hamden, CT"
            src="https://www.google.com/maps?q=4130+Whitney+Ave,+Hamden,+CT+06518&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-inner reveal">
          <LogoMark className="cta-mark" />
          <h2>
            Your <em>bliss</em> awaits
          </h2>
          <p>Relax, recharge, and leave feeling refreshed, confident, and beautifully renewed.</p>
          <div className="cta-actions">
            <button className="button button-ink" onClick={openBooking}>
              Book your visit <Arrow />
            </button>
            <a className="button button-outline" href={PHONE_HREF}>
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-about">
            <a href="#top" className="footer-logo-link" aria-label="Bliss Away home">
              <FullLogo className="footer-logo" />
            </a>
            <p>Facials, microdermabrasion, body treatments, and waxing by Heidi Bates, Licensed Esthetician, in Hamden, Connecticut.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="#services">Treatments</a>
            <a href="#about">Meet Heidi</a>
            <a href="#visit">Visit</a>
            <button onClick={openBooking}>Book online</button>
          </div>
          <div>
            <h4>Treatments</h4>
            {categories.map((category) => (
              <button key={category.id} onClick={() => showCategory(category.id)}>
                {category.label}
              </button>
            ))}
          </div>
          <div>
            <h4>Visit</h4>
            <p>4130 Whitney Ave, 2nd Floor</p>
            <p>Hamden, CT 06518</p>
            <a href={PHONE_HREF}>{PHONE}</a>
            <p>Tue &amp; Thu 9–7 · Sat 9–4</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Bliss Away · Facials &amp; Waxing</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {bookingOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setBookingOpen(false)}>
          <section
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setBookingOpen(false)} aria-label="Close booking form">
              ×
            </button>
            {submitted ? (
              <div className="booking-success">
                <FullLogo className="success-logo" />
                <p className="eyebrow">We have you</p>
                <h2>
                  Consider it
                  <br />
                  <em>the beginning.</em>
                </h2>
                <p>We’ll be in touch shortly to find a moment that feels right for you.</p>
                <button className="button button-ink" onClick={() => setBookingOpen(false)}>
                  Back to Bliss Away <Arrow />
                </button>
              </div>
            ) : (
              <>
                <FullLogo className="modal-logo" />
                <p className="eyebrow">
                  <Spark /> Start your visit
                </p>
                <h2 id="booking-title">
                  Let’s make time
                  <br />
                  <em>for your skin.</em>
                </h2>
                <p className="modal-intro">
                  Send a few details and we’ll follow up with your best next step. Prefer to talk? Call{" "}
                  <a href={PHONE_HREF}>{PHONE}</a>.
                </p>
                <form onSubmit={handleSubmit}>
                  <label>
                    Your name
                    <input required name="name" placeholder="First and last name" />
                  </label>
                  <label>
                    Email address
                    <input required type="email" name="email" placeholder="you@email.com" />
                  </label>
                  <label>
                    Phone number
                    <input type="tel" name="phone" placeholder="(203) 555-0123" />
                  </label>
                  <label>
                    I’m curious about
                    <select name="interest" defaultValue="">
                      <option value="" disabled>
                        Select a treatment
                      </option>
{menu.map((group) => (
                        <optgroup key={group.title} label={group.title}>
                          {group.items.map((item) => (
                            <option key={item.name}>
                              {group.layout === "list" ? `${group.title}: ${item.name}` : item.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                  <button className="button button-gold" type="submit">
                    Request a visit <Arrow />
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  );
}

import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   AMANA GOLD PARK — Premium Jewellery Website (Light Edition)
   450, T.H Road, Old Washermenpet, Chennai, Tamil Nadu, 600021
   Stack: React + Tailwind CSS

   Palette: warm ivory base + deep emerald + antique gold —
   a jewel-tone light theme instead of the usual cream/terracotta
   default, with deep-emerald bands (ticker, footer) punctuating
   the light page for contrast and rhythm.

   Fonts (add to index.html <head>):
   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=Cormorant+Garamond:ital@0;1&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">

   NOTE ON MEDIA: every image/video below is a stock placeholder
   (Unsplash / Coverr) for layout review. Swap every url for real
   store photography and footage before this goes live.
   ============================================================ */

/* ----------------------------- DATA ----------------------------- */

const HERO_SLIDES = [
  { img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1600", cap: "Bridal Gold, Reimagined" },
  { img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1600", cap: "Diamonds, Certified & Clear" },
  { img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1600", cap: "Hand-Finished, Always" },
  { img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1600", cap: "Three Generations of Craft" },
];

const RATES = [
  { label: "22K Gold / gram", value: "₹6,842" },
  { label: "24K Gold / gram", value: "₹7,461" },
  { label: "Silver / gram", value: "₹92" },
];

const CATEGORIES = ["All", "Bridal", "Diamond", "Gold", "Men's", "Kids"];

const COLLECTIONS = [
  { title: "Bridal Sets", cat: "Bridal", desc: "Temple & antique inspired sets for the perfect wedding day.", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=900" },
  { title: "Diamond Edit", cat: "Diamond", desc: "Certified diamonds set in 18K & 22K gold, cut to perfection.", img: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=900" },
  { title: "Everyday Gold", cat: "Gold", desc: "Lightweight chains, rings & studs for effortless daily elegance.", img: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=900" },
  { title: "Necklaces", cat: "Bridal", desc: "Statement pieces handcrafted for weddings & festive occasions.", img: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=900" },
  { title: "Rings", cat: "Diamond", desc: "Engagement, cocktail & daily-wear rings in classic gold.", img: "https://images.unsplash.com/photo-1602751584547-6d2c9b9b9f0e?q=80&w=900" },
  { title: "Bangles", cat: "Gold", desc: "Traditional kada & modern bangles, hand-finished in-house.", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=900" },
  { title: "Men's Chains", cat: "Men's", desc: "Bold gold chains & bracelets, built for daily wear.", img: "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?q=80&w=900" },
  { title: "Kids' Collection", cat: "Kids", desc: "Delicate first-jewellery pieces for little ones.", img: "https://images.unsplash.com/photo-1633555215053-2f0b8b8f8b8a?q=80&w=900" },
];

const NEW_ARRIVALS = [
  { title: "Ira Choker", price: "₹1,84,500", img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=700" },
  { title: "Vega Solitaire Ring", price: "₹96,200", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=700" },
  { title: "Meera Jhumkas", price: "₹58,900", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=700" },
  { title: "Arjun Kada", price: "₹1,12,300", img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=700" },
  { title: "Zoya Pendant", price: "₹41,750", img: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=700" },
  { title: "Kavya Bangles Set", price: "₹2,03,400", img: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=700" },
];

const PROCESS = [
  { n: "01", title: "Sourcing", desc: "Only BIS hallmark-certified gold and conflict-free diamonds enter our workshop." },
  { n: "02", title: "Design", desc: "Our in-house artists sketch each piece by hand before it ever touches metal." },
  { n: "03", title: "Casting", desc: "Master goldsmiths cast and shape every form with decades of inherited skill." },
  { n: "04", title: "Setting", desc: "Stones are set one at a time under magnification for a flawless finish." },
  { n: "05", title: "Hallmarking", desc: "Every finished piece is purity-tested and hallmarked before it reaches you." },
];

const VIDEOS = [
  { title: "The Pour", desc: "Molten gold, cast by hand.", poster: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200", src: "https://cdn.coverr.co/videos/coverr-pouring-gold-4783/1080p.mp4" },
  { title: "Stone Setting", desc: "Precision under the loupe.", poster: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1200", src: "https://cdn.coverr.co/videos/coverr-pouring-gold-4783/1080p.mp4" },
  { title: "The Final Polish", desc: "Where a piece finds its shine.", poster: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1200", src: "https://cdn.coverr.co/videos/coverr-pouring-gold-4783/1080p.mp4" },
];

const GALLERY = [
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=700",
  "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=500",
  "https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=600",
  "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?q=80&w=700",
  "https://images.unsplash.com/photo-1602751584547-6d2c9b9b9f0e?q=80&w=500",
  "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=700",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=500",
];

const TESTIMONIALS = [
  { name: "Meenakshi R.", quote: "The bridal set they made for my daughter's wedding was flawless — pure craftsmanship." },
  { name: "Farhan A.", quote: "Transparent hallmark billing and honest advice. My family's go-to shop for 15 years." },
  { name: "Priya S.", quote: "Custom design service turned my old jewellery into something completely new and modern." },
  { name: "Karthik N.", quote: "Bought my wife's engagement ring here — the diamond certification made the decision easy." },
  { name: "Divya M.", quote: "They resized and repaired an heirloom piece with so much care. It looks brand new." },
];

const FAQS = [
  { q: "Is your gold BIS hallmark-certified?", a: "Yes. Every piece we sell carries a BIS hallmark stating purity, and we're happy to show the certification at the time of billing." },
  { q: "Do you buy back old gold?", a: "We offer exchange and buy-back at the day's gold rate, minus applicable making-charge deductions. Bring the piece in-store for a free valuation." },
  { q: "Can I get a piece custom designed?", a: "Yes — share a sketch, reference photo, or just an idea, and our design team will work with you through revisions until it's right." },
  { q: "How are making charges calculated?", a: "Making charges vary by design complexity and are shown separately on your bill alongside the day's gold rate, so pricing stays transparent." },
  { q: "Do you offer repair and resizing?", a: "Yes, including ring resizing, clasp repair, and re-polishing — for pieces bought here or elsewhere." },
];

/* ----------------------------- HOOKS ----------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function useCountdown(daysFromNow = 7) {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00" });
  useEffect(() => {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const now = new Date();
      const target = new Date();
      target.setDate(now.getDate() + ((daysFromNow - now.getDay()) % 7 || daysFromNow));
      target.setHours(0, 0, 0, 0);
      let diff = target - now;
      const d = Math.floor(diff / 864e5); diff -= d * 864e5;
      const h = Math.floor(diff / 36e5); diff -= h * 36e5;
      const m = Math.floor(diff / 6e4); diff -= m * 6e4;
      const s = Math.floor(diff / 1000);
      setT({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [daysFromNow]);
  return t;
}

/* --------------------------- UI PIECES --------------------------- */
/* Color roles: gold gradient = headlines & primary CTAs.
   Emerald = borders, secondary actions, small accents.
   Deep-emerald bands = punctuation blocks on the light page. */

const GoldText = ({ children, className = "", as: As = "span" }) => (
  <As
    className={`bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#8A6A22] bg-clip-text text-transparent ${className}`}
    style={{ fontFamily: "'Playfair Display',serif" }}
  >
    {children}
  </As>
);

const Eyebrow = ({ children }) => (
  <p className="italic text-[#0F5132] text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
    {children}
  </p>
);

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setP(scrolled * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent">
      <div className="h-full bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] transition-[width] duration-150" style={{ width: `${p}%` }} />
    </div>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 900);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full grid place-items-center text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] shadow-[0_10px_30px_-10px_rgba(154,122,34,0.55)] hover:brightness-105 transition"
    >
      ↑
    </button>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/919710600811"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full grid place-items-center bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.55)] hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.35 5.07L2 22l5.06-1.33A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.62 0-3.13-.44-4.43-1.2l-.32-.19-3.03.8.81-2.95-.2-.32A7.95 7.95 0 0 1 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.4-5.9c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.1-.22-.16-.46-.28z"/>
      </svg>
    </a>
  );
}

/* Cursor-follow ambient glow, desktop only — emerald, very subtle on light bg */
function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0 opacity-[0.05]"
      style={{ background: "radial-gradient(circle, #0F5132 0%, transparent 70%)", transition: "transform 120ms ease-out" }}
    />
  );
}

/* 3D tilt card used for collections + new arrivals */
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -10;
    const ry = ((x / r.width) - 0.5) * 10;
    ref.current.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  };
  const onLeave = () => { ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)"; };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`rounded-3xl overflow-hidden border border-[#0F5132]/15 bg-[#FFFDF8] transition-shadow duration-300 hover:shadow-[0_25px_60px_-24px_rgba(15,81,50,0.35)] ${className}`}
      style={{ transformStyle: "preserve-3d", transition: "transform .15s ease" }}
    >
      {children}
    </div>
  );
}

/* ----------------------------- SECTIONS ----------------------------- */

function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.img}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1200ms]"
          style={{
            backgroundImage: `url(${s.img})`,
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? "scale(1.06)" : "scale(1)",
            transition: "opacity 1200ms ease, transform 6000ms ease",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E2D22]/70 via-[#0E2D22]/30 to-[#F8F2E6]" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="italic text-lg md:text-xl text-[#E8CE86] mb-2" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
          Old Washermenpet, Chennai
        </p>
        <h1 className="text-5xl md:text-8xl font-black leading-tight text-[#FBF7EF]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Amana Gold Park
        </h1>
        <p className="mt-5 max-w-xl text-[#EDE6D6] text-sm md:text-base">
          {HERO_SLIDES[idx].cap} — handcrafted gold, diamond &amp; bridal jewellery from three generations of Chennai's finest goldsmiths.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="#collections" className="px-7 py-3 rounded-full font-semibold text-sm text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] hover:brightness-105 hover:-translate-y-0.5 transition">
            Explore Collections
          </a>
          <a href="#contact" className="border border-[#E8CE86]/70 text-[#FBF7EF] px-7 py-3 rounded-full text-sm hover:bg-white/10 transition">
            Visit Store
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i === idx ? "#E8CE86" : "rgba(232,206,134,0.35)" }}
          />
        ))}
      </div>
    </section>
  );
}

function RateTicker() {
  return (
    <div className="bg-[#FFFDF8] border-b border-[#0F5132]/10 py-2.5">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-1 text-xs text-[#6E6455]">
        <span className="text-[#0F5132] font-medium">Today's Rate</span>
        {RATES.map((r) => (
          <span key={r.label}>
            {r.label} <span className="text-[#8A6A22] font-medium">{r.value}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Marquee() {
  return (
    <>
      <div className="bg-[#0E2D22] py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-block animate-[marquee_22s_linear_infinite] tracking-widest text-sm text-[#E8CE86]/80" style={{ fontFamily: "'Playfair Display',serif" }}>
          22K &amp; 24K HALLMARK GOLD &nbsp;•&nbsp; BRIDAL COLLECTIONS &nbsp;•&nbsp; CUSTOM DESIGNS &nbsp;•&nbsp; DIAMOND JEWELLERY &nbsp;•&nbsp; TRUSTED SINCE GENERATIONS &nbsp;•&nbsp;
          22K &amp; 24K HALLMARK GOLD &nbsp;•&nbsp; BRIDAL COLLECTIONS &nbsp;•&nbsp; CUSTOM DESIGNS &nbsp;•&nbsp; DIAMOND JEWELLERY &nbsp;•&nbsp; TRUSTED SINCE GENERATIONS &nbsp;•&nbsp;
        </div>
      </div>
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </>
  );
}

function AboutSection() {
  return (
    <Reveal className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
      <img
        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200"
        className="rounded-3xl w-full h-[420px] object-cover hover:scale-[1.02] transition-transform duration-700 shadow-[0_30px_70px_-30px_rgba(15,81,50,0.3)]"
        alt="Goldsmith at work"
      />
      <div>
        <Eyebrow>Our Story</Eyebrow>
        <h2 className="text-4xl md:text-5xl mb-5 text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Crafted with purity,<br />
          <GoldText>worn with pride</GoldText>
        </h2>
        <p className="text-[#6E6455] leading-relaxed mb-4">
          Amana Gold Park has been a trusted name on T.H Road, Old Washermenpet for generations. Every piece leaving our workshop is hallmark-certified, hand-finished, and designed to be passed down.
        </p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[["30+", "Years of Trust"], ["5000+", "Happy Families"], ["100%", "Hallmark Gold"]].map(([n, l]) => (
            <div key={l}>
              <GoldText as="p" className="text-3xl">{n}</GoldText>
              <p className="text-xs text-[#948B78]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ProcessSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <Reveal className="text-center mb-16 max-w-xl mx-auto">
        <Eyebrow>From Ore to Ornament</Eyebrow>
        <h2 className="text-4xl md:text-5xl text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          How a Piece <GoldText>Comes to Be</GoldText>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-5 gap-6">
        {PROCESS.map((p, i) => (
          <Reveal key={p.n} delay={i * 100}>
            <div className="relative pl-1">
              <span className="text-5xl font-black text-[#0F5132]/10" style={{ fontFamily: "'Playfair Display',serif" }}>{p.n}</span>
              <h3 className="text-lg mt-2 mb-2 text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>{p.title}</h3>
              <p className="text-sm text-[#948B78] leading-relaxed">{p.desc}</p>
              {i < PROCESS.length - 1 && (
                <div className="hidden md:block absolute top-6 -right-3 w-6 h-px bg-[#0F5132]/20" />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CollectionsSection() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? COLLECTIONS : COLLECTIONS.filter((c) => c.cat === active);
  return (
    <section id="collections" className="max-w-6xl mx-auto px-6 py-20">
      <Reveal className="text-center mb-10">
        <Eyebrow>Signature Lines</Eyebrow>
        <h2 className="text-4xl md:text-5xl text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Our <GoldText>Collections</GoldText>
        </h2>
      </Reveal>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-1.5 rounded-full text-xs border transition ${
              active === c
                ? "bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] text-[#1B1710] border-transparent"
                : "border-[#0F5132]/25 text-[#6E6455] hover:border-[#0F5132]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {filtered.map((item) => (
          <Reveal key={item.title}>
            <TiltCard>
              <div className="overflow-hidden">
                <img src={item.img} alt={item.title} className="h-64 w-full object-cover hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-1 text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>{item.title}</h3>
                <p className="text-sm text-[#6E6455]">{item.desc}</p>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function NewArrivalsCarousel() {
  const trackRef = useRef(null);
  const scrollBy = (dir) => trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  return (
    <section className="py-20 bg-[#FFFDF8] border-y border-[#0F5132]/10">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <Eyebrow>Just In</Eyebrow>
            <h2 className="text-4xl md:text-5xl text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
              New <GoldText>Arrivals</GoldText>
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Previous" className="w-10 h-10 rounded-full border border-[#0F5132]/25 text-[#0F5132] hover:bg-[#0F5132]/5 transition">‹</button>
            <button onClick={() => scrollBy(1)} aria-label="Next" className="w-10 h-10 rounded-full border border-[#0F5132]/25 text-[#0F5132] hover:bg-[#0F5132]/5 transition">›</button>
          </div>
        </Reveal>
        <div ref={trackRef} className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden">
          {NEW_ARRIVALS.map((p) => (
            <div key={p.title} className="min-w-[260px] snap-start rounded-2xl overflow-hidden border border-[#0F5132]/12 bg-white group shadow-[0_15px_40px_-25px_rgba(15,81,50,0.3)]">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} className="h-64 w-[260px] object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <h4 className="text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>{p.title}</h4>
                <p className="text-sm text-[#8A6A22] mt-1">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ v }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const play = () => { ref.current?.play(); setPlaying(true); };
  const pause = () => { ref.current?.pause(); ref.current.currentTime = 0; setPlaying(false); };
  return (
    <div
      onMouseEnter={play}
      onMouseLeave={pause}
      className="relative rounded-3xl overflow-hidden border border-[#0F5132]/15 group cursor-pointer shadow-[0_20px_50px_-28px_rgba(15,81,50,0.35)]"
    >
      <video ref={ref} muted loop playsInline poster={v.poster} className="w-full h-72 object-cover">
        <source src={v.src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 bg-gradient-to-t from-[#0E2D22]/90 via-[#0E2D22]/10 to-transparent transition-opacity ${playing ? "opacity-60" : "opacity-85"}`} />
      <div className="absolute bottom-0 left-0 p-5">
        <h4 className="text-[#FBF7EF] text-lg" style={{ fontFamily: "'Playfair Display',serif" }}>{v.title}</h4>
        <p className="text-xs text-[#E0D6BE]">{v.desc}</p>
      </div>
      {!playing && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-14 h-14 rounded-full bg-[#E8CE86]/95 grid place-items-center group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-y-[9px] border-y-transparent border-l-[14px] border-l-[#1B1710] ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}

function VideoShowcase() {
  return (
    <section id="video" className="max-w-6xl mx-auto px-6 py-24">
      <Reveal className="text-center mb-14 max-w-xl mx-auto">
        <Eyebrow>Behind the Craft</Eyebrow>
        <h2 className="text-4xl md:text-5xl text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Watch the <GoldText>Making</GoldText>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {VIDEOS.map((v, i) => (
          <Reveal key={v.title} delay={i * 120}>
            <VideoCard v={v} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CustomDesignSection() {
  return (
    <Reveal className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-14 items-center">
      <div className="order-2 md:order-1">
        <Eyebrow>Bespoke Service</Eyebrow>
        <h2 className="text-4xl md:text-5xl mb-5 text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Design it with <GoldText>us</GoldText>
        </h2>
        <p className="text-[#6E6455] leading-relaxed mb-6">
          Bring a sketch, a reference photo, or an heirloom you'd like reimagined. Our design team turns it into a wearable piece — with revisions until you're happy, and full pricing shown before we begin.
        </p>
        <ul className="space-y-3 text-sm text-[#6E6455] mb-8">
          {["Free first consultation", "3D preview before casting", "Old-gold exchange accepted"].map((f) => (
            <li key={f} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F5132]" />
              {f}
            </li>
          ))}
        </ul>
        <a href="#contact" className="inline-block px-7 py-3 rounded-full font-semibold text-sm text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] hover:brightness-105 transition">
          Start a Design
        </a>
      </div>
      <img
        src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=1200"
        className="order-1 md:order-2 rounded-3xl w-full h-[420px] object-cover hover:scale-[1.02] transition-transform duration-700 shadow-[0_30px_70px_-30px_rgba(15,81,50,0.3)]"
        alt="Custom jewellery sketch and design process"
      />
    </Reveal>
  );
}

function GallerySection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <Reveal className="text-center mb-12">
        <Eyebrow>From the Workshop Floor</Eyebrow>
        <h2 className="text-4xl md:text-5xl text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          A Closer <GoldText>Look</GoldText>
        </h2>
      </Reveal>
      <div className="columns-2 md:columns-4 gap-4 [&>*]:mb-4">
        {GALLERY.map((src, i) => (
          <div key={i} className="rounded-2xl overflow-hidden border border-[#0F5132]/10 break-inside-avoid group">
            <img src={src} alt="" className="w-full object-cover group-hover:scale-110 group-hover:brightness-105 transition-transform duration-700" />
          </div>
        ))}
      </div>
    </section>
  );
}

function OfferSection() {
  const timer = useCountdown(7);
  return (
    <section id="offer" className="max-w-4xl mx-auto px-6 py-16 text-center">
      <Reveal>
        <div className="rounded-3xl p-10 md:p-14 bg-[#FFFDF8] border border-[#0F5132]/12 shadow-[0_30px_70px_-35px_rgba(15,81,50,0.3)]">
          <Eyebrow>Festive Exclusive</Eyebrow>
          <h2 className="text-3xl md:text-4xl mb-6 text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
            Making Charges <GoldText>Waived Off</GoldText> — This Week Only
          </h2>
          <div className="flex justify-center gap-4 md:gap-8">
            {[["Days", timer.d], ["Hours", timer.h], ["Mins", timer.m], ["Secs", timer.s]].map(([label, val]) => (
              <div key={label} className="text-center">
                <GoldText as="div" className="text-3xl md:text-5xl">{val}</GoldText>
                <p className="text-xs mt-1 text-[#948B78]">{label}</p>
              </div>
            ))}
          </div>
          <a href="#contact" className="inline-block mt-8 px-8 py-3 rounded-full font-semibold text-sm text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] hover:brightness-105 transition">
            Claim the Offer
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function TestimonialsSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const cur = TESTIMONIALS[idx];
  return (
    <section id="testimonials" className="max-w-3xl mx-auto px-6 py-20 text-center">
      <Reveal className="mb-10">
        <Eyebrow>Loved by Families</Eyebrow>
        <h2 className="text-4xl md:text-5xl text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Client <GoldText>Stories</GoldText>
        </h2>
      </Reveal>
      <div className="rounded-2xl p-8 md:p-10 bg-[#FFFDF8] border border-[#0F5132]/12 min-h-[180px] flex flex-col justify-center shadow-[0_25px_60px_-32px_rgba(15,81,50,0.3)]">
        <p key={idx} className="italic text-xl md:text-2xl text-[#2E2A22] leading-relaxed animate-[fadein_.5s_ease]" style={{ fontFamily: "'Cormorant Garamond',serif" }}>
          "{cur.quote}"
        </p>
        <p className="text-xs text-[#948B78] mt-6">— {cur.name}</p>
      </div>
      <style>{`@keyframes fadein{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Testimonial ${i + 1}`}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i === idx ? "#C9A227" : "rgba(201,162,39,0.3)" }}
          />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ item, open, onClick }) {
  return (
    <div className="border-b border-[#0F5132]/12">
      <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-[#211D16] text-base md:text-lg pr-6" style={{ fontFamily: "'Playfair Display',serif" }}>{item.q}</span>
        <span className={`text-[#0F5132] text-xl transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"}`}>
        <p className="overflow-hidden text-sm text-[#6E6455] leading-relaxed">{item.a}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <Reveal className="text-center mb-10">
        <Eyebrow>Good to Know</Eyebrow>
        <h2 className="text-4xl md:text-5xl text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Frequently <GoldText>Asked</GoldText>
        </h2>
      </Reveal>
      <Reveal>
        {FAQS.map((f, i) => (
          <FAQItem key={f.q} item={f} open={open === i} onClick={() => setOpen(open === i ? -1 : i)} />
        ))}
      </Reveal>
    </section>
  );
}

function NewsletterBar() {
  const [done, setDone] = useState(false);
  return (
    <section className="py-14 bg-[#0E2D22]">
      <Reveal className="max-w-3xl mx-auto px-6 text-center">
        <h3 className="text-2xl md:text-3xl mb-2 text-[#FBF7EF]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Stay in the <GoldText>Loop</GoldText>
        </h3>
        <p className="text-sm text-[#B9CFC2] mb-6">New collections, festive offers, and store news — nothing else.</p>
        {done ? (
          <p className="text-sm text-[#E8CE86]">You're subscribed — thank you.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input required type="email" placeholder="Your email address" className="flex-1 bg-white/5 border border-white/20 rounded-full px-5 py-3 text-sm placeholder-[#B9CFC2] focus:outline-none focus:border-[#E8CE86] text-[#FBF7EF]" />
            <button type="submit" className="px-6 py-3 rounded-full font-semibold text-sm text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] hover:brightness-105 transition">
              Subscribe
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [agree, setAgree] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!agree) return;
    setSent(true);
    e.target.reset();
  };
  return (
    <form onSubmit={submit} className="rounded-3xl p-8 bg-[#FFFDF8] border border-[#0F5132]/12 shadow-[0_25px_60px_-32px_rgba(15,81,50,0.3)]">
      <h3 className="text-2xl mb-5 text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>Send an Enquiry</h3>
      <input required placeholder="Full Name" className="w-full mb-4 bg-white border border-[#0F5132]/20 rounded-xl px-4 py-3 text-sm placeholder-[#948B78] focus:outline-none focus:border-[#0F5132] text-[#211D16]" />
      <input required type="tel" placeholder="Phone Number" className="w-full mb-4 bg-white border border-[#0F5132]/20 rounded-xl px-4 py-3 text-sm placeholder-[#948B78] focus:outline-none focus:border-[#0F5132] text-[#211D16]" />
      <textarea rows="3" placeholder="Your Message" className="w-full mb-4 bg-white border border-[#0F5132]/20 rounded-xl px-4 py-3 text-sm placeholder-[#948B78] focus:outline-none focus:border-[#0F5132] text-[#211D16]" />
      <label className="flex items-start gap-2 text-xs text-[#6E6455] mb-5">
        <input required type="checkbox" className="mt-0.5 accent-[#0F5132]" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>
          I agree to the <a href="#privacy" className="text-[#0F5132] underline">Privacy Policy</a> and{" "}
          <a href="#terms" className="text-[#0F5132] underline">Terms &amp; Conditions</a>.
        </span>
      </label>
      <button type="submit" className="w-full py-3 rounded-xl font-semibold text-sm text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] hover:brightness-105 transition">
        Send Enquiry
      </button>
      {sent && <p className="text-xs text-[#0F5132] mt-3">Thank you — we'll get back to you shortly.</p>}
    </form>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
      <Reveal>
        <Eyebrow>Get In Touch</Eyebrow>
        <h2 className="text-4xl mb-5 text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
          Visit <GoldText>Our Store</GoldText>
        </h2>
        <p className="text-[#6E6455] mb-2 leading-relaxed">450, T.H Road, Old Washermenpet,<br />Chennai, Tamil Nadu, 600021</p>
        <p className="text-sm text-[#948B78] mb-6">Open daily, 10:00 AM – 8:30 PM · Closed on major festivals</p>
        <div className="rounded-2xl overflow-hidden border border-[#0F5132]/15 h-64">
          <iframe
            title="Amana Gold Park location"
            className="w-full h-full"
            loading="lazy"
            style={{ filter: "saturate(.8)" }}
            src="https://www.google.com/maps?q=450+T.H+Road+Old+Washermenpet+Chennai+Tamil+Nadu+600021&output=embed"
          />
        </div>
      </Reveal>
      <Reveal><ContactForm /></Reveal>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <section id="privacy" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display',serif" }}><GoldText>Privacy Policy</GoldText></h2>
      <div className="text-sm text-[#6E6455] space-y-3 leading-relaxed">
        <p>Amana Gold Park ("we", "us") respects your privacy. Information you share through our contact form or newsletter — name, phone number, email and message — is used only to respond to your enquiry and is never sold or shared with third parties.</p>
        <p>We may retain enquiry details for record-keeping and customer service purposes. You may request deletion of your data at any time by contacting our store directly at the address below.</p>
        <p>This website does not knowingly collect information from minors. By submitting the contact form, you consent to this policy.</p>
      </div>
    </section>
  );
}

function Terms() {
  return (
    <section id="terms" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-3xl mb-4" style={{ fontFamily: "'Playfair Display',serif" }}><GoldText>Terms &amp; Conditions</GoldText></h2>
      <div className="text-sm text-[#6E6455] space-y-3 leading-relaxed">
        <p>All jewellery sold by Amana Gold Park is hallmark-certified as per applicable purity standards. Prices are subject to daily gold rate fluctuations and are confirmed only at the time of billing in-store.</p>
        <p>Making charges, offers and promotions displayed on this website are indicative and subject to change without prior notice. Exchange and buy-back policies follow current store guidelines — please ask our staff for details.</p>
        <p>By using this website or submitting an enquiry, you agree to these terms. For any dispute, Chennai jurisdiction shall apply.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0E2D22] mt-10 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-sm text-[#B9CFC2]">
        <div>
          <p className="text-lg text-[#E8CE86] mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>Amana Gold Park</p>
          <p className="leading-relaxed">450, T.H Road, Old Washermenpet, Chennai, Tamil Nadu, 600021</p>
        </div>
        <div>
          <p className="text-[#FBF7EF] mb-3">Explore</p>
          <div className="flex flex-col gap-2">
            <a href="#collections" className="hover:text-[#E8CE86] transition">Collections</a>
            <a href="#video" className="hover:text-[#E8CE86] transition">Craft</a>
            <a href="#offer" className="hover:text-[#E8CE86] transition">Offer</a>
            <a href="#testimonials" className="hover:text-[#E8CE86] transition">Testimonials</a>
          </div>
        </div>
        <div>
          <p className="text-[#FBF7EF] mb-3">Company</p>
          <div className="flex flex-col gap-2">
            <a href="#privacy" className="hover:text-[#E8CE86] transition">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#E8CE86] transition">Terms</a>
            <a href="#contact" className="hover:text-[#E8CE86] transition">Contact</a>
          </div>
        </div>
        <div>
          <p className="text-[#FBF7EF] mb-3">Follow</p>
          <div className="flex gap-3">
            {["Instagram", "Facebook", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="w-9 h-9 rounded-full border border-white/20 grid place-items-center text-xs hover:border-[#E8CE86] hover:text-[#E8CE86] transition">
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-[#6E8577] mt-10">© 2026 Amana Gold Park. All rights reserved.</p>
    </footer>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-[env(safe-area-inset-top)]">
      <div className="mx-3 mt-3 rounded-2xl px-5 py-3 flex items-center justify-between bg-[#FBF7EF]/85 backdrop-blur-md border border-[#0F5132]/12 shadow-[0_15px_40px_-28px_rgba(15,81,50,0.4)]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86]" style={{ fontFamily: "'Playfair Display',serif" }}>
            AGP
          </div>
          <span className="text-lg tracking-wide text-[#211D16]" style={{ fontFamily: "'Playfair Display',serif" }}>
            Amana <GoldText>Gold Park</GoldText>
          </span>
        </div>
        <nav className="hidden lg:flex gap-7 text-sm text-[#3B362B]">
          <a href="#collections" className="hover:text-[#0F5132] transition">Collections</a>
          <a href="#video" className="hover:text-[#0F5132] transition">Craft</a>
          <a href="#offer" className="hover:text-[#0F5132] transition">Offer</a>
          <a href="#testimonials" className="hover:text-[#0F5132] transition">Testimonials</a>
          <a href="#contact" className="hover:text-[#0F5132] transition">Visit Us</a>
        </nav>
        <a href="#contact" className="text-xs font-semibold px-4 py-2 rounded-full text-[#1B1710] bg-gradient-to-r from-[#8A6A22] via-[#C9A227] to-[#E8CE86] hover:brightness-105 transition">
          Book a Visit
        </a>
      </div>
    </header>
  );
}

/* ============================== MAIN APP ============================== */
export default function App() {
  return (
    <div
      className="relative min-h-screen text-[#211D16]"
      style={{
        fontFamily: "'Inter',sans-serif",
        backgroundColor: "#F8F2E6",
        backgroundImage:
          "radial-gradient(circle at 8% 0%, rgba(201,162,39,0.08), transparent 40%), radial-gradient(circle at 92% 15%, rgba(15,81,50,0.06), transparent 35%)",
      }}
    >
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <HeroSlider />
      <RateTicker />
      <Marquee />
      <AboutSection />
      <ProcessSection />
      <CollectionsSection />
      <NewArrivalsCarousel />
      <VideoShowcase />
      <CustomDesignSection />
      <GallerySection />
      <OfferSection />
      <TestimonialsSlider />
      <FAQSection />
      <NewsletterBar />
      <ContactSection />
      <PrivacyPolicy />
      <Terms />
      <Footer />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}
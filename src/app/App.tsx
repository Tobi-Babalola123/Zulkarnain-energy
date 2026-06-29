import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion/react";
import {
  Sun,
  Zap,
  Leaf,
  TrendingDown,
  Home,
  Building2,
  Factory,
  Droplets,
  LightbulbOff,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Check,
  Star,
  Linkedin,
  Menu,
  X,
  Shield,
  Award,
  Battery,
  Gauge,
  Calendar,
} from "lucide-react";

// ─── Brand Tokens ────────────────────────────────────────────────────────────
const BLUE = "#244B9A";
const GREEN = "#35C26B";
const ORANGE = "#FF9F1A";
const DARK = "#1E293B";
const DISPLAY = "'Plus Jakarta Sans', sans-serif";

// ─── Float + misc keyframes (injected once) ─────────────────────────────────
const GLOBAL_STYLES = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-14px); }
  }
  .ze-float { animation: float 4s ease-in-out infinite; }
  * { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(36,75,154,0.3); border-radius: 99px; }
`;

// ─── Hooks ───────────────────────────────────────────────────────────────────
function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return count;
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const links = [
    "Home",
    "Solutions",
    "Products",
    "Projects",
    "About",
    "Blog",
    "Contact",
  ];
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "white" : "transparent",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: GREEN }}
            >
              <Sun className="w-5 h-5 text-white" />
            </div>
            <div>
              <div
                className="font-extrabold text-base leading-none"
                style={{
                  fontFamily: DISPLAY,
                  color: scrolled ? BLUE : "white",
                }}
              >
                Zulkarnain
              </div>
              <div
                className="text-xs font-semibold leading-none mt-0.5"
                style={{ color: scrolled ? GREEN : "rgba(255,255,255,0.75)" }}
              >
                Energy Limited
              </div>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium transition-opacity hover:opacity-60"
                style={{ color: scrolled ? DARK : "white" }}
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:-translate-y-px hover:shadow-lg"
              style={{ backgroundColor: BLUE, fontFamily: DISPLAY }}
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setOpen(!open)}
            style={{ color: scrolled ? DARK : "white" }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="block py-2.5 px-3 rounded-xl text-sm font-medium hover:bg-gray-50"
                style={{ color: DARK }}
                onClick={() => setOpen(false)}
              >
                {l}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-2 px-4 py-3 rounded-xl text-sm font-bold text-white text-center"
              style={{ backgroundColor: BLUE }}
              onClick={() => setOpen(false)}
            >
              Get Free Quote
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1753881110611-00755160afd2?w=1920&h=1080&fit=crop&auto=format")`,
          backgroundColor: BLUE,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(36,75,154,0.92) 0%, rgba(10,22,40,0.80) 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: "rgba(53,194,107,0.18)",
                color: GREEN,
                border: "1px solid rgba(53,194,107,0.35)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: GREEN }}
              />
              Nigeria's Leading Renewable Energy Company
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-white mb-6"
              style={{ fontFamily: DISPLAY, lineHeight: 1.12 }}
            >
              Powering Nigeria With{" "}
              <span style={{ color: GREEN }}>Smart Renewable</span> Energy
              Solutions
            </h1>

            <p className="text-lg text-white/75 mb-9 max-w-lg leading-relaxed">
              Helping homeowners, businesses, schools, and industries reduce
              electricity costs through reliable solar energy systems, premium
              inverters, and battery storage solutions.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ backgroundColor: GREEN, fontFamily: DISPLAY }}
              >
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.28)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Explore Projects
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                "Certified Engineers",
                "Premium Solar Products",
                "Nationwide Installation",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: GREEN }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-white/85 text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Glassmorphism card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="ze-float rounded-3xl p-7 w-full max-w-sm"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.35)",
              }}
            >
              <div className="flex items-center gap-2.5 mb-6">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: GREEN }}
                >
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: DISPLAY }}
                >
                  Solar Performance
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Est. Monthly Savings",
                    value: "₦45,000+",
                    icon: TrendingDown,
                    color: GREEN,
                  },
                  {
                    label: "Installation Time",
                    value: "1–3 Days",
                    icon: Calendar,
                    color: ORANGE,
                  },
                  {
                    label: "Warranty",
                    value: "25 Years",
                    icon: Shield,
                    color: "#93C5FD",
                  },
                  {
                    label: "System Performance",
                    value: "98.5%",
                    icon: Gauge,
                    color: GREEN,
                  },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div
                    key={label}
                    className="rounded-2xl p-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                  >
                    <Icon className="w-4 h-4 mb-2.5" style={{ color }} />
                    <div
                      className="text-xl font-black text-white"
                      style={{ fontFamily: DISPLAY }}
                    >
                      {value}
                    </div>
                    <div className="text-xs text-white/50 mt-1 leading-tight">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/15">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/50 text-xs">System uptime</span>
                  <span className="text-white font-bold text-xs">99.2%</span>
                </div>
                <div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "99.2%", backgroundColor: GREEN }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
        <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1">
          <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────
function Partners() {
  const { ref, inView } = useInView();
  const brands = [
    {
      name: "Jinko Solar",
      logo: "/Images/jinko.png",
    },
    {
      name: "MUST",
      logo: "/Images/musstsolar.png",
    },
    {
      name: "Deye",
      logo: "/Images/deye.webp",
    },
    {
      name: "Canadian Solar",
      logo: "/Images/Canadian.png",
    },
    {
      name: "Luminous",
      logo: "/Images/494997.png",
    },
    {
      name: "Felicity Solar",
      logo: "/Images/felicity-logo.png",
    },
  ];
  const marqueeBrands = [...brands, ...brands];
  return (
    <section
      className="py-16 bg-white border-b"
      style={{ borderColor: "rgba(36,75,154,0.07)" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center text-xs font-bold uppercase tracking-widest mb-10"
          style={{ color: "#94A3B8" }}
        >
          Trusted Partner Brands
        </p>
        <div className="relative overflow-hidden py-6">
          {/* Fade Left */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />

          {/* Fade Right */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

          <motion.div
            className="flex gap-6"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 25,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="group flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{
                  borderColor: "rgba(15, 80, 210, 0.08)",
                }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-10 w-auto object-contain  transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ─────────────────────────────────────────────────────────────────
function Benefits() {
  const { ref, inView } = useInView();
  const items = [
    {
      icon: TrendingDown,
      title: "Lower Electricity Bills",
      desc: "Cut monthly utility costs by up to 90% with a correctly sized solar system tailored to your consumption.",
      color: GREEN,
    },
    {
      icon: Battery,
      title: "Reliable Backup Power",
      desc: "Never worry about NEPA outages again. Battery storage solutions keep your home or business running 24/7.",
      color: BLUE,
    },
    {
      icon: Leaf,
      title: "Clean Renewable Energy",
      desc: "Reduce your carbon footprint and contribute to a greener Nigeria by generating 100% clean solar energy.",
      color: GREEN,
    },
    {
      icon: Zap,
      title: "Long-Term Savings",
      desc: "A solar investment pays for itself in 3–4 years, then delivers 25+ years of virtually free electricity.",
      color: ORANGE,
    },
  ];
  return (
    <section
      id="solutions"
      className="py-24"
      style={{ backgroundColor: "#F8FAFC" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: GREEN, backgroundColor: "rgba(53,194,107,0.1)" }}
          >
            Why Solar?
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            The Smarter Way to Power Your Life
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            Thousands of Nigerians are already enjoying freedom from expensive
            fuel and unreliable grid power.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc, color }, i) => (
            <div
              key={title}
              className={`bg-white rounded-2xl p-7 border hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                borderColor: "rgba(36,75,154,0.08)",
                transitionDelay: `${i * 90}ms`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ backgroundColor: color + "18" }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </div>
              <h3
                className="font-bold text-lg mb-2.5"
                style={{ fontFamily: DISPLAY, color: DARK }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#64748B" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions ────────────────────────────────────────────────────────────────
function Solutions() {
  const { ref, inView } = useInView();
  const solutions = [
    {
      icon: Home,
      title: "Residential Solar",
      desc: "Complete home solar systems with battery backup, designed to power your entire household reliably.",
    },
    {
      icon: Building2,
      title: "Commercial Solar",
      desc: "Cost-effective solar solutions for offices, malls, hotels, and commercial properties of any size.",
    },
    {
      icon: Factory,
      title: "Industrial Solar",
      desc: "High-capacity installations that significantly reduce operational energy costs at scale.",
    },
    {
      icon: Droplets,
      title: "Solar Water Pumps",
      desc: "Efficient solar-powered pumping systems for irrigation, boreholes, and water supply.",
    },
    {
      icon: LightbulbOff,
      title: "Solar Street Lights",
      desc: "All-in-one solar street lights for estates, roads, campuses, and public areas.",
    },
    {
      icon: BarChart3,
      title: "Energy Consulting",
      desc: "Expert energy audits, system sizing, and strategic consulting to optimize your energy spend.",
    },
  ];
  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: BLUE, backgroundColor: "rgba(36,75,154,0.08)" }}
          >
            Our Services
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            Comprehensive Solar Solutions
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748B" }}>
            From residential rooftops to industrial campuses — we design,
            supply, and install the right system for you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className={`group rounded-2xl p-7 border hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                borderColor: "rgba(36,75,154,0.10)",
                backgroundColor: "#F8FAFC",
                transitionDelay: `${i * 75}ms`,
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: `linear-gradient(135deg, ${BLUE}14, ${GREEN}14)`,
                }}
              >
                <Icon className="w-7 h-7" style={{ color: BLUE }} />
              </div>
              <h3
                className="font-bold text-lg mb-2.5"
                style={{ fontFamily: DISPLAY, color: DARK }}
              >
                {title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "#64748B" }}
              >
                {desc}
              </p>
              <button
                className="inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 hover:gap-3"
                style={{ color: BLUE }}
              >
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const { ref, inView } = useInView();
  const projects = [
    {
      img: "https://images.unsplash.com/photo-1726866492047-7f9516558c6e?w=800&h=500&fit=crop&auto=format",
      location: "Victoria Island, Lagos",
      capacity: "50kW",
      challenge: "High diesel generator costs eating into profits",
      solution: "Grid-tied commercial solar with smart monitoring",
      result: "₦2.8M annual savings, 100% daytime energy independence",
    },
    {
      img: "https://images.unsplash.com/photo-1780445392528-4895da4b2cb8?w=800&h=500&fit=crop&auto=format",
      location: "Garki, Abuja",
      capacity: "30kW",
      challenge: "Frequent power outages disrupting school operations",
      solution: "Hybrid solar + 100kWh LFP battery storage system",
      result: "Zero disruptions, 85% reduction in energy costs",
    },
    {
      img: "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?w=800&h=500&fit=crop&auto=format",
      location: "Kano Industrial Estate",
      capacity: "120kW",
      challenge: "Rising fuel costs reducing factory competitiveness",
      solution: "Industrial solar array powering full manufacturing line",
      result: "₦12M annual savings, 150-tonne CO₂ reduction",
    },
  ];
  return (
    <section
      id="projects"
      className="py-24"
      style={{ backgroundColor: "#F8FAFC" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: GREEN, backgroundColor: "rgba(53,194,107,0.1)" }}
          >
            Case Studies
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            Featured Installations
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(
            ({ img, location, capacity, challenge, solution, result }, i) => (
              <div
                key={location}
                className={`bg-white rounded-2xl overflow-hidden border hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{
                  borderColor: "rgba(36,75,154,0.08)",
                  transitionDelay: `${i * 110}ms`,
                }}
              >
                <div className="relative overflow-hidden h-52 bg-blue-100">
                  <img
                    src={img}
                    alt={`Solar installation in ${location}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    {capacity}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin
                      className="w-3.5 h-3.5 flex-shrink-0"
                      style={{ color: BLUE }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-wide"
                      style={{ color: BLUE }}
                    >
                      {location}
                    </span>
                  </div>
                  <div
                    className="space-y-2 text-xs leading-relaxed"
                    style={{ color: "#64748B" }}
                  >
                    <div>
                      <span className="font-semibold" style={{ color: DARK }}>
                        Challenge:{" "}
                      </span>
                      {challenge}
                    </div>
                    <div>
                      <span className="font-semibold" style={{ color: DARK }}>
                        Solution:{" "}
                      </span>
                      {solution}
                    </div>
                    <div>
                      <span className="font-semibold" style={{ color: GREEN }}>
                        Results:{" "}
                      </span>
                      {result}
                    </div>
                  </div>
                  <button
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-200 hover:gap-3"
                    style={{ color: BLUE }}
                  >
                    View Project <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Calculator ───────────────────────────────────────────────────────────────
function CalculatorSection() {
  const { ref, inView } = useInView();
  const [bill, setBill] = useState(30000);
  const [propertyType, setPropertyType] = useState("Residential");
  const [hoursOut, setHoursOut] = useState(8);

  const kw =
    bill < 20000
      ? 3
      : bill < 50000
        ? 5
        : bill < 100000
          ? 10
          : bill < 200000
            ? 15
            : 20;
  const cost = kw * 700000;
  const monthly = Math.round(bill * 0.72);
  const annual = monthly * 12;
  const roi = (cost / annual).toFixed(1);

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: ORANGE, backgroundColor: "rgba(255,159,26,0.10)" }}
          >
            Solar Calculator
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            How Much Could You Save?
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748B" }}>
            Enter your details below for an instant estimate of your solar
            savings.
          </p>
        </div>

        <div
          className={`max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{
            background: `linear-gradient(135deg, ${BLUE} 0%, #0A1628 100%)`,
          }}
        >
          <div className="grid lg:grid-cols-2">
            {/* Inputs */}
            <div className="p-8 lg:p-10">
              <h3
                className="text-xl font-bold text-white mb-7"
                style={{ fontFamily: DISPLAY }}
              >
                Your Details
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">
                    Monthly Electricity Bill (₦)
                  </label>
                  <input
                    type="number"
                    value={bill}
                    onChange={(e) => setBill(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl text-white font-semibold text-lg outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.18)",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">
                    Property Type
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl font-medium outline-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.10)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "white",
                    }}
                  >
                    {[
                      "Residential",
                      "Commercial",
                      "Industrial",
                      "School / Institution",
                    ].map((o) => (
                      <option
                        key={o}
                        value={o}
                        style={{ backgroundColor: "#0A1628" }}
                      >
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-white/60 mb-2">
                    Hours Without Power:{" "}
                    <span className="text-white font-bold">
                      {hoursOut}h/day
                    </span>
                  </label>
                  <input
                    type="range"
                    min={2}
                    max={20}
                    value={hoursOut}
                    onChange={(e) => setHoursOut(Number(e.target.value))}
                    className="w-full accent-green-400"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>2h</span>
                    <span>20h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div
              className="p-8 lg:p-10"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3
                className="text-xl font-bold text-white mb-7"
                style={{ fontFamily: DISPLAY }}
              >
                Your Estimate
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Recommended Package",
                    value: `${kw}kW System`,
                    color: GREEN,
                  },
                  {
                    label: "Est. Monthly Savings",
                    value: `₦${monthly.toLocaleString()}`,
                    color: GREEN,
                  },
                  {
                    label: "Annual Savings",
                    value: `₦${annual.toLocaleString()}`,
                    color: ORANGE,
                  },
                  {
                    label: "Investment Payback",
                    value: `${roi} years`,
                    color: "#93C5FD",
                  },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-3.5 px-4 rounded-2xl"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-xs text-white/55">{label}</span>
                    <span
                      className="text-lg font-extrabold"
                      style={{ fontFamily: DISPLAY, color }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-6 w-full block text-center py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ backgroundColor: GREEN, fontFamily: DISPLAY }}
              >
                Get Your Free Custom Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────
function Process() {
  const { ref, inView } = useInView();
  const steps = [
    {
      num: "01",
      title: "Consultation",
      desc: "Free expert consultation to understand your energy needs and goals.",
    },
    {
      num: "02",
      title: "Site Inspection",
      desc: "Our engineers visit your site to assess the optimal solar configuration.",
    },
    {
      num: "03",
      title: "System Design",
      desc: "Custom system design and detailed proposal tailored to your property.",
    },
    {
      num: "04",
      title: "Installation",
      desc: "Professional installation by certified engineers, completed in 1–3 days.",
    },
    {
      num: "05",
      title: "Maintenance",
      desc: "Ongoing monitoring, servicing, and after-sales support for peace of mind.",
    },
  ];
  return (
    <section className="py-24" style={{ backgroundColor: "#F8FAFC" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: BLUE, backgroundColor: "rgba(36,75,154,0.08)" }}
          >
            How It Works
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            Simple 5-Step Installation Process
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div
            className="hidden lg:block absolute top-10 left-0 right-0 h-0.5"
            style={{ backgroundColor: "rgba(36,75,154,0.10)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-[1200ms] ease-out"
              style={{
                width: inView ? "100%" : "0%",
                backgroundColor: BLUE,
                transitionDelay: "400ms",
              }}
            />
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map(({ num, title, desc }, i) => (
              <div
                key={num}
                className={`relative text-center transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${300 + i * 160}ms` }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 text-xl font-black relative z-10 transition-colors duration-700"
                  style={{
                    fontFamily: DISPLAY,
                    backgroundColor: inView ? BLUE : "#E2E8F0",
                    color: inView ? "white" : "#94A3B8",
                    transitionDelay: `${300 + i * 160}ms`,
                    boxShadow: `0 0 0 8px ${BLUE}14`,
                  }}
                >
                  {num}
                </div>
                <h4
                  className="font-bold mb-2"
                  style={{ fontFamily: DISPLAY, color: DARK }}
                >
                  {title}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#64748B" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────
function WhyUs() {
  const { ref, inView } = useInView();
  const features = [
    "Certified Engineers with 10+ years of experience",
    "Premium Products — only top-tier manufacturers",
    "Full Manufacturer Warranty on all components",
    "Flexible Financing options available",
    "Professional Installation to the highest standards",
    "Dedicated After-Sales Support team",
  ];
  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`relative transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="rounded-3xl overflow-hidden bg-blue-100 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1648135327756-b606e2eb8caa?w=700&h=525&fit=crop&auto=format"
                alt="Zulkarnain engineers on a solar installation"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-5 -right-5 rounded-2xl px-6 py-4 shadow-xl"
              style={{ backgroundColor: GREEN }}
            >
              <div
                className="text-3xl font-black text-white"
                style={{ fontFamily: DISPLAY }}
              >
                10+
              </div>
              <div className="text-xs text-white/80 font-semibold">
                Years of Excellence
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
              style={{ color: BLUE, backgroundColor: "rgba(36,75,154,0.08)" }}
            >
              Why Choose Us
            </span>
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-5"
              style={{ fontFamily: DISPLAY, color: DARK }}
            >
              Why Thousands Trust Zulkarnain Energy
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#64748B" }}
            >
              We don't just sell solar panels — we deliver complete energy
              freedom. Our certified engineers handle everything from design to
              installation and long-term support.
            </p>
            <div className="space-y-3.5">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: GREEN }}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "#475569" }}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              style={{ backgroundColor: BLUE, fontFamily: DISPLAY }}
            >
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────
function Team() {
  const { ref, inView } = useInView();
  const team = [
    {
      img: "/Images/abubakar.png",
      name: "Abubakar Zulkarnaini.",
      role: "Chief Executive Officer (CEO) Zulkarnain Energy LTD ",
    },
    {
      img: "/Images/aliyu.png",
      name: "Aliyu Muhammad BSc Econs.",
      role: "Director, Zulkarnain Energy LTD ",
    },
    {
      img: "/Images/yahaya.png",
      name: "Yahaya Zulkarnain.",
      role: "Manager, Zulkarnain Energy LTD ",
    },
    {
      img: "/Images/adolph.png",
      name: "Adolph Benjamin. ",
      role: "Head Of Engineering. ZEL Energy ",
    },
  ];
  return (
    <section className="py-24" style={{ backgroundColor: "#F8FAFC" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: GREEN, backgroundColor: "rgba(53,194,107,0.1)" }}
          >
            Our Team
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            Meet Our Expert Team
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            Meet the experts helping homes and businesses transition to cleaner,
            more reliable energy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map(({ img, name, role }, i) => (
            <div
              key={name}
              className={`group overflow-hidden rounded-3xl bg-white border shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                borderColor: "rgba(36,75,154,0.08)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src={img}
                  alt={name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="px-6 py-5 text-center">
                <p
                  className="mb-2 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: GREEN }}
                >
                  {role}
                </p>

                <h3
                  className="text-xl font-bold"
                  style={{ fontFamily: DISPLAY, color: DARK }}
                >
                  {name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Education ────────────────────────────────────────────────────────────────
function Education() {
  const products = [
    {
      image: "/Images/solarp.png",
      logo: "/brands/jinko.png",
      badge: "Best Seller",
      name: "Jinko 585W N-Type Solar Panel",
      category: "Solar Panel",
      price: "₦165,000",
    },
    {
      image: "/Images/musst.png",
      logo: "/brands/must.png",
      badge: "New Arrival",
      name: "MUST 5kW Hybrid Inverter",
      category: "Hybrid Inverter",
      price: "₦980,000",
    },
    {
      image: "/Images/deyebatt.png",
      logo: "/brands/deye.png",
      badge: "10-Year Warranty",
      name: "51.2V 200Ah Lithium Battery",
      category: "Battery Storage",
      price: "₦2,450,000",
    },
    {
      image: "/Images/solarkitt.png",
      logo: "/brands/gled.png",
      badge: "Complete Package",
      name: "5kVA Complete Solar Kit",
      category: "Solar Package",
      price: "From ₦4,950,000",
    },
  ];
  const { ref, inView } = useInView();
  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}

        <div className="text-center mb-16">
          <span
            className="inline-block rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
            style={{
              color: GREEN,
              backgroundColor: "rgba(53,194,107,.1)",
            }}
          >
            Featured Products
          </span>

          <h2
            className="mt-5 text-3xl md:text-4xl font-extrabold"
            style={{
              fontFamily: DISPLAY,
              color: DARK,
            }}
          >
            Premium Solar Products
          </h2>

          <p
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{ color: "#64748B" }}
          >
            Browse some of our most popular solar panels, lithium batteries,
            inverters and complete solar solutions.
          </p>
        </div>

        {/* Products */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, i) => (
            <div
              key={product.name}
              className={`group overflow-hidden rounded-3xl bg-white border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                inView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{
                borderColor: "rgba(36,75,154,.08)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {/* Image */}

              <div className="relative aspect-square overflow-hidden rounded-t-3xl bg-gradient-to-br from-slate-50 to-slate-100">
                <div
                  className="absolute left-4 top-4 z-20 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg"
                  style={{ backgroundColor: GREEN }}
                >
                  {product.badge}
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-10 transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}

              <div className="p-6">
                <p
                  className="mb-2 text-sm font-semibold uppercase tracking-wide"
                  style={{ color: GREEN }}
                >
                  {product.category}
                </p>

                <h3
                  className="min-h-[60px] text-xl font-bold"
                  style={{
                    color: DARK,
                    fontFamily: DISPLAY,
                  }}
                >
                  {product.name}
                </h3>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Starting From
                    </p>

                    <h3
                      className="text-2xl font-extrabold"
                      style={{ color: BLUE }}
                    >
                      {product.price}
                    </h3>
                  </div>
                </div>

                <button
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    backgroundColor: GREEN,
                    fontFamily: DISPLAY,
                  }}
                >
                  Request Quote
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M13 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="mt-16 text-center">
          <a
            href="#products"
            className="inline-flex items-center rounded-xl px-8 py-4 font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{
              backgroundColor: BLUE,
              fontFamily: DISPLAY,
            }}
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Stat Card (needs own component to avoid hook-in-loop) ───────────────────
function StatCard({
  target,
  suffix,
  label,
  icon: Icon,
  active,
}: {
  target: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  active: boolean;
}) {
  const count = useCounter(target, 2200, active);
  return (
    <div className="text-center">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
        style={{
          backgroundColor: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <Icon className="w-7 h-7" style={{ color: "white" }} />
      </div>
      <div
        className="text-5xl font-black text-white mb-2"
        style={{ fontFamily: DISPLAY }}
      >
        {count}
        {suffix}
      </div>
      <div
        className="text-sm font-medium"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function Stats() {
  const { ref, inView } = useInView(0.3);
  const stats = [
    { target: 1000, suffix: "+", label: "Solar Installations", icon: Sun },
    { target: 10, suffix: "MW+", label: "Clean Energy Generated", icon: Zap },
    { target: 98, suffix: "%", label: "Customer Satisfaction", icon: Star },
    { target: 10, suffix: "+", label: "Years of Experience", icon: Award },
  ];
  return (
    <section
      className="py-24"
      style={{
        background: `linear-gradient(135deg, #0A1628 0%, ${BLUE} 100%)`,
      }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: DISPLAY }}
          >
            Our Track Record
          </h2>
          <p
            style={{ color: "rgba(255,255,255,0.50)" }}
            className="max-w-xl mx-auto"
          >
            Numbers that reflect our commitment to quality, reliability, and
            customer satisfaction across Nigeria.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const { ref, inView } = useInView();
  const [active, setActive] = useState(0);
  const reviews = [
    {
      name: "Mrs. Fatima Abubakar",
      location: "Maitama, Abuja",
      rating: 5,
      text: "Zulkarnain Energy transformed my home. I haven't touched my generator in 8 months. The team was professional, clean, and incredibly efficient. I highly recommend them to every Nigerian homeowner.",
    },
    {
      name: "Alhaji Musa Tanko",
      location: "GRA, Kano",
      rating: 5,
      text: "My factory was spending ₦800,000 monthly on diesel. After Zulkarnain installed our 80kW solar system, that cost has dropped to near zero. The ROI was faster than they projected.",
    },
    {
      name: "Dr. Chinwe Okonkwo",
      location: "Ikeja, Lagos",
      rating: 5,
      text: "From the first consultation to post-installation support, the Zulkarnain team has been exceptional. The system performs above expectations. Clean energy finally feels accessible.",
    },
    {
      name: "Mr. Ibrahim Yusuf",
      location: "Wuse II, Abuja",
      rating: 5,
      text: "I was skeptical at first but their engineers were patient and thorough. They designed a perfect system for my villa. 18 months in and zero issues. Worth every naira.",
    },
  ];
  const prev = () => setActive((active - 1 + reviews.length) % reviews.length);
  const next = () => setActive((active + 1) % reviews.length);
  return (
    <section className="py-24" style={{ backgroundColor: "#F8FAFC" }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: GREEN, backgroundColor: "rgba(53,194,107,0.1)" }}
          >
            Testimonials
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            What Our Customers Say
          </h2>
        </div>

        <div
          className={`max-w-3xl mx-auto transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div
            className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border"
            style={{ borderColor: "rgba(36,75,154,0.08)" }}
          >
            <div className="flex gap-1 mb-5">
              {[...Array(reviews[active].rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-current"
                  style={{ color: ORANGE }}
                />
              ))}
            </div>
            <p
              className="text-lg leading-relaxed mb-8 italic"
              style={{ color: "#475569" }}
            >
              "{reviews[active].text}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <div
                  className="font-bold"
                  style={{ fontFamily: DISPLAY, color: DARK }}
                >
                  {reviews[active].name}
                </div>
                <div
                  className="text-sm flex items-center gap-1 mt-0.5"
                  style={{ color: "#94A3B8" }}
                >
                  <MapPin className="w-3 h-3" />
                  {reviews[active].location}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:-translate-x-0.5"
                  style={{ borderColor: "rgba(36,75,154,0.2)", color: BLUE }}
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:opacity-90 hover:translate-x-0.5"
                  style={{ backgroundColor: BLUE }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  backgroundColor: i === active ? BLUE : "#CBD5E1",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const { ref, inView } = useInView();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: "How much does solar installation cost?",
      a: "The cost depends on system size and property type. A typical 5kW residential system costs between ₦3.5M–₦5M. We offer flexible financing options, and most systems pay back their investment within 3–4 years through energy savings.",
    },
    {
      q: "How long do solar batteries last?",
      a: "Our lithium LFP batteries have a lifespan of 8–15 years with proper care. They come with a manufacturer's warranty of 5–10 years depending on the brand.",
    },
    {
      q: "Do you offer maintenance services?",
      a: "Yes. We offer comprehensive maintenance packages including periodic system inspections, panel cleaning, inverter checks, and real-time remote monitoring. Our support team is available 6 days a week.",
    },
    {
      q: "Can solar completely replace my generator?",
      a: "Absolutely. With the right system size and battery capacity, solar can fully replace your generator for most daily loads, making generators a rare last resort rather than a daily necessity.",
    },
    {
      q: "Do you provide warranties on installations?",
      a: "Yes. We provide a 2-year workmanship warranty on all installations, plus we pass on full manufacturer warranties — 25 years on solar panels, and 5–10 years on inverters and batteries.",
    },
  ];
  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: BLUE, backgroundColor: "rgba(36,75,154,0.08)" }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div
          className={`space-y-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {faqs.map(({ q, a }, i) => (
            <div
              key={i}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: "rgba(36,75,154,0.10)" }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  backgroundColor:
                    open === i ? "rgba(36,75,154,0.04)" : "white",
                }}
              >
                <span
                  className="font-semibold text-sm pr-4 leading-snug"
                  style={{ fontFamily: DISPLAY, color: DARK }}
                >
                  {q}
                </span>
                <ChevronDown
                  className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: BLUE,
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5 pt-1">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#64748B" }}
                  >
                    {a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section
      className="py-24"
      style={{
        background: `linear-gradient(135deg, ${GREEN} 0%, #1A9E55 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          className="text-3xl md:text-5xl font-extrabold text-white mb-5"
          style={{ fontFamily: DISPLAY }}
        >
          Ready to Switch to Clean Energy?
        </h2>
        <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join over 1,000 Nigerian homes and businesses that have made the
          switch to reliable, affordable solar energy. Your first consultation
          is completely free.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-2xl"
            style={{ backgroundColor: BLUE, fontFamily: DISPLAY }}
          >
            Get Free Quote <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="tel:+2348000000000"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:-translate-y-1 hover:shadow-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.18)",
              border: "2px solid rgba(255,255,255,0.4)",
              fontFamily: DISPLAY,
            }}
          >
            <Phone className="w-5 h-5" /> Call Our Experts
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const { ref, inView } = useInView();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    property: "Residential",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle = {
    backgroundColor: "#F8FAFC",
    border: "1px solid rgba(36,75,154,0.12)",
    color: DARK,
  } as React.CSSProperties;

  return (
    <section
      id="contact"
      className="py-24"
      style={{ backgroundColor: "#F8FAFC" }}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5"
            style={{ color: BLUE, backgroundColor: "rgba(36,75,154,0.08)" }}
          >
            Get In Touch
          </span>
          <h2
            className="text-3xl md:text-4xl font-extrabold"
            style={{ fontFamily: DISPLAY, color: DARK }}
          >
            Let's Talk About Your Solar Project
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          >
            <div className="space-y-5 mb-8">
              {[
                { icon: Phone, label: "Phone", value: "+234 800 000 0000" },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@zulkarnainenergy.com",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "Plot 45, Utako District, Abuja, Nigeria",
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Mon–Sat: 8:00 AM – 6:00 PM",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(36,75,154,0.08)" }}
                  >
                    <Icon className="w-5 h-5" style={{ color: BLUE }} />
                  </div>
                  <div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wide mb-0.5"
                      style={{ color: "#94A3B8" }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: DARK }}
                    >
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg h-72">
              <iframe
                title="GLED Energy Office Location"
                src="https://www.google.com/maps?q=Utako,+Abuja,+Nigeria&output=embed"
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 shadow-lg border space-y-4"
              style={{ borderColor: "rgba(36,75,154,0.08)" }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wide mb-1.5"
                    style={{ color: "#64748B" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    placeholder="Your full name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wide mb-1.5"
                    style={{ color: "#64748B" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    placeholder="+234 800 000 0000"
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wide mb-1.5"
                  style={{ color: "#64748B" }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  placeholder="your@email.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={inputStyle}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wide mb-1.5"
                  style={{ color: "#64748B" }}
                >
                  Property Type
                </label>
                <select
                  value={form.property}
                  onChange={(e) =>
                    setForm({ ...form, property: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={inputStyle}
                >
                  {[
                    "Residential",
                    "Commercial",
                    "Industrial",
                    "School / Institution",
                  ].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-xs font-bold uppercase tracking-wide mb-1.5"
                  style={{ color: "#64748B" }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  placeholder="Tell us about your energy needs..."
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all hover:-translate-y-0.5 hover:shadow-xl"
                style={{
                  backgroundColor: sent ? GREEN : BLUE,
                  fontFamily: DISPLAY,
                }}
              >
                {sent
                  ? "✓ Message Sent! We'll be in touch shortly."
                  : "Request My Free Quote"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "Blog", "Press"],
    },
    {
      title: "Solutions",
      links: [
        "Residential Solar",
        "Commercial Solar",
        "Industrial Solar",
        "Water Pumps",
        "Street Lights",
      ],
    },
    {
      title: "Resources",
      links: [
        "Solar Calculator",
        "Case Studies",
        "Product Catalog",
        "FAQs",
        "Energy Blog",
      ],
    },
    {
      title: "Support",
      links: [
        "Contact Us",
        "Installation Guide",
        "Maintenance",
        "Warranty Claims",
        "Partner With Us",
      ],
    },
  ];
  return (
    <footer style={{ backgroundColor: "#07101F" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-10 mb-12">
          {/* Brand col */}
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: GREEN }}
              >
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div>
                <div
                  className="font-extrabold text-white"
                  style={{ fontFamily: DISPLAY }}
                >
                  Zulkarnain
                </div>
                <div className="text-xs font-semibold" style={{ color: GREEN }}>
                  Energy Limited
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Nigeria's trusted renewable energy company delivering clean,
              reliable solar solutions nationwide.
            </p>
            <div
              className="flex rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2.5 text-xs outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: "white",
                }}
              />
              <button
                className="px-4 py-2.5 text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: GREEN }}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Link cols */}
          {cols.map(({ title, links }) => (
            <div key={title}>
              <h4
                className="font-bold text-sm text-white mb-4"
                style={{ fontFamily: DISPLAY }}
              >
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>
            © 2024 Zulkarnain Energy Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{GLOBAL_STYLES}</style>
      <Nav />
      <main>
        <Hero />
        <Partners />
        <Benefits />
        <Solutions />
        <Projects />
        <CalculatorSection />
        <Process />
        <WhyUs />
        <Team />
        <Education />
        <Stats />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

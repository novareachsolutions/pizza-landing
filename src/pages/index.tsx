import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

// Custom hook for scroll-based animations
const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Animated component wrapper
const AnimatedSection = ({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  threshold = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  animation?:
    | "fadeUp"
    | "fadeIn"
    | "fadeLeft"
    | "fadeRight"
    | "scale"
    | "slideUp";
  delay?: number;
  threshold?: number;
}) => {
  const { ref, isVisible } = useScrollAnimation(threshold);

  const animations = {
    fadeUp: "translate-y-12 opacity-0",
    fadeIn: "opacity-0",
    fadeLeft: "translate-x-12 opacity-0",
    fadeRight: "-translate-x-12 opacity-0",
    scale: "scale-95 opacity-0",
    slideUp: "translate-y-8 opacity-0",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className} ${
        isVisible
          ? "translate-y-0 translate-x-0 opacity-100 scale-100"
          : animations[animation]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Animation styles - floating for testimonials + hero carousel animations
const floatingStyles = `
  @keyframes float1 {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    25% { transform: translate(8px, -10px) rotate(1deg); }
    50% { transform: translate(-5px, -15px) rotate(-0.5deg); }
    75% { transform: translate(-10px, -5px) rotate(0.5deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  @keyframes float2 {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    20% { transform: translate(-10px, -8px) rotate(-1deg); }
    40% { transform: translate(6px, -14px) rotate(0.5deg); }
    60% { transform: translate(12px, -6px) rotate(1deg); }
    80% { transform: translate(-4px, -10px) rotate(-0.5deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  @keyframes float3 {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    33% { transform: translate(-8px, -12px) rotate(0.8deg); }
    66% { transform: translate(10px, -8px) rotate(-0.8deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  @keyframes float4 {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    25% { transform: translate(6px, -6px) rotate(-0.5deg); }
    50% { transform: translate(-8px, -12px) rotate(0.5deg); }
    75% { transform: translate(4px, -8px) rotate(-0.3deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  @keyframes float5 {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    20% { transform: translate(-6px, -10px) rotate(0.6deg); }
    40% { transform: translate(8px, -6px) rotate(-0.4deg); }
    60% { transform: translate(-4px, -14px) rotate(0.8deg); }
    80% { transform: translate(10px, -8px) rotate(-0.6deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }
    50% {
      opacity: 1;
      transform: scale(1.05);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: translate(0, -50%) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translate(0, -50%) scale(1);
    }
  }
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .float-animation-1 { animation: float1 6s ease-in-out infinite; }
  .float-animation-2 { animation: float2 8s ease-in-out infinite 0.5s; }
  .float-animation-3 { animation: float3 5s ease-in-out infinite 1s; }
  .float-animation-4 { animation: float4 7s ease-in-out infinite 0.3s; }
  .float-animation-5 { animation: float5 9s ease-in-out infinite 0.8s; }
  .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
  .animate-fade-in-delay { animation: fadeIn 0.8s ease-out 0.4s forwards; }
  .animate-slide-in-left { animation: slideInLeft 1s ease-out 0.3s forwards; }
  .animate-slide-in-right { animation: slideInRight 1s ease-out 0.4s forwards; }
  .animate-zoom-in { animation: zoomIn 1s ease-out 0.4s forwards; }
  .animate-bounce-in { animation: bounceIn 1s ease-out 0.6s forwards; }
  .animate-scale-in { animation: scaleIn 0.9s ease-out 0.3s forwards; }
  .animate-marquee { animation: marquee 15s linear infinite; }

  @media (max-width: 768px) {
    .animate-slide-in-left,
    .animate-slide-in-right,
    .animate-zoom-in {
      animation: none;
      opacity: 1;
      transform: none;
    }
  }
`;

export default function PizzaLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3;

  // Prevent body scroll to avoid double scrollbar
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    // Store original styles
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = body.style.overflow;

    // Disable scrolling on html and body
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      // Restore original styles on unmount
      html.style.overflow = originalHtmlOverflow;
      body.style.overflow = originalBodyOverflow;
    };
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(autoPlayInterval);
  }, [totalSlides]);

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden">
      {/* Inject floating animation styles */}
      <style dangerouslySetInnerHTML={{ __html: floatingStyles }} />

      {/* ========== HERO CAROUSEL SECTION ========== */}
      <section
        className="relative h-screen overflow-hidden"
        style={{ backgroundColor: "#B42D19" }}
      >
        {/* ===== NAVBAR ===== */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-1 lg:px-16 py-5">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center relative z-50">
              <Image
                src="/pizza-images/hero-slide1-logo.png"
                alt="Famous Pizza"
                width={120}
                height={120}
                className="w-[120px] h-[120px]"
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-10">
              <Link
                href="/"
                className="text-white text-[15px] font-medium border-b border-white pb-0.5"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                Home
              </Link>
              <Link
                href="https://famous-pizza.customer.novareachsolutions.com/menu"
                className="text-white/70 hover:text-white text-[15px] font-medium transition-colors"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                Menu
              </Link>
            </div>

            {/* Order Button */}
            <Link
              href="https://famous-pizza.customer.novareachsolutions.com/menu"
              className="hidden md:inline-block bg-[#FFB800] hover:bg-[#E5A600] text-[#1a1a1a] px-6 py-2.5 rounded-full text-[15px] font-medium transition-colors"
              style={{
                fontFamily: "'Troyline Sans Stamp', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              ORDER
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 z-50"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-[#8B0000] py-4 px-6 z-50">
              <div className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="text-white font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="https://famous-pizza.customer.novareachsolutions.com/menu"
                  className="text-white/80 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Menu
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* ===== CAROUSEL CONTAINER ===== */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Carousel slides */}
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* SLIDE 1 */}
            <div className="min-w-full h-full relative">
              <div className="relative w-full h-full flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 justify-center">
                {/* Left Section - Text */}
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start flex-shrink-0">
                  <div className="relative w-full lg:w-[clamp(400px,35vw,700px)] h-[250px] sm:h-[300px] md:h-[28rem] lg:h-[36rem] animate-slide-in-left">
                    <Image
                      src="/pizza-images/hero-slide1-text.png"
                      alt="Opening Offer - $1 per inch"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right Section - Pizza Image (Mobile: bottom, Desktop: right side) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center flex-shrink-0">
                  <div className="relative w-full lg:w-[clamp(450px,40vw,800px)] h-[250px] sm:h-[300px] md:h-96 lg:h-full animate-slide-in-right">
                    <Image
                      src="/pizza-images/hero-slide1-pizza.png"
                      alt="Delicious Pizza"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                {/* Bottom Right - Halal Badge */}
                <div
                  className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 transition-all duration-1000 ${
                    currentSlide === 0
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                  style={{
                    transitionDelay: currentSlide === 0 ? "600ms" : "0ms",
                  }}
                >
                  <div className="relative w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24">
                    <Image
                      src="/pizza-images/hero-slide1-halal.png"
                      alt="Halal Certified"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDE 2 */}
            <div className="min-w-full h-full relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/pizza-images/hero-slide2-background.png"
                  alt="Background"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Mobile: Yellow background fallback */}
              <div className="absolute inset-0 -z-20 bg-[#D4A574] lg:bg-transparent"></div>

              <div className="relative w-full h-full flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 z-10">
                {/* Left Section - Text */}
                <div className="w-full lg:w-1/2 flex flex-col relative z-20">
                  {/* Student Deal Text - LARGER SIZE */}
                  <div className="flex-1 flex items-center justify-center lg:justify-start lg:items-center">
                    <div className="relative w-full h-96 md:h-[32rem] lg:h-[38rem] animate-slide-in-left">
                      <Image
                        src="/pizza-images/hero-slide2-text.png"
                        alt="Student Deal"
                        fill
                        className="object-contain object-center lg:object-left"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Section - Pizza with Coke */}
                <div className="w-full lg:w-1/2 flex items-center justify-center relative z-20">
                  <div className="relative w-full h-80 md:h-96 lg:h-full animate-zoom-in">
                    <Image
                      src="/pizza-images/hero-slide2-pizza.png"
                      alt="Pizza with Coke"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>

                {/* Bottom Right - Halal Badge */}
                <div
                  className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-30 transition-all duration-1000 ${
                    currentSlide === 1
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-0"
                  }`}
                  style={{
                    transitionDelay: currentSlide === 1 ? "600ms" : "0ms",
                  }}
                >
                  <div className="relative w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24">
                    <Image
                      src="/pizza-images/hero-slide1-halal.png"
                      alt="Halal Certified"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Marquee Ribbons - Two overlapping diagonal strips BELOW content */}
              {/* First Ribbon - rotated -6deg */}
              <div className="absolute bottom-[80px] md:bottom-[100px] lg:bottom-[170px] left-[-10%] w-[120%] overflow-hidden bg-[#A52A2A] py-4 md:py-5 -rotate-12 shadow-2xl z-[4]">
                <div className="flex whitespace-nowrap animate-marquee">
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                </div>
              </div>

              {/* Second Ribbon - rotated +6deg (crossing the first) */}
              <div className="absolute bottom-[20px] md:bottom-[30px] lg:bottom-[140px] left-[-10%] w-[120%] overflow-hidden bg-[#A52A2A] py-4 md:py-5 rotate-12 shadow-2xl z-[3]">
                <div className="flex whitespace-nowrap animate-marquee">
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                  <span className="text-white text-2xl md:text-3xl lg:text-4xl font-black mx-8 tracking-wider">
                    GET IT NOW!
                  </span>
                </div>
              </div>
            </div>

            {/* SLIDE 3 - Couple Deal */}
            <div className="min-w-full h-full relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 -z-10">
                <Image
                  src="/pizza-images/hero-slide3-background.png"
                  alt="Background"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Top Left Cheesy Drip */}
              <Image
                src="/pizza-images/hero-slide3-cheese-top.png"
                alt="Cheese Drip"
                width={512}
                height={400}
                className="absolute top-0 left-0 w-48 md:w-72 lg:w-[32rem] h-auto z-10"
              />

              {/* Bottom Right Cheesy Drip */}
              <Image
                src="/pizza-images/hero-slide3-cheese-bottom.png"
                alt="Cheese Drip"
                width={512}
                height={400}
                className="absolute bottom-0 right-0 w-48 md:w-72 lg:w-[32rem] h-auto z-10"
              />

              <div className="relative w-full h-full flex flex-col lg:flex-row p-4 md:p-8 lg:p-12 z-20 justify-center">
                {/* Left Section - Text */}
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-start flex-shrink-0">
                  <div className="relative w-full max-w-lg h-[280px] sm:h-[320px] md:h-[28rem] lg:h-[32rem] animate-slide-in-left">
                    <Image
                      src="/pizza-images/hero-slide3-text.png"
                      alt="Special Couple Deal"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Right Section - Pizza Combo */}
                <div className="w-full lg:w-1/2 flex items-center justify-center flex-shrink-0">
                  <div className="relative w-full h-[280px] sm:h-[320px] md:h-96 lg:h-full animate-slide-in-right">
                    <Image
                      src="/pizza-images/hero-slide3-combo.png"
                      alt="Pizza Combo with Garlic Bread and Pepsi"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Right - Halal Badge */}
              <div
                className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-12 lg:right-12 z-30 transition-all duration-1000 ${
                  currentSlide === 2
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0"
                }`}
                style={{
                  transitionDelay: currentSlide === 2 ? "600ms" : "0ms",
                }}
              >
                <div className="relative w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24">
                  <Image
                    src="/pizza-images/hero-slide1-halal.png"
                    alt="Halal Certified"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === 0 ? totalSlides - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={() =>
              setCurrentSlide((prev) =>
                prev === totalSlides - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-3">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== FAMOUS PIZZA MENU SECTION ========== */}
      <section className="bg-[#FAF5F0] py-16 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          {/* Section Title */}
          <AnimatedSection animation="fadeUp" className="text-center mb-10">
            <h2
              className="text-[#8B4513] text-[42px] md:text-[52px] tracking-wide"
              style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
            >
              FAMOUS PIZZA MENU
            </h2>
            {/* Yellow swoosh under title */}
            <div className="flex justify-center mt-1">
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
                <path
                  d="M5 8 Q 30 2 55 8"
                  stroke="#FFB800"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </AnimatedSection>

          {/* Category Pills */}
          <AnimatedSection
            animation="fadeUp"
            delay={200}
            className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12"
          >
            {/* Traditional Pizza */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-[120px] md:w-[140px] h-[100px] md:h-[110px] bg-white rounded-2xl shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#8B1E1E] group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 p-3">
                <img
                  src="/pizza-images/gourmet.png"
                  alt="Traditional Pizza"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <span
                className="mt-3 text-[13px] text-gray-600 tracking-wide transition-all duration-300 group-hover:text-white group-hover:bg-[#8B1E1E] px-3 py-1 rounded-full"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                TRADITIONAL PIZZA
              </span>
            </div>

            {/* Special Gourmet */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-[120px] md:w-[140px] h-[100px] md:h-[110px] bg-white rounded-2xl shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#8B1E1E] group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 p-3">
                <img
                  src="/pizza-images/special-gourmet.png"
                  alt="Special Gourmet"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <span
                className="mt-3 text-[13px] text-gray-600 tracking-wide transition-all duration-300 group-hover:text-white group-hover:bg-[#8B1E1E] px-3 py-1 rounded-full"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                SPECIAL GOURMET
              </span>
            </div>

            {/* Schnitzel */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-[120px] md:w-[140px] h-[100px] md:h-[110px] bg-white rounded-2xl shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#8B1E1E] group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 p-3">
                <img
                  src="/pizza-images/schnitzel.png"
                  alt="Schnitzel"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <span
                className="mt-3 text-[13px] text-gray-600 tracking-wide transition-all duration-300 group-hover:text-white group-hover:bg-[#8B1E1E] px-3 py-1 rounded-full"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                SCHNITZEL
              </span>
            </div>

            {/* Gourmet */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-[120px] md:w-[140px] h-[100px] md:h-[110px] bg-white rounded-2xl shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#8B1E1E] group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 p-3">
                <img
                  src="/pizza-images/gourmet.png"
                  alt="Gourmet"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <span
                className="mt-3 text-[13px] text-gray-600 tracking-wide transition-all duration-300 group-hover:text-white group-hover:bg-[#8B1E1E] px-3 py-1 rounded-full"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                GOURMET
              </span>
            </div>

            {/* Pasta */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-[120px] md:w-[140px] h-[100px] md:h-[110px] bg-white rounded-2xl shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#8B1E1E] group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 p-3">
                <img
                  src="/pizza-images/pasta.png"
                  alt="Pasta"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <span
                className="mt-3 text-[13px] text-gray-600 tracking-wide transition-all duration-300 group-hover:text-white group-hover:bg-[#8B1E1E] px-3 py-1 rounded-full"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                PASTA
              </span>
            </div>

            {/* Burger */}
            <div className="flex flex-col items-center cursor-pointer group">
              <div className="w-[120px] md:w-[140px] h-[100px] md:h-[110px] bg-white rounded-2xl shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#8B1E1E] group-hover:shadow-xl group-hover:scale-110 group-hover:-translate-y-2 p-3">
                <img
                  src="/pizza-images/burger.png"
                  alt="Burger"
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
              <span
                className="mt-3 text-[13px] text-gray-600 tracking-wide transition-all duration-300 group-hover:text-white group-hover:bg-[#8B1E1E] px-3 py-1 rounded-full"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              >
                BURGER
              </span>
            </div>
          </AnimatedSection>

          {/* Image Gallery Grid */}
          <div className="flex flex-col gap-5">
            {/* Top Row - 2 Images (Famous Light Box double size on left, 1.webp on right) */}
            <div className="flex flex-col md:flex-row gap-5">
              {/* Famous Light Box - Double size (takes 2 columns worth) */}
              <AnimatedSection
                animation="fadeLeft"
                delay={100}
                className="w-full md:w-[66%]"
              >
                <div className="relative overflow-hidden rounded-2xl h-[300px] md:h-[400px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] cursor-pointer">
                  <Image
                    src="/pizza-images/famous light box.jpg"
                    alt="Famous Pizza"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>
              </AnimatedSection>

              {/* Image 1 */}
              <AnimatedSection
                animation="fadeRight"
                delay={200}
                className="w-full md:w-[34%]"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-square md:aspect-auto md:h-[400px] transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/pizza-images/1.webp"
                    alt="Pizza Special 1"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 34vw"
                    priority
                  />
                </div>
              </AnimatedSection>
            </div>

            {/* Bottom Row - 3 Images */}
            <AnimatedSection animation="fadeUp" delay={300}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Image 2 */}
                <div className="relative overflow-hidden rounded-2xl aspect-square transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/pizza-images/2.webp"
                    alt="Pizza Special 2"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Image 3 */}
                <div className="relative overflow-hidden rounded-2xl aspect-square transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/pizza-images/3.webp"
                    alt="Pizza Special 3"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Image 4 */}
                <div className="relative overflow-hidden rounded-2xl aspect-square transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
                  <Image
                    src="/pizza-images/4.webp"
                    alt="Pizza Special 4"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== OUR BEST SELLER ITEMS SECTION ========== */}
      <section className="bg-white py-16 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto">
          {/* Section Title */}
          <AnimatedSection animation="fadeUp" className="text-center mb-12">
            <h2
              className="text-[#8B1E1E] text-[36px] md:text-[48px] tracking-wide"
              style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
            >
              OUR BEST SELLER ITEMS
            </h2>
            {/* Yellow swoosh under title */}
            <div className="flex justify-center mt-1">
              <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
                <path
                  d="M5 8 Q 30 2 55 8"
                  stroke="#FFB800"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </AnimatedSection>

          {/* Product Cards Grid */}
          <AnimatedSection animation="fadeUp" delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Product Card 1 - Peri Peri Chicken Pizza */}
              <div className="group relative flex flex-col items-center text-center cursor-pointer">
                {/* Brush stroke background - visible on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-8 -bottom-4">
                  <svg
                    viewBox="0 0 250 450"
                    fill="none"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M20 30 Q 5 50, 10 100 Q 5 200, 15 300 Q 10 380, 30 420 Q 100 440, 125 435 Q 200 440, 230 420 Q 245 380, 240 300 Q 248 200, 240 100 Q 245 50, 230 30 Q 180 10, 125 15 Q 70 10, 20 30"
                      fill="#8B1E1E"
                    />
                    {/* Rough edges */}
                    <circle cx="15" cy="80" r="8" fill="#8B1E1E" />
                    <circle cx="240" cy="120" r="6" fill="#8B1E1E" />
                    <circle cx="10" cy="250" r="7" fill="#8B1E1E" />
                    <circle cx="245" cy="320" r="5" fill="#8B1E1E" />
                    <circle cx="20" cy="400" r="8" fill="#8B1E1E" />
                    <circle cx="235" cy="400" r="6" fill="#8B1E1E" />
                  </svg>
                </div>

                {/* Heart icon - visible on hover */}
                <div className="absolute top-0 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 rounded-full p-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative z-10 w-full h-64 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/pizza-images/periperi-pizza.png"
                    alt="Peri Peri Chicken Pizza"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="relative z-10">
                  <h3
                    className="text-[#1a1a1a] group-hover:text-white text-[18px] md:text-[20px] tracking-wide mb-2 transition-colors duration-300"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    PERI PERI CHICKEN PIZZA
                  </h3>
                  <p
                    className="text-gray-500 group-hover:text-white/80 text-[13px] md:text-[14px] mb-3 max-w-[200px] transition-colors duration-300"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Peri Peri Marinated Chicken, Mushroom, Capsicum, Onion,
                    Topped with Peri Peri Mayo
                  </p>
                  <p className="mb-4">
                    <span
                      className="text-[#C23A22] group-hover:text-[#FFB800] text-[18px] md:text-[20px] transition-colors duration-300"
                      style={{
                        fontFamily: "'Troyline Sans Stamp', sans-serif",
                      }}
                    >
                      $20.99
                    </span>
                  </p>

                  {/* View Button */}
                  <Link
                    href="https://famous-pizza.customer.novareachsolutions.com/menu"
                    className="inline-flex items-center gap-2 bg-transparent group-hover:bg-[#E5A030] border-2 border-[#E5A030] text-[#1a1a1a] group-hover:text-white px-6 py-2.5 rounded-full text-[13px] tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Weissenhof Grotesk', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    VIEW
                  </Link>
                </div>
              </div>

              {/* Product Card 2 - Special Chicken 65 Pizza */}
              <div className="group relative flex flex-col items-center text-center cursor-pointer">
                {/* Brush stroke background - visible on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-8 -bottom-4">
                  <svg
                    viewBox="0 0 250 450"
                    fill="none"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M20 30 Q 5 50, 10 100 Q 5 200, 15 300 Q 10 380, 30 420 Q 100 440, 125 435 Q 200 440, 230 420 Q 245 380, 240 300 Q 248 200, 240 100 Q 245 50, 230 30 Q 180 10, 125 15 Q 70 10, 20 30"
                      fill="#8B1E1E"
                    />
                    <circle cx="15" cy="80" r="8" fill="#8B1E1E" />
                    <circle cx="240" cy="120" r="6" fill="#8B1E1E" />
                    <circle cx="10" cy="250" r="7" fill="#8B1E1E" />
                    <circle cx="245" cy="320" r="5" fill="#8B1E1E" />
                    <circle cx="20" cy="400" r="8" fill="#8B1E1E" />
                    <circle cx="235" cy="400" r="6" fill="#8B1E1E" />
                  </svg>
                </div>

                <div className="absolute top-0 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 rounded-full p-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 w-full h-64 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/pizza-images/special-65-pizza.png"
                    alt="Special Chicken 65 Pizza"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <h3
                    className="text-[#1a1a1a] group-hover:text-white text-[18px] md:text-[20px] tracking-wide mb-2 transition-colors duration-300"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    SPECIAL CHICKEN 65 PIZZA
                  </h3>
                  <p
                    className="text-gray-500 group-hover:text-white/80 text-[13px] md:text-[14px] mb-3 max-w-[200px] transition-colors duration-300"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Marinated Chicken 65, Capsicum, Mushroom, Red Onion,
                    Jalapenos, Topped with Special Garlic Sauce
                  </p>
                  <p className="mb-4">
                    <span
                      className="text-[#C23A22] group-hover:text-[#FFB800] text-[18px] md:text-[20px] transition-colors duration-300"
                      style={{
                        fontFamily: "'Troyline Sans Stamp', sans-serif",
                      }}
                    >
                      $20.99
                    </span>
                  </p>

                  <Link
                    href="https://famous-pizza.customer.novareachsolutions.com/menu"
                    className="inline-flex items-center gap-2 bg-transparent group-hover:bg-[#E5A030] border-2 border-[#E5A030] text-[#1a1a1a] group-hover:text-white px-6 py-2.5 rounded-full text-[13px] tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Weissenhof Grotesk', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    VIEW
                  </Link>
                </div>
              </div>

              {/* Product Card 3 - Chicken Tandoori */}
              <div className="group relative flex flex-col items-center text-center cursor-pointer">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-8 -bottom-4">
                  <svg
                    viewBox="0 0 250 450"
                    fill="none"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M20 30 Q 5 50, 10 100 Q 5 200, 15 300 Q 10 380, 30 420 Q 100 440, 125 435 Q 200 440, 230 420 Q 245 380, 240 300 Q 248 200, 240 100 Q 245 50, 230 30 Q 180 10, 125 15 Q 70 10, 20 30"
                      fill="#8B1E1E"
                    />
                    <circle cx="15" cy="80" r="8" fill="#8B1E1E" />
                    <circle cx="240" cy="120" r="6" fill="#8B1E1E" />
                    <circle cx="10" cy="250" r="7" fill="#8B1E1E" />
                    <circle cx="245" cy="320" r="5" fill="#8B1E1E" />
                    <circle cx="20" cy="400" r="8" fill="#8B1E1E" />
                    <circle cx="235" cy="400" r="6" fill="#8B1E1E" />
                  </svg>
                </div>

                <div className="absolute top-0 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 rounded-full p-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 w-full h-64 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/pizza-images/tandoori-pizza.png"
                    alt="Chicken Tandoori Pizza"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <h3
                    className="text-[#1a1a1a] group-hover:text-white text-[18px] md:text-[20px] tracking-wide mb-2 transition-colors duration-300"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    CHICKEN TANDOORI
                  </h3>
                  <p
                    className="text-gray-500 group-hover:text-white/80 text-[13px] md:text-[14px] mb-3 max-w-[200px] transition-colors duration-300"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Shredded Tandoori Chicken, Red Onion, Capsicum, Baby
                    Spinach, Topped With Yogurt Sauce
                  </p>
                  <p className="mb-4">
                    <span
                      className="text-[#C23A22] group-hover:text-[#FFB800] text-[18px] md:text-[20px] transition-colors duration-300"
                      style={{
                        fontFamily: "'Troyline Sans Stamp', sans-serif",
                      }}
                    >
                      $12.99
                    </span>
                    <span className="text-gray-400 group-hover:text-white/60 mx-1 transition-colors duration-300">
                      -
                    </span>
                    <span
                      className="text-[#C23A22] group-hover:text-[#FFB800] text-[18px] md:text-[20px] transition-colors duration-300"
                      style={{
                        fontFamily: "'Troyline Sans Stamp', sans-serif",
                      }}
                    >
                      $19.99
                    </span>
                  </p>

                  <Link
                    href="https://famous-pizza.customer.novareachsolutions.com/menu"
                    className="inline-flex items-center gap-2 bg-transparent group-hover:bg-[#E5A030] border-2 border-[#E5A030] text-[#1a1a1a] group-hover:text-white px-6 py-2.5 rounded-full text-[13px] tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Weissenhof Grotesk', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    VIEW
                  </Link>
                </div>
              </div>

              {/* Product Card 4 - Veggie Delight */}
              <div className="group relative flex flex-col items-center text-center cursor-pointer">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -top-8 -bottom-4">
                  <svg
                    viewBox="0 0 250 450"
                    fill="none"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M20 30 Q 5 50, 10 100 Q 5 200, 15 300 Q 10 380, 30 420 Q 100 440, 125 435 Q 200 440, 230 420 Q 245 380, 240 300 Q 248 200, 240 100 Q 245 50, 230 30 Q 180 10, 125 15 Q 70 10, 20 30"
                      fill="#8B1E1E"
                    />
                    <circle cx="15" cy="80" r="8" fill="#8B1E1E" />
                    <circle cx="240" cy="120" r="6" fill="#8B1E1E" />
                    <circle cx="10" cy="250" r="7" fill="#8B1E1E" />
                    <circle cx="245" cy="320" r="5" fill="#8B1E1E" />
                    <circle cx="20" cy="400" r="8" fill="#8B1E1E" />
                    <circle cx="235" cy="400" r="6" fill="#8B1E1E" />
                  </svg>
                </div>

                <div className="absolute top-0 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 rounded-full p-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 w-full h-64 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/pizza-images/veggie-deight.png"
                    alt="Veggie Delight Pizza"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="relative z-10">
                  <h3
                    className="text-[#1a1a1a] group-hover:text-white text-[18px] md:text-[20px] tracking-wide mb-2 transition-colors duration-300"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    VEGGIE DELIGHT
                  </h3>
                  <p
                    className="text-gray-500 group-hover:text-white/80 text-[13px] md:text-[14px] mb-3 max-w-[200px] transition-colors duration-300"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Olives, Pineapple, Capsicum, Onions, Herbs, Jalapenos with
                    Pesto & Mayo Sauce
                  </p>
                  <p className="mb-4">
                    <span
                      className="text-[#C23A22] group-hover:text-[#FFB800] text-[18px] md:text-[20px] transition-colors duration-300"
                      style={{
                        fontFamily: "'Troyline Sans Stamp', sans-serif",
                      }}
                    >
                      $11.99
                    </span>
                    <span className="text-gray-400 group-hover:text-white/60 mx-1 transition-colors duration-300">
                      -
                    </span>
                    <span
                      className="text-[#C23A22] group-hover:text-[#FFB800] text-[18px] md:text-[20px] transition-colors duration-300"
                      style={{
                        fontFamily: "'Troyline Sans Stamp', sans-serif",
                      }}
                    >
                      $17.99
                    </span>
                  </p>

                  <Link
                    href="https://famous-pizza.customer.novareachsolutions.com/menu"
                    className="inline-flex items-center gap-2 bg-transparent group-hover:bg-[#E5A030] border-2 border-[#E5A030] text-[#1a1a1a] group-hover:text-white px-6 py-2.5 rounded-full text-[13px] tracking-wider transition-all duration-300 hover:scale-105"
                    style={{
                      fontFamily: "'Weissenhof Grotesk', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    VIEW
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* View All Items Button */}
          <AnimatedSection animation="fadeUp" delay={400}>
            <div className="text-center mt-12">
              <Link
                href="https://famous-pizza.customer.novareachsolutions.com/menu"
                className="inline-block bg-[#1a1a1a] hover:bg-[#333] hover:scale-105 text-white px-10 py-4 rounded-full text-[15px] tracking-wider transition-all duration-300"
                style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
              >
                VIEW ALL ITEMS
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== DELIVERY GUARANTEE SECTION ========== */}
      <section className="relative bg-[#B42D19] min-h-[700px] lg:min-h-[850px] overflow-hidden">
        {/* Top Brush Stroke Edge */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <svg
            className="w-full h-16"
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,40 350,20 500,35 C650,50 750,15 900,25 C1050,35 1200,45 1440,20 L1440,0 L0,0 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* Background texture overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#2a2a2a] rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-[#252525] rounded-full blur-3xl opacity-40" />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#222222] rounded-full blur-3xl opacity-30" />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-16 pt-28 lg:pt-36">
          {/* Text Content - Top Left - Limited Width */}
          <AnimatedSection
            animation="fadeRight"
            className="lg:max-w-[600px] xl:max-w-[700px] relative z-30"
          >
            {/* Fast. Free. Fresh. tag */}
            <div className="relative inline-block mb-6">
              <p
                className="text-[#FFB800] text-[24px] md:text-[32px] lg:text-[38px] px-2 font-bold"
                style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
              >
                Fast. Free. Fresh.
              </p>
            </div>

            {/* Free Delivery heading */}
            <h2
              className="text-white text-[38px] sm:text-[50px] md:text-[65px] lg:text-[82px] xl:text-[95px] leading-[1.05] tracking-tight mb-6"
              style={{
                fontFamily: "'Troyline Sans Stamp', sans-serif",
                textShadow: "4px 4px 0px rgba(0,0,0,0.3)",
              }}
            >
              Free Delivery within
              <br />2 kms
            </h2>

            {/* Description */}
            <p
              className="text-white text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed mb-10 max-w-[500px]"
              style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
            >
              Craving something delicious? We&apos;ve got you covered with free
              home delivery within 2 km — bringing you our full menu of freshly
              made pizzas, burgers, pasta, treats & drinks
            </p>

            {/* VIEW ALL ITEMS button with arrow */}
            <div className="flex items-center gap-5">
              <Link
                href="https://famous-pizza.customer.novareachsolutions.com/menu"
                className="inline-block bg-[#FFB800] hover:bg-[#E5A600] hover:scale-105 text-[#1a1a1a] px-10 py-4 rounded-full text-[17px] md:text-[19px] font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  fontFamily: "'Troyline Sans Stamp', sans-serif",
                  letterSpacing: "0.05em",
                }}
              >
                VIEW ALL ITEMS
              </Link>
              {/* Hand-drawn curly arrow doodle */}
              <svg
                width="40"
                height="28"
                viewBox="0 0 36 24"
                fill="none"
                className="hidden sm:block animate-pulse"
              >
                <path
                  d="M2 14 Q 10 6 18 12 Q 26 18 34 10"
                  stroke="#E53E3E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </AnimatedSection>
        </div>

        {/* Delivery Guy - Right Side */}
        <div className="absolute bottom-0 right-0 w-[55%] lg:w-[50%] h-[90%] lg:h-full z-20 pointer-events-none flex items-end justify-end">
          <img
            src="/pizza-images/deliveryguy.png"
            alt="Delivery Guy"
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
          />
        </div>

        {/* Bottom Brush Stroke Edge */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          <svg
            className="w-full h-20"
            viewBox="0 0 1440 70"
            preserveAspectRatio="none"
          >
            <path
              d="M0,70 C200,35 400,55 600,40 C800,25 1000,50 1200,35 C1350,25 1400,45 1440,40 L1440,70 L0,70 Z"
              fill="#FAF5F0"
            />
          </svg>
        </div>
      </section>

      {/* ========== USERS TESTIMONIALS SECTION ========== */}
      <section className="bg-[#FAF5F0] py-20 px-6 lg:px-16 relative overflow-hidden">
        <div className="max-w-[1300px] mx-auto">
          {/* Section Title */}
          <AnimatedSection
            animation="fadeUp"
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-[40px] md:text-[56px] lg:text-[72px] tracking-wide">
              <span
                className="text-[#8B4513]"
                style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
              >
                USERS{" "}
              </span>
              <span
                className="text-[#8B1E1E]"
                style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
              >
                TESTIMONIALS
              </span>
            </h2>
            {/* Yellow swoosh under title */}
            <div className="flex justify-center mt-2">
              <svg width="80" height="16" viewBox="0 0 60 12" fill="none">
                <path
                  d="M5 8 Q 30 2 55 8"
                  stroke="#FFB800"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </AnimatedSection>

          {/* Testimonial Cards - Mobile Stack / Desktop Scattered */}
          <AnimatedSection animation="fadeUp" delay={200}>
            <div className="flex flex-col gap-6 lg:hidden">
              {/* Mobile: Stacked cards */}
              {/* Card - Martin Goutry */}
              <div className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 float-animation-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                    Avatar
                  </div>
                  <h4
                    className="text-[#1a1a1a] text-[20px] tracking-wide"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    MARTIN GOUTRY
                  </h4>
                </div>
                <p
                  className="text-gray-600 text-[15px] leading-relaxed mb-4"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  &laquo; Amazing pizza! The crust was perfectly crispy and the
                  toppings were fresh. Best pizza delivery in town! &raquo;
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <span className="text-[#C23A22]">&#9873;</span>
                  <span
                    className="text-[#C23A22]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Happy Customer
                  </span>
                </div>
              </div>

              {/* Card - Theo Champion */}
              <div className="bg-white rounded-2xl p-6 shadow-lg float-animation-2">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                    Avatar
                  </div>
                  <h4
                    className="text-[#1a1a1a] text-[20px] tracking-wide"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    THEO CHAMPION
                  </h4>
                </div>
                <p
                  className="text-gray-600 text-[15px] leading-relaxed mb-4"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  &laquo; Fast delivery and the food arrived hot. The student
                  deal is unbeatable! Will definitely order again. &raquo;
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <span className="text-[#C23A22]">&#9873;</span>
                  <span
                    className="text-[#C23A22]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Happy Customer
                  </span>
                </div>
              </div>

              {/* Card - Roman Atwoods (Dark) */}
              <div className="bg-[#5C4033] rounded-2xl p-6 shadow-lg float-animation-3">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-[#4A3328] rounded-full flex items-center justify-center text-white/40 text-xs flex-shrink-0">
                    Avatar
                  </div>
                  <h4
                    className="text-white text-[20px] tracking-wide"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    ROMAN ATWOODS
                  </h4>
                </div>
                <p
                  className="text-white/80 text-[15px] leading-relaxed mb-4"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  &laquo; The couple deal was perfect for date night. Great
                  value and even better taste. Highly recommend! &raquo;
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <span className="text-[#C23A22]">&#9873;</span>
                  <span
                    className="text-[#C23A22]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Happy Customer
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop: Scattered Layout */}
            <div className="hidden lg:block relative min-h-[600px]">
              {/* Card 1 - Martin Goutry - Top Center-Right */}
              <div className="absolute top-0 right-[10%] xl:right-[15%] w-[340px] xl:w-[380px] bg-white rounded-2xl p-7 shadow-lg z-20 float-animation-1">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                    Avatar
                  </div>
                  <h4
                    className="text-[#1a1a1a] text-[22px] xl:text-[24px] tracking-wide"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    MARTIN GOUTRY
                  </h4>
                </div>
                <p
                  className="text-gray-600 text-[15px] xl:text-[16px] leading-relaxed mb-5"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  &laquo; Amazing pizza! The crust was perfectly crispy and the
                  toppings were fresh. Best pizza delivery in town! &raquo;
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <span className="text-[#C23A22]">&#9873;</span>
                  <span
                    className="text-[#C23A22]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Happy Customer
                  </span>
                </div>
              </div>

              {/* Card 2 - Theo Champion - Left Side */}
              <div className="absolute top-[100px] left-[2%] xl:left-[5%] w-[320px] xl:w-[360px] bg-white rounded-2xl p-7 shadow-lg z-10 float-animation-2">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                    Avatar
                  </div>
                  <h4
                    className="text-[#1a1a1a] text-[22px] xl:text-[24px] tracking-wide"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    THEO CHAMPION
                  </h4>
                </div>
                <p
                  className="text-gray-600 text-[15px] xl:text-[16px] leading-relaxed mb-5"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  &laquo; Fast delivery and the food arrived hot. The student
                  deal is unbeatable! Will definitely order again. &raquo;
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <span className="text-[#C23A22]">&#9873;</span>
                  <span
                    className="text-[#C23A22]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Happy Customer
                  </span>
                </div>
              </div>

              {/* Card 3 - Agnes Remi - Right Side Lower */}
              <div className="absolute top-[240px] right-[5%] xl:right-[8%] w-[360px] xl:w-[400px] bg-white rounded-2xl p-7 shadow-xl z-30 float-animation-3">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-xs flex-shrink-0">
                    Avatar
                  </div>
                  <h4
                    className="text-[#1a1a1a] text-[22px] xl:text-[24px] tracking-wide"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    AGNES REMI
                  </h4>
                </div>
                <p
                  className="text-gray-600 text-[15px] xl:text-[16px] leading-relaxed mb-5"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  &laquo; Love the variety! From traditional to gourmet, every
                  pizza I&apos;ve tried has been delicious. Great service too!
                  &raquo;
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <span className="text-[#C23A22]">&#9873;</span>
                  <span
                    className="text-[#C23A22]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Happy Customer
                  </span>
                </div>
              </div>

              {/* Card 5 - Roman Atwoods - Center Bottom (Dark) */}
              <div className="absolute bottom-0 left-[25%] xl:left-[28%] w-[340px] xl:w-[380px] bg-[#5C4033] rounded-2xl p-7 shadow-lg z-15 float-animation-5">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-[#4A3328] rounded-full flex items-center justify-center text-white/40 text-xs flex-shrink-0">
                    Avatar
                  </div>
                  <h4
                    className="text-white text-[22px] xl:text-[24px] tracking-wide"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    ROMAN ATWOODS
                  </h4>
                </div>
                <p
                  className="text-white/80 text-[15px] xl:text-[16px] leading-relaxed mb-5"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  &laquo; The couple deal was perfect for date night. Great
                  value and even better taste. Highly recommend! &raquo;
                </p>
                <div className="flex items-center gap-2 text-[14px]">
                  <span className="text-[#C23A22]">&#9873;</span>
                  <span
                    className="text-[#C23A22]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    Happy Customer
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== SUBSCRIBE SECTION ========== */}
      <section className="bg-[#FAF5F0] py-20 px-6 lg:px-16">
        <AnimatedSection
          animation="fadeUp"
          className="max-w-[800px] mx-auto text-center"
        >
          {/* Section Title */}
          <h2 className="text-[32px] md:text-[44px] lg:text-[56px] tracking-wide mb-4">
            <span
              className="text-[#8B4513]"
              style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
            >
              SUBSCRIBE & GET{" "}
            </span>
            <span
              className="text-[#C23A22] animate-pulse"
              style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
            >
              10%
            </span>
            <span
              className="text-[#8B4513]"
              style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
            >
              {" "}
              DISCOUNT
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-gray-600 text-[16px] md:text-[18px] mb-10"
            style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
          >
            Be the first to get the latest news, promotions and much more.
          </p>

          {/* Email Input */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto flex-1 max-w-[500px]">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 6L12 13L2 6" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white border border-gray-200 rounded-full py-4 pl-14 pr-6 text-[15px] outline-none focus:border-[#E5A030] focus:shadow-lg transition-all duration-300"
                style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
              />
            </div>
            <button
              className="bg-white hover:bg-[#FFB800] text-[#1a1a1a] border border-gray-200 hover:border-[#FFB800] px-8 py-4 rounded-full text-[15px] tracking-wider transition-all duration-300 whitespace-nowrap hover:scale-105 hover:shadow-lg"
              style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
            >
              SUBSCRIBE
            </button>
          </div>

          {/* Policy text */}
          <p
            className="text-gray-500 text-[14px]"
            style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
          >
            By subscribing, you accepted our{" "}
            <Link
              href="#"
              className="text-[#1a1a1a] underline hover:text-[#C23A22] transition-colors"
            >
              Policy
            </Link>
          </p>
        </AnimatedSection>
      </section>

      {/* ========== FOOTER SECTION ========== */}
      <footer className="relative">
        {/* Top Brush Stroke Edge */}
        <div className="bg-[#FAF5F0] relative">
          <svg
            className="w-full h-20 md:h-28"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,100 L0,60 C50,65 100,40 200,50 C350,65 400,30 550,45 C700,60 800,25 950,40 C1100,55 1200,30 1300,45 C1380,55 1420,40 1440,50 L1440,100 Z"
              fill="#2a2a2a"
            />
            {/* Rough brush texture */}
            <ellipse cx="100" cy="55" rx="30" ry="8" fill="#2a2a2a" />
            <ellipse cx="300" cy="45" rx="25" ry="6" fill="#2a2a2a" />
            <ellipse cx="500" cy="50" rx="35" ry="7" fill="#2a2a2a" />
            <ellipse cx="750" cy="40" rx="28" ry="6" fill="#2a2a2a" />
            <ellipse cx="950" cy="48" rx="32" ry="7" fill="#2a2a2a" />
            <ellipse cx="1150" cy="42" rx="26" ry="6" fill="#2a2a2a" />
            <ellipse cx="1350" cy="50" rx="30" ry="7" fill="#2a2a2a" />
          </svg>
        </div>

        {/* Footer Content */}
        <div className="bg-[#2a2a2a] pt-12 pb-8 px-6 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            {/* Main Footer Grid */}
            <AnimatedSection animation="fadeUp" delay={100}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12">
                {/* Logo & Description */}
                <div className="group">
                  {/* Logo */}
                  <div className="flex items-center gap-3 mb-6">
                    <Image
                      src="/pizza-images/hero-slide1-logo.png"
                      alt="Famous Pizza"
                      width={80}
                      height={80}
                      className="w-16 h-16 md:w-20 md:h-20"
                    />
                  </div>
                  <p
                    className="text-gray-400 text-[14px] leading-relaxed max-w-[300px]"
                    style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                  >
                    We combined our passion for food with fresh high-quality
                    ingredients to create innovative, hearth-baked pizzas.
                    Famous Pizza - best fast food delivery service.
                  </p>
                </div>

                {/* Contact */}
                <div>
                  <h3
                    className="text-white text-[22px] md:text-[26px] tracking-wide mb-6"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    CONTACT
                  </h3>
                  <div className="space-y-4">
                    {/* Address */}
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      <span
                        className="text-gray-400 text-[14px]"
                        style={{
                          fontFamily: "'Weissenhof Grotesk', sans-serif",
                        }}
                      >
                        SHOP 1, 112 SHANNON AVENUE, GEELONG WEST - 3218
                      </span>
                    </div>
                    {/* Phone */}
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                      </svg>
                      <div className="flex flex-col gap-1">
                        <span
                          className="text-gray-400 text-[14px]"
                          style={{
                            fontFamily: "'Weissenhof Grotesk', sans-serif",
                          }}
                        >
                          (03) 5270 5039
                        </span>
                        <span
                          className="text-gray-400 text-[14px]"
                          style={{
                            fontFamily: "'Weissenhof Grotesk', sans-serif",
                          }}
                        >
                          0420 513 535
                        </span>
                      </div>
                    </div>
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-gray-500 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 6L12 13L2 6" />
                      </svg>
                      <span
                        className="text-gray-400 text-[14px] lowercase"
                        style={{
                          fontFamily: "'Weissenhof Grotesk', sans-serif",
                        }}
                      >
                        INFO@FAMOUSPIZZAGEELONG.COM.AU
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trading Hours */}
                <div>
                  <h3
                    className="text-white text-[22px] md:text-[26px] tracking-wide mb-6"
                    style={{ fontFamily: "'Troyline Sans Stamp', sans-serif" }}
                  >
                    TRADING HOURS
                  </h3>
                  <div className="space-y-3">
                    <p
                      className="text-gray-400 text-[14px]"
                      style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                    >
                      OPEN 7 DAYS A WEEK
                    </p>
                    <div className="space-y-2">
                      <p
                        className="text-gray-400 text-[14px]"
                        style={{
                          fontFamily: "'Weissenhof Grotesk', sans-serif",
                        }}
                      >
                        Sun - Thu: 03:00pm - 10:00pm
                      </p>
                      <p
                        className="text-gray-400 text-[14px]"
                        style={{
                          fontFamily: "'Weissenhof Grotesk', sans-serif",
                        }}
                      >
                        Fri & Sat: 03:00pm - 12:00am
                      </p>
                    </div>
                    <div className="mt-4 space-y-2">
                      <p
                        className="text-[#FFB800] text-[14px] font-medium"
                        style={{
                          fontFamily: "'Weissenhof Grotesk', sans-serif",
                        }}
                      >
                        ITALIAN CUISINE
                      </p>
                      <p
                        className="text-[#FFB800] text-[14px] font-medium"
                        style={{
                          fontFamily: "'Weissenhof Grotesk', sans-serif",
                        }}
                      >
                        HALAL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-600 my-8" />

            {/* Bottom Footer */}
            <AnimatedSection animation="fadeUp" delay={300}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Copyright */}
                <p
                  className="text-gray-500 text-[13px]"
                  style={{ fontFamily: "'Weissenhof Grotesk', sans-serif" }}
                >
                  © 2024 Famous Pizza. All rights Reserved
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-6">
                  {/* Instagram */}
                  <a
                    href="#"
                    className="text-[#FFB800] hover:text-[#E5A600] transition-all duration-300 hover:scale-125"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                    </svg>
                  </a>
                  {/* Twitter */}
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-125"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  {/* Facebook */}
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-125"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 8h-2a3 3 0 00-3 3v9M8 13h8" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="#"
                    className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-125"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="4" />
                      <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </footer>
    </div>
  );
}

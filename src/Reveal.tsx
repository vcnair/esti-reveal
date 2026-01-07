import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight,
  ArrowLeft,
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react";

// Presentation slides (19 slides from PowerPoint)
const presentationSlides = Array.from({ length: 19 }, (_, i) => ({
  id: `slide-${i + 1}`,
  src: `/reveal-assets/slides/Slide${i + 1}.JPG`,
}));

// Slide transition variants - sleek and sophisticated
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
};

// Simple cn utility
const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// Page sections
type Section = "intro" | "title" | "stats" | "presentation" | "demo" | "value" | "cta";

export default function Reveal() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [presentationIndex, setPresentationIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-advance presentation slides
  const [autoPlay, setAutoPlay] = useState(false);
  
  useEffect(() => {
    if (autoPlay && currentSection === "presentation") {
      const timer = setTimeout(() => {
        if (presentationIndex < presentationSlides.length - 1) {
          setSlideDirection(1);
          setPresentationIndex(prev => prev + 1);
        } else {
          setAutoPlay(false);
          setCurrentSection("demo");
        }
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, presentationIndex, currentSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!hasStarted) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setHasStarted(true);
          setCurrentSection("title");
        }
        return;
      }

      if (currentSection === "title") {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setCurrentSection("stats");
        }
      } else if (currentSection === "stats") {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setCurrentSection("presentation");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSection("title");
        }
      } else if (currentSection === "presentation") {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          if (presentationIndex < presentationSlides.length - 1) {
            setSlideDirection(1);
            setPresentationIndex(prev => prev + 1);
          } else {
            setCurrentSection("demo");
          }
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (presentationIndex > 0) {
            setSlideDirection(-1);
            setPresentationIndex(prev => prev - 1);
          } else {
            setCurrentSection("stats");
          }
        }
      } else if (currentSection === "demo") {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          setCurrentSection("value");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSection("presentation");
          setPresentationIndex(presentationSlides.length - 1);
        }
      } else if (currentSection === "value") {
        if (e.key === "ArrowRight" || e.key === " ") {
          e.preventDefault();
          setCurrentSection("cta");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSection("demo");
        }
      } else if (currentSection === "cta") {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSection("value");
        }
      }

      if (e.key === "m" || e.key === "M") {
        setIsMuted(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted, currentSection, presentationIndex]);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    videoRef.current?.play();
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    videoRef.current?.pause();
  };

  // Calculate overall progress
  const getProgress = () => {
    if (currentSection === "intro") return 0;
    if (currentSection === "title") return 5;
    if (currentSection === "stats") return 10;
    if (currentSection === "presentation") {
      return 10 + ((presentationIndex + 1) / presentationSlides.length) * 60;
    }
    if (currentSection === "demo") return 75;
    if (currentSection === "value") return 90;
    return 100;
  };

  // Entrance screen
  if (!hasStarted) {
    return (
      <>
        <Helmet>
          <title>A Private Preview | Esti</title>
        </Helmet>
        <div 
          className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-slate-50 flex items-center justify-center cursor-pointer overflow-hidden relative"
          onClick={() => { setHasStarted(true); setCurrentSection("title"); }}
        >
          {/* Subtle geometric pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Soft gradient orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-slate-200/50 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 text-center px-6 max-w-3xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 rounded-full bg-white border border-slate-200 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700 tracking-wide">Private Preview</span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.05]"
            >
              You've been{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 bg-clip-text text-transparent">
                  invited
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-4 bg-amber-200/60 -z-10 rounded-sm"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                />
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl text-slate-500 mb-16 leading-relaxed font-light max-w-4xl mx-auto"
            >
              to see something that will change how manufacturing shops quote{" "}
              <span className="text-slate-800 font-semibold">forever.</span>
            </motion.p>

            {/* Enter prompt */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-10 h-16 rounded-full border-2 border-slate-300 flex items-start justify-center p-2"
              >
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-3 rounded-full bg-slate-400"
                />
              </motion.div>
              <span className="text-sm text-slate-400 tracking-widest uppercase font-medium">Click to begin</span>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Introducing Esti | Private Preview</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-slate-50 overflow-hidden relative">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-100">
          <motion.div
            className="h-full bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600"
            initial={{ width: "0%" }}
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Main content */}
        <AnimatePresence mode="wait">
          {currentSection === "title" && (
            <TitleSlide
              key="title"
              onNext={() => setCurrentSection("stats")}
            />
          )}

          {currentSection === "stats" && (
            <StatsSection
              key="stats"
              onNext={() => setCurrentSection("presentation")}
              onPrev={() => setCurrentSection("title")}
            />
          )}

          {currentSection === "presentation" && (
            <PresentationSection
              key="presentation"
              slides={presentationSlides}
              currentIndex={presentationIndex}
              direction={slideDirection}
              onNext={() => {
                if (presentationIndex < presentationSlides.length - 1) {
                  setSlideDirection(1);
                  setPresentationIndex(prev => prev + 1);
                } else {
                  setCurrentSection("demo");
                }
              }}
              onPrev={() => {
                if (presentationIndex > 0) {
                  setSlideDirection(-1);
                  setPresentationIndex(prev => prev - 1);
                } else {
                  setCurrentSection("stats");
                }
              }}
              autoPlay={autoPlay}
              onToggleAutoPlay={() => setAutoPlay(!autoPlay)}
            />
          )}

          {currentSection === "demo" && (
            <DemoSection
              key="demo"
              isPlaying={isVideoPlaying}
              isMuted={isMuted}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onToggleMute={() => setIsMuted(!isMuted)}
              onEnd={() => setCurrentSection("value")}
              onNext={() => setCurrentSection("value")}
              onPrev={() => {
                setCurrentSection("presentation");
                setPresentationIndex(presentationSlides.length - 1);
              }}
              videoRef={videoRef}
            />
          )}

          {currentSection === "value" && (
            <ValuePropositionSection
              key="value"
              onNext={() => setCurrentSection("cta")}
              onPrev={() => setCurrentSection("demo")}
            />
          )}

          {currentSection === "cta" && (
            <CTASection
              key="cta"
              onPrev={() => setCurrentSection("value")}
            />
          )}
        </AnimatePresence>

        {/* Keyboard hint */}
        <div className="fixed bottom-6 right-6 z-50 text-xs text-slate-400 flex items-center gap-4">
          <span>←→ Navigate</span>
          <span>M Mute</span>
        </div>
      </div>
    </>
  );
}

// Title Slide - "PDF to Quote in 60 Seconds"
function TitleSlide({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 cursor-pointer"
      onClick={onNext}
    >
      <div className="text-center max-w-5xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <img src="/esti-logo-full.png" alt="Esti" className="h-20 md:h-28 mx-auto" />
        </motion.div>

        {/* Main tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.05]">
            PDF to Quote
          </h1>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-400">in</span>
            <div className="relative">
              <span className="text-7xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                60
              </span>
              <motion.div
                className="absolute -inset-6 bg-amber-200/30 rounded-3xl -z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              />
            </div>
            <span className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-400">Seconds</span>
          </div>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-xl md:text-2xl text-slate-500 font-light"
        >
          Your AI-powered manufacturing apprentice
        </motion.p>

        {/* Continue hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-2 text-slate-400"
          >
            <span className="text-sm font-medium">Click or press →</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Presentation Section with slideshow
function PresentationSection({
  slides,
  currentIndex,
  direction,
  onNext,
  onPrev,
  autoPlay,
  onToggleAutoPlay,
}: {
  slides: typeof presentationSlides;
  currentIndex: number;
  direction: number;
  onNext: () => void;
  onPrev: () => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <div className="w-full max-w-[1400px]">
        {/* Slide container */}
        <div className="relative aspect-[16/9] bg-white rounded-xl shadow-2xl shadow-slate-300/50 overflow-hidden border border-slate-200">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={currentIndex}
              src={slides[currentIndex].src}
              alt={`Slide ${currentIndex + 1}`}
              className="absolute inset-0 w-full h-full object-contain bg-white"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 35 },
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
              }}
            />
          </AnimatePresence>

          {/* Slide number overlay */}
          <div className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-sm">
            <span className="text-sm font-semibold text-white">
              {currentIndex + 1} / {slides.length}
            </span>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={onPrev}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm shadow-xl flex items-center justify-center transition-all hover:bg-white hover:scale-110",
              currentIndex === 0 && "opacity-50"
            )}
          >
            <ChevronLeft className="w-7 h-7 text-slate-700" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 backdrop-blur-sm shadow-xl flex items-center justify-center transition-all hover:bg-white hover:scale-110"
          >
            <ChevronRight className="w-7 h-7 text-slate-700" />
          </button>
        </div>

        {/* Controls below slide */}
        <div className="mt-6 flex items-center justify-between px-2">
          {/* Slide progress bar */}
          <div className="flex-1 max-w-md">
            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-slate-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Slide {currentIndex + 1} of {slides.length}
            </div>
          </div>

          {/* Auto-play toggle */}
          <button
            onClick={onToggleAutoPlay}
            className={cn(
              "px-4 py-2 text-xs rounded-lg border flex items-center gap-2 transition-colors",
              autoPlay 
                ? "bg-slate-100 border-slate-300 text-slate-700" 
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            )}
          >
            <Clock className="w-3.5 h-3.5" />
            {autoPlay ? "Pause" : "Auto-Play"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Demo Video Section
function DemoSection({
  isPlaying,
  isMuted,
  onPlay,
  onPause,
  onToggleMute,
  onEnd,
  onNext,
  onPrev,
  videoRef,
}: {
  isPlaying: boolean;
  isMuted: boolean;
  onPlay: () => void;
  onPause: () => void;
  onToggleMute: () => void;
  onEnd: () => void;
  onNext: () => void;
  onPrev: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold text-slate-900 mb-3"
        >
          See Esti in Action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500"
        >
          Watch how Esti transforms a drawing into a quote
        </motion.p>
      </div>

      <div className="w-full max-w-[1200px]">
        {/* Video container */}
        <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl shadow-slate-400/30 border border-slate-200">
          <video
            ref={videoRef}
            src="/reveal-assets/esti-demo.mp4"
            muted={isMuted}
            onEnded={onEnd}
            className="w-full h-full object-cover"
            playsInline
            poster="/reveal-assets/esti-demo.gif"
          />

          {/* Play overlay */}
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onPlay}
                className="relative"
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/40"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center">
                  <Play className="w-10 h-10 text-slate-800 ml-1" fill="currentColor" />
                </div>
              </motion.button>
            </motion.div>
          )}

          {/* Video controls */}
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={onPause}
                  className="p-2 rounded-lg text-white hover:bg-white/20 backdrop-blur-sm bg-black/40"
                >
                  <Pause className="w-5 h-5" />
                </button>
                <button
                  onClick={onToggleMute}
                  className="p-2 rounded-lg text-white hover:bg-white/20 backdrop-blur-sm bg-black/40"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
              <button
                onClick={() => videoRef.current?.requestFullscreen()}
                className="p-2 rounded-lg text-white hover:bg-white/20 backdrop-blur-sm bg-black/40"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button onClick={onPrev} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Deck
          </button>
          <button onClick={onNext} className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2">
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Stats Section
function StatsSection({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-16 cursor-pointer"
      onClick={onNext}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            The Problem with Traditional Quoting
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Manufacturing shops are losing time and money on manual estimation
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="bg-slate-900 rounded-2xl p-10 shadow-2xl shadow-slate-300/30 hover:shadow-slate-300/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="text-6xl md:text-7xl font-black text-white mb-4">3-5</div>
              <div className="text-2xl font-semibold text-amber-400 mb-2">Hours per Quote</div>
              <p className="text-slate-400 text-base">
                Average time estimators spend manually analyzing drawings and calculating costs
              </p>
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-10 shadow-2xl shadow-slate-300/30 hover:shadow-slate-300/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="text-6xl md:text-7xl font-black text-white mb-4">20%</div>
              <div className="text-2xl font-semibold text-amber-400 mb-2">Quotes Lost</div>
              <p className="text-slate-400 text-base">
                Jobs lost to competitors who can quote faster and win more business
              </p>
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="bg-slate-900 rounded-2xl p-10 shadow-2xl shadow-slate-300/30 hover:shadow-slate-300/50 transition-all duration-300 hover:scale-[1.02]">
              <div className="text-6xl md:text-7xl font-black text-white mb-4">15%</div>
              <div className="text-2xl font-semibold text-amber-400 mb-2">Human Error</div>
              <p className="text-slate-400 text-base">
                Critical details missed in manual review, leading to costly re-work
              </p>
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 text-sm mb-4">See how Esti solves this</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            <ArrowRight className="w-6 h-6 text-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Value Proposition Section
function ValuePropositionSection({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const features = [
    {
      icon: "⚡",
      title: "60-Second Quotes",
      description: "AI extracts BOM, tolerances, and specs from PDFs instantly",
      stat: "95%",
      statLabel: "Faster",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: "🎯",
      title: "Zero Missed Details",
      description: "Balloon verification ensures every part is accounted for",
      stat: "100%",
      statLabel: "Accuracy",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: "💰",
      title: "Smart Pricing",
      description: "Live material pricing + GD&T multipliers for precision work",
      stat: "$50K+",
      statLabel: "Saved/Year",
      color: "from-emerald-500 to-green-500"
    },
    {
      icon: "📊",
      title: "Confidence Scores",
      description: "Know which quotes need review and which are ready to send",
      stat: "94%",
      statLabel: "Confidence",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-teal-50 border border-teal-200"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-semibold text-teal-700">Powered by AI</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Your Manufacturing Copilot
          </h2>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto">
            Esti analyzes drawings like a senior estimator—but 95% faster
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="group"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-slate-300/70 transition-all duration-300 hover:scale-[1.02] border border-slate-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-5xl mb-4">{feature.icon}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-baseline gap-2">
                    <span className={cn(
                      "text-5xl font-black bg-gradient-to-r bg-clip-text text-transparent",
                      feature.color
                    )}>
                      {feature.stat}
                    </span>
                    <span className="text-slate-500 font-semibold text-lg">{feature.statLabel}</span>
                  </div>
                </div>

                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                >
                  <CheckCircle2 className="w-6 h-6 text-teal-500" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <button onClick={onPrev} className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Demo
          </button>
          <button onClick={onNext} className="px-6 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xl flex items-center gap-2">
            Get Early Access
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// CTA Section
function CTASection({ onPrev }: { onPrev: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="text-center max-w-5xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <img src="/esti-logo-full.png" alt="Esti" className="h-20 md:h-28 mx-auto" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 leading-tight"
        >
          Quote faster.{" "}
          <span className="relative inline-block">
            Win more.
            <motion.span
              className="absolute -bottom-3 left-0 right-0 h-4 bg-amber-200/70 -z-10 rounded-sm"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl text-slate-500 mb-16 max-w-3xl mx-auto font-light"
        >
          Join the pilot program and transform how you quote. Limited spots for founding shops.
        </motion.p>

        {/* CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto"
        >
          {/* Primary CTA Card */}
          <motion.a
            href="mailto:varun@getesti.com?subject=Esti Pilot Program Interest"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative bg-slate-900 rounded-2xl p-8 shadow-2xl shadow-slate-400/30 hover:shadow-slate-400/50 cursor-pointer group text-left block"
          >
            <div className="absolute -top-3 -right-3 bg-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              RECOMMENDED
            </div>
            <div className="text-amber-400 text-sm font-semibold mb-2 tracking-wider">PILOT PROGRAM</div>
            <h3 className="text-3xl font-bold text-white mb-3">Get Early Access</h3>
            <p className="text-slate-400 mb-6 text-base">
              Join 50 founding shops testing Esti. Get lifetime discounts + priority support.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-white">Free Trial</span>
              <ArrowRight className="w-6 h-6 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>

          {/* Secondary CTA Card */}
          <motion.a
            href="mailto:varun@getesti.com?subject=Esti Demo Request"
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white border-2 border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/50 hover:shadow-slate-300/70 cursor-pointer group text-left block"
          >
            <div className="text-slate-500 text-sm font-semibold mb-2 tracking-wider">STANDARD</div>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">Request Demo</h3>
            <p className="text-slate-600 mb-6 text-base">
              See Esti in action with your own drawings. No commitment required.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-900">Free</span>
              <ArrowRight className="w-6 h-6 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-slate-500 mb-16"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-base font-medium">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-base font-medium">Enterprise security</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-base font-medium">5-min setup</span>
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-50 rounded-2xl p-8 border border-slate-200 max-w-2xl mx-auto"
        >
          <p className="text-slate-700 text-lg italic mb-4">
            "We quoted 3 jobs in the time it used to take us to do one. This is a game-changer."
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-lg">
              JD
            </div>
            <div className="text-left">
              <div className="font-semibold text-slate-900">John D.</div>
              <div className="text-sm text-slate-500">Senior Estimator, Pilot User</div>
            </div>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <button onClick={onPrev} className="text-slate-400 hover:text-slate-600 flex items-center gap-2 mx-auto">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

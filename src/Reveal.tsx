import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { 
  ArrowRight,
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  CheckCircle2,
  Clock,
  FileText,
  Zap,
  Target
} from "lucide-react";

// Page sections
type Section = "intro" | "title" | "stats" | "demo" | "value" | "cta";

export default function Reveal() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section>("intro");
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
          setCurrentSection("demo");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSection("title");
        }
      } else if (currentSection === "demo") {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
          e.preventDefault();
          setCurrentSection("value");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setCurrentSection("stats");
        }
      } else if (currentSection === "value") {
        if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasStarted, currentSection]);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const sections: Section[] = ["intro", "title", "stats", "demo", "value", "cta"];
  const currentIndex = sections.indexOf(currentSection);

  return (
    <>
      <Helmet>
        <title>Esti - PDF to Quote in 60 Seconds</title>
        <meta name="description" content="Meet Esti, your AI-powered manufacturing apprentice. Transform engineering drawings into accurate quotes in seconds." />
      </Helmet>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-slate-50" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Progress Bar */}
      {hasStarted && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/80 backdrop-blur-sm border-b border-slate-100"
        >
          <div className="max-w-4xl mx-auto flex items-center gap-2">
            {sections.slice(1).map((section, index) => (
              <div key={section} className="flex-1 flex items-center">
                <div 
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    index < currentIndex ? "bg-amber-500" : 
                    index === currentIndex - 1 ? "bg-amber-300" : "bg-slate-200"
                  }`}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <IntroSlide key="intro" onStart={() => { setHasStarted(true); setCurrentSection("title"); }} />
        ) : currentSection === "title" ? (
          <TitleSlide key="title" onNext={() => setCurrentSection("stats")} />
        ) : currentSection === "stats" ? (
          <StatsSlide key="stats" onNext={() => setCurrentSection("demo")} />
        ) : currentSection === "demo" ? (
          <DemoSlide 
            key="demo"
            videoRef={videoRef}
            isVideoPlaying={isVideoPlaying}
            isMuted={isMuted}
            toggleVideo={toggleVideo}
            toggleMute={toggleMute}
            onNext={() => setCurrentSection("value")}
          />
        ) : currentSection === "value" ? (
          <ValueSlide key="value" onNext={() => setCurrentSection("cta")} />
        ) : (
          <CTASlide key="cta" />
        )}
      </AnimatePresence>

      {/* Navigation hint */}
      {hasStarted && currentSection !== "cta" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-400 text-sm"
        >
          <span>Press</span>
          <kbd className="px-2 py-1 bg-slate-100 rounded text-xs font-mono">→</kbd>
          <span>or click to continue</span>
        </motion.div>
      )}
    </>
  );
}

// ============ SLIDE COMPONENTS ============

function IntroSlide({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 cursor-pointer"
      onClick={onStart}
    >
      <div className="text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <img 
            src="/esti-logo-full.png" 
            alt="Esti" 
            className="h-24 md:h-32 mx-auto"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-slate-600 mb-12"
        >
          You're about to see something special...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-3"
          >
            <span>Begin Experience</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          <span className="text-sm text-slate-400">or press Enter</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TitleSlide({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 cursor-pointer pt-16"
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
          <img 
            src="/esti-logo-full.png" 
            alt="Esti" 
            className="h-20 md:h-28 mx-auto"
          />
        </motion.div>

        {/* Main tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
            PDF to Quote
          </h1>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-400">in</span>
            <div className="relative">
              <span className="text-6xl md:text-8xl lg:text-9xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                60
              </span>
              <motion.div
                className="absolute -inset-4 bg-amber-200/30 rounded-2xl -z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              />
            </div>
            <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-400">Seconds</span>
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

function StatsSlide({ onNext }: { onNext: () => void }) {
  const stats = [
    { value: "8+", label: "Hours saved per quote", icon: Clock },
    { value: "95%", label: "Accuracy rate", icon: Target },
    { value: "60s", label: "Average quote time", icon: Zap },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 cursor-pointer pt-16"
      onClick={onNext}
    >
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4"
        >
          The Problem We Solve
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 text-center mb-16 max-w-2xl mx-auto"
        >
          Manufacturing quoting is slow, manual, and error-prone. 
          Esti changes that completely.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100 text-center"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DemoSlide({ 
  videoRef, 
  isVideoPlaying, 
  isMuted, 
  toggleVideo, 
  toggleMute,
  onNext 
}: { 
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoPlaying: boolean;
  isMuted: boolean;
  toggleVideo: () => void;
  toggleMute: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 pt-16 pb-24"
    >
      <div className="max-w-5xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-4"
        >
          See Esti in Action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-slate-500 text-center mb-8"
        >
          Watch how Esti transforms a complex engineering drawing into a detailed quote
        </motion.p>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 bg-slate-900"
        >
          <video
            ref={videoRef}
            className="w-full aspect-video"
            poster="/reveal-assets/esti-demo.gif"
            playsInline
            muted={isMuted}
            onEnded={() => onNext()}
          >
            <source src="/reveal-assets/esti-demo.mp4" type="video/mp4" />
          </video>

          {/* Video Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isVideoPlaying && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl"
              >
                <Play className="w-8 h-8 text-slate-900 ml-1" />
              </motion.button>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  {isVideoPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
              <button
                onClick={(e) => { 
                  e.stopPropagation(); 
                  videoRef.current?.requestFullscreen();
                }}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                <Maximize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Skip button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={onNext}
            className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
          >
            Skip video →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ValueSlide({ onNext }: { onNext: () => void }) {
  const features = [
    { icon: FileText, title: "Smart PDF Analysis", description: "AI reads and understands engineering drawings instantly" },
    { icon: Sparkles, title: "Automated Quoting", description: "Generate accurate quotes with material costs and labor estimates" },
    { icon: CheckCircle2, title: "Error Detection", description: "Catch inconsistencies and missing information automatically" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 cursor-pointer pt-16"
      onClick={onNext}
    >
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12"
        >
          Why Manufacturers Choose Esti
        </motion.h2>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="flex items-start gap-6 bg-white rounded-xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-500">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CTASlide() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-6 pt-16"
    >
      <div className="text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <img 
            src="/esti-logo-full.png" 
            alt="Esti" 
            className="h-20 md:h-24 mx-auto"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
        >
          Ready to Transform Your Quoting?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-slate-500 mb-12"
        >
          Join the manufacturing revolution. Quote faster. Win more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="mailto:varun@getesti.com?subject=Esti Demo Request"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-3"
          >
            <span>Request a Demo</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="mailto:varun@getesti.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-slate-400 text-sm"
        >
          Esti • Your AI-powered manufacturing apprentice
        </motion.p>
      </div>
    </motion.div>
  );
}


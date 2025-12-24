"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { INITIAL_PASSWORD, MASTER_PASSWORD } from "@/lib/christmas-constants";
import { AnimatePresence, motion } from "framer-motion";
import PixelSnow from "@/components/PixelSnow";
import { Play, Pause, Lock, Unlock, ChevronLeft, ChevronRight } from "lucide-react";

export default function ChristmasMissionPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([]);
  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check if any levels are completed - if so, skip password
  useEffect(() => {
    const unlocked = JSON.parse(localStorage.getItem("christmasUnlockedLevels") || "[]");
    if (unlocked.length > 0) {
      // Levels already completed, skip password
      setIsAuthenticated(true);
      setUnlockedLevels(unlocked);
      // Set active level to first unlocked level + 1, or 1 if none unlocked
      setActiveLevel(Math.max(...unlocked) + 1);
    }
  }, []);

  // Load unlocked levels from localStorage when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const unlocked = JSON.parse(localStorage.getItem("christmasUnlockedLevels") || "[]");
      setUnlockedLevels(unlocked);
      // Set active level to first unlocked level + 1, or 1 if none unlocked
      if (unlocked.length > 0) {
        setActiveLevel(Math.max(...unlocked) + 1);
      }
    }
  }, [isAuthenticated]);

  // Check if any levels are unlocked to determine animation speed
  const hasUnlockedLevels = unlockedLevels.length > 0;
  const staggerDelay = hasUnlockedLevels ? 0.3 : 2;

  // Check if all levels are completed
  const allLevelsCompleted = unlockedLevels.length === 3;

  // Carousel auto-rotate for completion screen
  useEffect(() => {
    if (allLevelsCompleted) {
      const interval = setInterval(() => {
        setCarouselIndex((prev) => (prev + 1) % 3);
      }, 3000); // Change every 3 seconds
      return () => clearInterval(interval);
    }
  }, [allLevelsCompleted]);

  // Play background music
  useEffect(() => {
    setIsMounted(true);
    
    // Create and configure audio - use different music if all levels completed
    const audio = new Audio(allLevelsCompleted ? "/christmas-rock.mp3" : "/christmas-music.mp3");
    audio.loop = true;
    audio.volume = 0.5; // Set volume to 50%
    audioRef.current = audio;
    
    // Try to play audio (may require user interaction due to browser restrictions)
    const playAudio = async () => {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch (error) {
        // Autoplay was prevented, will play on first user interaction
        console.log("Autoplay prevented, audio will play after user interaction");
        setIsMusicPlaying(false);
      }
    };
    
    playAudio();
    
    // Update state when audio plays/pauses
    audio.addEventListener("play", () => setIsMusicPlaying(true));
    audio.addEventListener("pause", () => setIsMusicPlaying(false));
    
    // Play on any user interaction
    const handleInteraction = async () => {
      try {
        if (audio.paused && audioRef.current) {
          await audio.play();
          setIsMusicPlaying(true);
        }
      } catch (error) {
        // Ignore errors
      }
    };
    
    // Add event listeners for user interaction
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, [allLevelsCompleted]);

  // Carousel navigation functions
  const goToPreviousSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + 3) % 3);
  };

  const goToNextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPassword = password.toLowerCase().trim();

    if (
      normalizedPassword === INITIAL_PASSWORD ||
      normalizedPassword === MASTER_PASSWORD
    ) {
      setError("");
      setPassword("");
      setIsAuthenticated(true);
    } else {
      setError("Access Denied! Try again.");
      setPassword("");
    }
  };

  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const textItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const transition = {
    duration: 0.8,
    ease: "easeInOut",
  };

  const textTransition = {
    duration: 0.6,
    ease: "easeOut",
  };

  const toggleMusic = async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsMusicPlaying(true);
      } else {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-green-400 font-mono relative py-12">
      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        className="absolute top-4 right-4 z-20 p-3 bg-gray-900/80 hover:bg-gray-800/80 border border-green-500 rounded-md text-green-400 hover:text-green-300 transition-colors"
        aria-label={isMusicPlaying ? "Pause music" : "Play music"}
      >
        {isMusicPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5" />
        )}
      </button>
      <div className="absolute inset-0 w-full h-full">
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
        />
      </div>
      <div className="relative z-10 max-w-2xl w-full px-8 mx-auto flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <motion.div
            key="password"
            initial="initial"
            animate={isMounted ? "animate" : "initial"}
            exit="exit"
            variants={fadeVariants}
            transition={transition}
            className="max-w-md w-full px-8 space-y-6"
          >
            <motion.div 
              className="text-center"
              initial="initial"
              animate={isMounted ? "animate" : "initial"}
              variants={{
                initial: {},
                animate: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl mb-4 text-red-500 font-bold"
                variants={textItemVariants}
                transition={textTransition}
              >
                🎄 CHRISTMAS MISSION ACCESS 🎄
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-2"
                variants={textItemVariants}
                transition={textTransition}
              >
                DANAILOV CHRISTMAS PROTOCOL...
              </motion.p>
              <motion.p 
                className="text-sm text-gray-400 mt-4"
                variants={textItemVariants}
                transition={textTransition}
              >
                Enter the password to access the mission. Hint: What is the name of the celebration today in Bulgarian, written in English letters?
              </motion.p>
            </motion.div>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial="initial"
              animate={isMounted ? "animate" : "initial"}
              variants={{
                initial: {},
                animate: {
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.6,
                  },
                },
              }}
            >
              <motion.div variants={textItemVariants} transition={textTransition}>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter password..."
                  className="w-full px-4 py-3 bg-gray-900 border border-green-500 rounded-md text-green-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-500 font-mono">{error}</p>
                )}
              </motion.div>
              <motion.div variants={textItemVariants} transition={textTransition}>
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 font-mono"
                >
                  ENTER
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        ) : allLevelsCompleted ? (
          <motion.div
            key="completion"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeVariants}
            transition={transition}
            className="max-w-5xl w-full px-8"
          >
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                initial: {},
                animate: {
                  transition: {
                    staggerChildren: 0.5,
                  },
                },
              }}
              className="text-center space-y-8"
            >
              <motion.h1
                className="text-4xl md:text-6xl text-green-400 font-bold mb-4"
                variants={textItemVariants}
                transition={textTransition}
              >
                🎉 THANK YOU FOR PLAYING! 🎉
              </motion.h1>
              
              <motion.p
                className="text-2xl md:text-3xl text-yellow-400 font-bold"
                variants={textItemVariants}
                transition={textTransition}
              >
                I LOVE YOU ALL
              </motion.p>
              
              <motion.p
                className="text-xl md:text-2xl text-green-300"
                variants={textItemVariants}
                transition={textTransition}
              >
                Честита Коледа, моите любими! 🎄
              </motion.p>

              {/* Three Presents Carousel */}
              <motion.div
                className="mt-12 max-w-4xl mx-auto flex items-center gap-4"
                variants={textItemVariants}
                transition={textTransition}
              >
                {/* Left Arrow */}
                <button
                  onClick={goToPreviousSlide}
                  className="flex-shrink-0 p-3 bg-gray-900/80 hover:bg-gray-800/80 border border-green-500 rounded-full text-green-400 hover:text-green-300 transition-colors z-20"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="relative w-full h-[28rem] overflow-hidden rounded-md flex-1">
                  <AnimatePresence mode="wait">
                    {carouselIndex === 0 && (
                      <motion.div
                        key="present-1"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 border-2 border-green-500 rounded-md p-6 bg-gray-900/50"
                      >
                        <div className="text-center h-full flex flex-col">
                          <Unlock className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <h3 className="text-lg font-bold text-green-400 mb-2">
                            LOCK 1
                          </h3>
                          <p className="text-xl text-yellow-400 font-bold mb-2">
                            FAMILY PHOTOSHOOT
                          </p>
                          <p className="text-sm text-green-300 mb-4">For Mum</p>
                          <div className="flex-1 rounded-md overflow-hidden">
                            <img 
                              src="/family-photoshoot.jpg" 
                              alt="Family Photoshoot"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {carouselIndex === 1 && (
                      <motion.div
                        key="present-2"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 border-2 border-green-500 rounded-md p-6 bg-gray-900/50"
                      >
                        <div className="text-center h-full flex flex-col">
                          <Unlock className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <h3 className="text-lg font-bold text-green-400 mb-2">
                            LOCK 2
                          </h3>
                          <p className="text-xl text-yellow-400 font-bold mb-2">
                            CLAY SHOOTING
                          </p>
                          <p className="text-sm text-green-300 mb-4">For Dad</p>
                          <div className="flex-1 rounded-md overflow-hidden">
                            <img 
                              src="/clay-shooting.webp" 
                              alt="Clay Shooting"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {carouselIndex === 2 && (
                      <motion.div
                        key="present-3"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 border-2 border-green-500 rounded-md p-6 bg-gray-900/50"
                      >
                        <div className="text-center h-full flex flex-col">
                          <Unlock className="w-12 h-12 text-green-400 mx-auto mb-3" />
                          <h3 className="text-lg font-bold text-green-400 mb-2">
                            LOCK 3
                          </h3>
                          <p className="text-xl text-yellow-400 font-bold mb-2">
                            CIRQUE DU SOLEIL
                          </p>
                          <p className="text-sm text-green-300 mb-4">For Everyone</p>
                          <div className="flex-1 rounded-md overflow-hidden">
                            <img 
                              src="/ovo-cirque.webp" 
                              alt="Cirque du Soleil OVO"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Carousel Indicators */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCarouselIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          carouselIndex === index
                            ? "bg-green-400 w-8"
                            : "bg-gray-600"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Right Arrow */}
                <button
                  onClick={goToNextSlide}
                  className="flex-shrink-0 p-3 bg-gray-900/80 hover:bg-gray-800/80 border border-green-500 rounded-full text-green-400 hover:text-green-300 transition-colors z-20"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="dashboard"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeVariants}
            transition={transition}
            className="max-w-5xl w-full px-8"
          >
            <motion.div
              initial="initial"
              animate="animate"
              variants={{
                initial: {},
                animate: {
                  transition: {
                    staggerChildren: staggerDelay,
                  },
                },
              }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl mb-4 text-red-500 font-bold text-center"
                variants={textItemVariants}
                transition={textTransition}
              >
                TOP SECRET
              </motion.h1>
              <motion.div 
                className="text-center mb-8"
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: staggerDelay,
                      delayChildren: staggerDelay,
                    },
                  },
                }}
              >
                <motion.p 
                  className="text-xl md:text-2xl mb-2"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  DANAILOV CHRISTMAS PROTOCOL...
                </motion.p>
                <motion.p 
                  className="text-lg text-green-300 mb-4"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  Mission Status: <span className="text-red-500 animate-pulse">ACTIVE</span>
                </motion.p>
                <motion.p 
                  className="text-sm text-gray-400"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  Welcome, Agent Ivi, Mimi and Mich.
                </motion.p>
                <motion.p 
                  className="text-green-400 mt-2 text-sm"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  Three presents are locked. They must be opened in order.
                </motion.p>
              </motion.div>

              {/* Three Locked Boxes */}
              <motion.div
                className="space-y-4 mt-8"
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: staggerDelay,
                      delayChildren: hasUnlockedLevels ? 1.2 : 10, // Faster if levels unlocked (4 * 0.3 = 1.2s), otherwise wait for all text (2 + 2 + 2 + 2 + 2 = 10s)
                    },
                  },
                }}
              >
                {/* Level 1 - Family Photoshoot */}
                <motion.div
                  variants={textItemVariants}
                  transition={textTransition}
                  className={`
                    border-2 rounded-md p-6 transition-all duration-300
                    ${
                      unlockedLevels.includes(1)
                        ? "border-white bg-gray-900/50 opacity-100"
                        : activeLevel === 1
                        ? "border-green-500 bg-gray-900/30 opacity-100 shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                        : "border-dashed border-gray-600 bg-gray-900/20 opacity-60 grayscale pointer-events-none"
                    }
                  `}
                  onClick={() => {
                    if (activeLevel === 1 && !unlockedLevels.includes(1)) {
                      router.push("/christmas-mission/level-1");
                    }
                  }}
                >
                  {unlockedLevels.includes(1) ? (
                    <div className="text-center">
                      <Unlock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-green-400 mb-1">
                        LOCK 1: PROJECT SMILE
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">[ UNLOCKED ]</p>
                      <p className="text-lg text-yellow-400 font-bold mb-1">
                        FAMILY PHOTOSHOOT EXPERIENCE!
                      </p>
                      <p className="text-sm text-green-300">Merry Christmas Mum</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Lock className="w-6 h-6 text-gray-500" />
                        <div>
                          <h3 className="text-xl font-bold text-green-400">
                            LOCK 1: PROJECT SMILE
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {activeLevel === 1 ? "[ LOCKED ] - Click to unlock" : "[ LOCKED ]"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">For Mum</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Level 2 - Clay Shooting */}
                <motion.div
                  variants={textItemVariants}
                  transition={textTransition}
                  className={`
                    border-2 rounded-md p-6 transition-all duration-300
                    ${
                      unlockedLevels.includes(2)
                        ? "border-white bg-gray-900/50 opacity-100"
                        : activeLevel === 2
                        ? "border-green-500 bg-gray-900/30 opacity-100 shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                        : "border-dashed border-gray-600 bg-gray-900/20 opacity-60 grayscale pointer-events-none"
                    }
                  `}
                  onClick={() => {
                    if (activeLevel === 2 && !unlockedLevels.includes(2)) {
                      router.push("/christmas-mission/level-2");
                    }
                  }}
                >
                  {unlockedLevels.includes(2) ? (
                    <div className="text-center">
                      <Unlock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-green-400 mb-1">
                        LOCK 2: THE HUNTER
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">[ UNLOCKED ]</p>
                      <p className="text-lg text-yellow-400 font-bold mb-1">
                        CLAY PIGEON SHOOTING!
                      </p>
                      <p className="text-sm text-green-300">Private experience for Dad</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Lock className="w-6 h-6 text-gray-500" />
                        <div>
                          <h3 className="text-xl font-bold text-green-400">
                            LOCK 2: THE HUNTER
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {activeLevel === 2 ? "[ LOCKED ] - Click to unlock" : "[ LOCKED ]"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">For Dad</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Level 3 - Cirque du Soleil */}
                <motion.div
                  variants={textItemVariants}
                  transition={textTransition}
                  className={`
                    border-2 rounded-md p-6 transition-all duration-300
                    ${
                      unlockedLevels.includes(3)
                        ? "border-white bg-gray-900/50 opacity-100"
                        : activeLevel === 3
                        ? "border-green-500 bg-gray-900/30 opacity-100 shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                        : "border-dashed border-gray-600 bg-gray-900/20 opacity-60 grayscale pointer-events-none"
                    }
                  `}
                  onClick={() => {
                    if (activeLevel === 3 && !unlockedLevels.includes(3)) {
                      router.push("/christmas-mission/level-3");
                    }
                  }}
                >
                  {unlockedLevels.includes(3) ? (
                    <div className="text-center">
                      <Unlock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="text-xl font-bold text-green-400 mb-1">
                        LOCK 3: THE FINAL CHALLENGE
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">[ UNLOCKED ]</p>
                      <p className="text-lg text-yellow-400 font-bold mb-1">
                        CIRQUE DU SOLEIL TICKETS!
                      </p>
                      <p className="text-sm text-green-300">For the whole family</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Lock className="w-6 h-6 text-gray-500" />
                        <div>
                          <h3 className="text-xl font-bold text-green-400">
                            LOCK 3: THE FINAL CHALLENGE
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">
                            {activeLevel === 3 ? "[ LOCKED ] - Click to unlock" : "[ LOCKED ]"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">For Everyone</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}


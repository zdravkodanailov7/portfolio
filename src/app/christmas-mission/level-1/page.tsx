"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import PixelSnow from "@/components/PixelSnow";
import { Play, Pause, Lock, Unlock, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { MASTER_PASSWORD } from "@/lib/christmas-constants";

const LEVEL_1_PASSWORD = "iloveyou";
const RIDDLES = [
  {
    question: "Що има врат, а глава няма?",
    answer: "botilka",
    hint: "Bottle"
  },
  {
    question: "Що има зъби, но не може да хапе?",
    answer: "greben",
    hint: "Comb"
  },
  {
    question: "Що е пълно с дупки, но държи вода?",
    answer: "guba",
    hint: "Sponge"
  }
];

export default function Level1Page() {
  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [riddleAnswers, setRiddleAnswers] = useState<string[]>([]);
  const [riddleError, setRiddleError] = useState("");
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [showTick, setShowTick] = useState(false);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play background music
  useEffect(() => {
    setIsMounted(true);
    
    // Create and configure audio
    const audio = new Audio("/lock-1-music.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    
    const playAudio = async () => {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch (error) {
        console.log("Autoplay prevented");
        setIsMusicPlaying(false);
      }
    };
    
    playAudio();
    
    audio.addEventListener("play", () => setIsMusicPlaying(true));
    audio.addEventListener("pause", () => setIsMusicPlaying(false));
    
    const handleInteraction = async () => {
      try {
        if (audio.paused && audioRef.current) {
          await audio.play();
          setIsMusicPlaying(true);
        }
      } catch (error) {}
    };
    
    window.addEventListener("click", handleInteraction, { once: true });
    window.addEventListener("keydown", handleInteraction, { once: true });
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

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

  const handleRiddleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentAnswer = riddleAnswers[currentRiddleIndex] || "";
    const normalizedAnswer = currentAnswer.toLowerCase().trim();
    const correctAnswer = RIDDLES[currentRiddleIndex].answer.toLowerCase();

    if (normalizedAnswer === correctAnswer || normalizedAnswer === MASTER_PASSWORD.toLowerCase()) {
      setRiddleError("");
      const updatedAnswers = [...riddleAnswers];
      updatedAnswers[currentRiddleIndex] = currentAnswer;
      setRiddleAnswers(updatedAnswers);
      
      // Play correct sound
      const correctSound = new Audio("/correct.mp3");
      correctSound.volume = 0.7;
      correctSound.play().catch(() => {
        // Ignore autoplay errors
      });
      
      // Show tick animation
      setShowTick(true);
      
      // After tick animation, move to next riddle or show password hint
      setTimeout(() => {
        setShowTick(false);
        if (currentRiddleIndex < RIDDLES.length - 1) {
          // Move to next riddle
          setCurrentRiddleIndex(currentRiddleIndex + 1);
        } else {
          // All riddles answered, show password hint
          setShowPasswordHint(true);
        }
      }, 1500); // Show tick for 1.5 seconds
    } else {
      // Play wrong sound
      const wrongSound = new Audio("/wrong.mp3");
      wrongSound.volume = 0.7;
      wrongSound.play().catch(() => {
        // Ignore autoplay errors
      });
      setRiddleError("Greshka! (Error) Try again.");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedPassword = password.toLowerCase().trim();

    if (
      normalizedPassword === LEVEL_1_PASSWORD ||
      normalizedPassword === MASTER_PASSWORD.toLowerCase()
    ) {
      setPasswordError("");
      setPassword("");
      
      // Play correct sound
      const correctSound = new Audio("/correct.mp3");
      correctSound.volume = 0.7;
      correctSound.play().catch(() => {
        // Ignore autoplay errors
      });
      
      // Play crowd clap sound for unlock
      const clapSound = new Audio("/crowd-clap.mp3");
      clapSound.volume = 0.7;
      clapSound.play().catch(() => {
        // Ignore autoplay errors
      });
      
      setIsUnlocked(true);
      // Save unlock state to localStorage
      const unlocked = JSON.parse(localStorage.getItem("christmasUnlockedLevels") || "[]");
      if (!unlocked.includes(1)) {
        unlocked.push(1);
        localStorage.setItem("christmasUnlockedLevels", JSON.stringify(unlocked));
      }
    } else {
      // Play wrong sound
      const wrongSound = new Audio("/wrong.mp3");
      wrongSound.volume = 0.7;
      wrongSound.play().catch(() => {
        // Ignore autoplay errors
      });
      setPasswordError("Access Denied! Try again.");
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

  return (
    <div className="min-h-screen w-full bg-black text-green-400 font-mono relative py-12">
      {/* Background Snow */}
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

      {/* Back Button */}
      <Link
        href="/christmas-mission"
        className="absolute top-4 left-4 z-20 p-3 bg-gray-900/80 hover:bg-gray-800/80 border border-green-500 rounded-md text-green-400 hover:text-green-300 transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-mono">BACK</span>
      </Link>

      {/* Big Tick Animation Overlay */}
      <AnimatePresence>
        {showTick && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            style={{ top: "400px", position: "fixed", left: 0, right: 0, bottom: 0 }}
          >
            <CheckCircle2 className="w-32 h-32 text-green-400" strokeWidth={2} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-2xl w-full px-8 mx-auto">
        <AnimatePresence mode="wait">
          {!isUnlocked && !showPasswordHint ? (
            <motion.div
              key="riddles"
              initial="initial"
              animate={isMounted ? "animate" : "initial"}
              exit="exit"
              variants={fadeVariants}
              transition={transition}
              className="space-y-6"
            >
              <motion.div
                initial="initial"
                animate={isMounted ? "animate" : "initial"}
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.3,
                    },
                  },
                }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  <Lock className="w-8 h-8 text-gray-500" />
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-green-400">
                      LOCK 1: PROJECT SMILE
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                      [ LOCKED ] - Riddle {currentRiddleIndex + 1} of {RIDDLES.length}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="border-t border-gray-700 pt-6"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  <p className="text-green-300 mb-4 font-mono text-lg">
                    <strong>RIDDLE {currentRiddleIndex + 1}:</strong>
                  </p>
                  <motion.p
                    className="text-gray-300 mb-6 font-mono text-xl leading-relaxed"
                    variants={textItemVariants}
                    transition={textTransition}
                  >
                    {RIDDLES[currentRiddleIndex].question}
                  </motion.p>
                  <p className="text-sm text-gray-500 mb-4 font-mono">
                    (Answer in English letters)
                  </p>

                  <form onSubmit={handleRiddleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={riddleAnswers[currentRiddleIndex] || ""}
                        onChange={(e) => {
                          const newAnswers = [...riddleAnswers];
                          newAnswers[currentRiddleIndex] = e.target.value;
                          setRiddleAnswers(newAnswers);
                          setRiddleError("");
                        }}
                        placeholder="Enter your answer..."
                        className="w-full px-4 py-3 bg-gray-900 border border-green-500 rounded-md text-green-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                        autoFocus
                      />
                      {riddleError && (
                        <p className="mt-2 text-sm text-red-500 font-mono">{riddleError}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 font-mono"
                    >
                      {currentRiddleIndex < RIDDLES.length - 1 ? "NEXT RIDDLE" : "COMPLETE"}
                    </Button>
                  </form>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : !isUnlocked && showPasswordHint ? (
            <motion.div
              key="password-hint"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeVariants}
              transition={transition}
              className="space-y-6"
            >
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.3,
                    },
                  },
                }}
              >
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  <Lock className="w-8 h-8 text-gray-500" />
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-green-400">
                      LOCK 1: PROJECT SMILE
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">[ LOCKED ] - Final Step</p>
                  </div>
                </motion.div>

                <motion.div
                  className="border-t border-gray-700 pt-6"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  <p className="text-green-300 mb-4 font-mono text-lg">
                    <strong>FINAL STEP:</strong>
                  </p>
                  <motion.p
                    className="text-gray-300 mb-6 font-mono text-base leading-relaxed"
                    variants={textItemVariants}
                    transition={textTransition}
                  >
                    Excellent! All riddles solved. Now find the password hidden in the{" "}
                    <strong className="text-green-400">coldest place in the house</strong>.
                  </motion.p>

                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError("");
                        }}
                        placeholder="Enter password found on paper..."
                        className="w-full px-4 py-3 bg-gray-900 border border-green-500 rounded-md text-green-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                        autoFocus
                      />
                      {passwordError && (
                        <p className="mt-2 text-sm text-red-500 font-mono">{passwordError}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-black font-bold py-3 font-mono"
                    >
                      UNLOCK
                    </Button>
                  </form>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeVariants}
              transition={transition}
              className="text-center space-y-6"
            >
              <motion.div
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 1,
                    },
                  },
                }}
              >
                <motion.div variants={textItemVariants} transition={textTransition}>
                  <Unlock className="w-16 h-16 text-green-400 mx-auto mb-4" />
                </motion.div>
                <motion.h2
                  className="text-3xl md:text-4xl text-green-400 font-bold mb-4"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  UNLOCKED!
                </motion.h2>
                <motion.p
                  className="text-2xl md:text-3xl text-yellow-400 font-bold mb-4"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  FAMILY PHOTOSHOOT EXPERIENCE!
                </motion.p>
                <motion.p
                  className="text-xl text-green-300 mb-8"
                  variants={textItemVariants}
                  transition={textTransition}
                >
                  Merry Christmas Mum
                </motion.p>
                <motion.div variants={textItemVariants} transition={textTransition}>
                  <Link href="/christmas-mission">
                    <Button className="bg-green-600 hover:bg-green-700 text-black font-bold py-3 px-8 font-mono">
                      RETURN TO MISSION
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


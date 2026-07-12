"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const totalSteps = 20;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setProgress(Math.min((step / totalSteps) * 100, 100));
      if (step >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => setDone(true), 400);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center"
        >
          <div className="text-center">
            <div className="text-2xl font-bold gradient-text mb-2">SR</div>
            <div className="text-[10px] font-mono text-text-muted tracking-[0.3em] uppercase mb-8">
              Initializing
            </div>
            <div className="w-32 h-[1px] bg-border relative mx-auto overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent via-cta to-success"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <div className="mt-3 text-[10px] font-mono text-text-muted tabular-nums">
              {Math.round(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

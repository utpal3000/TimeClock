import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, X, Timer as TimerIcon, Coffee } from 'lucide-react';

type TimerMode = 'work' | 'break';

export function PomodoroTimer() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  }, [mode]);

  const switchMode = useCallback(() => {
    setMode(prev => prev === 'work' ? 'break' : 'work');
    setIsActive(false);
  }, []);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      switchMode();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, switchMode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all duration-200 text-white/90 font-medium glow-effect ml-4"
      >
        <TimerIcon className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-md w-full shadow-xl border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                {mode === 'work' ? (
                  <>
                    <TimerIcon className="w-5 h-5" />
                    Work Session
                  </>
                ) : (
                  <>
                    <Coffee className="w-5 h-5" />
                    Break Time
                  </>
                )}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="text-6xl font-mono font-bold text-white mb-4">
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={toggleTimer}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  {isActive ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                >
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setMode('work');
                  resetTimer();
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  mode === 'work'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                Work (25:00)
              </button>
              <button
                onClick={() => {
                  setMode('break');
                  resetTimer();
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  mode === 'break'
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                Break (05:00)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
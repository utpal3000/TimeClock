import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { TimeDisplay } from './components/TimeDisplay';
import { TodoList } from './components/TodoList';
import { PomodoroTimer } from './components/PomodoroTimer';

function App() {
  const [time, setTime] = useState(new Date());
  const [wallpaperIndex, setWallpaperIndex] = useState(0);

  const wallpapers = [
    'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=1920'
  ];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const wallpaperTimer = setInterval(() => {
      setWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
    }, 60000);

    return () => {
      clearInterval(timer);
      clearInterval(wallpaperTimer);
    };
  }, []);

  return (
    <div 
      className="min-h-screen w-full relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${wallpapers[wallpaperIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      <div className="relative z-10 text-white p-8 max-w-3xl w-full">
        <TimeDisplay time={time} />
        <div className="flex justify-center">
          <TodoList />
          <PomodoroTimer />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-white/60 text-sm">
        Background changes every 60 seconds
      </div>

     
    </div>
  );
}

export default App;
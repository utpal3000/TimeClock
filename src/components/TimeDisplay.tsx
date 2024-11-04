import React from 'react';
import { Calendar, MapPin, Globe2 } from 'lucide-react';

interface TimeDisplayProps {
  time: Date;
}

export function TimeDisplay({ time }: TimeDisplayProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-4 text-xl font-light">
        <MapPin className="w-5 h-5" />
        <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
      </div>

      <div className="text-[8rem] font-bold leading-none tracking-tight mb-4 font-mono">
        {formatTime(time)}
      </div>

      <div className="flex items-center justify-center gap-3 text-2xl mb-8">
        <Calendar className="w-6 h-6" />
        <span className="font-light">{formatDate(time)}</span>
      </div>

      <div className="flex items-center justify-center gap-2 text-lg text-gray-200">
        <Globe2 className="w-5 h-5" />
        <span>Exact time synchronized with atomic clock</span>
      </div>
    </div>
  );
}
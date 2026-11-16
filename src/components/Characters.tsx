import React from 'react';
import { Star } from 'lucide-react';

interface AvatarProps {
  character: 'budi' | 'sari' | 'guru';
  size?: 'sm' | 'md' | 'lg';
}

export const CharacterAvatar: React.FC<AvatarProps> = ({ character, size = 'md' }) => {
  const dims =
    size === 'sm' ? 'w-12 h-12' : size === 'lg' ? 'w-20 h-20' : 'w-16 h-16';

  if (character === 'budi') {
    return (
      <div className={`${dims} rounded-2xl bg-sky-100 border-2 border-sky-300 flex items-center justify-center shrink-0 overflow-hidden`}>
        <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
          <circle cx="32" cy="32" r="32" fill="#E0F2FE" />
          {/* Seragam Putih Merah SD */}
          <path d="M14 64 C14 48, 50 48, 50 64 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M29 50 L35 50 L34 62 L30 62 Z" fill="#DC2626" />
          {/* Kepala */}
          <circle cx="32" cy="30" r="14" fill="#FDBA74" stroke="#0F172A" strokeWidth="2" />
          {/* Rambut */}
          <path d="M18 28 C18 14, 46 14, 46 28 C44 22, 38 20, 32 20 C26 20, 20 22, 18 28 Z" fill="#1E293B" />
          {/* Mata & Senyum */}
          <circle cx="27" cy="30" r="2" fill="#0F172A" />
          <circle cx="37" cy="30" r="2" fill="#0F172A" />
          <circle cx="24" cy="34" r="2.2" fill="#FB7185" opacity="0.55" />
          <circle cx="40" cy="34" r="2.2" fill="#FB7185" opacity="0.55" />
          <path d="M28 36 Q32 40 36 36" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  if (character === 'sari') {
    return (
      <div className={`${dims} rounded-2xl bg-pink-100 border-2 border-pink-300 flex items-center justify-center shrink-0 overflow-hidden`}>
        <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
          <circle cx="32" cy="32" r="32" fill="#FCE7F3" />
          {/* Kuncir rambut */}
          <circle cx="15" cy="28" r="6" fill="#1E293B" />
          <circle cx="49" cy="28" r="6" fill="#1E293B" />
          <circle cx="18" cy="24" r="2.5" fill="#EC4899" />
          <circle cx="46" cy="24" r="2.5" fill="#EC4899" />
          {/* Seragam */}
          <path d="M14 64 C14 48, 50 48, 50 64 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M29 50 L35 50 L34 62 L30 62 Z" fill="#DC2626" />
          {/* Kepala */}
          <circle cx="32" cy="30" r="14" fill="#FED7AA" stroke="#0F172A" strokeWidth="2" />
          {/* Poni rambut */}
          <path d="M18 28 C18 14, 46 14, 46 28 C42 21, 36 22, 32 19 C28 22, 22 21, 18 28 Z" fill="#1E293B" />
          {/* Mata & Senyum */}
          <circle cx="27" cy="30" r="2" fill="#0F172A" />
          <circle cx="37" cy="30" r="2" fill="#0F172A" />
          <circle cx="24" cy="34" r="2.2" fill="#FB7185" opacity="0.6" />
          <circle cx="40" cy="34" r="2.2" fill="#FB7185" opacity="0.6" />
          <path d="M28 36 Q32 40 36 36" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`${dims} rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center shrink-0 overflow-hidden`}>
      <svg viewBox="0 0 64 64" className="w-full h-full" aria-hidden="true">
        <circle cx="32" cy="32" r="32" fill="#FEF3C7" />
        {/* Batik Guru */}
        <path d="M12 64 C12 46, 52 46, 52 64 Z" fill="#B45309" stroke="#0F172A" strokeWidth="2" />
        {/* Hijab / Rambut rapi */}
        <circle cx="32" cy="29" r="17" fill="#D97706" stroke="#0F172A" strokeWidth="2" />
        <circle cx="32" cy="30" r="13" fill="#FDBA74" />
        <circle cx="27" cy="30" r="2" fill="#0F172A" />
        <circle cx="37" cy="30" r="2" fill="#0F172A" />
        <path d="M28 36 Q32 40 36 36" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

interface SpeechBubbleProps {
  character: 'budi' | 'sari' | 'guru';
  name: string;
  message: string;
  tone?: 'sky' | 'pink' | 'green' | 'amber';
}

export const CharacterSpeech: React.FC<SpeechBubbleProps> = ({
  character,
  name,
  message,
  tone = 'sky',
}) => {
  const bgMap = {
    sky: 'bg-sky-50 border-sky-200',
    pink: 'bg-pink-50 border-pink-200',
    green: 'bg-emerald-50 border-emerald-200',
    amber: 'bg-amber-50 border-amber-200',
  };

  return (
    <div className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border ${bgMap[tone]}`}>
      <CharacterAvatar character={character} size="md" />
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold text-sm text-slate-900 mb-1">{name}</p>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

interface StarRatingProps {
  earned: number;
  total?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const StarRating: React.FC<StarRatingProps> = ({
  earned,
  total = 5,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`${earned} dari ${total} bintang`}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i < earned;
        return (
          <Star
            key={i}
            className={`${iconSize} transition-transform duration-200 ${
              active ? 'fill-amber-400 text-amber-500 scale-105' : 'fill-slate-200 text-slate-300'
            }`}
          />
        );
      })}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { LearningProgress, PageId } from './types';
import { HomeView } from './components/HomeView';
import { AyoBelajarView } from './components/AyoBelajarView';
import { MateriView } from './components/MateriView';
import { GamesView } from './components/GamesView';
import { QuizView } from './components/QuizView';
import { ResultsView } from './components/ResultsView';
import { sound } from './utils/sound';

const STORAGE_KEY = 'ppkn_kelas3_hak_kewajiban_v1';

const DEFAULT_PROGRESS: LearningProgress = {
  studentName: '',
  visitedAyoBelajar: false,
  hakCompletedIds: [],
  kewajibanCompletedIds: [],
  balanceCompletedIds: [],
  gamesStars: {
    game1: 0,
    game2: 0,
    game3: 0,
    game4: 0,
  },
  quizResult: {
    completed: false,
    correctCount: 0,
    wrongCount: 0,
    score: 0,
    stars: 0,
  },
};

function loadInitialProgress(): LearningProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      gamesStars: {
        ...DEFAULT_PROGRESS.gamesStars,
        ...(parsed.gamesStars || {}),
      },
      quizResult: {
        ...DEFAULT_PROGRESS.quizResult,
        ...(parsed.quizResult || {}),
      },
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export default function App() {
  const [page, setPage] = useState<PageId>('beranda');
  const [progress, setProgress] = useState<LearningProgress>(loadInitialProgress);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Abaikan jika penyimpanan lokal dibatasi
    }
  }, [progress]);

  const handleNavigate = (target: PageId) => {
    setPage(target);
    setMobileMenuOpen(false);
    if (target === 'ayo-belajar' && !progress.visitedAyoBelajar) {
      setProgress((prev) => ({ ...prev, visitedAyoBelajar: true }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
  };

  const handleUpdateName = (name: string) => {
    setProgress((prev) => ({ ...prev, studentName: name }));
  };

  const handleMarkHak = (id: string) => {
    setProgress((prev) =>
      prev.hakCompletedIds.includes(id)
        ? prev
        : { ...prev, hakCompletedIds: [...prev.hakCompletedIds, id] }
    );
  };

  const handleMarkKewajiban = (id: string) => {
    setProgress((prev) =>
      prev.kewajibanCompletedIds.includes(id)
        ? prev
        : { ...prev, kewajibanCompletedIds: [...prev.kewajibanCompletedIds, id] }
    );
  };

  const handleCompleteBalance = (id: string) => {
    setProgress((prev) =>
      prev.balanceCompletedIds.includes(id)
        ? prev
        : { ...prev, balanceCompletedIds: [...prev.balanceCompletedIds, id] }
    );
  };

  const handleSaveGameStars = (
    gameKey: 'game1' | 'game2' | 'game3' | 'game4',
    stars: number
  ) => {
    setProgress((prev) => ({
      ...prev,
      gamesStars: {
        ...prev.gamesStars,
        [gameKey]: Math.max(prev.gamesStars[gameKey], stars),
      },
    }));
  };

  const handleCompleteQuiz = (result: {
    correctCount: number;
    wrongCount: number;
    score: number;
    stars: number;
  }) => {
    setProgress((prev) => ({
      ...prev,
      quizResult: {
        completed: true,
        ...result,
      },
    }));
  };

  const handleResetAll = () => {
    setProgress({
      ...DEFAULT_PROGRESS,
      studentName: progress.studentName,
    });
  };

  const navItems: { id: PageId; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'ayo-belajar', label: 'Ayo Belajar' },
    { id: 'hak', label: 'Hak' },
    { id: 'kewajiban', label: 'Kewajiban' },
    { id: 'permainan', label: 'Permainan' },
    { id: 'hasil', label: 'Hasilku' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 zones (Wordmark — Nav Links — Primary Action) */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              handleNavigate('beranda');
            }}
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-sky-700 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Hak &amp; Kewajibanku
          </button>

          {/* Zone 2: Clean single-line nav links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600"
          >
            {navItems.map((item) => {
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    handleNavigate(item.id);
                  }}
                  className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'border-sky-600 text-sky-700'
                      : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                handleNavigate('kuis');
              }}
              className="h-10 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              Kuis Pintar
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen((open) => !open);
              }}
              className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tablet / Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Navigasi Tablet dan Ponsel"
            className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 flex flex-wrap gap-2"
          >
            {navItems.map((item) => {
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    handleNavigate(item.id);
                  }}
                  className={`h-10 px-4 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Workspace Utility Strip (Audio Control & Student Context) */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 pt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs sm:text-sm font-medium text-slate-600">
          Siswa: <span className="font-bold text-slate-900">{progress.studentName || 'Siswa Kelas 3'}</span>
          <span aria-hidden="true" className="mx-2">·</span>
          <span>Pendidikan Pancasila SD</span>
        </p>

        <button
          type="button"
          onClick={handleToggleSound}
          className="h-9 px-3.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-slate-500" />
              <span>Suara Senyap</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-sky-600" />
              <span>Suara Aktif</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {page === 'beranda' && (
          <HomeView
            progress={progress}
            onUpdateName={handleUpdateName}
            onNavigate={handleNavigate}
          />
        )}

        {page === 'ayo-belajar' && (
          <AyoBelajarView
            completedBalanceIds={progress.balanceCompletedIds}
            onCompleteBalance={handleCompleteBalance}
            onNavigate={handleNavigate}
          />
        )}

        {page === 'hak' && (
          <MateriView
            mode="hak"
            completedIds={progress.hakCompletedIds}
            onMarkCompleted={handleMarkHak}
            onNavigate={handleNavigate}
          />
        )}

        {page === 'kewajiban' && (
          <MateriView
            mode="kewajiban"
            completedIds={progress.kewajibanCompletedIds}
            onMarkCompleted={handleMarkKewajiban}
            onNavigate={handleNavigate}
          />
        )}

        {page === 'permainan' && (
          <GamesView
            gamesStars={progress.gamesStars}
            onSaveGameStars={handleSaveGameStars}
            onNavigate={handleNavigate}
          />
        )}

        {page === 'kuis' && (
          <QuizView
            studentName={progress.studentName}
            onCompleteQuiz={handleCompleteQuiz}
            onNavigate={handleNavigate}
          />
        )}

        {page === 'hasil' && (
          <ResultsView
            progress={progress}
            onUpdateName={handleUpdateName}
            onResetAll={handleResetAll}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <p className="font-display font-semibold text-slate-800">
            Hak dan Kewajibanku di Sekolah · Pendidikan Pancasila Kelas 3 SD
          </p>
          <p className="font-semibold text-sky-700">
            Aku Anak Hebat! Aku Tahu Hak dan Kewajibanku!
          </p>
        </div>
      </footer>
    </div>
  );
}

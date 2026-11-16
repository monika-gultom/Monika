import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trash2,
  BookMarked,
  Eraser,
  Brush,
  Trophy,
} from 'lucide-react';
import {
  APP_IMAGES,
  CLEAN_MISSION_ITEMS,
  CLEAN_TOOLS,
  GAME1_SORT_ITEMS,
  GAME2_MATCH_PAIRS,
  GAME3_STORY_CHOICES,
} from '../data/learningData';
import { PageId } from '../types';
import { SafeImage } from './SafeImage';
import { StarRating } from './Characters';
import { sound } from '../utils/sound';

interface GamesViewProps {
  gamesStars: {
    game1: number;
    game2: number;
    game3: number;
    game4: number;
  };
  onSaveGameStars: (gameKey: 'game1' | 'game2' | 'game3' | 'game4', stars: number) => void;
  onNavigate: (page: PageId) => void;
}

type ActiveGame = 'menu' | 'game1' | 'game2' | 'game3' | 'game4';

export const GamesView: React.FC<GamesViewProps> = ({
  gamesStars,
  onSaveGameStars,
  onNavigate,
}) => {
  const [activeGame, setActiveGame] = useState<ActiveGame>('menu');

  const totalStars =
    gamesStars.game1 + gamesStars.game2 + gamesStars.game3 + gamesStars.game4;

  const gameList: {
    id: Exclude<ActiveGame, 'menu'>;
    num: string;
    title: string;
    desc: string;
    stars: number;
    accent: string;
    btnColor: string;
  }[] = [
    {
      id: 'game1',
      num: 'Permainan 1',
      title: 'Hak atau Kewajiban?',
      desc: 'Lihat gambar kegiatan di sekolah lalu pilih apakah itu termasuk Hak atau Kewajiban.',
      stars: gamesStars.game1,
      accent: 'bg-pink-50 border-pink-200',
      btnColor: 'bg-pink-600 hover:bg-pink-700 text-white',
    },
    {
      id: 'game2',
      num: 'Permainan 2',
      title: 'Pasangkan dengan Benar!',
      desc: 'Pasangkan gambar kegiatan siswa di sebelah kiri dengan pernyataan yang sesuai di sebelah kanan.',
      stars: gamesStars.game2,
      accent: 'bg-sky-50 border-sky-200',
      btnColor: 'bg-sky-600 hover:bg-sky-700 text-white',
    },
    {
      id: 'game3',
      num: 'Permainan 3',
      title: 'Pilih Sikap yang Baik!',
      desc: 'Baca cerita pendek tentang kejadian di sekolah dan pilih tindakan terbaik yang harus dilakukan.',
      stars: gamesStars.game3,
      accent: 'bg-amber-50 border-amber-200',
      btnColor: 'bg-amber-500 hover:bg-amber-600 text-slate-950',
    },
    {
      id: 'game4',
      num: 'Permainan 4',
      title: 'Misi Sekolah Bersih',
      desc: 'Bantu Budi dan Sari membersihkan benda yang berantakan di ruang kelas hingga 100% rapi!',
      stars: gamesStars.game4,
      accent: 'bg-emerald-50 border-emerald-200',
      btnColor: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if (activeGame === 'menu') {
              onNavigate('kewajiban');
            } else {
              setActiveGame('menu');
            }
          }}
          className="h-11 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{activeGame === 'menu' ? 'Kembali ke Materi' : 'Kembali ke Daftar Permainan'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate('kuis');
          }}
          className="h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>Lanjut: Kuis Pintar</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {activeGame === 'menu' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-bold text-amber-700">
                Arena Bermain Sambil Belajar
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                Permainan Edukasi Pancasila
              </h1>
              <p className="text-slate-600 text-base max-w-2xl">
                Pilih salah satu dari 4 permainan seru di bawah ini. Selesaikan tantangannya untuk meraih hingga 12 bintang!
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center shrink-0 min-w-[170px]">
              <p className="text-xs font-semibold text-amber-900 mb-1">
                Bintang Permainan
              </p>
              <p className="font-display text-3xl font-bold text-amber-950 tabular-nums">
                {totalStars} / 12
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gameList.map((g) => (
              <div
                key={g.id}
                className={`rounded-3xl border-2 p-6 flex flex-col justify-between gap-5 ${g.accent}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-slate-700">
                      {g.num}
                    </span>
                    <StarRating earned={g.stars} total={3} size="sm" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-slate-900">
                    {g.title}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {g.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveGame(g.id);
                  }}
                  className={`h-12 px-6 rounded-xl font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] ${g.btnColor}`}
                >
                  <span>{g.stars > 0 ? 'Main Lagi' : 'Mulai Main'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeGame === 'game1' && (
        <Game1Sort
          onFinish={(stars) => onSaveGameStars('game1', stars)}
          onBack={() => setActiveGame('menu')}
        />
      )}

      {activeGame === 'game2' && (
        <Game2Match
          onFinish={(stars) => onSaveGameStars('game2', stars)}
          onBack={() => setActiveGame('menu')}
        />
      )}

      {activeGame === 'game3' && (
        <Game3Story
          onFinish={(stars) => onSaveGameStars('game3', stars)}
          onBack={() => setActiveGame('menu')}
        />
      )}

      {activeGame === 'game4' && (
        <Game4CleanMission
          onFinish={(stars) => onSaveGameStars('game4', stars)}
          onBack={() => setActiveGame('menu')}
        />
      )}
    </div>
  );
};

/* =========================================================
   PERMAINAN 1: HAK ATAU KEWAJIBAN?
   ========================================================= */
const Game1Sort: React.FC<{ onFinish: (stars: number) => void; onBack: () => void }> = ({
  onFinish,
  onBack,
}) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'hak' | 'kewajiban' | null>(null);
  const [finished, setFinished] = useState(false);

  const item = GAME1_SORT_ITEMS[index];
  const isCorrect = selectedChoice === item.type;

  const handleChoose = (choice: 'hak' | 'kewajiban') => {
    if (selectedChoice !== null) return;
    setSelectedChoice(choice);
    if (choice === item.type) {
      sound.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (index < GAME1_SORT_ITEMS.length - 1) {
      setIndex((prev) => prev + 1);
      setSelectedChoice(null);
    } else {
      const finalStars = score >= 7 ? 3 : score >= 5 ? 2 : 1;
      sound.playFanfare();
      onFinish(finalStars);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setIndex(0);
    setScore(0);
    setSelectedChoice(null);
    setFinished(false);
  };

  if (finished) {
    const stars = score >= 7 ? 3 : score >= 5 ? 2 : 1;
    return (
      <GameSummaryCard
        title="Permainan 1 Selesai!"
        scoreText={`Kamu menjawab benar ${score} dari ${GAME1_SORT_ITEMS.length} kegiatan.`}
        stars={stars}
        praise={
          stars === 3
            ? 'Luar biasa! Kamu sangat pintar membedakan hak dan kewajiban di sekolah!'
            : 'Bagus sekali! Terus berlatih agar semakin mahir membedakan hak dan kewajiban.'
        }
        onReplay={handleRestart}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-pink-700">Permainan 1 · Pilah Kartu</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Hak atau Kewajiban?
          </h2>
        </div>
        <div className="text-sm font-bold text-slate-700 tabular-nums">
          Soal {index + 1} / {GAME1_SORT_ITEMS.length} · Benar: {score}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
            <SafeImage
              src={item.image}
              alt={item.text}
              className="w-full h-full object-cover"
              fallbackTitle="Kegiatan Siswa di Sekolah"
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Perhatikan kegiatan berikut:
            </p>
            <p className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {item.text}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              disabled={selectedChoice !== null}
              onClick={() => handleChoose('hak')}
              className={`h-16 px-6 rounded-2xl font-display font-bold text-lg border-2 transition-all cursor-pointer ${
                selectedChoice === 'hak'
                  ? item.type === 'hak'
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-rose-600 border-rose-600 text-white'
                  : 'bg-pink-50 border-pink-300 hover:bg-pink-100 text-pink-900'
              }`}
            >
              Ini Termasuk HAK
            </button>

            <button
              type="button"
              disabled={selectedChoice !== null}
              onClick={() => handleChoose('kewajiban')}
              className={`h-16 px-6 rounded-2xl font-display font-bold text-lg border-2 transition-all cursor-pointer ${
                selectedChoice === 'kewajiban'
                  ? item.type === 'kewajiban'
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'bg-rose-600 border-rose-600 text-white'
                  : 'bg-emerald-50 border-emerald-300 hover:bg-emerald-100 text-emerald-900'
              }`}
            >
              Ini Termasuk KEWAJIBAN
            </button>
          </div>

          {selectedChoice !== null && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 animate-pop-in space-y-3 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-display font-bold text-slate-900">
                    {isCorrect ? 'Hore, Jawabanmu Benar!' : 'Belum Tepat, Ayo Pelajari:'}
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 mt-0.5">
                    {item.feedback}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {index < GAME1_SORT_ITEMS.length - 1 ? 'Soal Berikutnya' : 'Lihat Bintangku'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PERMAINAN 2: PASANGKAN DENGAN BENAR!
   ========================================================= */
const Game2Match: React.FC<{ onFinish: (stars: number) => void; onBack: () => void }> = ({
  onFinish,
  onBack,
}) => {
  const shuffledStatements = useMemo(() => {
    const order = [2, 0, 4, 1, 3];
    return order.map((idx) => GAME2_MATCH_PAIRS[idx]);
  }, []);

  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    'Klik salah satu gambar di kiri, lalu klik pernyataan yang cocok di kanan!'
  );
  const [feedbackTone, setFeedbackTone] = useState<'info' | 'ok' | 'err'>('info');

  const allMatched = matchedIds.length === GAME2_MATCH_PAIRS.length;

  const handleSelectLeft = (id: string) => {
    if (matchedIds.includes(id)) return;
    sound.playClick();
    setSelectedLeftId(id);
    setFeedbackMsg('Sekarang pilih pernyataan yang cocok di kolom kanan.');
    setFeedbackTone('info');
  };

  const handleSelectRight = (rightId: string) => {
    if (matchedIds.includes(rightId)) return;
    if (!selectedLeftId) {
      sound.playWrong();
      setFeedbackMsg('Pilih gambar di kolom kiri terlebih dahulu ya!');
      setFeedbackTone('err');
      return;
    }

    if (selectedLeftId === rightId) {
      const nextMatched = [...matchedIds, rightId];
      setMatchedIds(nextMatched);
      setSelectedLeftId(null);

      if (nextMatched.length === GAME2_MATCH_PAIRS.length) {
        const stars = mistakes <= 1 ? 3 : mistakes <= 3 ? 2 : 1;
        sound.playFanfare();
        onFinish(stars);
      } else {
        sound.playStar();
      }

      setFeedbackMsg('Cocok sekali! Pasangan gambar dan pernyataan benar!');
      setFeedbackTone('ok');
    } else {
      sound.playWrong();
      setMistakes((prev) => prev + 1);
      setFeedbackMsg('Belum cocok nih. Coba perhatikan lagi gambarnya dengan teliti!');
      setFeedbackTone('err');
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setSelectedLeftId(null);
    setMatchedIds([]);
    setMistakes(0);
    setFeedbackMsg('Klik salah satu gambar di kiri, lalu klik pernyataan yang cocok di kanan!');
    setFeedbackTone('info');
  };

  if (allMatched) {
    const stars = mistakes <= 1 ? 3 : mistakes <= 3 ? 2 : 1;
    return (
      <GameSummaryCard
        title="Permainan 2 Selesai!"
        scoreText={`Semua ${GAME2_MATCH_PAIRS.length} gambar berhasil dipasangkan dengan benar (salah pilih: ${mistakes} kali).`}
        stars={stars}
        praise="Hebat! Kamu bisa mencocokkan setiap gambar kegiatan sekolah dengan pernyataan yang tepat."
        onReplay={handleRestart}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-sky-700">Permainan 2 · Cocokkan</p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Pasangkan dengan Benar!
          </h2>
        </div>
        <div className="text-sm font-bold text-slate-700 tabular-nums">
          Terpasang: {matchedIds.length} / {GAME2_MATCH_PAIRS.length}
        </div>
      </div>

      {/* Kotak Petunjuk / Umpan Balik */}
      <div
        className={`p-4 rounded-2xl border font-medium text-sm sm:text-base flex items-center justify-between gap-3 ${
          feedbackTone === 'ok'
            ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
            : feedbackTone === 'err'
            ? 'bg-amber-50 border-amber-300 text-amber-900'
            : 'bg-sky-50 border-sky-200 text-sky-900'
        }`}
      >
        <span>{feedbackMsg}</span>
        <button
          type="button"
          onClick={handleRestart}
          className="h-9 px-3 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-slate-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ulangi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri: Gambar Kegiatan */}
        <div className="space-y-3">
          <p className="font-display font-bold text-slate-800 text-base">
            1. Pilih Gambar Kegiatan
          </p>
          {GAME2_MATCH_PAIRS.map((pair) => {
            const matched = matchedIds.includes(pair.id);
            const selected = selectedLeftId === pair.id;
            return (
              <button
                key={pair.id}
                type="button"
                disabled={matched}
                onClick={() => handleSelectLeft(pair.id)}
                className={`w-full p-3 rounded-2xl border-2 flex items-center gap-4 text-left transition-all cursor-pointer ${
                  matched
                    ? 'bg-emerald-50 border-emerald-400 opacity-75 cursor-default'
                    : selected
                    ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
                    : 'bg-white border-slate-200 hover:border-sky-400 text-slate-900'
                }`}
              >
                <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                  <SafeImage
                    src={pair.image}
                    alt={pair.labelGambar}
                    className="w-full h-full object-cover"
                    fallbackTitle={pair.labelGambar}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-base truncate">
                    {pair.labelGambar}
                  </p>
                  <p
                    className={`text-xs ${
                      selected ? 'text-sky-100' : 'text-slate-500'
                    }`}
                  >
                    {matched ? 'Sudah dipasangkan' : selected ? 'Sedang dipilih' : 'Klik untuk memilih'}
                  </p>
                </div>
                {matched && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Kolom Kanan: Pernyataan */}
        <div className="space-y-3">
          <p className="font-display font-bold text-slate-800 text-base">
            2. Pilih Pernyataan yang Tepat
          </p>
          {shuffledStatements.map((item) => {
            const matched = matchedIds.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                disabled={matched}
                onClick={() => handleSelectRight(item.id)}
                className={`w-full min-h-[88px] p-4 rounded-2xl border-2 flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${
                  matched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-900 cursor-default'
                    : selectedLeftId
                    ? 'bg-amber-50/70 border-amber-300 hover:bg-amber-100 text-slate-900'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <span className="text-sm sm:text-base font-medium leading-snug">
                  {item.pernyataan}
                </span>
                {matched && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PERMAINAN 3: PILIH SIKAP YANG BAIK!
   ========================================================= */
const Game3Story: React.FC<{ onFinish: (stars: number) => void; onBack: () => void }> = ({
  onFinish,
  onBack,
}) => {
  const [step, setStep] = useState(0);
  const [chosenOptId, setChosenOptId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const story = GAME3_STORY_CHOICES[step];
  const chosenOption = story.options.find((o) => o.id === chosenOptId);

  const handleChoose = (optId: string, isCorrect: boolean) => {
    if (chosenOptId !== null) return;
    setChosenOptId(optId);
    if (isCorrect) {
      sound.playCorrect();
      setCorrectCount((c) => c + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (step < GAME3_STORY_CHOICES.length - 1) {
      setStep((s) => s + 1);
      setChosenOptId(null);
    } else {
      const stars = correctCount >= 4 ? 3 : correctCount >= 2 ? 2 : 1;
      sound.playFanfare();
      onFinish(stars);
      setFinished(true);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setStep(0);
    setChosenOptId(null);
    setCorrectCount(0);
    setFinished(false);
  };

  if (finished) {
    const stars = correctCount >= 4 ? 3 : correctCount >= 2 ? 2 : 1;
    return (
      <GameSummaryCard
        title="Permainan 3 Selesai!"
        scoreText={`Kamu memilih ${correctCount} dari ${GAME3_STORY_CHOICES.length} sikap yang paling tepat.`}
        stars={stars}
        praise="Keren! Kamu tahu cara bersikap sopan, peduli, dan bertanggung jawab di sekolah."
        onReplay={handleRestart}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-amber-700">
            Permainan 3 · Cerita Sekolah
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Pilih Sikap yang Baik!
          </h2>
        </div>
        <div className="text-sm font-bold text-slate-700 tabular-nums">
          Cerita {step + 1} / {GAME3_STORY_CHOICES.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100">
            <SafeImage
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
              fallbackTitle={story.title}
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <h3 className="font-display text-lg font-bold text-amber-950">
              {story.title}
            </h3>
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed">
              {story.story}
            </p>
          </div>

          <div className="space-y-3">
            {story.options.map((opt) => {
              const isSelected = chosenOptId === opt.id;
              const showRight = chosenOptId !== null && opt.isCorrect;
              const showWrong = isSelected && !opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={chosenOptId !== null}
                  onClick={() => handleChoose(opt.id, opt.isCorrect)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    showRight
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : showWrong
                      ? 'bg-rose-50 border-rose-400 text-rose-950'
                      : 'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 text-slate-800'
                  }`}
                >
                  <span className="font-medium text-sm sm:text-base">{opt.text}</span>
                  {showRight && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {showWrong && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {chosenOption && (
            <div
              className={`p-4 rounded-2xl border-2 animate-pop-in space-y-3 ${
                chosenOption.isCorrect
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <p className="font-semibold text-slate-900">
                {chosenOption.feedback}
              </p>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {step < GAME3_STORY_CHOICES.length - 1
                      ? 'Cerita Selanjutnya'
                      : 'Lihat Hasil Permainan'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   PERMAINAN 4: MISI SEKOLAH BERSIH
   ========================================================= */
const Game4CleanMission: React.FC<{
  onFinish: (stars: number) => void;
  onBack: () => void;
}> = ({ onFinish, onBack }) => {
  const [cleanedIds, setCleanedIds] = useState<string[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(
    CLEAN_MISSION_ITEMS[0].id
  );
  const [feedback, setFeedback] = useState<string>(
    'Klik salah satu benda yang berantakan di ruang kelas, lalu pilih alat yang tepat untuk membereskannya!'
  );
  const [mistakes, setMistakes] = useState(0);

  const activeItem = CLEAN_MISSION_ITEMS.find((i) => i.id === activeItemId);
  const progressPct = Math.round(
    (cleanedIds.length / CLEAN_MISSION_ITEMS.length) * 100
  );
  const isComplete = cleanedIds.length === CLEAN_MISSION_ITEMS.length;

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'tempat-sampah':
        return <Trash2 className="w-6 h-6" />;
      case 'rak-buku':
        return <BookMarked className="w-6 h-6" />;
      case 'penghapus-papan':
        return <Eraser className="w-6 h-6" />;
      default:
        return <Brush className="w-6 h-6" />;
    }
  };

  const handleUseTool = (toolId: string) => {
    if (!activeItem || cleanedIds.includes(activeItem.id)) return;

    if (toolId === activeItem.targetToolId) {
      const nextCleaned = [...cleanedIds, activeItem.id];
      setCleanedIds(nextCleaned);

      const remaining = CLEAN_MISSION_ITEMS.find(
        (item) => !nextCleaned.includes(item.id)
      );
      setActiveItemId(remaining ? remaining.id : null);

      if (nextCleaned.length === CLEAN_MISSION_ITEMS.length) {
        const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
        sound.playFanfare();
        onFinish(stars);
        setFeedback('Hebat! Seluruh ruang kelas sudah bersih dan rapi!');
      } else {
        sound.playStar();
        setFeedback(
          `Bagus! ${activeItem.name} sudah dibereskan menggunakan ${activeItem.targetToolName}. Pilih benda berikutnya!`
        );
      }
    } else {
      sound.playWrong();
      setMistakes((m) => m + 1);
      setFeedback(
        `Alat itu kurang cocok untuk ${activeItem.name}. Coba pilih alat kebersihan lainnya ya!`
      );
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setCleanedIds([]);
    setActiveItemId(CLEAN_MISSION_ITEMS[0].id);
    setMistakes(0);
    setFeedback(
      'Klik salah satu benda yang berantakan di ruang kelas, lalu pilih alat yang tepat untuk membereskannya!'
    );
  };

  if (isComplete) {
    const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
    return (
      <GameSummaryCard
        title="Misi Sekolah Bersih Berhasil!"
        scoreText={`Kebersihan kelas mencapai 100%! Semua ${CLEAN_MISSION_ITEMS.length} tugas piket selesai dikerjakan.`}
        stars={stars}
        praise="Luar biasa! Kamu sudah melaksanakan kewajiban menjaga kebersihan kelas dengan penuh tanggung jawab."
        onReplay={handleRestart}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-emerald-700">
            Permainan 4 · Tantangan Piket Kelas
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Misi Sekolah Bersih
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-500">Kebersihan Kelas</p>
            <p className="font-display text-xl font-bold text-emerald-700 tabular-nums">
              {progressPct}% ({cleanedIds.length}/{CLEAN_MISSION_ITEMS.length})
            </p>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="h-10 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi</span>
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kanvas Ruang Kelas Interaktif */}
        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border-2 border-slate-200 aspect-[4/3] bg-amber-50">
          <SafeImage
            src={APP_IMAGES.cleanClassroom}
            alt="Ruang kelas tempat misi kebersihan"
            className="w-full h-full object-cover opacity-85"
            fallbackTitle="Ruang Kelas Piket Kebersihan"
          />

          {/* Overlay benda yang perlu dibersihkan */}
          {CLEAN_MISSION_ITEMS.map((item) => {
            const cleaned = cleanedIds.includes(item.id);
            const selected = activeItemId === item.id;
            if (cleaned) return null;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveItemId(item.id);
                  setFeedback(
                    `Kamu memilih: ${item.name}. Pilih alat yang tepat di sebelah kanan!`
                  );
                }}
                style={{ left: `${item.posX}%`, top: `${item.posY}%` }}
                className={`-translate-x-1/2 -translate-y-1/2 absolute px-3.5 py-2 rounded-2xl border-2 font-display font-bold text-xs sm:text-sm shadow-md transition-transform cursor-pointer whitespace-nowrap ${
                  selected
                    ? 'bg-amber-400 border-amber-700 text-slate-950 scale-110 z-10'
                    : 'bg-white/95 border-rose-400 text-rose-900 hover:scale-105'
                }`}
              >
                {item.emojiLabel}
              </button>
            );
          })}
        </div>

        {/* Panel Kontrol Alat Kebersihan */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
            <p className="text-xs font-bold text-sky-800">Petunjuk Misi</p>
            <p className="text-sm font-medium text-slate-800">{feedback}</p>
          </div>

          {activeItem && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <p className="text-xs font-bold text-amber-900">Benda yang Dipilih:</p>
              <p className="font-display text-lg font-bold text-slate-900">
                {activeItem.name}
              </p>
              <p className="text-sm text-slate-700 mt-0.5">
                {activeItem.problemDesc}
              </p>
            </div>
          )}

          <div className="space-y-2.5">
            <p className="font-display font-bold text-slate-900 text-base">
              Pilih Alat atau Tempat yang Tepat:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {CLEAN_TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => handleUseTool(tool.id)}
                  className="p-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-left flex items-center gap-3.5 transition-all cursor-pointer active:scale-[0.99]"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    {getToolIcon(tool.id)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-slate-900 text-sm sm:text-base">
                      {tool.name}
                    </p>
                    <p className="text-xs text-slate-600">{tool.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   KARTU RINGKASAN PERMAINAN
   ========================================================= */
const GameSummaryCard: React.FC<{
  title: string;
  scoreText: string;
  stars: number;
  praise: string;
  onReplay: () => void;
  onBack: () => void;
}> = ({ title, scoreText, stars, praise, onReplay, onBack }) => {
  return (
    <div className="bg-white border-2 border-amber-300 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-5 animate-pop-in">
      <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
        <Trophy className="w-9 h-9" />
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-base font-medium text-slate-700">{scoreText}</p>
      </div>

      <div className="py-2 flex justify-center">
        <StarRating earned={stars} total={3} size="lg" />
      </div>

      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-medium text-sm sm:text-base flex items-center justify-center gap-2">
        <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />
        <span>{praise}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onReplay}
          className="h-12 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Main Lagi</span>
        </button>
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="h-12 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Pilih Permainan Lain</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

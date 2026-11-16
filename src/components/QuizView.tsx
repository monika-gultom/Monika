import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  Sparkles,
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { PageId } from '../types';
import { CharacterSpeech, StarRating } from './Characters';
import { sound } from '../utils/sound';

interface QuizViewProps {
  studentName: string;
  onCompleteQuiz: (result: {
    correctCount: number;
    wrongCount: number;
    score: number;
    stars: number;
  }) => void;
  onNavigate: (page: PageId) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  studentName,
  onCompleteQuiz,
  onNavigate,
}) => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const optionLabels = ['A', 'B', 'C'];

  const handleSelectOption = (optIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optIdx);

    if (optIdx === currentQuestion.correctIndex) {
      sound.playCorrect();
      setCorrectCount((c) => c + 1);
    } else {
      sound.playWrong();
      setWrongCount((w) => w + 1);
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
    } else {
      const score = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      const stars =
        score >= 90 ? 5 : score >= 75 ? 4 : score >= 60 ? 3 : score >= 40 ? 2 : 1;
      sound.playFanfare();
      onCompleteQuiz({
        correctCount,
        wrongCount,
        score,
        stars,
      });
      setFinished(true);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    setStarted(true);
    setCurrentIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setWrongCount(0);
    setFinished(false);
  };

  const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
  const finalStars =
    finalScore >= 90
      ? 5
      : finalScore >= 75
      ? 4
      : finalScore >= 60
      ? 3
      : finalScore >= 40
      ? 2
      : 1;

  return (
    <div className="space-y-8">
      {/* Top Action Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate('permainan');
          }}
          className="h-11 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Permainan</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate('hasil');
          }}
          className="h-11 px-5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>Lihat Hasil Belajarku</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Layar Awal Kuis */}
      {!started && !finished && (
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mx-auto">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-sky-700">
              Evaluasi Belajar · 10 Soal Pilihan Ganda
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              Kuis Pintar Pendidikan Pancasila
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Halo <span className="font-bold text-slate-900">{studentName || 'Siswa Hebat'}</span>! Ayo uji pemahamanmu tentang hak dan kewajiban di sekolah melalui 10 soal pilihan A, B, dan C.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
              <p className="font-display font-bold text-slate-900 text-base">10 Soal Mudah</p>
              <p className="text-sm text-slate-600 mt-1">
                Kalimat singkat dan jelas untuk Kelas 3 SD.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <p className="font-display font-bold text-slate-900 text-base">Pembahasan Langsung</p>
              <p className="text-sm text-slate-600 mt-1">
                Setiap jawaban langsung menampilkan penjelasan sederhana.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <p className="font-display font-bold text-slate-900 text-base">Raih 5 Bintang</p>
              <p className="text-sm text-slate-600 mt-1">
                Skor otomatis muncul setelah semua soal selesai.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setStarted(true);
            }}
            className="h-14 px-8 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-display font-bold text-lg inline-flex items-center gap-2.5 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <span>Mulai Kuis Sekarang</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>
      )}

      {/* Layar Mengerjakan Soal */}
      {started && !finished && (
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          {/* Header & Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 text-sm font-bold">
              <span className="text-sky-700 tabular-nums">
                Soal {currentIndex + 1} dari {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-slate-600 tabular-nums">
                Benar: {correctCount} · Salah: {wrongCount}
              </span>
            </div>

            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-sky-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + (selectedOption !== null ? 1 : 0)) / QUIZ_QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Pertanyaan */}
          <div className="p-5 sm:p-6 rounded-2xl bg-sky-50 border border-sky-200">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentIndex + 1}. {currentQuestion.question}
            </h2>
          </div>

          {/* Pilihan Jawaban A, B, C */}
          <div className="space-y-3">
            {currentQuestion.options.map((optText, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrect = optIdx === currentQuestion.correctIndex;
              const answered = selectedOption !== null;

              let btnStyle =
                'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 text-slate-900';
              if (answered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-500';
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={answered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-4 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`w-10 h-10 rounded-xl font-display font-bold text-base flex items-center justify-center shrink-0 ${
                        answered && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : answered && isSelected && !isCorrect
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {optionLabels[optIdx]}
                    </span>
                    <span className="font-semibold text-base sm:text-lg">
                      {optText}
                    </span>
                  </div>

                  {answered && isCorrect && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  )}
                  {answered && isSelected && !isCorrect && (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pembahasan Sederhana */}
          {selectedOption !== null && (
            <div
              className={`p-5 rounded-2xl border-2 animate-pop-in space-y-4 ${
                selectedOption === currentQuestion.correctIndex
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="space-y-1">
                <p className="font-display font-bold text-lg text-slate-900">
                  {selectedOption === currentQuestion.correctIndex
                    ? 'Benar! Hebat sekali!'
                    : `Belum tepat. Jawaban yang benar adalah ${optionLabels[currentQuestion.correctIndex]}.`}
                </p>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  <span className="font-semibold">Pembahasan: </span>
                  {currentQuestion.explanation}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-12 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentIndex < QUIZ_QUESTIONS.length - 1
                      ? 'Lanjut ke Soal Berikutnya'
                      : 'Selesai & Lihat Nilai'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Layar Akhir Kuis */}
      {finished && (
        <section className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto text-center space-y-6 animate-pop-in">
          <div className="space-y-2">
            <p className="text-sm font-bold text-sky-700">Kuis Pintar Selesai!</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              Nilai Kamu: <span className="tabular-nums text-sky-700">{finalScore}</span>
            </h2>
          </div>

          <div className="flex justify-center">
            <StarRating earned={finalStars} total={5} size="lg" />
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs font-semibold text-emerald-800">Jawaban Benar</p>
              <p className="font-display text-3xl font-bold text-emerald-700 tabular-nums">
                {correctCount}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
              <p className="text-xs font-semibold text-rose-800">Jawaban Salah</p>
              <p className="font-display text-3xl font-bold text-rose-700 tabular-nums">
                {wrongCount}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-medium text-sm sm:text-base flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
            <span>
              {finalScore >= 80
                ? 'Luar biasa! Kamu anak hebat yang paham hak dan kewajiban di sekolah!'
                : finalScore >= 60
                ? 'Bagus! Tetap semangat belajar dan coba ulangi kuis untuk hasil lebih tinggi.'
                : 'Ayo baca lagi materi Hak dan Kewajiban, lalu coba kuis lagi. Kamu pasti bisa!'}
            </span>
          </div>

          <CharacterSpeech
            character="guru"
            name="Bu Guru Rina"
            message={`Selamat ${studentName || 'Anak Hebat'} telah menyelesaikan seluruh 10 soal Kuis Pintar! Klik tombol Hasil Belajarku untuk melihat piagam prestasimu.`}
            tone="sky"
          />

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="h-12 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigate('hasil');
              }}
              className="h-12 px-6 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Buka Hasil Belajarku</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

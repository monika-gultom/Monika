import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Scale,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import {
  APP_IMAGES,
  BALANCE_PAIRS,
  LEARNING_OBJECTIVES,
} from '../data/learningData';
import { PageId } from '../types';
import { SafeImage } from './SafeImage';
import { CharacterSpeech } from './Characters';
import { sound } from '../utils/sound';

interface AyoBelajarViewProps {
  completedBalanceIds: string[];
  onCompleteBalance: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const AyoBelajarView: React.FC<AyoBelajarViewProps> = ({
  completedBalanceIds,
  onCompleteBalance,
  onNavigate,
}) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);
  const [kewajibanDone, setKewajibanDone] = useState(false);
  const [hakRevealed, setHakRevealed] = useState(false);

  const currentPair = BALANCE_PAIRS[selectedPairIndex];

  const handleSelectPair = (idx: number) => {
    sound.playClick();
    setSelectedPairIndex(idx);
    setKewajibanDone(false);
    setHakRevealed(false);
  };

  const handleDoKewajiban = () => {
    sound.playCorrect();
    setKewajibanDone(true);
  };

  const handleClaimHak = () => {
    sound.playStar();
    setHakRevealed(true);
    onCompleteBalance(currentPair.id);
  };

  const handleResetSim = () => {
    sound.playClick();
    setKewajibanDone(false);
    setHakRevealed(false);
  };

  return (
    <div className="space-y-8">
      {/* Header navigasi halaman */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate('beranda');
          }}
          className="h-11 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate('hak');
          }}
          className="h-11 px-5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>Lanjut ke Materi Hak</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pengantar & Tujuan Pembelajaran */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm font-semibold text-sky-700">
              Bab 1 · Ayo Belajar Bersama!
            </p>
            <h1 className="font-display text-2xl sm:text-4xl font-bold text-slate-900 text-balance">
              Apa Tujuan Belajar Kita Hari Ini?
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Di sekolah, setiap siswa mempunyai hak dan kewajiban. Dengan memahami keduanya, kita bisa belajar dengan gembira, tertib, dan saling menghormati.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {LEARNING_OBJECTIVES.map((obj, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-sm text-slate-800"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-sky-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-sky-50">
              <SafeImage
                src={APP_IMAGES.classroomTeacher}
                alt="Ibu guru sedang mengajar siswa kelas 3 SD di ruang kelas"
                className="w-full h-full object-cover"
                fallbackTitle="Suasana Belajar di Kelas 3 SD"
              />
            </div>
          </div>
        </div>

        <CharacterSpeech
          character="guru"
          name="Bu Guru Rina"
          message="Anak-anak hebat, sebelum mengenal lebih banyak contoh hak dan kewajiban, mari kita pelajari dahulu mengapa hak dan kewajiban harus selalu seimbang!"
          tone="amber"
        />
      </section>

      {/* Simulasi Interaktif: Hak dan Kewajiban Harus Seimbang */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <Scale className="w-4 h-4" aria-hidden="true" />
              <span>Simulasi Interaktif · Keseimbangan</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Hak dan Kewajiban Harus Seimbang
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Pilih contoh situasi di sekolah, lakukan kewajibannya terlebih dahulu, lalu lihat hak yang kita peroleh!
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-700 tabular-nums shrink-0">
            Situasi Dipelajari: {completedBalanceIds.length} / {BALANCE_PAIRS.length}
          </p>
        </div>

        {/* Pilihan 4 Situasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BALANCE_PAIRS.map((pair, idx) => {
            const isActive = idx === selectedPairIndex;
            const isDone = completedBalanceIds.includes(pair.id);
            return (
              <button
                key={pair.id}
                type="button"
                onClick={() => handleSelectPair(idx)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isActive
                    ? 'bg-sky-600 border-sky-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-sky-300 text-slate-800'
                }`}
              >
                <span className="font-display font-semibold text-sm sm:text-base">
                  {pair.situasi}
                </span>
                {isDone && (
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? 'text-amber-300' : 'text-emerald-600'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Panggung Simulasi 2 Langkah */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-white h-full">
              <SafeImage
                src={currentPair.ilustrasi}
                alt={currentPair.situasi}
                className="w-full h-full object-cover"
                fallbackTitle={currentPair.situasi}
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {currentPair.situasi}
              </h3>

              {/* Langkah 1: Kewajiban */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                  kewajibanDone
                    ? 'bg-emerald-50 border-emerald-400'
                    : 'bg-white border-emerald-200'
                }`}
              >
                <p className="text-xs font-bold text-emerald-700 mb-1">
                  Langkah 1 · Laksanakan Kewajibanmu
                </p>
                <p className="text-slate-800 font-medium text-base mb-3">
                  {currentPair.kewajiban}
                </p>
                {!kewajibanDone ? (
                  <button
                    type="button"
                    onClick={handleDoKewajiban}
                    className="h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Aku Sudah Lakukan Kewajiban Ini!</span>
                  </button>
                ) : (
                  <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Kewajiban selesai dilaksanakan dengan tanggung jawab!</span>
                  </p>
                )}
              </div>

              {/* Langkah 2: Hak */}
              <div
                className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                  hakRevealed
                    ? 'bg-pink-50 border-pink-400'
                    : kewajibanDone
                    ? 'bg-white border-pink-300'
                    : 'bg-slate-100 border-slate-200 opacity-75'
                }`}
              >
                <p className="text-xs font-bold text-pink-700 mb-1">
                  Langkah 2 · Hak yang Kamu Dapatkan
                </p>
                {hakRevealed ? (
                  <div className="space-y-2 animate-pop-in">
                    <p className="text-slate-900 font-semibold text-base">
                      {currentPair.hak}
                    </p>
                    <p className="text-sm font-semibold text-pink-700 inline-flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span>Keseimbangan tercapai! Sekolah jadi nyaman untuk semua.</span>
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <p className="text-sm text-slate-600">
                      {kewajibanDone
                        ? 'Hebat! Sekarang klik tombol untuk melihat hak yang kamu terima.'
                        : 'Selesaikan Langkah 1 terlebih dahulu agar hak dan kewajiban seimbang.'}
                    </p>
                    <button
                      type="button"
                      disabled={!kewajibanDone}
                      onClick={handleClaimHak}
                      className={`h-11 px-5 rounded-xl font-semibold text-sm whitespace-nowrap shrink-0 transition-all ${
                        kewajibanDone
                          ? 'bg-pink-600 hover:bg-pink-700 text-white cursor-pointer'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Lihat Hakku
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetSim}
                className="h-10 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Situasi Ini</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigate('hak');
                }}
                className="h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut: Materi Hak</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

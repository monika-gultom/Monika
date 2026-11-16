import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  HeartHandshake,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';
import { HAK_ITEMS, KEWAJIBAN_ITEMS, LearningPoint } from '../data/learningData';
import { PageId } from '../types';
import { SafeImage } from './SafeImage';
import { CharacterSpeech } from './Characters';
import { sound } from '../utils/sound';

interface MateriViewProps {
  mode: 'hak' | 'kewajiban';
  completedIds: string[];
  onMarkCompleted: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({
  mode,
  completedIds,
  onMarkCompleted,
  onNavigate,
}) => {
  const isHak = mode === 'hak';
  const items: LearningPoint[] = isHak ? HAK_ITEMS : KEWAJIBAN_ITEMS;
  const [activeIndex, setActiveIndex] = useState(0);

  const currentItem = items[activeIndex];
  const isMarked = completedIds.includes(currentItem.id);

  const handleSelectCard = (idx: number) => {
    sound.playClick();
    setActiveIndex(idx);
    onMarkCompleted(items[idx].id);
  };

  const handlePrev = () => {
    sound.playClick();
    const prevIdx = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
    setActiveIndex(prevIdx);
    onMarkCompleted(items[prevIdx].id);
  };

  const handleNext = () => {
    sound.playClick();
    onMarkCompleted(currentItem.id);
    const nextIdx = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(nextIdx);
    onMarkCompleted(items[nextIdx].id);
  };

  const handleMarkAndNext = () => {
    sound.playStar();
    onMarkCompleted(currentItem.id);
    if (activeIndex < items.length - 1) {
      const nextIdx = activeIndex + 1;
      setActiveIndex(nextIdx);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Action Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate(isHak ? 'ayo-belajar' : 'hak');
          }}
          className="h-11 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHak ? 'Kembali ke Ayo Belajar' : 'Kembali ke Materi Hak'}</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate(isHak ? 'kewajiban' : 'permainan');
          }}
          className={`h-11 px-5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer text-white ${
            isHak
              ? 'bg-emerald-600 hover:bg-emerald-700'
              : 'bg-amber-500 hover:bg-amber-600 !text-slate-950'
          }`}
        >
          <span>{isHak ? 'Lanjut: Materi Kewajiban' : 'Lanjut: Permainan Edukasi'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Pengertian Utama */}
      <section
        className={`rounded-3xl p-6 sm:p-8 border-2 ${
          isHak
            ? 'bg-pink-50 border-pink-200'
            : 'bg-emerald-50 border-emerald-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 text-sm font-bold ${
                isHak ? 'text-pink-700' : 'text-emerald-700'
              }`}
            >
              {isHak ? (
                <HeartHandshake className="w-5 h-5" aria-hidden="true" />
              ) : (
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              )}
              <span>{isHak ? 'Materi 1 · Hak di Sekolah' : 'Materi 2 · Kewajiban di Sekolah'}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              {isHak ? 'Apa Itu Hak?' : 'Apa Itu Kewajiban?'}
            </h1>

            <p className="text-lg sm:text-xl font-semibold text-slate-800 leading-relaxed">
              {isHak
                ? 'Hak adalah sesuatu yang pantas kita dapatkan.'
                : 'Kewajiban adalah sesuatu yang harus kita lakukan dengan penuh tanggung jawab.'}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shrink-0 text-center min-w-[180px]">
            <p className="text-xs font-semibold text-slate-500 mb-1">
              Progres Membaca
            </p>
            <p className="font-display text-2xl font-bold text-slate-900 tabular-nums">
              {completedIds.length} / {items.length}
            </p>
            <p className="text-xs text-slate-600 mt-1">Contoh dipelajari</p>
          </div>
        </div>
      </section>

      {/* Panggung Eksplorasi 6 Contoh */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Daftar 6 Pilihan Kartu (Kiri) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="font-display text-xl font-bold text-slate-900 px-1">
            {isHak ? '6 Contoh Hak Siswa di Sekolah' : '6 Contoh Kewajiban Siswa di Sekolah'}
          </h2>

          <div className="space-y-2.5">
            {items.map((item, idx) => {
              const active = idx === activeIndex;
              const done = completedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectCard(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                    active
                      ? isHak
                        ? 'bg-pink-600 border-pink-600 text-white shadow-sm'
                        : 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-xl font-display font-bold text-sm flex items-center justify-center shrink-0 tabular-nums ${
                        active
                          ? 'bg-white/20 text-white'
                          : isHak
                          ? 'bg-pink-100 text-pink-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-sm sm:text-base truncate">
                      {item.title}
                    </span>
                  </div>
                  {done && (
                    <CheckCircle2
                      className={`w-5 h-5 shrink-0 ${
                        active ? 'text-amber-300' : 'text-emerald-600'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Kartu Aktif (Kanan) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 animate-pop-in">
          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/10] bg-slate-100">
            <SafeImage
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover"
              fallbackTitle={currentItem.title}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <span
                className={`text-sm font-bold ${
                  isHak ? 'text-pink-700' : 'text-emerald-700'
                }`}
              >
                Contoh {activeIndex + 1} dari {items.length}
              </span>
              {isMarked && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sudah dipahami</span>
                </span>
              )}
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              {currentItem.title}
            </h3>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {currentItem.shortDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
                <p className="text-xs font-bold text-sky-800">
                  Contoh di Sekolah
                </p>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {currentItem.example}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <p className="text-xs font-bold text-amber-900 inline-flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Manfaatnya Bagi Kita</span>
                </p>
                <p className="text-sm text-slate-800 leading-relaxed">
                  {currentItem.benefit}
                </p>
              </div>
            </div>
          </div>

          {/* Kontrol Navigasi Materi */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="h-11 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveIndex(0);
                }}
                className="h-11 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi</span>
              </button>
            </div>

            {activeIndex < items.length - 1 ? (
              <button
                type="button"
                onClick={handleMarkAndNext}
                className={`h-11 px-5 rounded-xl font-semibold text-sm inline-flex items-center gap-2 text-white cursor-pointer ${
                  isHak
                    ? 'bg-pink-600 hover:bg-pink-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                <span>Paham &amp; Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  sound.playStar();
                  onMarkCompleted(currentItem.id);
                  onNavigate(isHak ? 'kewajiban' : 'permainan');
                }}
                className="h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{isHak ? 'Lanjut ke Kewajiban' : 'Ayo Main Permainan!'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <CharacterSpeech
        character={isHak ? 'sari' : 'budi'}
        name={isHak ? 'Sari — Siswa Kelas 3' : 'Budi — Siswa Kelas 3'}
        message={
          isHak
            ? 'Ingat ya teman-teman, setelah menerima hak di sekolah, kita juga harus melaksanakan kewajiban dengan gembira!'
            : 'Wah, kalau semua siswa rajin menjalankan kewajiban, pasti sekolah kita menjadi tempat belajar yang paling menyenangkan!'
        }
        tone={isHak ? 'pink' : 'green'}
      />
    </div>
  );
};

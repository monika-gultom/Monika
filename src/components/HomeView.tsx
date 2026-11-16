import React, { useState } from 'react';
import {
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Gamepad2,
  ClipboardCheck,
  Award,
  ArrowRight,
  Check,
  Sparkles,
  User,
} from 'lucide-react';
import { APP_IMAGES } from '../data/learningData';
import { LearningProgress, PageId } from '../types';
import { SafeImage } from './SafeImage';
import { CharacterSpeech } from './Characters';
import { sound } from '../utils/sound';

interface HomeViewProps {
  progress: LearningProgress;
  onUpdateName: (name: string) => void;
  onNavigate: (page: PageId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onUpdateName,
  onNavigate,
}) => {
  const [nameInput, setNameInput] = useState(progress.studentName);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    onUpdateName(trimmed || 'Siswa Hebat');
    sound.playCorrect();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const totalStars =
    progress.gamesStars.game1 +
    progress.gamesStars.game2 +
    progress.gamesStars.game3 +
    progress.gamesStars.game4 +
    progress.quizResult.stars;

  const menuCards: {
    id: PageId;
    num: string;
    title: string;
    desc: string;
    status: string;
    icon: React.ReactNode;
    accentBg: string;
    accentBorder: string;
    iconWrap: string;
  }[] = [
    {
      id: 'ayo-belajar',
      num: '01',
      title: 'Ayo Belajar!',
      desc: 'Kenali tujuan belajar dan coba simulasi keseimbangan hak dan kewajiban.',
      status: progress.visitedAyoBelajar ? 'Sudah dibuka' : 'Siap dipelajari',
      icon: <BookOpen className="w-7 h-7" />,
      accentBg: 'bg-sky-50 hover:bg-sky-100/80',
      accentBorder: 'border-sky-200 hover:border-sky-400',
      iconWrap: 'bg-sky-600 text-white',
    },
    {
      id: 'hak',
      num: '02',
      title: 'Materi Hak di Sekolah',
      desc: 'Pelajari arti hak beserta 6 contoh hak siswa di kelas dan halaman sekolah.',
      status: `${progress.hakCompletedIds.length}/6 dipelajari`,
      icon: <HeartHandshake className="w-7 h-7" />,
      accentBg: 'bg-pink-50 hover:bg-pink-100/80',
      accentBorder: 'border-pink-200 hover:border-pink-400',
      iconWrap: 'bg-pink-600 text-white',
    },
    {
      id: 'kewajiban',
      num: '03',
      title: 'Materi Kewajiban di Sekolah',
      desc: 'Pahami tanggung jawab siswa agar sekolah selalu bersih, tertib, dan nyaman.',
      status: `${progress.kewajibanCompletedIds.length}/6 dipelajari`,
      icon: <ShieldCheck className="w-7 h-7" />,
      accentBg: 'bg-emerald-50 hover:bg-emerald-100/80',
      accentBorder: 'border-emerald-200 hover:border-emerald-400',
      iconWrap: 'bg-emerald-600 text-white',
    },
    {
      id: 'permainan',
      num: '04',
      title: 'Permainan Edukasi',
      desc: 'Mainkan 4 gim seru: pilah kartu, pasangkan gambar, pilih sikap, dan misi bersih!',
      status: `${progress.gamesStars.game1 + progress.gamesStars.game2 + progress.gamesStars.game3 + progress.gamesStars.game4}/12 bintang`,
      icon: <Gamepad2 className="w-7 h-7" />,
      accentBg: 'bg-amber-50 hover:bg-amber-100/80',
      accentBorder: 'border-amber-200 hover:border-amber-400',
      iconWrap: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'kuis',
      num: '05',
      title: 'Kuis Pintar',
      desc: 'Jawab 10 soal pilihan ganda A, B, C dengan pembahasan langsung dan skor otomatis.',
      status: progress.quizResult.completed
        ? `Nilai: ${progress.quizResult.score}`
        : '10 soal tersedia',
      icon: <ClipboardCheck className="w-7 h-7" />,
      accentBg: 'bg-sky-50 hover:bg-sky-100/80',
      accentBorder: 'border-sky-200 hover:border-sky-400',
      iconWrap: 'bg-sky-700 text-white',
    },
    {
      id: 'hasil',
      num: '06',
      title: 'Hasil Belajarku',
      desc: 'Lihat nilai akhir, jumlah jawaban benar dan salah, bintang, serta pesan penyemangat.',
      status: `${totalStars} bintang terkumpul`,
      icon: <Award className="w-7 h-7" />,
      accentBg: 'bg-pink-50 hover:bg-pink-100/80',
      accentBorder: 'border-pink-200 hover:border-pink-400',
      iconWrap: 'bg-pink-600 text-white',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Hero Banner Split */}
      <section className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-sky-700">
                <span>Pendidikan Pancasila</span>
                <span aria-hidden="true">·</span>
                <span>Kelas 3 SD</span>
                <span aria-hidden="true">·</span>
                <span>Media Interaktif</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-tight text-balance">
                Hak dan Kewajibanku di Sekolah
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Belajar membedakan hak dan kewajiban di sekolah bersama Budi, Sari, dan Ibu Guru melalui materi bergambar, empat permainan seru, dan kuis pintar!
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="font-display font-bold text-amber-950 text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                  <span>&ldquo;Aku Anak Hebat! Aku Tahu Hak dan Kewajibanku!&rdquo;</span>
                </p>
              </div>
            </div>

            {/* Form Nama Siswa */}
            <form
              onSubmit={handleSaveName}
              className="pt-2 space-y-3"
            >
              <label
                htmlFor="student-name-input"
                className="block text-sm font-semibold text-slate-700"
              >
                Tulis Namamu Sebelum Mulai Belajar:
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  <input
                    id="student-name-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Contoh: Adi Pratama"
                    maxLength={40}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-300 bg-white text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-sm sm:text-base transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {savedNotice ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Tersimpan!</span>
                    </>
                  ) : (
                    <span>Simpan Nama</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    if (nameInput.trim() && nameInput.trim() !== progress.studentName) {
                      onUpdateName(nameInput.trim());
                    }
                    onNavigate('ayo-belajar');
                  }}
                  className="h-12 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-semibold text-sm sm:text-base transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                >
                  <span>Mulai Belajar</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[420px] bg-sky-100">
            <SafeImage
              src={APP_IMAGES.heroSd}
              alt="Ilustrasi siswa SD Indonesia laki-laki dan perempuan berseragam putih merah di halaman sekolah"
              className="w-full h-full lg:h-full object-cover"
              fallbackTitle="Siswa SD Indonesia di Sekolah"
            />
          </div>
        </div>
      </section>

      {/* Sapaan Karakter */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <CharacterSpeech
          character="sari"
          name="Sari — Siswa Kelas 3"
          message={`Halo ${progress.studentName || 'Teman'}! Yuk kita pilih menu di bawah ini untuk mengenal apa saja hak dan kewajiban kita di sekolah.`}
          tone="pink"
        />
        <CharacterSpeech
          character="budi"
          name="Budi — Siswa Kelas 3"
          message="Jangan lupa mainkan Permainan Edukasi dan kerjakan Kuis Pintar untuk mengumpulkan banyak bintang!"
          tone="sky"
        />
      </div>

      {/* Menu Utama (6 Menu Wajib) */}
      <section aria-labelledby="menu-utama-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2
              id="menu-utama-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Menu Utama Belajar
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Klik salah satu kotak besar di bawah ini untuk mulai belajar atau bermain.
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-700 tabular-nums">
            Total Bintangmu: {totalStars} / 17
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {menuCards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigate(card.id);
              }}
              className={`group text-left p-6 rounded-3xl border-2 transition-all duration-150 flex flex-col justify-between gap-5 cursor-pointer active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${card.accentBg} ${card.accentBorder}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-150 group-hover:scale-105 ${card.iconWrap}`}
                  >
                    {card.icon}
                  </div>
                  <span className="font-display text-lg font-bold text-slate-400 tabular-nums">
                    {card.num}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900 mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-900/10 text-sm font-semibold">
                <span className="text-slate-600 tabular-nums">{card.status}</span>
                <span className="text-slate-900 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform whitespace-nowrap">
                  <span>Buka</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

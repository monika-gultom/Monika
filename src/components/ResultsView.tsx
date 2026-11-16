import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Home,
  RotateCcw,
  Sparkles,
  User,
  XCircle,
} from 'lucide-react';
import { LearningProgress, PageId } from '../types';
import { CharacterSpeech, StarRating } from './Characters';
import { sound } from '../utils/sound';

interface ResultsViewProps {
  progress: LearningProgress;
  onUpdateName: (name: string) => void;
  onResetAll: () => void;
  onNavigate: (page: PageId) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  progress,
  onUpdateName,
  onResetAll,
  onNavigate,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState(progress.studentName);
  const [confirmReset, setConfirmReset] = useState(false);

  const gameStarsTotal =
    progress.gamesStars.game1 +
    progress.gamesStars.game2 +
    progress.gamesStars.game3 +
    progress.gamesStars.game4;

  const totalStars = gameStarsTotal + progress.quizResult.stars;
  const maxStars = 17;

  const getMotivationMessage = () => {
    if (!progress.quizResult.completed) {
      return 'Ayo kerjakan Kuis Pintar agar nilai akhirmu muncul di halaman ini!';
    }
    if (progress.quizResult.score >= 85) {
      return 'Hebat sekali! Kamu benar-benar memahami hak dan kewajiban siswa di sekolah. Teruslah menjadi anak yang bertanggung jawab dan saling menghormati!';
    }
    if (progress.quizResult.score >= 60) {
      return 'Bagus sekali! Kamu sudah memahami banyak materi. Coba mainkan permainan lagi dan ulangi kuis agar bintangmu penuh!';
    }
    return 'Tetap semangat belajar ya! Yuk baca kembali Materi Hak dan Kewajiban di Sekolah, lalu coba Kuis Pintar lagi!';
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(draftName.trim() || 'Siswa Hebat');
    setEditingName(false);
    sound.playCorrect();
  };

  return (
    <div className="space-y-8">
      {/* Navigasi */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate('beranda');
          }}
          className="h-11 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onNavigate('kuis');
          }}
          className="h-11 px-5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Kuis Pintar</span>
        </button>
      </div>

      {/* Piagam Hasil Belajarku */}
      <section className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-9 h-9" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-pink-700">
                Laporan Prestasi Belajar · Pendidikan Pancasila Kelas 3 SD
              </p>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
                Hasil Belajarku
              </h1>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {!editingName ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 text-base font-bold text-slate-800">
                      <User className="w-4 h-4 text-sky-600" aria-hidden="true" />
                      <span>Nama Siswa: {progress.studentName || 'Siswa Hebat'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setDraftName(progress.studentName);
                        setEditingName(true);
                      }}
                      className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                    >
                      (Ubah Nama)
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSaveName} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      maxLength={40}
                      className="h-9 px-3 rounded-lg border border-slate-300 text-sm font-medium text-slate-900"
                      placeholder="Masukkan namamu"
                    />
                    <button
                      type="submit"
                      className="h-9 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer"
                    >
                      Simpan
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 text-center shrink-0">
            <p className="text-xs font-bold text-amber-900 mb-1">
              Total Bintang Terkumpul
            </p>
            <p className="font-display text-3xl font-bold text-amber-950 tabular-nums">
              {totalStars} / {maxStars}
            </p>
          </div>
        </div>

        {/* 4 Kartu Statistik Utama Kuis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
            <p className="text-xs font-bold text-sky-800">Nilai Akhir Kuis</p>
            <p className="font-display text-4xl font-bold text-sky-700 tabular-nums">
              {progress.quizResult.completed ? progress.quizResult.score : '-'}
            </p>
            <p className="text-xs text-slate-600">
              {progress.quizResult.completed
                ? 'Skor maksimal 100'
                : 'Belum mengerjakan kuis'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
            <p className="text-xs font-bold text-emerald-800 inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              <span>Soal Benar</span>
            </p>
            <p className="font-display text-4xl font-bold text-emerald-700 tabular-nums">
              {progress.quizResult.completed ? progress.quizResult.correctCount : 0}
            </p>
            <p className="text-xs text-slate-600">Dari 10 soal kuis</p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
            <p className="text-xs font-bold text-rose-800 inline-flex items-center gap-1">
              <XCircle className="w-4 h-4" aria-hidden="true" />
              <span>Soal Salah</span>
            </p>
            <p className="font-display text-4xl font-bold text-rose-700 tabular-nums">
              {progress.quizResult.completed ? progress.quizResult.wrongCount : 0}
            </p>
            <p className="text-xs text-slate-600">Dari 10 soal kuis</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <p className="text-xs font-bold text-amber-900">Bintang Kuis Pintar</p>
            <div className="pt-1">
              <StarRating earned={progress.quizResult.stars} total={5} size="md" />
            </div>
            <p className="text-xs text-slate-600 tabular-nums">
              {progress.quizResult.stars} dari 5 bintang
            </p>
          </div>
        </div>

        {/* Rincian Pencapaian Materi & Permainan */}
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Catatan Aktivitas Belajarmu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold text-slate-900">Materi Hak</p>
                <p className="text-sm text-slate-600 tabular-nums">
                  {progress.hakCompletedIds.length} / 6 contoh dipelajari
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigate('hak');
                }}
                className="text-xs font-bold text-pink-700 hover:underline cursor-pointer whitespace-nowrap"
              >
                Buka
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold text-slate-900">Materi Kewajiban</p>
                <p className="text-sm text-slate-600 tabular-nums">
                  {progress.kewajibanCompletedIds.length} / 6 contoh dipelajari
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigate('kewajiban');
                }}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer whitespace-nowrap"
              >
                Buka
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
              <div>
                <p className="font-display font-bold text-slate-900">Permainan Edukasi</p>
                <p className="text-sm text-slate-600 tabular-nums">
                  {gameStarsTotal} / 12 bintang terkumpul
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onNavigate('permainan');
                }}
                className="text-xs font-bold text-amber-800 hover:underline cursor-pointer whitespace-nowrap"
              >
                Mainkan
              </button>
            </div>
          </div>
        </div>

        {/* Pesan Motivasi & Slogan */}
        <div className="p-5 sm:p-6 rounded-2xl bg-pink-50 border border-pink-200 space-y-2">
          <p className="font-display font-bold text-pink-800 text-base inline-flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-600" aria-hidden="true" />
            <span>Pesan Motivasi Untukmu</span>
          </p>
          <p className="text-slate-800 text-base sm:text-lg leading-relaxed">
            {getMotivationMessage()}
          </p>
          <p className="font-display font-bold text-sky-800 pt-1">
            &ldquo;Aku Anak Hebat! Aku Tahu Hak dan Kewajibanku!&rdquo;
          </p>
        </div>

        <CharacterSpeech
          character="sari"
          name="Sari & Budi"
          message={`Terima kasih sudah belajar bersama kami, ${progress.studentName || 'Teman'}! Mari kita terapkan hak dan kewajiban dengan seimbang setiap hari di sekolah.`}
          tone="sky"
        />

        {/* Tombol Reset Data Belajar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="h-10 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Atur Ulang Semua Nilai</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-rose-700">
                Yakin hapus progres belajar?
              </span>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onResetAll();
                  setConfirmReset(false);
                }}
                className="h-9 px-3 rounded-lg bg-rose-600 text-white text-xs font-semibold cursor-pointer"
              >
                Ya, Ulangi Semua
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="h-9 px-3 rounded-lg bg-slate-200 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onNavigate('beranda');
              }}
              className="h-11 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Ke Menu Utama</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

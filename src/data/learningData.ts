import heroSdImg from '../assets/images/hero_sd_characters_1794788752942.jpg';
import classroomTeacherImg from '../assets/images/scene_classroom_teacher_1794788753190.jpg';
import libraryReadingImg from '../assets/images/scene_library_reading_1794788753969.jpg';
import schoolyardPlayImg from '../assets/images/scene_schoolyard_play_1794788754773.jpg';
import cleanClassroomImg from '../assets/images/scene_clean_classroom_1794788755324.jpg';

export const APP_IMAGES = {
  heroSd: heroSdImg,
  classroomTeacher: classroomTeacherImg,
  libraryReading: libraryReadingImg,
  schoolyardPlay: schoolyardPlayImg,
  cleanClassroom: cleanClassroomImg,
};

export interface LearningPoint {
  id: string;
  title: string;
  shortDesc: string;
  example: string;
  benefit: string;
  image: string;
  accent: 'sky' | 'pink' | 'green' | 'amber';
}

export const LEARNING_OBJECTIVES = [
  'Menjelaskan arti hak dengan bahasa sederhana.',
  'Menjelaskan arti kewajiban dengan bahasa sederhana.',
  'Menyebutkan contoh hak siswa di sekolah.',
  'Menyebutkan contoh kewajiban siswa di sekolah.',
  'Membedakan hak dan kewajiban dengan tepat.',
  'Membiasakan sikap bertanggung jawab dan saling menghormati.',
];

export const HAK_ITEMS: LearningPoint[] = [
  {
    id: 'hak-1',
    title: 'Mendapat Pelajaran dari Guru',
    shortDesc: 'Setiap siswa berhak memperoleh ilmu pengetahuan dan bimbingan dari guru di kelas.',
    example: 'Ibu Guru menjelaskan pelajaran berhitung dan membaca dengan sabar kepada seluruh siswa.',
    benefit: 'Kita menjadi anak yang cerdas, terampil, dan berprestasi.',
    image: classroomTeacherImg,
    accent: 'sky',
  },
  {
    id: 'hak-2',
    title: 'Menggunakan Fasilitas Sekolah',
    shortDesc: 'Siswa berhak memakai meja, kursi, papan tulis, buku perpustakaan, dan UKS.',
    example: 'Sari dan Budi membaca buku cerita bergambar di perpustakaan sekolah.',
    benefit: 'Kegiatan belajar dan membaca jadi lebih nyaman dan menyenangkan.',
    image: libraryReadingImg,
    accent: 'pink',
  },
  {
    id: 'hak-3',
    title: 'Mendapat Perlindungan dan Rasa Aman',
    shortDesc: 'Siswa berhak merasa aman, nyaman, dan terlindungi dari bahaya atau ejekan.',
    example: 'Lingkungan sekolah dijaga dengan baik dan teman-teman saling menyayangi.',
    benefit: 'Kita dapat belajar dengan tenang tanpa rasa takut.',
    image: heroSdImg,
    accent: 'green',
  },
  {
    id: 'hak-4',
    title: 'Bertanya kepada Guru',
    shortDesc: 'Jika belum mengerti pelajaran, siswa berhak mengangkat tangan dan bertanya.',
    example: 'Saat bingung mengerjakan soal, Budi mengangkat tangan dengan sopan untuk bertanya.',
    benefit: 'Kita lebih cepat memahami materi pelajaran yang belum dimengerti.',
    image: classroomTeacherImg,
    accent: 'amber',
  },
  {
    id: 'hak-5',
    title: 'Bermain Bersama Teman Saat Istirahat',
    shortDesc: 'Setelah belajar di kelas, siswa berhak beristirahat dan bermain di halaman sekolah.',
    example: 'Ketika bel istirahat berbunyi, siswa bermain lompat tali dan bola bersama teman.',
    benefit: 'Pikiran menjadi segar kembali dan persahabatan semakin erat.',
    image: schoolyardPlayImg,
    accent: 'pink',
  },
  {
    id: 'hak-6',
    title: 'Mendapat Perlakuan yang Adil',
    shortDesc: 'Semua siswa berhak diperlakukan sama tanpa membeda-bedakan suku, agama, atau hobi.',
    example: 'Guru memberi kesempatan yang sama kepada semua siswa untuk menjawab pertanyaan.',
    benefit: 'Suasana kelas menjadi rukun, damai, dan penuh kegembiraan.',
    image: heroSdImg,
    accent: 'sky',
  },
];

export const KEWAJIBAN_ITEMS: LearningPoint[] = [
  {
    id: 'wajib-1',
    title: 'Datang ke Sekolah Tepat Waktu',
    shortDesc: 'Siswa wajib berangkat lebih awal agar tidak terlambat mengikuti pelajaran.',
    example: 'Budi tiba di sekolah pukul 06.45 sebelum bel masuk berbunyi.',
    benefit: 'Melatih sikap disiplin dan tidak ketinggalan pelajaran pertama.',
    image: heroSdImg,
    accent: 'sky',
  },
  {
    id: 'wajib-2',
    title: 'Menghormati Guru',
    shortDesc: 'Siswa wajib mendengarkan nasihat guru, menyapa dengan ramah, dan berbicara sopan.',
    example: 'Saat bertemu Ibu Guru di lorong sekolah, Sari tersenyum dan mengucapkan salam.',
    benefit: 'Hubungan antara guru dan murid menjadi harmonis dan penuh berkah.',
    image: classroomTeacherImg,
    accent: 'pink',
  },
  {
    id: 'wajib-3',
    title: 'Mematuhi Tata Tertib Sekolah',
    shortDesc: 'Siswa wajib memakai seragam rapi dan menaati aturan yang berlaku di sekolah.',
    example: 'Memakai seragam putih-merah lengkap, topi saat upacara, dan tertib saat antre.',
    benefit: 'Sekolah menjadi tertib, aman, dan nyaman bagi semua warga sekolah.',
    image: heroSdImg,
    accent: 'amber',
  },
  {
    id: 'wajib-4',
    title: 'Menjaga Kebersihan Kelas',
    shortDesc: 'Siswa wajib melaksanakan piket kelas dan membuang sampah pada tempatnya.',
    example: 'Budi menyapu lantai kelas dan Sari membersihkan papan tulis serta merapikan buku.',
    benefit: 'Kelas menjadi bersih, sehat, dan bebas dari kuman penyakit.',
    image: cleanClassroomImg,
    accent: 'green',
  },
  {
    id: 'wajib-5',
    title: 'Mengerjakan Tugas',
    shortDesc: 'Siswa wajib mengerjakan tugas sekolah dan pekerjaan rumah dengan sungguh-sungguh.',
    example: 'Sari menyelesaikan latihan soal Pancasila tepat waktu dan mengumpulkannya ke guru.',
    benefit: 'Pengetahuan kita semakin bertambah dan menjadi anak yang bertanggung jawab.',
    image: libraryReadingImg,
    accent: 'sky',
  },
  {
    id: 'wajib-6',
    title: 'Menyayangi dan Menghargai Teman',
    shortDesc: 'Siswa wajib rukun, tidak mengejek, dan mau menolong teman yang membutuhkan.',
    example: 'Ketika teman terjatuh saat bermain, siswa lain segera membantu dengan tulus.',
    benefit: 'Membuat kita punya banyak teman dan tercipta suasana sekolah yang damai.',
    image: schoolyardPlayImg,
    accent: 'pink',
  },
];

export interface BalancePair {
  id: string;
  situasi: string;
  kewajiban: string;
  hak: string;
  ilustrasi: string;
}

export const BALANCE_PAIRS: BalancePair[] = [
  {
    id: 'bal-1',
    situasi: 'Ruang Kelas yang Nyaman',
    kewajiban: 'Rajin melaksanakan piket kelas dan membuang sampah di tempatnya.',
    hak: 'Belajar di ruang kelas yang bersih, sehat, dan wangi.',
    ilustrasi: cleanClassroomImg,
  },
  {
    id: 'bal-2',
    situasi: 'Buku Perpustakaan yang Awet',
    kewajiban: 'Merawat buku dengan baik, tidak mencoret-coret, dan mengembalikan tepat waktu.',
    hak: 'Meminjam dan membaca beragam buku cerita menarik di perpustakaan.',
    ilustrasi: libraryReadingImg,
  },
  {
    id: 'bal-3',
    situasi: 'Memahami Pelajaran Kelas',
    kewajiban: 'Mendengarkan guru saat menjelaskan dan mengerjakan tugas dengan tekun.',
    hak: 'Mendapat bimbingan, nilai yang adil, dan jawaban saat bertanya kepada guru.',
    ilustrasi: classroomTeacherImg,
  },
  {
    id: 'bal-4',
    situasi: 'Bermain Riang Saat Istirahat',
    kewajiban: 'Menyayangi teman, bermain sportif, dan tidak berbuat curang.',
    hak: 'Bermain bersama dengan aman, rukun, dan gembira di halaman sekolah.',
    ilustrasi: schoolyardPlayImg,
  },
];

export interface SortGameItem {
  id: string;
  text: string;
  type: 'hak' | 'kewajiban';
  image: string;
  feedback: string;
}

export const GAME1_SORT_ITEMS: SortGameItem[] = [
  {
    id: 'g1-1',
    text: 'Mendapat penjelasan pelajaran dari Ibu Guru di depan kelas.',
    type: 'hak',
    image: classroomTeacherImg,
    feedback: 'Betul! Mendapat pelajaran dari guru adalah HAK yang pantas diterima setiap siswa.',
  },
  {
    id: 'g1-2',
    text: 'Menyapu lantai dan menghapus papan tulis saat jadwal piket kelas.',
    type: 'kewajiban',
    image: cleanClassroomImg,
    feedback: 'Hebat! Menjaga kebersihan kelas adalah KEWAJIBAN kita bersama.',
  },
  {
    id: 'g1-3',
    text: 'Membaca buku cerita di perpustakaan sekolah.',
    type: 'hak',
    image: libraryReadingImg,
    feedback: 'Tepat sekali! Menggunakan fasilitas perpustakaan adalah HAK siswa.',
  },
  {
    id: 'g1-4',
    text: 'Datang ke sekolah tepat waktu sebelum bel masuk berbunyi.',
    type: 'kewajiban',
    image: heroSdImg,
    feedback: 'Pintar! Datang tepat waktu merupakan KEWAJIBAN siswa agar disiplin.',
  },
  {
    id: 'g1-5',
    text: 'Bermain bersama teman dengan gembira saat jam istirahat.',
    type: 'hak',
    image: schoolyardPlayImg,
    feedback: 'Benar! Bermain saat waktu istirahat adalah HAK siswa di sekolah.',
  },
  {
    id: 'g1-6',
    text: 'Mengerjakan tugas dan latihan soal dari guru dengan tanggung jawab.',
    type: 'kewajiban',
    image: libraryReadingImg,
    feedback: 'Keren! Mengerjakan tugas sekolah adalah KEWAJIBAN siswa.',
  },
  {
    id: 'g1-7',
    text: 'Mengangkat tangan untuk bertanya ketika belum paham materi.',
    type: 'hak',
    image: classroomTeacherImg,
    feedback: 'Tepat! Bertanya kepada guru adalah HAK setiap siswa di kelas.',
  },
  {
    id: 'g1-8',
    text: 'Menyayangi dan membantu teman yang terjatuh di halaman sekolah.',
    type: 'kewajiban',
    image: schoolyardPlayImg,
    feedback: 'Luar biasa! Menyayangi dan menghargai teman adalah KEWAJIBAN kita.',
  },
];

export interface MatchPairItem {
  id: string;
  labelGambar: string;
  image: string;
  pernyataan: string;
}

export const GAME2_MATCH_PAIRS: MatchPairItem[] = [
  {
    id: 'm-1',
    labelGambar: 'Guru Mengajar di Kelas',
    image: classroomTeacherImg,
    pernyataan: 'Hak mendapat pelajaran dan bertanya kepada guru dengan sopan.',
  },
  {
    id: 'm-2',
    labelGambar: 'Piket Kebersihan Kelas',
    image: cleanClassroomImg,
    pernyataan: 'Kewajiban menjaga kebersihan kelas dengan menyapu dan merapikan buku.',
  },
  {
    id: 'm-3',
    labelGambar: 'Membaca di Perpustakaan',
    image: libraryReadingImg,
    pernyataan: 'Hak menggunakan fasilitas sekolah berupa buku-buku bacaan.',
  },
  {
    id: 'm-4',
    labelGambar: 'Bermain di Halaman Sekolah',
    image: schoolyardPlayImg,
    pernyataan: 'Hak bermain bersama teman dengan rukun saat waktu istirahat.',
  },
  {
    id: 'm-5',
    labelGambar: 'Tiba di Sekolah Pagi Hari',
    image: heroSdImg,
    pernyataan: 'Kewajiban datang ke sekolah tepat waktu dengan seragam yang rapi.',
  },
];

export interface StoryChoiceQuestion {
  id: string;
  title: string;
  story: string;
  image: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export const GAME3_STORY_CHOICES: StoryChoiceQuestion[] = [
  {
    id: 's-1',
    title: 'Cerita 1: Ingin Bertanya di Kelas',
    story: 'Saat Ibu Guru menjelaskan pelajaran Pendidikan Pancasila, Edo belum mengerti arti kewajiban. Apa yang sebaiknya Edo lakukan?',
    image: classroomTeacherImg,
    options: [
      {
        id: 'a',
        text: 'Berteriak keras memanggil guru dari belakang kelas.',
        isCorrect: false,
        feedback: 'Kurang tepat. Berteriak bisa mengganggu teman-teman lain yang sedang fokus belajar.',
      },
      {
        id: 'b',
        text: 'Mengangkat tangan dengan sopan lalu bertanya setelah dipersilakan guru.',
        isCorrect: true,
        feedback: 'Hebat! Mengangkat tangan dengan sopan adalah sikap terpuji saat ingin bertanya.',
      },
      {
        id: 'c',
        text: 'Mengobrol dengan teman sebangku sambil tertawa.',
        isCorrect: false,
        feedback: 'Kurang tepat. Mengobrol saat guru menerangkan membuat kita tidak mengerti pelajaran.',
      },
    ],
  },
  {
    id: 's-2',
    title: 'Cerita 2: Sampah di Kolong Meja',
    story: 'Bel istirahat sudah selesai. Siti melihat ada bungkus jajanan dan sobekan kertas di kolong mejanya. Apa tindakan Siti yang tepat?',
    image: cleanClassroomImg,
    options: [
      {
        id: 'a',
        text: 'Membiarkannya saja karena hari itu bukan jadwal piket Siti.',
        isCorrect: false,
        feedback: 'Kurang tepat. Menjaga kebersihan kelas adalah tanggung jawab seluruh siswa setiap hari.',
      },
      {
        id: 'b',
        text: 'Mengambil sampah tersebut dan membuangnya ke tempat sampah.',
        isCorrect: true,
        feedback: 'Bagus sekali! Siti menunjukkan sikap peduli dan bertanggung jawab menjaga kebersihan kelas.',
      },
      {
        id: 'c',
        text: 'Menendangnya ke bawah meja teman di sebelahnya.',
        isCorrect: false,
        feedback: 'Tidak boleh ya! Memindahkan sampah ke meja teman adalah perbuatan yang tidak adil.',
      },
    ],
  },
  {
    id: 's-3',
    title: 'Cerita 3: Meminjam Buku Perpustakaan',
    story: 'Budi meminjam buku cerita dari perpustakaan sekolah. Setelah selesai dibaca di rumah, apa kewajiban Budi?',
    image: libraryReadingImg,
    options: [
      {
        id: 'a',
        text: 'Menjaga buku tetap bersih dan mengembalikannya tepat waktu.',
        isCorrect: true,
        feedback: 'Pintar! Merawat dan mengembalikan buku tepat waktu membuat teman lain juga bisa membacanya.',
      },
      {
        id: 'b',
        text: 'Mewarnai gambar di dalam buku dengan spidol.',
        isCorrect: false,
        feedback: 'Wah, jangan ya! Buku perpustakaan adalah fasilitas bersama yang harus kita jaga.',
      },
      {
        id: 'c',
        text: 'Menyimpannya di rumah dan tidak mau mengembalikan.',
        isCorrect: false,
        feedback: 'Kurang tepat. Buku harus dikembalikan agar siswa lain juga mendapat hak membaca.',
      },
    ],
  },
  {
    id: 's-4',
    title: 'Cerita 4: Teman Terjatuh saat Bermain',
    story: 'Saat waktu istirahat di halaman sekolah, Dayu tersandung batu dan terjatuh hingga lututnya lecet. Apa yang harus kamu lakukan?',
    image: schoolyardPlayImg,
    options: [
      {
        id: 'a',
        text: 'Menertawakannya karena kurang berhati-hati.',
        isCorrect: false,
        feedback: 'Kurang tepat. Menertawakan teman yang kesusahan akan menyakiti hatinya.',
      },
      {
        id: 'b',
        text: 'Segera menolong Dayu berdiri dan mengantarnya ke ruang UKS.',
        isCorrect: true,
        feedback: 'Anak hebat! Menolong teman yang kesusahan menunjukkan sikap menyayangi sesama teman.',
      },
      {
        id: 'c',
        text: 'Berlari menjauh karena takut disalahkan.',
        isCorrect: false,
        feedback: 'Kurang tepat. Teman yang sedang kesulitan membutuhkan pertolongan kita.',
      },
    ],
  },
  {
    id: 's-5',
    title: 'Cerita 5: Terlambat Bangun Pagi',
    story: 'Agar selalu bisa melaksanakan kewajiban datang ke sekolah tepat waktu, apa kebiasaan baik yang sebaiknya dilakukan?',
    image: heroSdImg,
    options: [
      {
        id: 'a',
        text: 'Bermain gim sampai larut malam lalu bangun siang.',
        isCorrect: false,
        feedback: 'Kurang tepat. Tidur terlalu malam membuat kita mengantuk dan terlambat ke sekolah.',
      },
      {
        id: 'b',
        text: 'Menyiapkan tas sekolah di malam hari dan tidur lebih awal.',
        isCorrect: true,
        feedback: 'Tepat sekali! Persiapan yang baik membantu kita datang ke sekolah tepat waktu dan bersemangat.',
      },
      {
        id: 'c',
        text: 'Sarapan terburu-buru di jalan sambil berlari.',
        isCorrect: false,
        feedback: 'Kurang aman ya. Lebih baik bangun lebih pagi agar bisa sarapan dengan tenang.',
      },
    ],
  },
];

export interface CleanMissionItem {
  id: string;
  name: string;
  problemDesc: string;
  targetToolId: string;
  targetToolName: string;
  posX: number; // percentage on classroom canvas
  posY: number;
  emojiLabel: string;
}

export const CLEAN_TOOLS = [
  { id: 'tempat-sampah', name: 'Tempat Sampah', desc: 'Buang kertas & botol bekas' },
  { id: 'rak-buku', name: 'Rak Buku', desc: 'Susun buku agar rapi' },
  { id: 'penghapus-papan', name: 'Penghapus Papan', desc: 'Bersihkan coretan papan tulis' },
  { id: 'sapu', name: 'Sapu Lantai', desc: 'Sapu debu & kotoran lantai' },
];

export const CLEAN_MISSION_ITEMS: CleanMissionItem[] = [
  {
    id: 'cm-1',
    name: 'Sobekan Kertas Bekas',
    problemDesc: 'Ada sobekan kertas berserakan di dekat meja belajar.',
    targetToolId: 'tempat-sampah',
    targetToolName: 'Tempat Sampah',
    posX: 20,
    posY: 74,
    emojiLabel: 'Kertas',
  },
  {
    id: 'cm-2',
    name: 'Papan Tulis Kotor',
    problemDesc: 'Papan tulis penuh tulisan pelajaran kemarin dan perlu dihapus.',
    targetToolId: 'penghapus-papan',
    targetToolName: 'Penghapus Papan',
    posX: 50,
    posY: 28,
    emojiLabel: 'Papan Tulis',
  },
  {
    id: 'cm-3',
    name: 'Buku Tumpuk Berantakan',
    problemDesc: 'Buku-buku cerita tercecer di atas meja guru.',
    targetToolId: 'rak-buku',
    targetToolName: 'Rak Buku',
    posX: 78,
    posY: 54,
    emojiLabel: 'Buku',
  },
  {
    id: 'cm-4',
    name: 'Debu dan Pasir di Lantai',
    problemDesc: 'Lantai kelas berdebu setelah kegiatan bermain di luar.',
    targetToolId: 'sapu',
    targetToolName: 'Sapu Lantai',
    posX: 46,
    posY: 80,
    emojiLabel: 'Debu Lantai',
  },
  {
    id: 'cm-5',
    name: 'Botol Plastik Kosong',
    problemDesc: 'Ada botol air mineral kosong tertinggal di pojok kelas.',
    targetToolId: 'tempat-sampah',
    targetToolName: 'Tempat Sampah',
    posX: 82,
    posY: 76,
    emojiLabel: 'Botol Plastik',
  },
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Mendapat pelajaran dari guru merupakan ....',
    options: ['Hak', 'Kewajiban', 'Hukuman'],
    correctIndex: 0,
    explanation: 'Mendapat pelajaran adalah sesuatu yang pantas diterima oleh setiap siswa, jadi termasuk hak.',
  },
  {
    id: 2,
    question: 'Menjaga kebersihan kelas merupakan ....',
    options: ['Hak', 'Kewajiban', 'Hadiah'],
    correctIndex: 1,
    explanation: 'Menjaga kebersihan kelas adalah hal yang harus kita lakukan dengan tanggung jawab, jadi termasuk kewajiban.',
  },
  {
    id: 3,
    question: 'Jika ingin bertanya kepada guru, kita sebaiknya ....',
    options: ['Berteriak', 'Mengangkat tangan', 'Mengganggu teman'],
    correctIndex: 1,
    explanation: 'Mengangkat tangan dengan sopan menunjukkan sikap hormat kepada guru dan menjaga ketertiban kelas.',
  },
  {
    id: 4,
    question: 'Sesuatu yang pantas kita dapatkan disebut ....',
    options: ['Kewajiban', 'Aturan', 'Hak'],
    correctIndex: 2,
    explanation: 'Hak adalah sesuatu yang pantas atau layak kita terima setelah menjalankan kewajiban.',
  },
  {
    id: 5,
    question: 'Contoh kewajiban siswa sebelum bel masuk sekolah berbunyi adalah ....',
    options: ['Bermain di kantin', 'Datang tepat waktu', 'Pulang ke rumah'],
    correctIndex: 1,
    explanation: 'Datang tepat waktu adalah kewajiban agar siswa siap mengikuti pelajaran dan belajar disiplin.',
  },
  {
    id: 6,
    question: 'Saat waktu istirahat tiba, siswa berhak untuk ....',
    options: ['Bermain bersama teman dengan aman', 'Mencoret-coret tembok kelas', 'Meninggalkan sampah di halaman'],
    correctIndex: 0,
    explanation: 'Bermain bersama teman saat istirahat adalah hak siswa, asalkan tetap menjaga kebersihan dan kerukunan.',
  },
  {
    id: 7,
    question: 'Agar hak menggunakan buku perpustakaan tetap terjaga, kewajiban kita adalah ....',
    options: ['Menyobek halaman buku', 'Merawat buku dan mengembalikan tepat waktu', 'Menyembunyikan buku di tas'],
    correctIndex: 1,
    explanation: 'Dengan merawat dan mengembalikan buku tepat waktu, semua siswa bisa bergantian membaca buku.',
  },
  {
    id: 8,
    question: 'Pelaksanaan hak dan kewajiban di sekolah harus berjalan secara ....',
    options: ['Seimbang', 'Terpisah', 'Sesuka hati'],
    correctIndex: 0,
    explanation: 'Hak dan kewajiban harus seimbang. Kita menjalankan kewajiban terlebih dahulu agar hak kita terpenuhi dengan baik.',
  },
  {
    id: 9,
    question: 'Jika ada teman yang berbeda pendapat saat berdiskusi, sikap kita sebaiknya ....',
    options: ['Memaksakan kehendak sendiri', 'Menghargai pendapat teman', 'Menjauhi teman tersebut'],
    correctIndex: 1,
    explanation: 'Menyayangi dan menghargai teman adalah kewajiban agar suasana kelas selalu rukun.',
  },
  {
    id: 10,
    question: 'Manfaat jika seluruh siswa mematuhi tata tertib sekolah adalah ....',
    options: ['Kelas menjadi ramai dan kacau', 'Suasana belajar menjadi tertib dan nyaman', 'Pelajaran menjadi sulit dipahami'],
    correctIndex: 1,
    explanation: 'Mematuhi tata tertib membuat semua warga sekolah merasa aman, nyaman, dan senang belajar.',
  },
];

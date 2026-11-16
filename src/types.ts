export type PageId =
  | 'beranda'
  | 'ayo-belajar'
  | 'hak'
  | 'kewajiban'
  | 'permainan'
  | 'kuis'
  | 'hasil';

export interface LearningProgress {
  studentName: string;
  visitedAyoBelajar: boolean;
  hakCompletedIds: string[];
  kewajibanCompletedIds: string[];
  balanceCompletedIds: string[];
  gamesStars: {
    game1: number; // max 3
    game2: number; // max 3
    game3: number; // max 3
    game4: number; // max 3
  };
  quizResult: {
    completed: boolean;
    correctCount: number;
    wrongCount: number;
    score: number;
    stars: number;
  };
}

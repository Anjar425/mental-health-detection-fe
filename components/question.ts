// data/questions.ts

// Definisikan tipe datanya
interface Question {
  id: string;
  text: string;
}

interface Answer {
  label: string;
  value: number;
}

// Daftar 21 Pertanyaan DASS-21
export const DASS_QUESTIONS: Question[] = [
  { id: 'q1', text: 'Saya merasa sulit untuk menenangkan diri.' },
  { id: 'q2', text: 'Saya merasa mulut saya kering.' },
  { id: 'q3', text: 'Saya tidak dapat merasakan perasaan positif sama sekali.' },
  { id: 'q4', text: 'Saya mengalami kesulitan bernapas (misalnya, terengah-engah, sesak napas) tanpa ada aktivitas fisik.' },
  { id: 'q5', text: 'Saya merasa sulit untuk berinisiatif melakukan sesuatu.' },
  { id: 'q6', text: 'Saya cenderung bereaksi berlebihan terhadap situasi.' },
  { id: 'q7', text: 'Saya merasa gemetar (misalnya, di tangan).' },
  { id: 'q8', text: 'Saya merasa menggunakan banyak energi saraf.' },
  { id: 'q9', text: 'Saya khawatir dengan situasi yang mungkin membuat saya panik dan mempermalukan diri sendiri.' },
  { id: 'q10', text: 'Saya merasa tidak ada hal yang dapat saya harapkan di masa depan.' },
  { id: 'q11', text: 'Saya merasa gelisah.' },
  { id: 'q12', text: 'Saya merasa sulit untuk bersantai.' },
  { id: 'q13', text: 'Saya merasa sedih dan tertekan.' },
  { id: 'q14', text: 'Saya tidak sabar (misalnya, mudah tersinggung, mudah marah).' },
  { id: 'q15', text: 'Saya merasa hampir panik.' },
  { id: 'q16', text: 'Saya merasa tidak bersemangat untuk melakukan apa pun.' },
  { id: 'q17', text: 'Saya merasa diri saya tidak berharga.' },
  { id: 'q18', text: 'Saya merasa sangat peka (mudah tersinggung).' },
  { id: 'q19', text: 'Saya merasakan detak jantung saya (misalnya, berdebar-debar) tanpa ada alasan fisik.' },
  { id: 'q20', text: 'Saya merasa takut tanpa alasan yang jelas.' },
  { id: 'q21', text: 'Saya merasa hidup tidak berarti.' },
];

// Pilihan Jawaban (Skor 0-3)
export const DASS_ANSWERS: Answer[] = [
  { label: 'Tidak pernah', value: 0 },
  { label: 'Kadang-kadang', value: 1 },
  { label: 'Sering', value: 2 },
  { label: 'Hampir selalu', value: 3 },
];
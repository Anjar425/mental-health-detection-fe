// src/data/dass21-data.ts

interface Question {
    // ID menggunakan index array (0-20) untuk mapping ke payload BE
    id: number; 
    text: string;
}

// Daftar 21 Pertanyaan DASS-21
export const DASS_21_QUESTIONS: Question[] = [
    { id: 0, text: 'Saya merasa sulit untuk menenangkan diri.' },
    { id: 1, text: 'Saya merasa mulut saya kering.' },
    { id: 2, text: 'Saya tidak dapat merasakan perasaan positif sama sekali.' },
    { id: 3, text: 'Saya mengalami kesulitan bernapas (misalnya, terengah-engah, sesak napas) tanpa ada aktivitas fisik.' },
    { id: 4, text: 'Saya merasa sulit untuk berinisiatif melakukan sesuatu.' },
    { id: 5, text: 'Saya cenderung bereaksi berlebihan terhadap situasi.' },
    { id: 6, text: 'Saya merasa gemetar (misalnya, di tangan).' },
    { id: 7, text: 'Saya merasa menggunakan banyak energi saraf.' },
    { id: 8, text: 'Saya khawatir dengan situasi yang mungkin membuat saya panik dan mempermalukan diri sendiri.' },
    { id: 9, text: 'Saya merasa tidak ada hal yang dapat saya harapkan di masa depan.' },
    { id: 10, text: 'Saya merasa gelisah.' },
    { id: 11, text: 'Saya merasa sulit untuk bersantai.' },
    { id: 12, text: 'Saya merasa sedih dan tertekan.' },
    { id: 13, text: 'Saya tidak sabar (misalnya, mudah tersinggung, mudah marah).' },
    { id: 14, text: 'Saya merasa hampir panik.' },
    { id: 15, text: 'Saya merasa tidak bersemangat untuk melakukan apa pun.' },
    { id: 16, text: 'Saya merasa diri saya tidak berharga.' },
    { id: 17, text: 'Saya merasa sangat peka (mudah tersinggung).' },
    { id: 18, text: 'Saya merasakan detak jantung saya (misalnya, berdebar-debar) tanpa ada alasan fisik.' },
    { id: 19, text: 'Saya merasa takut tanpa alasan yang jelas.' },
    { id: 20, text: 'Saya merasa hidup tidak berarti.' },
];
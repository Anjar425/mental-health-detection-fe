// src/services/CalculationService.ts

// Interface yang mencerminkan hasil dinormalisasi dari BE (0.0 hingga 1.0)
// Nilai ini adalah hasil dari GDSS, di mana D + A + S = ~1.0 (proporsi)
export interface GDSSResult {
    depression: number; // Nilai GDSS Normalized (0.0 - 1.0)
    anxiety: number;
    stress: number;
}

// Gunakan variabel lingkungan jika ada, atau default ke localhost:8000
const API_URL_BASE = 'http://127.0.0.1:8000'; // Pastikan ini adalah IP backend Anda
const ENDPOINT = '/calculate'; // Sesuai dengan main.py Anda

/**
 * Mengirim skor DASS-21 ke Backend Python GDSS untuk kalkulasi dinamis.
 * Mengembalikan hasil normalisasi GDSS (0.0 - 1.0).
 *
 * @param patientScores Array of 21 integer scores (0-3).
 * @returns Promise<GDSSResult> hasil normalisasi GDSS.
 */
export const calculateResult = async (
    patientScores: number[],
): Promise<GDSSResult> => {
    const payload = { scores: patientScores };
    
    console.log('[BE Request] Mengirim skor ke Backend:', JSON.stringify(payload));

    try {
        const response = await fetch(`${API_URL_BASE}${ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('[BE Error] Server Error:', errorData);
            throw new Error(errorData.detail || `Server merespons dengan status: ${response.status}`);
        }

        const result: GDSSResult = await response.json();
        
        console.log('[BE Response] Menerima hasil GDSS (0.0-1.0):', result);
        return result;

    } catch (error) {
        console.error('[BE Failure] Gagal terhubung ke server:', error);
        throw new Error(
            'Tidak dapat terhubung ke server. Pastikan IP dan API_URL_BASE sudah benar dan layanan BE berjalan.',
        );
    }
};
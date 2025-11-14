import React from "react"
import { ScrollView, View, Dimensions } from "react-native"
import { Text } from "@/components/ui/text"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react-native"
import { Badge } from "@/components/ui/badge"
import { GDSSResult } from "@/src/services/CalculationService"
import { PieChart } from "react-native-chart-kit"
import { useRouter } from "expo-router" // Diperlukan untuk navigasi

const { width } = Dimensions.get("window")

interface ResultsCard21Props {
    results: GDSSResult | null
    onRestart: () => void
}

// Skema warna yang cocok dengan global.css Anda
const CHART_COLORS = {
    Depresi: { color: 'hsl(var(--chart-4))', hex: '#EF4444' }, // destructive/Merah
    Kecemasan: { color: 'hsl(var(--chart-1))', hex: '#06B6D4' }, // primary/Cyan
    Stres: { color: 'hsl(var(--chart-3))', hex: '#65A30D' }, // accent/Hijau
};

export function DassResultsCard21({ results, onRestart }: ResultsCard21Props) {
    const router = useRouter(); // Inisialisasi router

    if (!results) {
        return (
            <Card className="p-4 mx-auto w-full max-w-xl my-8">
                <CardContent>
                    <Text className="text-destructive">Tidak ada hasil yang tersedia. Silakan ulangi tes.</Text>
                </CardContent>
            </Card>
        )
    }

    const { depression, anxiety, stress } = results
    
    // 1. Hitung Total Akumulasi GDSS (Seharusnya mendekati 1.0)
    const totalGDSS = depression + anxiety + stress;

    // --- Data Charting & Dominansi ---
    const rawChartData = [
        { name: "Depresi", population: depression, color: CHART_COLORS.Depresi.hex, hex: CHART_COLORS.Depresi.hex },
        { name: "Kecemasan", population: anxiety, color: CHART_COLORS.Kecemasan.hex, hex: CHART_COLORS.Kecemasan.hex },
        { name: "Stres", population: stress, color: CHART_COLORS.Stres.hex, hex: CHART_COLORS.Stres.hex },
    ];

    const validChartData = rawChartData.filter(d => d.population > 0);
    const dominantSymptom = validChartData.sort((a, b) => b.population - a.population)[0];
    const dominantPercentage = dominantSymptom ? ((dominantSymptom.population / totalGDSS) * 100).toFixed(1) : '0.0';

    // Format data untuk PieChart (tanpa legenda bawaan)
    const pieChartData = validChartData.map(d => ({
        ...d,
        legendFontColor: "hsl(var(--foreground))",
        legendFontSize: 14,
        color: d.hex,
        name: d.name, 
    }));
    
    const chartConfig = {
        backgroundColor: "transparent",
        backgroundGradientFrom: "transparent",
        backgroundGradientTo: "transparent",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    };

    const chartWidth = (width * 0.4); 
    // --- Akhir Data Charting ---

    const DominantDetectionCard = () => (
        <Card className="mb-6 p-4 border-l-4 border-l-primary/70">
            <CardHeader className="p-0 mb-3">
                <CardTitle className="text-lg">Hasil Deteksi Utama</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-3 border-t border-border/50">
                {dominantSymptom ? (
                    <Text className="text-base text-foreground text-pretty">
                        Berdasarkan analisis GDSS, 
                        <Text style={{ color: dominantSymptom.hex, fontWeight: 'bold' }}> {dominantSymptom.name} </Text>
                        adalah gejala yang paling dominan, menyumbang 
                        <Text style={{ color: dominantSymptom.hex, fontWeight: 'bold' }}> {dominantPercentage}% </Text>
                        dari total akumulasi skor yang terdeteksi.
                    </Text>
                ) : (
                    <Text className="text-muted-foreground text-pretty">
                        Karena tidak ada jawaban yang menunjukkan gejala (skor 0 untuk semua item), tidak ada dominasi yang terdeteksi.
                    </Text>
                )}
            </CardContent>
        </Card>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
            <View className="max-w-4xl mx-auto w-full mt-4 mb-10">
                <View className="text-center mb-6">
                    <Text className="text-3xl font-bold text-foreground mb-2 text-center">Hasil Analisis DASS-21</Text>
                    <Text className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty text-center">
                        Visualisasi proporsi pengaruh Depresi, Kecemasan, dan Stres (Model GDSS).
                    </Text>
                </View>
                
                {/* --- BAGIAN GRAFIK PERSENTASE --- */}
                <Card className="mb-6 p-4">
                    <CardHeader>
                        <CardTitle className="text-xl">Proporsi Pengaruh Gejala</CardTitle>
                        <Text className="text-sm text-muted-foreground">Persentase kontribusi masing-masing gejala terhadap skor akumulasi GDSS.</Text>
                    </CardHeader>
                    <CardContent className="items-center justify-center p-4 pt-0 flex-row justify-between">
                        {totalGDSS > 0 ? (
                            <>
                                {/* Pie Chart (40%) */}
                                <View style={{ width: chartWidth }} className="items-center justify-center">
                                    <PieChart
                                        data={pieChartData}
                                        width={chartWidth}
                                        height={200}
                                        chartConfig={chartConfig}
                                        accessor={"population"}
                                        backgroundColor={"transparent"}
                                        paddingLeft={"15"} 
                                        center={[0, 0]} 
                                        absolute={false} 
                                        hasLegend={false} 
                                    />
                                </View>
                                
                                {/* Angka Dominan & Legenda Kustom (60%) */}
                                <View className="flex-col justify-center items-center p-2 flex-1">
                                    {/* Angka Persentase Dominan */}
                                    <View className="w-full items-center mb-4">
                                        <Text className="text-4xl font-extrabold" style={{color: dominantSymptom?.hex}}>
                                            {dominantPercentage}%
                                        </Text>
                                        <Text className="text-base font-semibold text-foreground mt-1 text-center">
                                            {dominantSymptom?.name || 'Gejala Dominan'}
                                        </Text>
                                        <Text className="text-sm text-muted-foreground text-center">
                                            Paling Berpengaruh
                                        </Text>
                                    </View>
                                    
                                    {/* Custom Legenda (3 Item Persentase) */}
                                    <View className="w-full items-start p-2 border-t border-border/50 mt-2">
                                        {rawChartData.map((d, i) => (
                                            <View key={i} className="flex-row items-center my-0.5">
                                                <View style={{ width: 10, height: 10, backgroundColor: d.hex, borderRadius: 5, marginRight: 8 }} />
                                                <Text className="text-sm text-foreground">
                                                    {d.name}: <Text className="font-semibold">{((d.population / totalGDSS) * 100).toFixed(1)}%</Text>
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View className="h-40 items-center justify-center w-full">
                                <Text className="text-muted-foreground">Tidak ada data gejala yang terdeteksi.</Text>
                            </View>
                        )}
                    
                    </CardContent>
                </Card>
                {/* --- AKHIR BAGIAN GRAFIK --- */}
                
                <DominantDetectionCard />

                {/* Ringkasan Skor DASS-21 (Dibiarkan untuk rujukan data mentah) */}
                <Card className="mb-6 p-4">
                    <CardHeader>
                        <CardTitle className="text-xl">Ringkasan Data Skor DASS-21</CardTitle>
                        <Text className="text-sm text-muted-foreground">Skor mentah (0-42) berdasarkan perhitungan DASS-21 (Bukan hasil GDSS).</Text>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {rawChartData.map((item, index) => {
                            // Menghitung Skor DASS-21 (0-42) untuk referensi data mentah
                            const rawScore = Math.round(item.population * 2) 
                            
                            return (
                                <View key={index} className="flex-row justify-between items-center py-2 border-b border-border/50 last:border-b-0">
                                    <Text className="text-base font-semibold text-foreground" style={{ color: item.hex }}>{item.name}</Text>
                                    <View className="items-end">
                                        <Badge 
                                            className={`text-base font-bold bg-muted-foreground/10`} 
                                            variant="outline"
                                        >
                                            <Text className="text-foreground">Skor Akumulasi</Text>
                                        </Badge>
                                        <Text className="text-sm text-muted-foreground mt-1">Skor: {rawScore}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </CardContent>
                </Card>

                {/* Disclaimer */}
                <Card className="mt-8 border-destructive/30 bg-destructive/5">
                    <CardHeader>
                        <CardTitle className="text-lg text-destructive">Peringatan Penting</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Text className="text-muted-foreground text-pretty text-justify text-sm">
                            Hasil ini hanya visualisasi proporsi pengaruh gejala dan BUKAN diagnosis medis. Harap berkonsultasi dengan profesional kesehatan
                            mental untuk interpretasi yang akurat.
                        </Text>
                    </CardContent>
                </Card>

                {/* Tombol Navigasi */}
                <View className="flex flex-row justify-between gap-4 mt-8">
                    {/* Tombol Ulangi Kuisioner */}
                    <Button
                        onPress={onRestart}
                        className="flex-1 bg-primary hover:bg-primary/90"
                    >
                        <ChevronLeft size={20} color="#fff" className="mr-2" />
                        <Text className="text-base font-medium text-primary-foreground">Ulangi Kuisioner</Text>
                    </Button>
                    
                    {/* Tombol Kembali ke Beranda */}
                    <Button
                        onPress={() => router.replace('/')}
                        variant="secondary"
                        className="flex-1 border border-border/50"
                    >
                        <Text className="text-base font-medium text-foreground">Kembali ke Beranda</Text>
                    </Button>
                </View>

            </View>
        </ScrollView>
    )
}
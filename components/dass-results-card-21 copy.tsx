// import React from "react"
// import { ScrollView, View, Dimensions } from "react-native"
// import { Text } from "@/components/ui/text"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ChevronLeft } from "lucide-react-native"
// import { Badge } from "@/components/ui/badge"
// import { GDSSResult } from "@/src/services/CalculationService"
// // Asumsi Anda memiliki library PieChart di Projek 2, seperti react-native-chart-kit
// import { PieChart } from "react-native-chart-kit" 

// const { width } = Dimensions.get("window")

// interface ResultsCard21Props {
//     results: GDSSResult | null
//     onRestart: () => void
// }

// // Logika cut-off skor DASS-21 (diterapkan pada skor yang sudah dikalikan 2)
// const getConditionDescription = (condition: string, value: number) => {
//     // Cut-off DASS-21: Depression: 10, 14, 21, 28
//     if (condition === "Depresi") {
//         if (value >= 28) return "Sangat Parah"
//         if (value >= 21) return "Parah"
//         if (value >= 14) return "Sedang"
//         if (value >= 10) return "Ringan"
//         return "Normal"
//     }
//     // Cut-off DASS-21: Anxiety: 8, 10, 15, 20
//     if (condition === "Kecemasan") {
//         if (value >= 20) return "Sangat Parah"
//         if (value >= 15) return "Parah"
//         if (value >= 10) return "Sedang"
//         if (value >= 8) return "Ringan"
//         return "Normal"
//     }
//     // Cut-off DASS-21: Stress: 15, 19, 26, 34
//     if (condition === "Stres") {
//         if (value >= 34) return "Sangat Parah"
//         if (value >= 26) return "Parah"
//         if (value >= 19) return "Sedang"
//         if (value >= 15) return "Ringan"
//         return "Normal"
//     }
//     return "Data tidak valid"
// }

// // Fungsi untuk mendapatkan warna berdasarkan skor
// const getScoreColor = (score: number, condition: string) => {
//     const desc = getConditionDescription(condition, score)
//     if (desc === "Sangat Parah" || desc === "Parah") return "text-destructive"
//     if (desc === "Sedang") return "text-primary"
//     if (desc === "Ringan") return "text-accent"
//     return "text-green-600"
// }

// // Skema warna yang cocok dengan global.css Anda
// const CHART_COLORS = {
//     Depresi: { color: 'hsl(var(--chart-4))', hex: '#EF4444' }, // destructive
//     Kecemasan: { color: 'hsl(var(--chart-1))', hex: '#06B6D4' }, // primary/cyan
//     Stres: { color: 'hsl(var(--chart-3))', hex: '#65A30D' }, // accent/lime
// };

// export function DassResultsCard21({ results, onRestart }: ResultsCard21Props) {
//     if (!results) {
//         return (
//             <Card className="p-4 mx-auto w-full max-w-xl my-8">
//                 <CardContent>
//                     <Text className="text-destructive">Tidak ada hasil yang tersedia. Silakan ulangi tes.</Text>
//                 </CardContent>
//             </Card>
//         )
//     }

//     const { depression, anxiety, stress } = results
    
//     // 1. Hitung Total Akumulasi GDSS (Seharusnya mendekati 1.0)
//     const totalGDSS = depression + anxiety + stress;

//     // 2. Siapkan data untuk Pie Chart (Proporsi Pengaruh)
//     const rawChartData = [
//         { name: "Depresi", population: depression, color: CHART_COLORS.Depresi.hex, hex: CHART_COLORS.Depresi.hex },
//         { name: "Kecemasan", population: anxiety, color: CHART_COLORS.Kecemasan.hex, hex: CHART_COLORS.Kecemasan.hex },
//         { name: "Stres", population: stress, color: CHART_COLORS.Stres.hex, hex: CHART_COLORS.Stres.hex },
//     ];

//     // Filter data yang tidak nol dan hitung persentase
//     const validChartData = rawChartData.filter(d => d.population > 0);
    
//     // Cari gejala dominan
//     const dominantSymptom = validChartData.sort((a, b) => b.population - a.population)[0];
//     const dominantPercentage = dominantSymptom ? ((dominantSymptom.population / totalGDSS) * 100).toFixed(1) : '0.0';

//     // Format data untuk PieChart: HANYA NAMA agar tidak ada teks panjang bertumpuk
//     const pieChartData = validChartData.map(d => ({
//         ...d,
//         legendFontColor: "hsl(var(--foreground))",
//         legendFontSize: 14,
//         color: d.hex,
//         name: d.name, // Dihapus persentase dari nama untuk menghindari overlap
//     }));


//     // 3. Hitung Skor DASS-21 (0-42) untuk Interpretasi Kategori
//     // Kita gunakan koefisien * 2:
//     const depressionScore = Math.round(depression * 2) 
//     const anxietyScore = Math.round(anxiety * 2)
//     const stressScore = Math.round(stress * 2)

//     const scoreData = [
//         { label: "Depresi", score: depressionScore, category: "Depresi", color: CHART_COLORS.Depresi.hex },
//         { label: "Kecemasan", score: anxietyScore, category: "Kecemasan", color: CHART_COLORS.Kecemasan.hex },
//         { label: "Stres", score: stressScore, category: "Stres", color: CHART_COLORS.Stres.hex },
//     ];
    
//     const chartConfig = {
//         backgroundColor: "transparent",
//         backgroundGradientFrom: "transparent",
//         backgroundGradientTo: "transparent",
//         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//     };

//     const dominantCategory = dominantSymptom 
//         ? getConditionDescription(dominantSymptom.name, dominantSymptom.population * 2)
//         : 'Tidak Ada';
    
//     // Hitung lebar Chart (40% dari lebar Card), dan sisa untuk Konten/Legenda (60%)
//     const chartWidth = (width * 0.4); 

//     return (
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
//             <View className="max-w-4xl mx-auto w-full mt-4 mb-10">
//                 <View className="text-center mb-6">
//                     <Text className="text-3xl font-bold text-foreground mb-2 text-center">Hasil Analisis DASS-21</Text>
//                     <Text className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty text-center">
//                         Visualisasi proporsi pengaruh Depresi, Kecemasan, dan Stres (Model GDSS).
//                     </Text>
//                 </View>

//                 {/* --- BAGIAN GRAFIK PERSENTASE --- */}
//                 <Card className="mb-6 p-4">
//                     <CardHeader>
//                         <CardTitle className="text-xl">Proporsi Pengaruh Gejala</CardTitle>
//                         <Text className="text-sm text-muted-foreground">Persentase kontribusi masing-masing gejala terhadap skor akumulasi GDSS.</Text>
//                     </CardHeader>
//                     <CardContent className="items-center justify-center p-4 pt-0 flex-row justify-between">
//                         {totalGDSS > 0 ? (
//                             <>
//                                 {/* Pie Chart (40%) - Dihilangkan Legenda Bawaan */}
//                                 <View style={{ width: chartWidth }} className="items-center justify-center">
//                                     <PieChart
//                                         data={pieChartData}
//                                         width={chartWidth}
//                                         height={200}
//                                         chartConfig={chartConfig}
//                                         accessor={"population"}
//                                         backgroundColor={"transparent"}
//                                         paddingLeft={"15"} 
//                                         center={[0, 0]} 
//                                         absolute={false} 
//                                         hasLegend={false} 
//                                     />
//                                 </View>
                                
//                                 {/* Angka Dominan & Legenda Kustom (60%) */}
//                                 <View className="flex-col justify-center items-center p-2 flex-1">
//                                     {/* Angka Persentase Dominan */}
//                                     <View className="w-full items-center mb-4">
//                                         <Text className="text-4xl font-extrabold" style={{color: dominantSymptom?.hex}}>
//                                             {dominantPercentage}%
//                                         </Text>
//                                         <Text className="text-base font-semibold text-foreground mt-1 text-center">
//                                             {dominantSymptom?.name || 'Gejala Dominan'}
//                                         </Text>
//                                         <Text className="text-sm text-muted-foreground text-center">
//                                             Paling Berpengaruh
//                                         </Text>
//                                     </View>
                                    
//                                     {/* Custom Legenda (3 Item Persentase) */}
//                                     <View className="w-full items-start p-2 border-t border-border/50 mt-2">
//                                         {rawChartData.map((d, i) => (
//                                             <View key={i} className="flex-row items-center my-0.5">
//                                                 <View style={{ width: 10, height: 10, backgroundColor: d.hex, borderRadius: 5, marginRight: 8 }} />
//                                                 <Text className="text-sm text-foreground">
//                                                     {d.name}: <Text className="font-semibold">{((d.population / totalGDSS) * 100).toFixed(1)}%</Text>
//                                                 </Text>
//                                             </View>
//                                         ))}
//                                     </View>
//                                 </View>
//                             </>
//                         ) : (
//                             <View className="h-40 items-center justify-center w-full">
//                                 <Text className="text-muted-foreground">Tidak ada data gejala yang terdeteksi.</Text>
//                             </View>
//                         )}
                       
//                     </CardContent>
//                 </Card>
//                  {/* --- AKHIR BAGIAN GRAFIK --- */}

//                 {/* --- CARD KETERANGAN DOMINAN --- */}
//                 <Card className="mb-6 p-4 border-l-4 border-l-primary/70">
//                     <CardHeader className="p-0 mb-3">
//                         <CardTitle className="text-lg">Hasil Deteksi Utama</CardTitle>
//                         {/* Prominent Detection Text */}
//                         {dominantSymptom && (
//                             <View className="mt-2">
//                                 <Text className="text-xl font-bold text-foreground">
//                                     Kondisi Dominan: <Text style={{ color: dominantSymptom.hex }}>{dominantSymptom.name}</Text>
//                                 </Text>
//                                 <Text className={`text-2xl font-extrabold mt-1 ${getScoreColor(dominantSymptom.population * 2, dominantSymptom.name)}`}>
//                                     Tingkat: {dominantCategory}
//                                 </Text>
//                             </View>
//                         )}
//                     </CardHeader>
//                     <CardContent className="p-0 pt-3 border-t border-border/50">
//                         {dominantSymptom ? (
//                             <Text className="text-base text-foreground text-pretty">
//                                 Berdasarkan analisis GDSS, 
//                                 <Text style={{ color: dominantSymptom.hex }}> {dominantSymptom.name} </Text>
//                                 adalah gejala yang paling dominan, menyumbang 
//                                 <Text style={{ color: dominantSymptom.hex }}> {dominantPercentage}% </Text>
//                                 dari total akumulasi skor. Hasil ini menunjukkan Anda berada pada tingkat 
//                                 <Text className={getScoreColor(dominantSymptom.population * 2, dominantSymptom.name)}> {dominantCategory} </Text>
//                                 untuk kondisi tersebut.
//                             </Text>
//                         ) : (
//                             <Text className="text-muted-foreground">Tidak ada gejala yang menonjol dalam hasil ini.</Text>
//                         )}
//                     </CardContent>
//                 </Card>
//                 {/* --- AKHIR CARD KETERANGAN DOMINAN --- */}

//                 {/* Ringkasan Skor DASS-21 & Kategori */}
//                 <Card className="mb-6 p-4">
//                     <CardHeader>
//                         <CardTitle className="text-xl">Interpretasi Kategori DASS-21</CardTitle>
//                         <Text className="text-sm text-muted-foreground">Skor (0-42) dan tingkat keparahan yang sesuai.</Text>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         {scoreData.map((item, index) => (
//                             <View key={index} className="flex-row justify-between items-center py-2 border-b border-border/50 last:border-b-0">
//                                 <Text className="text-base font-semibold text-foreground" style={{ color: item.color }}>{item.label}</Text>
//                                 <View className="items-end">
//                                     <Badge 
//                                         className={`text-base font-bold`} 
//                                         variant="outline"
//                                     >
//                                         <Text className={getScoreColor(item.score, item.category)}>{getConditionDescription(item.category, item.score)}</Text>
//                                     </Badge>
//                                     <Text className="text-sm text-muted-foreground mt-1">Skor: {item.score}</Text>
//                                 </View>
//                             </View>
//                         ))}
//                     </CardContent>
//                 </Card>

//                 {/* Disclaimer */}
//                 <Card className="mt-8 border-destructive/30 bg-destructive/5">
//                     <CardHeader>
//                         <CardTitle className="text-lg text-destructive">Peringatan Penting</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <Text className="text-muted-foreground text-pretty text-justify text-sm">
//                             Hasil ini BUKAN diagnosis medis profesional. Harap berkonsultasi dengan profesional kesehatan
//                             mental untuk diagnosis yang akurat. DASS-21 hanya sebagai alat skrining awal.
//                         </Text>
//                     </CardContent>
//                 </Card>

//                 {/* Tombol Ulangi */}
//                 <Button
//                     onPress={onRestart}
//                     className="mt-8 bg-primary hover:bg-primary/90"
//                 >
//                     <ChevronLeft size={20} color="#fff" className="mr-2" />
//                     <Text className="text-base font-medium text-primary-foreground">Ulangi Kuisioner</Text>
//                 </Button>
//             </View>
//         </ScrollView>
//     )
// }
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { View } from "react-native"
import { Text } from "./ui/text"

type Membership = Record<string, number>

interface ResultItem {
  value: number
  membership: Membership
}

interface ApiResults {
  depression: ResultItem
  anxiety: ResultItem
  stress: ResultItem
}

interface ResultsCardProps {
  results: ApiResults | null
  onRestart: () => void
}

const getSeverityLevel = (score: number, type: "depression" | "anxiety" | "stress") => {
    if (type === "depression") {
        if (score <= 9) return { level: "Normal", color: "bg-success", variant: "secondary" as const }
        if (score <= 13) return { level: "Ringan", color: "bg-warning", variant: "secondary" as const }
        if (score <= 20) return { level: "Sedang", color: "bg-warning", variant: "default" as const }
        if (score <= 27) return { level: "Berat", color: "bg-destructive", variant: "destructive" as const }
        return { level: "Sangat Berat", color: "bg-destructive", variant: "destructive" as const }
    }

    if (type === "anxiety") {
        if (score <= 7) return { level: "Normal", color: "bg-success", variant: "secondary" as const }
        if (score <= 9) return { level: "Ringan", color: "bg-warning", variant: "secondary" as const }
        if (score <= 14) return { level: "Sedang", color: "bg-warning", variant: "default" as const }
        if (score <= 19) return { level: "Berat", color: "bg-destructive", variant: "destructive" as const }
        return { level: "Sangat Berat", color: "bg-destructive", variant: "destructive" as const }
    }

    // stress
    if (score <= 14) return { level: "Normal", color: "bg-success", variant: "secondary" as const }
    if (score <= 18) return { level: "Ringan", color: "bg-warning", variant: "secondary" as const }
    if (score <= 25) return { level: "Sedang", color: "bg-warning", variant: "default" as const }
    if (score <= 33) return { level: "Berat", color: "bg-destructive", variant: "destructive" as const }
    return { level: "Sangat Berat", color: "bg-destructive", variant: "destructive" as const }
}

type BadgeProps = {
  variant: 'default' | 'secondary' | 'destructive' | 'outline'
  color: string // opsional, bisa pakai bgColor/style tambahan
}

type TopMembershipResult = {
  label: string
  value: number
  badgeVariant: BadgeProps['variant']
  badgeColor: string
}

const getBadgeProps = (label: string): BadgeProps => {
  const k = label.toLowerCase().replace(/[_-]/g, ' ').trim()

  if (k === '-' || k === '') {
    return { variant: 'outline', color: '#9CA3AF' } // abu2 netral
  }

  if (/normal/.test(k)) {
    return { variant: 'secondary', color: '#10B981' } // hijau
  }
  if (/mild/.test(k)) {
    return { variant: 'default', color: '#FACC15' } // kuning
  }
  if (/moderate/.test(k)) {
    return { variant: 'default', color: '#F97316' } // oranye
  }
  if (/severe/.test(k) && /extrem|very|extremely/.test(k)) {
    return { variant: 'destructive', color: '#7F1D1D' } // merah tua
  }
  if (/severe/.test(k)) {
    return { variant: 'destructive', color: '#EF4444' } // merah
  }

  // fallback
  return { variant: 'outline', color: '#6B7280' }
}

const getTopMembership = (membership: Membership): TopMembershipResult => {
  const entries = Object.entries(membership)
  if (entries.length === 0) {
    const { variant, color } = getBadgeProps('-')
    return { label: '-', value: 0, badgeVariant: variant, badgeColor: color }
  }

  entries.sort((a, b) => b[1] - a[1])
  const [label, value] = entries[0]
  const { variant, color } = getBadgeProps(label)

  return { label, value, badgeVariant: variant, badgeColor: color }
}

export function ResultsCard({ results, onRestart }: ResultsCardProps) {
    // Return loading state if results is null
    if (!results) {
        return (
            <View className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4 flex items-center justify-center">
                <Card className="border-2 border-accent/20">
                    <CardContent className="pt-6">
                        <Text className="text-center text-foreground">Memproses hasil Anda...</Text>
                    </CardContent>
                </Card>
            </View>
        )
    }
    
    // const depressionSeverity = getSeverityLevel(scores.depressionScore, "depression")
    // const anxietySeverity = getSeverityLevel(scores.anxietyScore, "anxiety")
    // const stressSeverity = getSeverityLevel(scores.stressScore, "stress")

    const depressionTop = getTopMembership(results.depression?.membership ?? {})
    const anxietyTop = getTopMembership(results.anxiety?.membership ?? {})
    const stressTop = getTopMembership(results.stress?.membership ?? {})

    const maxScore = 42

    return (
        <View className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background p-4">
            <View className="max-w-4xl mx-auto pt-8">
                {/* Header */}
                <View className="text-center mb-8">
                    <Text className="text-4xl font-bold text-foreground mb-4 text-balance">Hasil Kuisioner DASS-42</Text>
                    <Text className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                        Berikut adalah hasil evaluasi kesehatan mental Anda berdasarkan jawaban yang diberikan
                    </Text>
                </View>

                {/* Results Cards */}
                <View className="grid gap-6 md:grid-cols-3 mb-8">
                    {/* Depression */}
                    <Card className="border-2 border-accent/20">
                        <CardHeader className="pb-4">
                            <View className="flex items-center justify-between">
                                <CardTitle className="text-lg">Depresi</CardTitle>
                                <Badge variant={depressionTop.badgeVariant}>{depressionTop.label}</Badge>
                            </View>
                            <CardDescription>
                                Skor: <Text className="font-mono">{results?.depression?.value?.toFixed(2)}</Text> / {maxScore}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={((results.depression?.value ?? 0) / maxScore) * 100} className="h-3 mb-2" />
                            <Text className="text-sm text-muted-foreground">
                                {depressionTop.label === "Normal"
                                    ? "Tingkat depresi dalam rentang normal"
                                    : `Menunjukkan gejala depresi tingkat ${depressionTop.label.toLowerCase()}`}
                            </Text>
                        </CardContent>
                    </Card>

                    {/* Anxiety */}
                    <Card className="border-2 border-accent/20">
                        <CardHeader className="pb-4">
                            <View className="flex items-center justify-between">
                                <CardTitle className="text-lg">Kecemasan</CardTitle>
                                <Badge variant={anxietyTop.badgeVariant}>{anxietyTop.label}</Badge>
                            </View>
                            <CardDescription>
                                Skor: <Text className="font-mono">{results?.anxiety?.value?.toFixed(1)}</Text> / {maxScore}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={((results.anxiety?.value ?? 0) / maxScore) * 100} className="h-3 mb-2" />
                            <Text className="text-sm text-muted-foreground">
                                {anxietyTop.label === "Normal"
                                    ? "Tingkat kecemasan dalam rentang normal"
                                    : `Menunjukkan gejala kecemasan tingkat ${anxietyTop.label.toLowerCase()}`}
                            </Text>
                        </CardContent>
                    </Card>

                    {/* Stress */}
                    <Card className="border-2 border-accent/20">
                        <CardHeader className="pb-4">
                            <View className="flex items-center justify-between">
                                <CardTitle className="text-lg">Stres</CardTitle>
                                <Badge variant={stressTop.badgeVariant}>{stressTop.label}</Badge>
                            </View>
                            <CardDescription>
                                Skor: <Text className="font-mono">{results?.stress?.value?.toFixed(1)}</Text> / {maxScore}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Progress value={((results.stress?.value ?? 0) / maxScore) * 100} className="h-3 mb-2" />
                            <Text className="text-sm text-muted-foreground">
                                {stressTop.label === "Normal"
                                    ? "Tingkat stres dalam rentang normal"
                                    : `Menunjukkan gejala stres tingkat ${stressTop.label.toLowerCase()}`}
                            </Text>
                        </CardContent>
                    </Card>
                </View>

                {/* <Card className="border-2 border-accent/20 mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl">Detail Skor</CardTitle>
                        <CardDescription>Rincian perhitungan skor berdasarkan kategori pertanyaan</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <View className="grid gap-4 md:grid-cols-3">
                            <View className="text-center p-4 bg-muted/30 rounded-lg">
                                <View className="text-2xl font-bold font-mono text-red-600">{scores.depressionScore.toFixed(1)}</View>
                                <View className="text-sm text-muted-foreground">Depresi (14 item)</View>
                                <View className="text-xs text-muted-foreground mt-1">
                                    Rata-rata: {(scores.depressionScore / 28).toFixed(2)}
                                </View>
                            </View>
                            <View className="text-center p-4 bg-muted/30 rounded-lg">
                                <View className="text-2xl font-bold font-mono text-blue-600">{scores.anxietyScore.toFixed(1)}</View>
                                <View className="text-sm text-muted-foreground">Kecemasan (14 item)</View>
                                <View className="text-xs text-muted-foreground mt-1">
                                    Rata-rata: {(scores.anxietyScore / 28).toFixed(2)}
                                </View>
                            </View>
                            <View className="text-center p-4 bg-muted/30 rounded-lg">
                                <View className="text-2xl font-bold font-mono text-orange-600">{scores.stressScore.toFixed(1)}</View>
                                <View className="text-sm text-muted-foreground">Stres (14 item)</View>
                                <View className="text-xs text-muted-foreground mt-1">
                                    Rata-rata: {(scores.stressScore / 26).toFixed(2)}
                                </View>
                            </View>
                        </View>
                    </CardContent>
                </Card> */}

                {/* Recommendations */}
                <Card className="border-2 border-accent/20 mb-8">
                    <CardHeader>
                        <CardTitle className="text-xl">Rekomendasi</CardTitle>
                        <CardDescription>Berdasarkan hasil evaluasi, berikut adalah beberapa saran untuk Anda</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {depressionTop.label !== "Normal" ||
                            anxietyTop.label !== "Normal" ||
                            stressTop.label !== "Normal" ? (
                            <>
                                <View className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                                    <Text className="font-semibold text-warning-foreground mb-2">⚠️ Perhatian</Text>
                                    <Text className="text-sm text-warning-foreground/80">
                                        Hasil menunjukkan adanya gejala yang perlu diperhatikan. Disarankan untuk berkonsultasi dengan
                                        profesional kesehatan mental.
                                    </Text>
                                </View>
                                <View className="space-y-2">
                                    <Text className="font-semibold">Langkah yang dapat dilakukan:</Text>
                                    <View className="text-sm text-muted-foreground space-y-1 ml-4">
                                        <Text>• Konsultasi dengan psikolog atau psikiater</Text>
                                        <Text>• Praktik teknik relaksasi dan mindfulness</Text>
                                        <Text>• Menjaga pola tidur dan olahraga teratur</Text>
                                        <Text>• Membangun sistem dukungan sosial yang kuat</Text>
                                        <Text>• Menghindari alkohol dan substansi berbahaya</Text>
                                    </View>
                                </View>
                            </>
                        ) : (
                            <View className="p-4 bg-success/10 border border-success/20 rounded-lg">
                                <Text className="font-semibold text-success-foreground mb-2">✅ Hasil Baik</Text>
                                <Text className="text-sm text-success-foreground/80">
                                    Hasil menunjukkan tingkat kesehatan mental yang baik. Tetap jaga kesehatan mental dengan pola hidup
                                    sehat dan aktivitas positif.
                                </Text>
                            </View>
                        )}
                    </CardContent>
                </Card>

                {/* Actions */}
                <View className="flex justify-center gap-4">
                    <Button onPress={onRestart} variant="outline" className="px-8 bg-transparent">
                        Isi Ulang Kuisioner
                    </Button>
                    <Button onPress={() => window.print()} className="px-8">
                        Cetak Hasil
                    </Button>
                </View>

                {/* Disclaimer */}
                <Card className="mt-8 border-muted">
                    <CardContent className="pt-6">
                        <Text className="text-xs text-muted-foreground text-center">
                            <Text className="font-bold">Disclaimer:</Text>{' '}
                            Hasil kuisioner ini hanya untuk tujuan skrining awal dan tidak dapat
                            menggantikan diagnosis profesional. Jika Anda mengalami gejala yang
                            mengganggu aktivitas sehari-hari, segera konsultasikan dengan tenaga
                            kesehatan mental yang qualified.
                        </Text>
                    </CardContent>
                </Card>
            </View>
        </View>
    )
}

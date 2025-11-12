import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { QuestionCard } from "@/components/question-card"
import { ResultsCard } from "@/components/results-card"
import { Text } from "@/components/ui/text"
import { ScrollView, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
const API_URL = process.env.EXPO_PUBLIC_API_URL

interface Question {
    id: number
    text: string
    category: "depression" | "anxiety" | "stress"
}

const dassQuestions: Question[] = [
    // Depression items (1, 3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42)
    { id: 1, text: "Saya merasa sulit untuk bersantai", category: "stress" },
    { id: 2, text: "Saya menyadari mulut saya terasa kering", category: "anxiety" },
    { id: 3, text: "Saya tidak dapat merasakan perasaan positif sama sekali", category: "depression" },
    {
        id: 4,
        text: "Saya mengalami kesulitan bernapas (misalnya, bernapas cepat, kehabisan napas tanpa melakukan aktivitas fisik)",
        category: "anxiety",
    },
    { id: 5, text: "Saya merasa sulit untuk memulai melakukan sesuatu", category: "depression" },
    { id: 6, text: "Saya cenderung bereaksi berlebihan terhadap situasi", category: "stress" },
    { id: 7, text: "Saya mengalami gemetar (misalnya, di tangan)", category: "anxiety" },
    { id: 8, text: "Saya merasa menggunakan banyak energi mental", category: "stress" },
    {
        id: 9,
        text: "Saya khawatir tentang situasi di mana saya mungkin panik dan mempermalukan diri sendiri",
        category: "anxiety",
    },
    { id: 10, text: "Saya merasa tidak ada yang dapat saya nantikan", category: "depression" },
    { id: 11, text: "Saya mendapati diri saya mudah gelisah", category: "stress" },
    { id: 12, text: "Saya merasa sulit untuk rileks", category: "stress" },
    { id: 13, text: "Saya merasa sedih dan tertekan", category: "depression" },
    {
        id: 14,
        text: "Saya tidak toleran terhadap hal-hal yang menghalangi saya melanjutkan apa yang sedang saya lakukan",
        category: "stress",
    },
    { id: 15, text: "Saya merasa hampir panik", category: "anxiety" },
    { id: 16, text: "Saya tidak dapat merasa antusias tentang apa pun", category: "depression" },
    { id: 17, text: "Saya merasa tidak berharga sebagai manusia", category: "depression" },
    { id: 18, text: "Saya merasa agak sensitif", category: "stress" },
    {
        id: 19,
        text: "Saya menyadari detak jantung saya tanpa melakukan aktivitas fisik (misalnya, merasa jantung berdetak kencang atau melewatkan detak)",
        category: "anxiety",
    },
    { id: 20, text: "Saya merasa takut tanpa alasan yang jelas", category: "anxiety" },
    { id: 21, text: "Saya merasa hidup tidak berarti", category: "depression" },
    { id: 22, text: "Saya merasa sulit untuk tenang setelah sesuatu membuat saya kesal", category: "stress" },
    { id: 23, text: "Saya mengalami kesulitan menelan", category: "anxiety" },
    { id: 24, text: "Saya tidak dapat menikmati hal-hal yang saya lakukan", category: "depression" },
    {
        id: 25,
        text: "Saya menyadari aktivitas jantung saya (misalnya, detak jantung meningkat atau menurun)",
        category: "anxiety",
    },
    { id: 26, text: "Saya merasa putus asa dan sedih", category: "depression" },
    { id: 27, text: "Saya merasa sangat gelisah", category: "stress" },
    {
        id: 28,
        text: "Saya khawatir tentang situasi di mana saya mungkin panik dan mempermalukan diri sendiri",
        category: "anxiety",
    },
    { id: 29, text: "Saya khawatir bahwa saya akan 'hancur' jika saya membiarkan diri saya rileks", category: "anxiety" },
    { id: 30, text: "Saya merasa sulit untuk bersabar ketika saya tertunda dalam hal apa pun", category: "stress" },
    { id: 31, text: "Saya merasa sedih", category: "depression" },
    {
        id: 32,
        text: "Saya tidak toleran terhadap gangguan apa pun terhadap apa yang sedang saya lakukan",
        category: "stress",
    },
    { id: 33, text: "Saya merasa tegang", category: "anxiety" },
    { id: 34, text: "Saya merasa tidak berharga", category: "depression" },
    { id: 35, text: "Saya tidak dapat menoleransi gangguan terhadap apa yang sedang saya lakukan", category: "stress" },
    { id: 36, text: "Saya merasa ketakutan", category: "anxiety" },
    { id: 37, text: "Saya tidak dapat melihat harapan untuk masa depan", category: "depression" },
    { id: 38, text: "Saya merasa hidup tidak berarti", category: "depression" },
    { id: 39, text: "Saya merasa gelisah", category: "stress" },
    {
        id: 40,
        text: "Saya khawatir tentang situasi di mana saya mungkin panik dan mempermalukan diri sendiri",
        category: "anxiety",
    },
    { id: 41, text: "Saya merasa gemetar (misalnya, di tangan)", category: "anxiety" },
    { id: 42, text: "Saya merasa sulit untuk mengambil inisiatif melakukan sesuatu", category: "depression" },
]

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
  results: ApiResults
  onRestart: () => void
}


export default function DassQuestionnaire() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [responses, setResponses] = useState<Record<number, number>>({})
    const [isCompleted, setIsCompleted] = useState(false)
    const [results, setResults] = useState<ApiResults | null>(null)

    const handleResponse = (questionId: number, value: number) => {
        const roundedValue = Math.round(value * 10) / 10
        setResponses((prev) => ({ ...prev, [questionId]: roundedValue }))
    }

    const handleNext = () => {
        if (currentQuestion < dassQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1)
        } else {
            handleSubmit()
        }
    }

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1)
        }
    }

    const handleSubmit = async () => {
        const formattedResponses = Object.fromEntries(
            Object.entries(responses).map(([key, value]) => [`Q${key}`, value])
        );

        try {
                const res = await fetch(`${API_URL}/api/fuzzy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedResponses),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setResults(data)
            setIsCompleted(true)
            console.log("Response from Flask:", data);
        } catch (err) {
            console.error("Error sending data:", err);
            console.log("Formatted responses:", formattedResponses);
            alert(`Error: Failed to submit responses. ${err instanceof Error ? err.message : String(err)}`);
        }
    };


    const calculateScores = () => {
        const depressionItems = [3, 5, 10, 13, 16, 17, 21, 24, 26, 31, 34, 37, 38, 42]
        const anxietyItems = [2, 4, 7, 9, 15, 19, 20, 23, 25, 28, 29, 33, 36, 40, 41]
        const stressItems = [1, 6, 8, 11, 12, 14, 18, 22, 27, 30, 32, 35, 39]

        const depressionScore =
            Math.round(
                depressionItems.reduce((sum, item) => sum + Number(responses[item] || 0), 0) * 2 * 10
            ) / 10

        const anxietyScore =
            Math.round(
                anxietyItems.reduce((sum, item) => sum + Number(responses[item] || 0), 0) * 2 * 10
            ) / 10

        const stressScore =
            Math.round(
                stressItems.reduce((sum, item) => sum + Number(responses[item] || 0), 0) * 2 * 10
            ) / 10

        return { depressionScore, anxietyScore, stressScore }
    }

    const progress = ((currentQuestion + 1) / dassQuestions.length) * 100
    const currentQuestionData = dassQuestions[currentQuestion]
    const currentResponse = responses[currentQuestionData?.id]

    if (isCompleted) {
        return (
            <ResultsCard
                results={results}
                onRestart={() => {
                    setCurrentQuestion(0)
                    setResponses({})
                    setIsCompleted(false)
                }}
            />
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView
                className="flex-1 bg-gradient-to-br from-background via-accent/5 to-background p-4 mb-10"
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false} // opsional
            >
                <View className="max-w-4xl mx-auto">
                    {/* Header */}
                    <View className="text-center mb-4">
                        <Text className="text-4xl font-bold text-foreground mb-4 text-center">Kuisioner DASS-42</Text>
                        <Text className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty text-center">
                            Skala Depresi, Kecemasan, dan Stres - 42 Item untuk evaluasi kesehatan mental
                        </Text>
                        <View className="flex items-center justify-center gap-4 mt-6">
                            <Badge variant="secondary" className="text-sm">
                                <Text>Pertanyaan {currentQuestion + 1} dari {dassQuestions.length}</Text>
                            </Badge>
                            {/* <Badge
                            variant={
                                currentQuestionData?.category === "depression"
                                    ? "destructive"
                                    : currentQuestionData?.category === "anxiety"
                                        ? "default"
                                        : "secondary"
                            }
                            className="text-sm capitalize"
                        >
                            <Text>{currentQuestionData?.category === "depression"
                                ? "Depresi"
                                : currentQuestionData?.category === "anxiety"
                                    ? "Kecemasan"
                                    : "Stres"}
                            </Text>
                        </Badge> */}
                        </View>
                    </View>

                    {/* Progress Bar */}
                    <View className="mb-8">
                        <View className="flex flex-row justify-between text-sm text-muted-foreground mb-2">
                            <Text>Progress</Text>
                            <Text>{Math.round(progress)}%</Text>
                        </View>
                        <Progress value={progress} className="h-2" />
                    </View>

                    {/* Question Card */}
                    <QuestionCard question={currentQuestionData} response={currentResponse} onResponse={handleResponse} />

                    <View className="flex flex-row justify-between items-center mt-8">
                        {/* Tombol Sebelumnya */}
                        <Button
                            variant="outline"
                            onPress={handlePrevious}
                            disabled={currentQuestion === 0}
                            className="px-6 bg-transparent flex-row items-center"
                        >
                            {/* Ikon di layar kecil */}
                            <View className="flex md:hidden flex-row items-center">
                                <ChevronLeft size={20} color="#000" />
                            </View>

                            {/* Teks di layar sedang ke atas */}
                            <Text className="hidden md:flex text-base font-medium text-foreground">Sebelumnya</Text>
                        </Button>

                        {/* Info progress */}
                        <Text className="text-sm text-muted-foreground text-center">
                            {Object.keys(responses).length} dari {dassQuestions.length} pertanyaan dijawab
                        </Text>

                        {/* Tombol Selanjutnya */}
                        <Button
                            onPress={handleNext}
                            disabled={currentResponse === undefined}
                            className="px-6 flex-row items-center"
                        >
                            {/* Teks di layar sedang ke atas */}
                            <Text className="hidden md:flex text-base font-medium text-foreground">
                                {currentQuestion === dassQuestions.length - 1 ? "Selesai" : "Selanjutnya"}
                            </Text>

                            {/* Ikon di layar kecil */}
                            <View className="flex md:hidden flex-row items-center">
                                <ChevronRight
                                    size={20}
                                    color={currentResponse === undefined ? "#000" : "#fff"}
                                />
                            </View>
                        </Button>
                    </View>

                    {/* Instructions */}
                    <Card className="mt-8 border-accent/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Petunjuk Pengisian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Text className="text-muted-foreground text-pretty text-justify">
                                Silakan baca setiap pernyataan dan gunakan slider untuk memilih nilai antara 0.0 hingga 3.0 yang
                                menunjukkan seberapa sering Anda mengalami kondisi tersebut{' '}
                                <Text className="font-bold">selama seminggu terakhir</Text>.
                                Anda dapat memilih nilai desimal seperti 1.5, 2.3, dll. untuk tingkat yang lebih spesifik.
                            </Text>
                            <View className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">0.0</Text>
                                    <Text className="text-sm text-muted-foreground">Tidak pernah</Text>
                                </View>
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">1.0</Text>
                                    <Text className="text-sm text-muted-foreground">Kadang-kadang</Text>
                                </View>
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">2.0</Text>
                                    <Text className="text-sm text-muted-foreground">Sering</Text>
                                </View>
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">3.0</Text>
                                    <Text className="text-sm text-muted-foreground">Hampir selalu</Text>
                                </View>
                            </View>
                        </CardContent>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

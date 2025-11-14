import { useState } from "react"
import { ScrollView, View, Alert, ActivityIndicator, Image, type ImageStyle } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Text } from "@/components/ui/text"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import Slider from "@react-native-community/slider"
import { DASS_21_QUESTIONS } from "@/src/data/dass21-data"
import { calculateResult } from "@/src/services/CalculationService"
import { DassResultsCard21 } from "@/components/dass-results-card-21"

// --- Import untuk Header Bawaan ---
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, Shield, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Icon } from "@/components/ui/icon";

const TOTAL_QUESTIONS = DASS_21_QUESTIONS.length

// --- Komponen ThemeToggle (Diambil dari index.tsx Projek 2) ---
const THEME_ICONS = {
    light: SunIcon,
    dark: MoonStarIcon,
};

function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
        <View className='flex flex-row justify-center items-center web:mr-10'>
            <Button
                onPressIn={toggleColorScheme}
                size="icon"
                variant="ghost"
                className="ios:size-9 rounded-full web:mx-4">
                <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
            </Button>
            <Link
                href="/auth/login" // Asumsi path login pakar Anda
                className="flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
            >
                <Icon as={Shield} className="size-4 text-center" />
                <Text className="android:ml-2">Login Pakar</Text>
            </Link>
        </View>
    );
}
// --- Akhir Komponen ThemeToggle ---

const SCREEN_OPTIONS = {
    title: 'DASS-21 Kuisioner', // Judul unik untuk halaman ini
    headerTransparent: false,
    headerRight: () => <ThemeToggle />,
    // Jika Anda ingin menghilangkan tombol back, tambahkan: headerLeft: () => null,
};


// Komponen Slider dan Value Badge untuk DASS-21 (nilai 0, 1, 2, 3)
const QuestionSlider = ({ questionId, value, onValueChange }: { questionId: number, value: number, onValueChange: (id: number, val: number) => void }) => {
    const handleSliderChange = (val: number) => {
        onValueChange(questionId, Math.round(val)) // Pastikan selalu bulat (0, 1, 2, 3)
    }
    
    const handleValueBadgePress = (val: number) => {
        onValueChange(questionId, val)
    }

    const options = [
        { val: 0, label: "Tidak pernah" },
        { val: 1, label: "Kadang-kadang" },
        { val: 2, label: "Sering" },
        { val: 3, label: "Hampir selalu" },
    ]

    return (
        <View className="mt-6">
            <Text className="text-center text-sm font-semibold text-muted-foreground mb-4">Tingkat Kesesuaian: {value}</Text>
            
            <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={value}
                onValueChange={handleSliderChange}
                onSlidingComplete={handleSliderChange}
                minimumTrackTintColor="#18504B" 
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#18504B"
            />
            
            <View className="flex-row justify-between px-2 mt-4">
                {options.map(({ val }) => (
                    <Button
                        key={val}
                        variant={value === val ? "default" : "secondary"}
                        onPress={() => handleValueBadgePress(val)}
                        className="w-16 h-10 rounded-lg"
                    >
                        <Text className={`font-bold ${value === val ? "text-primary-foreground" : "text-secondary-foreground"}`}>{val}</Text>
                    </Button>
                ))}
            </View>
            <View className="flex-row justify-between px-0 mt-2 text-xs">
                {options.map(({ val, label }) => (
                     <Text key={val} className="text-muted-foreground text-xs text-center w-1/4">{label}</Text>
                ))}
            </View>
        </View>
    )
}


// --- Komponen QuestionnaireHeader dihilangkan dan diganti dengan Stack.Screen ---
/* const QuestionnaireHeader ... */


export default function Dass21QuestionnaireScreen() {
    // responses adalah array integer panjang 21, sesuai payload BE
    const [responses, setResponses] = useState<number[]>(Array(TOTAL_QUESTIONS).fill(0))
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [results, setResults] = useState<{ depression: number, anxiety: number, stress: number } | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const currentQuestion = DASS_21_QUESTIONS[currentQuestionIndex]
    const currentResponse = responses[currentQuestionIndex]

    // Gunakan index array (0-20) sebagai ID untuk responses
    const handleResponse = (index: number, value: number) => {
        setResponses(prev => {
            const newResponses = [...prev]
            newResponses[index] = value
            return newResponses
        })
    }

    const handleNext = async () => {
        if (isLoading) return 
        
        const nextIndex = currentQuestionIndex + 1
        if (nextIndex < TOTAL_QUESTIONS) {
            setCurrentQuestionIndex(nextIndex)
        } else {
            // Jika sudah di pertanyaan terakhir, submit
            await handleSubmit()
        }
    }

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1)
        }
    }

    const handleSubmit = async () => {
        if (isLoading) return
        setIsLoading(true)
        
        try {
            // responses (array int 0-20) dikirim langsung ke service
            const data = await calculateResult(responses)
            
            setResults(data)
            setIsCompleted(true)
        } catch (err: any) {
            console.error("Error sending data:", err)
            Alert.alert(
                "Gagal Mengirim",
                `Terjadi kesalahan saat mengirim jawaban: ${err.message}`
            )
        } finally {
            setIsLoading(false)
        }
    }

    const handleRestart = () => {
        setCurrentQuestionIndex(0)
        setResponses(Array(TOTAL_QUESTIONS).fill(0)) // Reset semua jawaban ke 0
        setIsCompleted(false)
        setResults(null)
    }

    const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100

    if (isCompleted) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <Stack.Screen options={SCREEN_OPTIONS} />
                <DassResultsCard21 results={results} onRestart={handleRestart} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <Stack.Screen options={SCREEN_OPTIONS} /> {/* INI KUNCI UNTUK HEADER STACK */}
            
            <ScrollView
                className="flex-1 bg-gradient-to-br from-background via-accent/5 to-background p-4 mb-10"
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="max-w-4xl mx-auto w-full">
                    
                    {/* Header Papan Info (Pengganti QuestionnaireHeader) */}
                    <Card className="mx-auto w-full mb-8 border-t-4 border-t-primary rounded-t-lg shadow-lg">
                        <CardHeader className="p-4 md:p-6">
                            <View className="flex-row justify-between items-start mb-2">
                                <View className="flex-1">
                                    <Text className="text-sm font-semibold text-muted-foreground">Skala Evaluasi DASS-21</Text>
                                    <CardTitle className="text-2xl font-extrabold text-foreground mt-1">
                                        Kuisioner DASS-21
                                    </CardTitle>
                                </View>
                                <Badge variant="default" className="text-sm self-start min-w-[100px] justify-center">
                                    <Text>Item {currentQuestionIndex + 1}/{TOTAL_QUESTIONS}</Text>
                                </Badge>
                            </View>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <View className="flex flex-row justify-between text-sm text-muted-foreground mb-2">
                                <Text>Progress</Text>
                                <Text>{Math.round(progress)}%</Text>
                            </View>
                            <Progress value={progress} className="h-2" />
                        </CardContent>
                    </Card>


                    {/* Question Card */}
                    <Card className="p-4">
                        <CardHeader className="items-center">
                             <Text className="text-sm font-semibold text-muted-foreground mb-2">Selama seminggu terakhir...</Text>
                            <CardTitle className="text-2xl text-center">
                                {currentQuestion.text}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Menggunakan index array (0-20) sebagai ID */}
                            <QuestionSlider 
                                questionId={currentQuestionIndex} 
                                value={currentResponse} 
                                onValueChange={handleResponse}
                            />
                        </CardContent>
                    </Card>


                    <View className="flex flex-row justify-between items-center mt-8">
                        {/* Tombol Sebelumnya */}
                        <Button
                            variant="outline"
                            onPress={handlePrevious}
                            disabled={currentQuestionIndex === 0 || isLoading}
                            className="px-6 bg-transparent flex-row items-center"
                        >
                            <ChevronLeft size={20} className="text-foreground mr-2" />
                            <Text className="text-base font-medium text-foreground">Sebelumnya</Text>
                        </Button>

                        {/* Tombol Selanjutnya / Selesai */}
                        <Button
                            onPress={handleNext}
                            disabled={isLoading}
                            className="px-6 flex-row items-center"
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Text className="text-base font-medium text-primary-foreground">
                                        {currentQuestionIndex === TOTAL_QUESTIONS - 1 ? "Selesai" : "Selanjutnya"}
                                    </Text>
                                    <ChevronRight size={20} color="#fff" className="ml-2" />
                                </>
                            )}
                        </Button>
                    </View>
                    
                    {/* Instructions (Diambil dari styling DASS-42) */}
                    <Card className="mt-8 border-accent/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Petunjuk Pengisian</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Text className="text-muted-foreground text-pretty text-justify">
                                Silakan baca setiap pernyataan dan pilih nilai antara 0 hingga 3 yang
                                menunjukkan seberapa sering Anda mengalami kondisi tersebut{' '}
                                <Text className="font-bold">selama seminggu terakhir</Text>.
                            </Text>
                            {/* Visualisasi opsi jawaban 0-3 */}
                            <View className="grid grid-cols-4 gap-4 mt-4">
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">0</Text>
                                    <Text className="text-sm text-muted-foreground">Tidak pernah</Text>
                                </View>
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">1</Text>
                                    <Text className="text-sm text-muted-foreground">Kadang-kadang</Text>
                                </View>
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">2</Text>
                                    <Text className="text-sm text-muted-foreground">Sering</Text>
                                </View>
                                <View className="text-center p-3 bg-muted/50 rounded-lg">
                                    <Text className="font-semibold text-lg">3</Text>
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
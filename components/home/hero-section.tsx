import { Button } from "@/components/ui/button"
import { Brain, Heart, TrendingUp } from "lucide-react-native"
import { Text } from "../ui/text"
import { Link } from "expo-router"
import { Icon } from "../ui/icon"
import { View } from "react-native"

interface HeroSectionProps {
    onGetStarted?: () => void
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
    return (
        <View className="relative overflow-hidden">
            {/* Background gradient mesh */}
            <View className="gradient-mesh absolute inset-0 pointer-events-none" />

            <View className=" max-w-2xl mx-auto px-4 py-12">
                {/* Hero content */}
                <View className="text-center mb-12">
                    <View className="inline-flex items-center justify-center gap-2 mb-4">
                        <View className="p-3 rounded-full bg-primary/10">
                            <Icon as={Brain} className="w-6 h-6 text-primary" />
                        </View>
                    </View>

                    <Text className="text-3xl text-center md:text-4xl font-bold text-foreground mb-4 leading-tight">
                        Jaga Kesehatan Mental Anda
                    </Text>

                    <Text className="text-lg text-center text-muted-foreground mb-8 leading-relaxed max-w-sm mx-auto">
                        Deteksi dini kondisi kesehatan mental dengan sistem pakar yang telah terbukti efektif berbasis DASS-21
                    </Text>

                    {/* Feature highlights */}
                    <View className="grid grid-cols-1 gap-3 mb-10 sm:grid-cols-3">
                        <View className="flex flex-row items-center gap-2 justify-center text-sm text-muted-foreground">
                            <Icon as={Heart} className="w-4 h-4 text-accent" />
                            <Text>Aman & Privat</Text>
                        </View>
                        <View className="flex flex-row items-center gap-2 justify-center text-sm text-muted-foreground">
                            <Icon as={Brain} className="w-4 h-4 text-accent" />
                            <Text>Berbasis Ilmiah</Text>
                        </View>
                        <View className="flex flex-row items-center gap-2 justify-center text-sm text-muted-foreground">
                            <Icon as={TrendingUp} className="w-4 h-4 text-accent" />
                            <Text>Hasil Instan</Text>
                        </View>
                    </View>

                    {/* CTA Buttons */}
                    <View className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Button
                            size="lg"
                            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                            onPress={onGetStarted}
                        >
                            <Text>Mulai Deteksi</Text>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full border-primary/30 text-primary hover:bg-primary/5 bg-transparent"
                        >
                            <Link href="/auth/login">Pelajari Lebih Lanjut</Link>
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}

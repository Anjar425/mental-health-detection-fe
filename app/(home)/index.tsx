import { Link, Stack } from 'expo-router';
import { MoonStarIcon, Shield, SunIcon, BarChart3Icon, ShieldCheck } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Impor Komponen UI Kustom ---
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge'; 

// --- Komponen ThemeToggle (Penting untuk Header) ---
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
                href="/auth/login" // Path Login Pakar
                className="flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
            >
                <Icon as={ShieldCheck} className="size-4 text-center" />
                <Text className="android:ml-2">Login Pakar</Text>
            </Link>
        </View>
    );
}

const SCREEN_OPTIONS = {
    title: 'AMBABA CARE', // Judul Utama Aplikasi
    headerTransparent: false,
    headerRight: () => <ThemeToggle />,
};
// --- Akhir Komponen Header ---


export default function LandingScreen() {
    return (
        // Menggunakan SafeAreaView dan ScrollView agar konten responsif dan aman
        <SafeAreaView className="flex-1 bg-background">
            <Stack.Screen options={SCREEN_OPTIONS} />
            
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="p-4">
                <View className="min-h-[90vh] flex items-center justify-center p-4">
                    
                    {/* Hero Section */}
                    <View className="text-center mb-12 max-w-xl">
                        {/* Teks diperbesar: text-5xl md:text-6xl */}
                        <Text className="text-5xl md:text-6xl font-extrabold text-foreground mb-3">
                            Mental Health Scoreboard Using DASS
                        </Text>
                        {/* Teks deskripsi di tengah dan diperbesar */}
                        <Text className="text-xl text-muted-foreground text-center">
                            Pilih jenis kuisioner DASS yang ingin Anda gunakan untuk memulai evaluasi kesehatan mental Anda.
                        </Text>
                    </View>

                    {/* Card Pilihan Kuesioner */}
                    <View className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
                        
                        {/* Pilihan 1: DASS-21 (Ringkas) */}
                        <Link href="/dass21" asChild className="flex-1">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer w-full text-center">
                                <CardHeader className="flex-col items-center justify-center">
                                    <View className="mb-4">
                                        <Icon as={Shield} size={40} className="text-primary" />
                                    </View>
                                    <CardTitle className="text-3xl text-foreground">DASS-21</CardTitle>
                                    <Badge variant="default" className="bg-accent/80 mt-2">
                                        <Text className="text-accent-foreground">Populer & Ringkas</Text>
                                    </Badge>
                                </CardHeader>
                                <CardContent className="gap-2 items-center">
                                    <Text className="text-muted-foreground mb-4 text-center">
                                        Versi singkat (21 Item). Cepat dan efektif untuk skrining awal.
                                    </Text>
                                    {/* Tombol Mulai (Warna Primary) */}
                                    <Button className="w-full">
                                        <Text>Mulai DASS-21</Text>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>

                        {/* Pilihan 2: DASS-42 (Detail) */}
                        <Link href="/dass42" asChild className="flex-1">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer w-full text-center">
                                <CardHeader className="flex-col items-center justify-center">
                                     <View className="mb-4">
                                        <Icon as={BarChart3Icon} size={40} className="text-primary" />
                                    </View>
                                    <CardTitle className="text-3xl text-foreground">DASS-42</CardTitle>
                                    <Badge variant="secondary" className="mt-2">
                                        <Text>Lengkap & Mendalam</Text>
                                    </Badge>
                                </CardHeader>
                                <CardContent className="gap-2 items-center">
                                    <Text className="text-muted-foreground mb-4 text-center">
                                        Versi penuh (42 Item). Memberikan hasil evaluasi yang lebih mendalam.
                                    </Text>
                                    {/* Tombol Mulai (Warna Primary - sama) */}
                                    <Button className="w-full">
                                        <Text>Mulai DASS-42</Text>
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
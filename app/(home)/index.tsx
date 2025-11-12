import { HeroSection } from '@/components/home/hero-section';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { MoonStarIcon, Shield, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { Image, type ImageStyle, View } from 'react-native';

const LOGO = {
    light: require('@/assets/images/react-native-reusables-light.png'),
    dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const SCREEN_OPTIONS = {
    title: 'AMBABA CARE',
    headerTransparent: false,
    headerRight: () => <ThemeToggle />,
};

const IMAGE_STYLE: ImageStyle = {
    height: 76,
    width: 76,
};

export default function Screen() {
    const { colorScheme } = useColorScheme();

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View className="min-h-screen flex flex-1 items-center justify-center gap-8 p-4 bg-background">
                {/* <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" /> */}
                <HeroSection/>
                {/* <View className="gap-4 items-center">
                    <Text className="text-2xl font-bold text-foreground text-center">
                        Mental Health Detection
                    </Text>
                    <Text className="text-muted-foreground text-center">
                        Evaluasi kesehatan mental Anda dengan kuisioner DASS-42
                    </Text>
                </View>
                <View className="flex-row gap-2">
                    <Link href="/dass-questionaire" asChild>
                        <Button className="px-6">
                            <Text>Mulai Kuisioner DASS-42</Text>
                        </Button>
                    </Link>
                </View> */}
            </View>
        </>
    );
}

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
                href="/auth/login"
                className="flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
            >
                    <Icon as={Shield} className="size-4 text-center" />
                    <Text className="android:ml-2">Login Pakar</Text>
            </Link>
        </View>
    );
}
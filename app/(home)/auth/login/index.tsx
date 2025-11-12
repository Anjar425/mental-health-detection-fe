import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Pressable, View } from "react-native"
import { Text } from "@/components/ui/text"
import { Eye, EyeOff, Shield } from "lucide-react-native"
import { Link, Stack, useNavigation } from "expo-router"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

const SCREEN_OPTIONS = {
    title: 'LOGIN',
    headerTransparent: false,
};

export default function ExpertLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const navigation = useNavigation();

    const handleLogin = async () => {  // ❌ tidak pakai parameter e
        setError('');
        setIsLoading(true);

        try {
            if (email && password) {
                // Simulate authentication
                // Bisa simpan session di AsyncStorage (mobile)
                // import AsyncStorage from '@react-native-async-storage/async-storage';
                // await AsyncStorage.setItem('expertEmail', email);
                // await AsyncStorage.setItem('expertLoggedIn', 'true');

                // Navigasi ke dashboard
                navigation.navigate('ExpertDashboard' as never);
            } else {
                setError('Email dan password harus diisi');
            }
        } catch (err) {
            setError('Login gagal. Silahkan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View className="h-full bg-gradient-to-br from-background via-background to-muted/30 items-center justify-center px-4">
                <View className="max-w-md w-full android:pb-32">
                    <View className="text-center mb-8">
                        <View className="flex items-center justify-center mb-4">
                            <Icon as={Shield} className="w-10 h-10 text-primary text-center" />
                        </View>
                        <Text className="text-3xl text-center font-bold text-foreground mb-2">Login Pakar</Text>
                        <Text className="text-sm text-center text-muted-foreground">Akses dashboard untuk mengelola sistem pakar</Text>
                    </View>

                    <Card className="border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Masuk ke Akun Pakar</CardTitle>
                            <CardDescription>Gunakan kredensial pakar Anda untuk login</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <View className="android:flex android:gap-4 web:space-y-4">
                                {error && (
                                    <Text className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive">
                                        {error}
                                    </Text>
                                )}

                                <View className="space-y-2">
                                    <Text className="text-sm font-medium text-foreground">Email</Text>
                                    <Input
                                        keyboardType="email-address"
                                        textContentType="emailAddress"
                                        placeholder="pakar@mindcare.com"
                                        value={email}
                                        onChangeText={setEmail}
                                        className="bg-background border-border/50"
                                        autoComplete="email"
                                    />
                                </View>

                                <View className="space-y-2">
                                    <Text className="text-sm font-medium text-foreground">Password</Text>
                                    <View className="relative">
                                        <Input
                                            placeholder="••••••••"
                                            value={password}
                                            onChangeText={setPassword}
                                            className="bg-background border-border/50 pr-10"
                                            secureTextEntry={!showPassword}
                                            autoCapitalize="none"
                                        />
                                        <Pressable
                                            onPress={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? <Icon as={Eye} className="w-4 h-4"/>  : <Icon as={EyeOff} className="w-4 h-4" />}
                                        </Pressable>
                                    </View>
                                </View>

                                <Button
                                    onPress={handleLogin}
                                    className="w-full bg-primary text-primary-foreground h-10 font-semibold rounded-lg"
                                    disabled={isLoading}
                                >
                                    <Text>{isLoading ? "Memproses..." : "Login"}</Text>
                                </Button>

                            </View>

                            <Text className="mt-6 text-center text-sm text-muted-foreground">
                                Belum punya akun?{" "}
                                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                                    Daftar di sini
                                </Link>
                            </Text>
                        </CardContent>
                    </Card>
                </View>
            </View>
        </>
    )
}

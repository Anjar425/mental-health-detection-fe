
import { Link } from "expo-router"
import { Shield } from "lucide-react-native"
import { Text } from "../ui/text"
import { Icon } from "../ui/icon"
import { View } from "react-native"

interface HeaderProps {
    title?: string
    subtitle?: string
    showLogo?: boolean
}

export function Header({ title = "MindCare", subtitle, showLogo = true }: HeaderProps) {
    return (
        <View className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-sm">
            <View className="max-w-7xl mx-auto px-4 py-4 flex flex-row items-center justify-between">
                <View className="flex-1">
                    {showLogo && (
                        <View className="flex items-center gap-2 mb-2">
                            <View className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                                <Text className="text-white text-sm font-bold">MC</Text>
                            </View>
                            <Link href="/" className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity">
                                {title}
                            </Link>
                        </View>
                    )}
                    {subtitle && <Text className="text-sm text-muted-foreground">{subtitle}</Text>}
                </View>

                <Link
                    href="/auth/login"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                >
                    <Icon as={Shield} className="w-4 h-4" />
                    <Text className="hidden sm:inline">Login Pakar</Text>
                </Link>
            </View>
        </View>
    );
}

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { View } from "react-native"
import { Label } from "../ui/label"
import { Text } from "../ui/text"
import Slider from "@react-native-community/slider"

interface ExpertProfile {
    education: string
    patientCount: string
    publications: string
    experienceHours: string
}

interface InfluenceWeights {
    education: number
    patientCount: number
    publications: number
    experienceHours: number
}

export function ProfileInfluenceModule() {
    const [profile, setProfile] = useState<ExpertProfile>({
        education: "",
        patientCount: "",
        publications: "",
        experienceHours: "",
    })

    const [weights, setWeights] = useState<InfluenceWeights>({
        education: 25,
        patientCount: 25,
        publications: 25,
        experienceHours: 25,
    })

    const [isSaved, setIsSaved] = useState(false)

    const handleProfileChange = (field: keyof ExpertProfile, value: string) => {
        setProfile({ ...profile, [field]: value })
        setIsSaved(false)
    }

    const handleWeightChange = (field: keyof InfluenceWeights, value: number) => {
        const totalWithoutCurrent = Object.entries(weights)
            .filter(([key]) => key !== field)
            .reduce((sum, [, val]) => sum + val, 0)

        const maxAllowed = 100 - totalWithoutCurrent
        const clampedValue = Math.min(value, maxAllowed)

        setWeights({ ...weights, [field]: clampedValue })
        setIsSaved(false)
    }

    const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0)

    const handleSaveProfile = () => {
        setIsSaved(true)
        setTimeout(() => setIsSaved(false), 2000)
    }

    return (
        <View className="space-y-6">
            {/* Profile Information */}
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle>Profil Pakar</CardTitle>
                    <CardDescription>Informasi mengenai kredibilitas dan pengalaman Anda sebagai pakar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <View className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">Tingkat Pendidikan</Label>
                            <Input
                                placeholder="contoh: S2 Psikologi Klinis"
                                value={profile.education}
                                onChangeText={(value) => handleProfileChange("education", value)}
                                className="bg-background border-border/50"
                            />
                        </View>

                        <View className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">Jumlah Pasien Ditangani</Label>
                            <Input
                                keyboardType="number-pad"
                                placeholder="contoh: 500"
                                value={profile.patientCount}
                                onChangeText={(value) => handleProfileChange("patientCount", value)}
                                className="bg-background border-border/50"
                            />
                        </View>

                        <View className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">Jumlah Publikasi</Label>
                            <Input
                                keyboardType="number-pad"
                                placeholder="contoh: 12"
                                value={profile.publications}
                                onChangeText={(value) => handleProfileChange("publications", value)}
                                className="bg-background border-border/50"
                            />
                        </View>

                        <View className="space-y-2">
                            <Label className="text-sm font-medium text-foreground">Jam Terbang (Jam)</Label>
                            <Input
                                keyboardType="number-pad"
                                placeholder="contoh: 10000"
                                value={profile.experienceHours}
                                onChangeText={(value) => handleProfileChange("experienceHours", value)}
                                className="bg-background border-border/50"
                            />
                        </View>
                    </View>
                </CardContent>
            </Card>

            {/* Influence Weights */}
            <Card className="border-border/50">
                <CardHeader>
                    <CardTitle>Persentase Pengaruh terhadap Diagnosis</CardTitle>
                    <CardDescription>
                        Tentukan seberapa besar pengaruh setiap faktor kredibilitas Anda dalam diagnosis
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Education Weight */}
                    <View className="space-y-3">
                        <View className="flex flex-row items-center justify-between">
                            <Label className="text-sm font-medium text-foreground">Tingkat Pendidikan</Label>
                            <View className="flex flex-row items-center gap-2">
                                <Input
                                    keyboardType="number-pad"
                                    maxLength={3}
                                    value={String(weights.education)}
                                    onChangeText={(value) => handleWeightChange("education", Number.parseInt(value))}
                                    className="w-12 px-2 py-1 rounded border border-border/50 bg-background text-sm text-center"
                                />
                                <Text className="text-sm text-muted-foreground">%</Text>
                            </View>
                        </View>
                        <Slider
                            value={weights.education}
                            onValueChange={(value) => handleWeightChange("education", value)}
                            minimumValue={0}
                            maximumValue={100}
                            upperLimit={Math.min(100, weights.education + (100 - totalWeight))}
                            step={1}
                            className="w-full"
                        />
                    </View>

                    {/* Patient Count Weight */}
                    <View className="space-y-3">
                        <View className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-foreground">Jumlah Pasien</Label>
                            <View className="flex items-center gap-2">
                                <Input
                                    keyboardType="number-pad"
                                    maxLength={3}
                                    value={String(weights.patientCount)}
                                    onChangeText={(text) => handleWeightChange("patientCount", Number.parseInt(text))}
                                    className="w-12 px-2 py-1 rounded border border-border/50 bg-background text-sm text-center"
                                />
                                <Text className="text-sm text-muted-foreground">%</Text>
                            </View>
                        </View>
                        <Slider
                            value={weights.patientCount}
                            onValueChange={(value) => handleWeightChange("patientCount", value)}
                            minimumValue={0}
                            maximumValue={100}
                            upperLimit={Math.min(100, weights.patientCount + (100 - totalWeight))}
                            step={1}
                            className="w-full"
                        />
                    </View>

                    {/* Publications Weight */}
                    <View className="space-y-3">
                        <View className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-foreground">Publikasi Ilmiah</Label>
                            <View className="flex items-center gap-2">
                                <Input
                                    keyboardType="number-pad"
                                    maxLength={3}
                                    value={String(weights.publications)}
                                    onChangeText={(value) => handleWeightChange("publications", Number.parseInt(value))}
                                    className="w-12 px-2 py-1 rounded border border-border/50 bg-background text-sm text-center"
                                />
                                <Text className="text-sm text-muted-foreground">%</Text>
                            </View>
                        </View>
                        <Slider
                            value={weights.publications}
                            onValueChange={(value) => handleWeightChange("publications", value)}
                            minimumValue={0}
                            maximumValue={100}
                            upperLimit={Math.min(100, weights.publications + (100 - totalWeight))}
                            step={1}
                            className="w-full"
                        />
                    </View>

                    {/* Experience Hours Weight */}
                    <View className="space-y-3">
                        <View className="flex items-center justify-between">
                            <Label className="text-sm font-medium text-foreground">Jam Terbang</Label>
                            <View className="flex items-center gap-2">
                                <Input
                                    keyboardType="number-pad"
                                    maxLength={3}
                                    value={String(weights.experienceHours)}
                                    onChangeText={(value) => handleWeightChange("experienceHours", Number.parseInt(value))}
                                    className="w-12 px-2 py-1 rounded border border-border/50 bg-background text-sm text-center"
                                />
                                <Text className="text-sm text-muted-foreground">%</Text>
                            </View>
                        </View>
                        <Slider
                            value={weights.experienceHours}
                            onSlidingComplete={(value) => handleWeightChange("education", value)}
                            minimumValue={0}
                            maximumValue={100}
                            upperLimit={Math.min(100, weights.experienceHours + (100 - totalWeight))}
                            step={1}
                            className="w-full"
                        />
                    </View>

                    {/* Total Weight Indicator */}
                    <View className="p-4 bg-muted/30 rounded-lg border border-border/30">
                        <View className="flex items-center justify-between mb-2">
                            <Text className="text-sm font-medium text-foreground">Total Persentase</Text>
                            <Text className={`font-semibold ${totalWeight === 100 ? "text-green-600" : "text-amber-600"}`}>
                                {totalWeight}%
                            </Text>
                        </View>
                        {totalWeight !== 100 && (
                            <Text className="text-xs text-muted-foreground">Total harus 100% untuk menyimpan profil</Text>
                        )}
                    </View>

                    <Button
                        onPress={handleSaveProfile}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        disabled={totalWeight !== 100}
                    >
                        {isSaved ? "Tersimpan!" : "Simpan Profil Pakar"}
                    </Button>
                </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-border/50 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-base">Ringkasan Kredibilitas</CardTitle>
                </CardHeader>
                <CardContent>
                    <View className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <View>
                            <Text className="text-muted-foreground">Pendidikan</Text>
                            <Text className="font-semibold text-foreground">{profile.education || "-"}</Text>
                        </View>
                        <View>
                            <Text className="text-muted-foreground">Pasien</Text>
                            <Text className="font-semibold text-foreground">{profile.patientCount || "0"}</Text>
                        </View>
                        <View>
                            <Text className="text-muted-foreground">Publikasi</Text>
                            <Text className="font-semibold text-foreground">{profile.publications || "0"}</Text>
                        </View>
                        <View>
                            <Text className="text-muted-foreground">Jam Kerja</Text>
                            <Text className="font-semibold text-foreground">{profile.experienceHours || "0"}</Text>
                        </View>
                    </View>
                </CardContent>
            </Card>
        </View>
    )
}

import React, { useState } from "react"
import { View, FlatList } from "react-native"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { Text } from "../ui/text"
import { Icon } from "../ui/icon"
import { DASS21 } from "@/constants"
import { Plus } from "lucide-react-native"
import Slider from "@react-native-community/slider"
import { Input } from "../ui/input"

interface weightsPreferance {
	anxiety: number
	depression: number
	stress: number
}

interface PreferenceItem {
	id: string
	symptomCode: string
	symptomName: string
	weight: weightsPreferance
}

export function PreferenceModule() {
	const [preferences, setPreferences] = useState<PreferenceItem | undefined>()
	const [selectedSymptom, setSelectedSymptom] = useState<string>("")
	const [savedPreferences, setSavedPreferences] = useState<PreferenceItem[]>([])
	const [isSaved, setIsSaved] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const handlePreferenceChange = (item: string) => {
		const symptom = DASS21.find((s) => String(s.id) === item)
		if (!symptom) return

		const newWeight: weightsPreferance = {
			depression: symptom.category === "depression" ? 100 : 0,
			anxiety: symptom.category === "anxiety" ? 100 : 0,
			stress: symptom.category === "stress" ? 100 : 0,
		}
		const newPref: PreferenceItem = {
			id: Date.now().toString(),
			symptomCode: item,
			symptomName: symptom.text,
			weight: newWeight,
		}

		setSelectedSymptom(item)
		setPreferences(newPref)
		setError(null)
	}

	const totalWeight: number = preferences
		? preferences.weight.anxiety + preferences.weight.depression + preferences.weight.stress
		: 0

	const maxForCategory = (category: keyof weightsPreferance) => {
		if (!preferences) return 100
		const current = preferences.weight[category]
		const otherTotal = totalWeight - current
		const allowedMax = Math.min(100, Math.max(0, 100 - otherTotal))
		return Math.max(current, allowedMax)
	}

	const handleWeightChange = (category: keyof weightsPreferance, value: number) => {
		const newVal = Math.round(Number.isFinite(value) ? value : 0)

		setPreferences((prev) => {
			if (!prev) return prev

			const current = prev.weight[category]
			const otherTotal = prev.weight.anxiety + prev.weight.depression + prev.weight.stress - current
			const allowedMax = Math.min(100, Math.max(current, 100 - otherTotal))
			const clamped = Math.min(Math.max(0, newVal), allowedMax)

			return {
				...prev,
				weight: {
					...prev.weight,
					[category]: clamped,
				},
			}
		})
	}

	const handleSaveProfile = () => {
		// validasi final
		if (!preferences) {
			setError("Pilih gejala terlebih dahulu.")
			return
		}
		if (totalWeight !== 100) {
			setError("Total harus 100% sebelum menyimpan.")
			return
		}

		setSavedPreferences((prev) => {
			const idx = prev.findIndex((p) => p.symptomCode === preferences.symptomCode)
			let updated: PreferenceItem[]

			if (idx >= 0) {
				// update existing
				updated = [...prev]
				updated[idx] = preferences
			} else {
				// add new
				updated = [...prev, preferences]
			}

			// urutkan berdasarkan nomor pertanyaan (Q1–Q21)
			updated.sort((a, b) => Number(a.symptomCode) - Number(b.symptomCode))
			return updated
		})

		setIsSaved(true)
		setError(null)

		// reset selection / preference (ubah jika ingin mempertahankan)
		setSelectedSymptom("")
		setPreferences(undefined)

		// feedback singkat
		setTimeout(() => setIsSaved(false), 2000)
	}


	return (
		<View className="space-y-6 android:flex android:flex-col android:gap-6">
			{/* Input Form */}
			<Card className="border-border/50">
				<CardHeader>
					<CardTitle>Input Preferensi Pakar DASS-21</CardTitle>
					<CardDescription>
						Tentukan tingkat preferensi Anda untuk setiap gejala dalam skala DASS-21
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-6 android:flex android:flex-col android:gap-6">
					{/* DASS21 list */}
					<View className="space-y-2">
						<Label className="text-sm font-medium text-foreground">Pilih Gejala DASS-21</Label>

						<FlatList
							scrollEnabled={false}
							data={DASS21}
							numColumns={3}
							keyExtractor={(item) => String(item.id)}
							columnWrapperStyle={{
								justifyContent: "center",
								gap: 6,
								marginBottom: 6,
							}}
							renderItem={({ item: symptom }) => (
								<Button
									onPress={() => handlePreferenceChange(String(symptom.id))}
									className={`w-[31%] rounded-lg text-sm font-medium border ${selectedSymptom === String(symptom.id)
										? "bg-primary text-primary-foreground border-primary"
										: "bg-muted/50 text-foreground border-border/30 hover:border-primary/50"
										}`}
								>
									<Text className="text-foreground">Q{symptom.id}</Text>
								</Button>
							)}
						/>
					</View>

					{/* Slider section */}
					<View className="space-y-3 android:flex android:flex-col android:gap-4">
						{selectedSymptom && preferences && (
							<>
								<View>
									<Label className="text-sm font-medium text-foreground mt-3 block">Gejala</Label>
									<Text className="text-sm text-muted-foreground">
										{DASS21.find((s) => String(s.id) === selectedSymptom)?.text}
									</Text>
								</View>

								{/* ANXIETY */}
								<View className="mt-4">
									<View className="flex flex-row items-center justify-between">
										<Label className="text-sm font-medium text-foreground">Kecemasan</Label>
										<View className="flex flex-row items-center gap-2">
											<Input
												keyboardType="number-pad"
												maxLength={3}
												value={String(preferences.weight.anxiety)}
												onChangeText={(val) => handleWeightChange("anxiety", Number.parseInt(val || "0", 10) || 0)}
												className="w-12 px-2 py-1 rounded border border-border/50 bg-background text-sm text-center"
											/>
											<Text className="text-sm text-muted-foreground">%</Text>
										</View>
									</View>
									<Slider
										value={preferences.weight.anxiety}
										onValueChange={(val) => handleWeightChange("anxiety", val)}
										minimumValue={0}
										maximumValue={100}
										lowerLimit={0}
										upperLimit={maxForCategory("anxiety")}
										step={1}
									/>
									<Text className="text-xs text-muted-foreground mt-1">
										Seberapa penting gejala ini terhadap kecemasan
									</Text>
								</View>

								{/* DEPRESSION */}
								<View className="mt-4">
									<View className="flex flex-row items-center justify-between">
										<Label className="text-sm font-medium text-foreground">Depresi</Label>
										<View className="flex flex-row items-center gap-2">
											<Input
												keyboardType="number-pad"
												maxLength={3}
												value={String(preferences.weight.depression)}
												onChangeText={(val) => handleWeightChange("depression", Number.parseInt(val || "0", 10) || 0)}
												className="w-12 px-2 py-1 rounded border border-border/50 bg-background text-sm text-center"
											/>
											<Text className="text-sm text-muted-foreground">%</Text>
										</View>
									</View>
									<Slider
										value={preferences.weight.depression}
										onValueChange={(val) => handleWeightChange("depression", val)}
										minimumValue={0}
										maximumValue={100}
										lowerLimit={0}
										upperLimit={maxForCategory("depression")}
										step={1}
									/>
									<Text className="text-xs text-muted-foreground mt-1">Seberapa penting gejala ini terhadap depresi</Text>
								</View>

								{/* STRESS */}
								<View className="mt-4">
									<View className="flex flex-row items-center justify-between">
										<Label className="text-sm font-medium text-foreground">Stress</Label>
										<View className="flex flex-row items-center gap-2">
											<Input
												keyboardType="number-pad"
												maxLength={3}
												value={String(preferences.weight.stress)}
												onChangeText={(val) => handleWeightChange("stress", Number.parseInt(val || "0", 10) || 0)}
												className="w-12 px-2 py-1 rounded border border-border/50 bg-background text-sm text-center"
											/>
											<Text className="text-sm text-muted-foreground">%</Text>
										</View>
									</View>
									<Slider
										value={preferences.weight.stress}
										onValueChange={(val) => handleWeightChange("stress", val)}
										minimumValue={0}
										maximumValue={100}
										lowerLimit={0}
										upperLimit={maxForCategory("stress")}
										step={1}
									/>
									<Text className="text-xs text-muted-foreground mt-1">Seberapa penting gejala ini terhadap stres</Text>
								</View>
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
									{error && <Text className="text-xs text-destructive mt-2">{error}</Text>}
								</View>
							</>
						)}
					</View>

					{/* Info total & save */}


					<Button
						onPress={handleSaveProfile}
						className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
						disabled={!preferences || totalWeight !== 100}
					>
						<Icon as={Plus} className="w-4 h-4" />
						<Text>{isSaved ? "Tersimpan!" : "Simpan Preferensi Pakar"}</Text>
					</Button>
				</CardContent>
			</Card>

			{/* (Opsional) Daftar yang sudah disimpan */}
			<Card className="border-border/50">
				<CardHeader>
					<CardTitle>Daftar Preferensi ({savedPreferences.length})</CardTitle>
				</CardHeader>
				<CardContent>
					{savedPreferences.length === 0 ? (
						<Text className="text-muted-foreground">Belum ada preferensi disimpan.</Text>
					) : (
						<FlatList
							data={savedPreferences}
							scrollEnabled={false}
							keyExtractor={(it) => it.id}
							renderItem={({ item }) => (
								<View className="p-3 border border-border/20 rounded mb-2">
									<Text className="font-semibold">{item.symptomName}</Text>
									<Text className="text-sm text-muted-foreground">
										A:{item.weight.anxiety}% • D:{item.weight.depression}% • S:{item.weight.stress}%
									</Text>
								</View>
							)}
						/>
					)}
				</CardContent>
			</Card>
		</View>
	)
}

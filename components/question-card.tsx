"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Slider from '@react-native-community/slider';
import { Badge } from "@/components/ui/badge"
import { View } from "react-native";
import { Text } from "./ui/text";

interface Question {
	id: number
	text: string
	category: "depression" | "anxiety" | "stress"
}

interface QuestionCardProps {
	question: Question
	response?: number
	onResponse: (questionId: number, value: number) => void
}

const scaleLabels = [
	{ value: 0, label: "Tidak pernah", description: "Tidak berlaku untuk saya sama sekali" },
	{ value: 1, label: "Kadang-kadang", description: "Berlaku untuk saya sampai tingkat tertentu, atau kadang-kadang" },
	{ value: 2, label: "Sering", description: "Berlaku untuk saya sampai tingkat yang cukup besar, atau cukup sering" },
	{ value: 3, label: "Hampir selalu", description: "Sangat berlaku untuk saya, atau berlaku hampir sepanjang waktu" },
]

export function QuestionCard({ question, response, onResponse }: QuestionCardProps) {
	const getScaleLabel = (value: number) => {
		if (value === 0) return scaleLabels[0]
		if (value <= 1) return scaleLabels[1]
		if (value <= 2) return scaleLabels[2]
		return scaleLabels[3]
	}

	const getValueColor = (value: number) => {
		if (value === 0) return "bg-green-100 text-green-800 border-green-200"
		if (value <= 1) return "bg-yellow-100 text-yellow-800 border-yellow-200"
		if (value <= 2) return "bg-orange-100 text-orange-800 border-orange-200"
		return "bg-red-100 text-red-800 border-red-200"
	}

	const currentLabel = response !== undefined ? getScaleLabel(response) : null

	return (
		<Card className="border-2 border-accent/20 shadow-lg">
			<CardHeader className="pb-4">
				<View className="flex items-center gap-3 mb-2">
					<View className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
						<Text className="text-primary-foreground text-sm font-semibold">{question.id}</Text>
					</View>
					<Text className="text-sm text-muted-foreground">Selama seminggu terakhir...</Text>
				</View>
				<CardTitle className="text-xl leading-relaxed text-pretty">{question.text}</CardTitle>
			</CardHeader>
			<CardContent>
				<View className="space-y-6">
					<View className="space-y-4">
						<View className="flex flex-row items-center justify-between">
							<Text className="text-sm font-medium text-foreground">Pilih tingkat kesesuaian (0.0 - 3.0):</Text>
							{response !== undefined && (
								<Badge className={`${getValueColor(response)} border`}>
									<Text className={`${getValueColor(response)}font-mono text-sm`}>{response.toFixed(1)}</Text>
								</Badge>
							)}
						</View>

						<View className="px-3">
							<Slider
								value={Number([response || 0])}
								onValueChange={(value) => onResponse(question.id, value)}
								upperLimit={3}
								lowerLimit={0}
								minimumValue={0}
								maximumValue={3}
								step={0.1}
								className="w-full"
							/>

							{/* Scale markers */}
							<View className="flex flex-row justify-between mt-2 text-xs text-muted-foreground">
								<Text>0.0</Text>
								<Text>1.0</Text>
								<Text>2.0</Text>
								<Text>3.0</Text>
							</View>
						</View>
					</View>

					{currentLabel && (
						<View className="p-4 bg-accent/10 rounded-lg border border-accent/20">
							<View className="flex items-start gap-3 flex-row">
								<View
									className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${getValueColor(response!)}`}
								>
									<Text>
										{response!.toFixed(1)}
									</Text>
								</View>
								<View className="flex-1">
									<Text className="font-semibold text-foreground mb-1">{currentLabel.label}</Text>
									<Text className="text-sm text-muted-foreground">{currentLabel.description}</Text>
								</View>
							</View>
						</View>
					)}

					{/* Reference scale
					<View className="grid grid-cols-2 gap-2 text-xs">
						{scaleLabels.map((scale) => (
							<View key={scale.value} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
								<View className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
									<Text className="text-muted-foreground text-xs font-semibold">
										{scale.value}
									</Text>
								</View>
								<Text className="font-medium">{scale.label}</Text>
							</View>
						))}
					</View> */}
				</View>
			</CardContent>
		</Card>
	)
}

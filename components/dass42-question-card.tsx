// import React from 'react';
// import { View } from 'react-native';
// import Slider from '@react-native-community/slider';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Text } from "@/components/ui/text";

// interface Question {
//     id: number
//     text: string
//     category: "depression" | "anxiety" | "stress"
// }

// interface Dass42QuestionCardProps {
//     question: Question;
//     response: number | undefined;
//     onResponse: (questionId: number, value: number) => void;
// }

// export function Dass42QuestionCard({ question, response, onResponse }: Dass42QuestionCardProps) {
//     const currentResponseValue = response !== undefined ? response : 0.0;

//     const handleSliderChange = (value: number) => {
//         const roundedValue = Math.round(value * 10) / 10; 
//         onResponse(question.id, roundedValue);
//     }

//     const handleButtonPress = (value: number) => {
//         onResponse(question.id, value);
//     }

//     const options = [0.0, 1.0, 2.0, 3.0];
    
//     // Konfigurasi warna slider
//     const primaryColor = 'hsl(var(--primary))';
//     const secondaryColor = 'hsl(var(--secondary))';
    
//     // FUNGSI PERBAIKAN STYLING: Memastikan teks angka kontras di kedua mode
//     const getButtonTextColor = (val: number) => {
//         if (val === currentResponseValue) {
//             // Aktif: Teks selalu kontras dengan warna default tombol (primary)
//             return "text-primary-foreground"; 
//         }
//         // Non-Aktif (Secondary): Menggunakan warna foreground yang otomatis gelap di light mode dan terang di dark mode.
//         return "text-foreground"; 
//     }
    
//     // FUNGSI BARU: Mengatur class style untuk tombol skor
//     const getButtonClass = (val: number) => {
//         // Tombol AKTIF
//         if (val === currentResponseValue) {
//             return "w-1/5 h-10 rounded-lg shadow-lg"; // Default/Primary variant
//         }
//         // Tombol NON-AKTIF: Diberi border dan background secondary
//         // Ini mengatasi masalah tombol putih yang tidak terlihat di latar belakang card putih.
//         return "w-1/5 h-10 rounded-lg border border-border bg-secondary/50"; 
//     }


//     return (
//         <Card className="p-4">
//             <CardHeader className="items-center">
//                  <Text className="text-sm font-semibold text-muted-foreground mb-2">Selama seminggu terakhir...</Text>
//                 <CardTitle className="text-2xl text-center">
//                     {question.text}
//                 </CardTitle>
//             </CardHeader>
//             <CardContent>
                
//                 <View className="mt-6">
//                     <Text className="text-center text-sm font-semibold text-muted-foreground mb-4">Tingkat Kesesuaian: {currentResponseValue.toFixed(1)}</Text>
                    
//                     {/* SLIDER */}
//                     <Slider
//                         style={{ width: "100%", height: 40 }}
//                         minimumValue={0}
//                         maximumValue={3}
//                         step={0.1} // Step 0.1 untuk desimal
//                         value={currentResponseValue}
//                         onValueChange={handleSliderChange}
//                         onSlidingComplete={handleSliderChange}
//                         minimumTrackTintColor={primaryColor} 
//                         maximumTrackTintColor={secondaryColor}
//                         thumbTintColor={primaryColor}
//                     />
                    
//                     {/* Tombol Cepat (0.0, 1.0, 2.0, 3.0) - Perbaikan Styling di sini */}
//                     <View className="flex-row justify-between px-2 mt-4">
//                         {options.map((val) => (
//                             <Button
//                                 key={val}
//                                 variant={val === currentResponseValue ? "default" : "secondary"}
//                                 onPress={() => handleButtonPress(val)}
//                                 className={getButtonClass(val)} // Menggunakan custom class
//                             >
//                                 <Text className={`font-bold ${getButtonTextColor(val)}`}>
//                                     {val.toFixed(1)}
//                                 </Text>
//                             </Button>
//                         ))}
//                     </View>
                    
//                     {/* Label */}
//                     <View className="flex-row justify-between px-0 mt-2 text-xs">
//                         <Text className="text-muted-foreground text-xs text-left w-1/4">0.0</Text>
//                         <Text className="text-muted-foreground text-xs text-center w-1/4">1.0</Text>
//                         <Text className="text-muted-foreground text-xs text-center w-1/4">2.0</Text>
//                         <Text className="text-muted-foreground text-xs text-right w-1/4">3.0</Text>
//                     </View>
//                 </View>
//             </CardContent>
//         </Card>
//     )
// }
import { PreferenceModule } from '@/components/expert/preference-module';
import { ProfileInfluenceModule } from '@/components/expert/profile-influence';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { Link, Stack } from 'expo-router';
import { LogOut, MoonStarIcon, Shield, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { ScrollView, View } from 'react-native';


const SCREEN_OPTIONS = {
    headerTitle: () => <TitlePage />,
    headerTransparent: false,
    headerRight: () => <ThemeToggle />,
};

export default function Dashboard() {
    const [tabs, setTabs] = React.useState('preference');

    return (
        <ScrollView>
            <Stack.Screen options={SCREEN_OPTIONS} />
            <View className="max-w-7x flex justify-center px-4 py-8">
                <View className="mb-8">
                    <Text className="text-2xl font-semibold text-foreground mb-2">Kelola Sistem Pakar</Text>
                    <Text className="text-muted-foreground">
                        Lakukan konfigurasi untuk sistem deteksi kesehatan mental berbasis DASS-21 dan DASS-42
                    </Text>
                </View>
                <View className="flex w-full flex-col gap-6">
                    <Tabs value={tabs} onValueChange={setTabs}>
                        <TabsList className=' w-full flex android:h-12'>
                            <TabsTrigger value="preference" className='android:flex-col gap-0 basis-1/3 grow'>
                                <Text>Preferensi </Text>
                                <Text>DASS-21</Text>
                            </TabsTrigger>

                            <TabsTrigger value="profile" className='android:flex-col gap-0 basis-1/3 grow'>
                                <Text>Profil & </Text>
                                <Text>Pengaruh</Text>
                            </TabsTrigger>
                            <TabsTrigger value="DASS-42" className='android:flex-col gap-0 basis-1/3 grow'>
                                <Text>Ruleset </Text>
                                <Text>DASS-42</Text>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="preference">
                            <PreferenceModule />
                        </TabsContent>
                        <TabsContent value="profile">
                            <ProfileInfluenceModule />
                        </TabsContent>
                        <TabsContent value="feedback">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Feedback</CardTitle>
                                    <CardDescription>
                                        Share your thoughts with us. Click submit when you’re ready.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="gap-6">
                                    <View className="gap-3">
                                        {/* <Text htmlFor="tabs-demo-name">Name</Text> */}
                                        <Input id="tabs-demo-name" defaultValue="Michael Scott" />
                                    </View>
                                    <View className="gap-3">
                                        {/* {/* <Text htmlFor="tabs-demo-message">Message</Text> */}
                                        <Input id="tabs-demo-message" defaultValue="Where are the turtles?!" />
                                    </View>
                                </CardContent>
                                <CardFooter>
                                    <Button>
                                        <Text>Submit feedback</Text>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="survey">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Survey</CardTitle>
                                    <CardDescription>
                                        Answer a few quick questions to help improve the demo.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="gap-6">
                                    <View className="gap-3">
                                        {/* {/* <Text htmlFor="tabs-demo-job-title">Job Title</Text> */}
                                        <Input id="tabs-demo-job-title" defaultValue="Regional Manager" />
                                    </View>
                                    <View className="gap-3">
                                        {/* {/* <Text htmlFor="tabs-demo-favorite">Favorite feature</Text> */}
                                        <Input id="tabs-demo-favorite" defaultValue="CLI" />
                                    </View>
                                </CardContent>
                                <CardFooter>
                                    <Button>
                                        <Text>Submit survey</Text>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </View>
                {/* Tab 1: Ruleset Module */}


                {/* Tab 2: Preference Module */}
                {/* <TabsContent value="preference" className="space-y-4">
                        <PreferenceModule />
                    </TabsContent> */}

                {/* Tab 3: Profile & Influence Module */}
                {/* <TabsContent value="profile" className="space-y-4">
                        <ProfileInfluenceModule />
                    </TabsContent> */}
            </View >
        </ScrollView>
    );
}

const THEME_ICONS = {
    light: SunIcon,
    dark: MoonStarIcon,
};

const TitlePage = () => {
    const [expertEmail, setExpertEmail] = React.useState("Ambababa")

    return (
        <View>
            <Text className="text-2xl font-bold text-foreground">Dashboard Pakar</Text>
            <Text className="text-sm text-muted-foreground">{expertEmail}</Text>
        </View>
    )
}

function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    const handleLogout = () => {

    }

    return (
        <View className='flex flex-row justify-center items-center web:mr-10'>
            <View className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Button variant="outline" size="sm" onPress={handleLogout} className="gap-2 bg-transparent">
                    <Icon as={LogOut} className="w-4 h-4" />
                    <Text>Logout</Text>
                </Button>
            </View>
        </View>
    );
}
import { Link, Tabs, Stack } from "expo-router";
import { Button, useTheme } from "tamagui";
import { Atom, AudioWaveform, Film } from "@tamagui/lucide-icons";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen name="FilmDashboard" />
      <Stack.Screen name="ScenesDashboard" />
      <Stack.Screen name="CharactersDashboard" />
    </Stack>
  );
}

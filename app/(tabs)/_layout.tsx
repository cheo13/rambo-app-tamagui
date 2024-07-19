import { Stack } from "expo-router";

export default function TabLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="FilmDashboard"
        options={{ title: "Films Dashboard", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="ScenesDashboard"
        options={{ title: "Scenes Dashboard" }}
      />
      <Stack.Screen
        name="CharactersDashboard"
        options={{ title: "Characters Dashboard" }}
      />
    </Stack>
  );
}

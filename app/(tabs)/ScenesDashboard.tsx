import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Modal, TouchableOpacity } from "react-native";
import { YStack, Button, Spinner } from "tamagui";
import { Pencil, Trash, Plus } from "@tamagui/lucide-icons";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Film, Scene } from "interfaces/models";
import EditSceneModal from "../../components/EditScene";
import AddSceneModal from "../../components/AddScene";
import { RootStackParamList } from "app/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import api from "services/api";

type ScenesDashboardRouteProp = RouteProp<
  RootStackParamList,
  "ScenesDashboard"
>;
type ScenesDashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ScenesDashboard"
>;

const ScenesDashboard = () => {
  const route = useRoute<ScenesDashboardRouteProp>();
  const navigation = useNavigation<ScenesDashboardNavigationProp>();
  const { filmId } = route.params;
  const [loading, setLoading] = useState(true);

  const [film, setFilm] = useState<Film | null>(null);
  const [scenes, setScenes] = useState<Scene[]>([]);

  const [editingScene, setEditingScene] = useState<Scene | null>(null);
  const [addingScene, setAddingScene] = useState(false);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await api.get<Film>(`/films/${filmId}`);
        setFilm(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilm();
  }, [filmId]);

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const response = await api.get<Scene[]>("/scene"); // Cambia el endpoint según tu backend
        setScenes(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchScenes();
  }, []);

  const saveScene = (updatedScene: Scene) => {
    setScenes(
      scenes.map((scene) =>
        scene.id === updatedScene.id ? updatedScene : scene
      )
    );
  };

  const addScene = (newScene: Scene) => {
    setScenes([...scenes, newScene]);
  };

  const deleteScene = async (id: number) => {
    try {
      await api.delete(`/scene/${id}`);
      setScenes(scenes.filter((scene) => scene.id !== id));
    } catch (error) {
      console.error("Error deleting scene:", error);
    }
  };

  if (loading) {
    return <Spinner color="$purple1" />;
  }
  return (
    <View style={{ flex: 1 }}>
      <YStack space="$4" padding="$4" style={{ flex: 1 }}>
        {film && (
          <>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
              FILM ({film.id})
            </Text>
          </>
        )}
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          SCENES
        </Text>
        <ScrollView
          contentContainerStyle={{ padding: 16 }}
          style={{ flexGrow: 1 }}
        >
          {scenes.map((scene) => (
            <TouchableOpacity
              key={scene.id}
              onPress={() =>
                navigation.navigate("CharactersDashboard", {
                  sceneId: scene.id,
                })
              }
            >
              <YStack
                space="$2"
                padding="$2"
                borderRadius="$2"
                backgroundColor="#7A0E4D"
                marginBottom={12}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
                >
                  {scene.title}
                </Text>
                <Text style={{ color: "#fff" }}>{scene.description}</Text>
                <Text style={{ color: "#fff" }}>{scene.location}</Text>
                <Text style={{ color: "#fff" }}>{scene.minutes} min</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 8,
                  }}
                >
                  <Button
                    theme="alt2"
                    icon={Pencil}
                    onPress={() => setEditingScene(scene)}
                  />
                  <Button
                    theme="alt2"
                    icon={Trash}
                    onPress={() => deleteScene(scene.id)}
                  />
                </View>
              </YStack>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button
          theme="alt2"
          icon={Plus}
          size="$4"
          position="absolute"
          bottom="$4"
          right="$4"
          onPress={() => setAddingScene(true)}
        />

        {editingScene && (
          <Modal
            transparent={true}
            visible={!!editingScene}
            onRequestClose={() => setEditingScene(null)}
          >
            <EditSceneModal
              scene={editingScene}
              onSave={saveScene}
              onClose={() => setEditingScene(null)}
            />
          </Modal>
        )}

        {addingScene && (
          <Modal
            transparent={true}
            visible={addingScene}
            onRequestClose={() => setAddingScene(false)}
          >
            <AddSceneModal
              onSave={addScene}
              onClose={() => setAddingScene(false)}
            />
          </Modal>
        )}
      </YStack>
    </View>
  );
};

export default ScenesDashboard;

// const saveScene = (updatedScene: Scene) => {
//   setScenes(
//     scenes.map((scene) =>
//       scene.id === updatedScene.id ? updatedScene : scene
//     )
//   );
//   setEditingScene(null);
// };

// const addScene = (newScene: Scene) => {
//   setScenes([...scenes, { ...newScene, id: scenes.length + 1 }]);
//   setAddingScene(false);
// };

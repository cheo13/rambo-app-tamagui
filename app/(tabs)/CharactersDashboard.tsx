import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Modal } from "react-native";
import { YStack, Button } from "tamagui";
import { Pencil, Trash, Plus } from "@tamagui/lucide-icons";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Character, Scene } from "interfaces/models";
import EditCharacterModal from "components/EditCharacter";
import AddCharacterModal from "components/AddCharacter";
import { RootStackParamList } from "app/navigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import api from "services/api";

type CharactersDashboardRouteProp = RouteProp<
  RootStackParamList,
  "CharactersDashboard"
>;
type CharactersDashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CharactersDashboard"
>;

const CharactersDashboard = () => {
  const route = useRoute<CharactersDashboardRouteProp>();
  const navigation = useNavigation<CharactersDashboardNavigationProp>();
  const { sceneId } = route.params;
  const [loading, setLoading] = useState(true);

  const [scene, setScene] = useState<Scene | null>(null);
  const [characters, setCharacters] = useState<Character[]>([
    {
      id: 1,
      name: "Character 1",
      role: "Role 1",
      actor: "Actor 1",
    },
    {
      id: 2,
      name: "Character 2",
      role: "Role 2",
      actor: "Actor 2",
    },
    {
      id: 3,
      name: "Character 3",
      role: "Role 3",
      actor: "Actor 3",
    },
    {
      id: 4,
      name: "Character 4",
      role: "Role 4",
      actor: "Actor 4",
    },
  ]);

  const [editingCharacter, setEditingCharacter] = useState<Character | null>(
    null
  );
  const [addingCharacter, setAddingCharacter] = useState(false);

  useEffect(() => {
    const fetchScene = async () => {
      const fetchedScene: Scene = {
        id: sceneId,
        title: "Scene 1",
        description: "Description 1",
        location: "Location 1",
        minutes: 5,
      };
      setScene(fetchedScene);
    };

    fetchScene();
  }, [sceneId]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await api.get<Character[]>("/characters"); // Cambia el endpoint según tu backend
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, []);
  const saveCharacter = (updatedCharacter: Character) => {
    setCharacters(
      characters.map((character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      )
    );
    setEditingCharacter(null);
  };

  const addCharacter = (newCharacter: Character) => {
    setCharacters([
      ...characters,
      { ...newCharacter, id: characters.length + 1 },
    ]);
    setAddingCharacter(false);
  };

  const deleteCharacter = (id: number) => {
    setCharacters(characters.filter((character) => character.id !== id));
  };

  return (
    <View style={{ flex: 1 }}>
      <YStack space="$4" padding="$4" style={{ flex: 1 }}>
        {scene && (
          <>
            <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
              Scene ({scene.id})
            </Text>
          </>
        )}
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
          CHARACTERS
        </Text>
        <ScrollView contentContainerStyle={{ padding: 16, flexGrow: 1 }}>
          {characters.map((character) => (
            <YStack
              key={character.id}
              space="$2"
              padding="$2"
              borderRadius="$2"
              backgroundColor="#7A0E4D"
              marginBottom={12}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                {character.name}
              </Text>
              <Text style={{ color: "#fff" }}>{character.role}</Text>
              <Text style={{ color: "#fff" }}>{character.actor}</Text>
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
                  onPress={() => setEditingCharacter(character)}
                />
                <Button
                  theme="alt2"
                  icon={Trash}
                  onPress={() => deleteCharacter(character.id)}
                />
              </View>
            </YStack>
          ))}
        </ScrollView>
        <Button
          theme="alt2"
          icon={Plus}
          size="$4"
          position="absolute"
          bottom="$4"
          right="$4"
          onPress={() => setAddingCharacter(true)}
        />

        {editingCharacter && (
          <Modal
            transparent={true}
            visible={!!editingCharacter}
            onRequestClose={() => setEditingCharacter(null)}
          >
            <EditCharacterModal
              character={editingCharacter}
              onSave={saveCharacter}
              onClose={() => setEditingCharacter(null)}
            />
          </Modal>
        )}

        {addingCharacter && (
          <Modal
            transparent={true}
            visible={addingCharacter}
            onRequestClose={() => setAddingCharacter(false)}
          >
            <AddCharacterModal
              onSave={addCharacter}
              onClose={() => setAddingCharacter(false)}
            />
          </Modal>
        )}
      </YStack>
    </View>
  );
};

export default CharactersDashboard;

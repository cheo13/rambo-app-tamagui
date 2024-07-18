import React, { useState } from "react";
import { Text } from "react-native";
import { Character } from "interfaces/models";
import { YStack, Input, Button } from "tamagui";
import api from "services/api";

const AddCharacterModal = ({
  sceneId,
  onSave,
  onClose,
}: {
  sceneId: number;
  onSave: (character: Character) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [actor, setActor] = useState("");

  const handleSave = async () => {
    try {
      const newCharacter = {
        id: Date.now(),
        name,
        role,
        actor,
        sceneId: sceneId,
      };

      const response = await api.post("/characters", newCharacter);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding scene:", error);
    }
  };
  return (
    <YStack space="$4" padding="$4" borderRadius="$4" backgroundColor="#fff">
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
        Add Character
      </Text>
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={role} onChangeText={setRole} placeholder="Role" />
      <Input value={actor} onChangeText={setActor} placeholder="Actor" />

      <Button onPress={handleSave}>Save</Button>
      <Button onPress={onClose}>Cancel</Button>
    </YStack>
  );
};

export default AddCharacterModal;

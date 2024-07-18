import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Scene } from "interfaces/models";
import { YStack, Input, Button } from "tamagui";
import api from "services/api";

const AddSceneModal = ({
  filmId,
  onSave,
  onClose,
}: {
  filmId: number;
  onSave: (scene: Scene) => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleSave = async () => {
    try {
      const newScene = {
        id: Date.now(),
        title,
        description,
        location,
        minutes: parseInt(minutes, 10),
        filmId: filmId,
      };

      const response = await api.post("/scene", newScene);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding scene:", error);
    }
  };
  return (
    <YStack space="$4" padding="$4" borderRadius="$4" backgroundColor="#fff">
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
        Add Scene
      </Text>
      <Input value={title} onChangeText={setTitle} placeholder="Title" />
      <Input
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
      />
      <Input
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
      />
      <Input
        value={minutes}
        onChangeText={setMinutes}
        placeholder="Minutes"
        keyboardType="numeric"
      />
      <Button onPress={handleSave}>Save</Button>
      <Button onPress={onClose}>Cancel</Button>
    </YStack>
  );
};

export default AddSceneModal;

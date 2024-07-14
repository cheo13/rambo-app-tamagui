import React, { useState } from "react";
import { Scene } from "interfaces/models";
import { YStack, Button, Input, Text } from "tamagui";
import api from "services/api";

const EditSceneModal = ({
  scene,
  onSave,
  onClose,
}: {
  scene: Scene;
  onSave: (scene: Scene) => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = useState(scene.title);
  const [description, setDescription] = useState(scene.description);
  const [location, setLocation] = useState(scene.location);
  const [minutes, setMinutes] = useState(scene.minutes.toString());

  const handleSave = async () => {
    try {
      const updatedScene = {
        ...scene,
        title,
        description,
        location,
        minutes: parseInt(minutes, 10),
      };

      const response = await api.patch(`/scene/${scene.id}`, updatedScene);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating scene:", error);
    }
  };
  return (
    <YStack space="$4" padding="$4" borderRadius="$4" backgroundColor="#fff">
      <Text>Edit Scene</Text>
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

export default EditSceneModal;

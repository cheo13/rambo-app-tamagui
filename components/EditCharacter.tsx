import React, { useState } from "react";
import { Character } from "interfaces/models";
import { YStack, Button, Input, Text } from "tamagui";
import api from "services/api";

const EditCharacterModal = ({
  character,
  onSave,
  onClose,
}: {
  character: Character;
  onSave: (character: Character) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState(character.name);
  const [role, setRole] = useState(character.role);
  const [actor, setActor] = useState(character.actor);

  const handleSave = async () => {
    try {
      const updatedCharacter = {
        ...character,
        name,
        role,
        actor,
      };

      const response = await api.patch(
        `/characters/${character.id}`,
        updatedCharacter
      );
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating scene:", error);
    }
  };

  return (
    <YStack space="$4" padding="$4" borderRadius="$4" backgroundColor="#fff">
      <Text>Edit Character</Text>
      <Input value={name} onChangeText={setName} placeholder="Title" />
      <Input value={role} onChangeText={setRole} placeholder="Description" />
      <Input value={actor} onChangeText={setActor} placeholder="Location" />

      <Button onPress={handleSave}>Save</Button>
      <Button onPress={onClose}>Cancel</Button>
    </YStack>
  );
};

export default EditCharacterModal;

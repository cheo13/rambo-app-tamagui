import React, { useState } from "react";
import { Text } from "react-native";
import { Character } from "interfaces/models";
import { YStack, Input, Button } from "tamagui";

const AddCharacterModal = ({
  onSave,
  onClose,
}: {
  onSave: (character: Character) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [actor, setActor] = useState("");

  return (
    <YStack space="$4" padding="$4" borderRadius="$4" backgroundColor="#fff">
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
        Add Character
      </Text>
      <Input value={name} onChangeText={setName} placeholder="Name" />
      <Input value={role} onChangeText={setRole} placeholder="Role" />
      <Input value={actor} onChangeText={setActor} placeholder="Actor" />

      <Button
        onPress={() =>
          onSave({
            id: Date.now(),
            name,
            role,
            actor,
          })
        }
      >
        Save
      </Button>
      <Button onPress={onClose}>Cancel</Button>
    </YStack>
  );
};

export default AddCharacterModal;

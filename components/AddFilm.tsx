import { Film } from "interfaces/models";
import React from "react";
import api from "services/api";
import { YStack, Button, Input, Text } from "tamagui";

const AddFilmModal = ({
  onSave,
  onClose,
}: {
  onSave: (film: Film) => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = React.useState("");
  const [director, setDirector] = React.useState("");
  const [releaseDate, setReleaseDate] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const [languages, setLanguages] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [mainCharacter, setMainCharacter] = React.useState("");

  const handleSave = async () => {
    try {
      const newFilm = {
        id: Date.now(),
        title,
        director,
        releaseDate,
        duration,
        languages,
        genre,
        imageUrl,
        mainCharacter,
      };

      const response = await api.post("/films", newFilm);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding film:", error);
    }
  };

  return (
    <YStack space="$3" padding="$4" borderRadius="$4" backgroundColor="#fff">
      <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
        Add Film
      </Text>
      <Input placeholder="Title" value={title} onChangeText={setTitle} />
      <Input
        placeholder="Director"
        value={director}
        onChangeText={setDirector}
      />
      <Input
        placeholder="Release Date"
        value={releaseDate}
        onChangeText={setReleaseDate}
      />
      <Input
        placeholder="Duration"
        value={String(duration)}
        onChangeText={(text) => setDuration(Number(text))}
      />
      <Input
        placeholder="Languages"
        value={languages}
        onChangeText={setLanguages}
      />
      <Input placeholder="Genre" value={genre} onChangeText={setGenre} />
      <Input
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <Input
        placeholder="Main Character"
        value={mainCharacter}
        onChangeText={setMainCharacter}
      />
      <Button onPress={handleSave}>Save</Button>
      <Button onPress={onClose}>Cancel</Button>
    </YStack>
  );
};

export default AddFilmModal;

import { Film } from "interfaces/models";
import React from "react";
import api from "services/api";
import { YStack, Button, Input, Text } from "tamagui";

const EditFilmModal = ({
  film,
  onSave,
  onClose,
}: {
  film: Film;
  onSave: (film: Film) => void;
  onClose: () => void;
}) => {
  const [title, setTitle] = React.useState(film.title);
  const [director, setDirector] = React.useState(film.director);
  const [releaseDate, setReleaseDate] = React.useState(film.releaseDate);
  const [duration, setDuration] = React.useState(film.duration);
  const [languages, setLanguages] = React.useState(film.languages);
  const [genre, setGenre] = React.useState(film.genre);
  const [imageUrl, setImageUrl] = React.useState(film.imageUrl || "");
  const [mainCharacter, setMainCharacter] = React.useState(film.mainCharacter);
  const handleSave = async () => {
    try {
      const updatedFilm = {
        ...film,
        title,
        director,
        releaseDate,
        duration,
        languages,
        genre,
        imageUrl,
        mainCharacter,
      };

      const response = await api.patch(`/films/${film.id}`, updatedFilm);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating film:", error);
    }
  };

  return (
    <YStack space="$4" padding="$4" borderRadius="$4" backgroundColor="#fff">
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Edit Film</Text>
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

export default EditFilmModal;

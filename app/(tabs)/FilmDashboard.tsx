import React, { useEffect, useState } from "react";
import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import { YStack, Button, Spinner } from "tamagui";
import { Pencil, Trash, Plus } from "@tamagui/lucide-icons";
import EditFilmModal from "components/EditFilm";
import AddFilmModal from "components/AddFilm";
import { Film } from "interfaces/models";
import { useNavigation } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "app/navigationTypes";
import api from "services/api";

type FilmDashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ScenesDashboard"
>;

const FilmDashboard = () => {
  const navigation = useNavigation<FilmDashboardNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [editingFilm, setEditingFilm] = React.useState<Film | null>(null);
  const [addingFilm, setAddingFilm] = React.useState(false);
  const [films, setFilms] = React.useState<Film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await api.get<Film[]>("/films"); // Cambia el endpoint según tu backend
        setFilms(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  const saveFilm = (updatedFilm: Film) => {
    setFilms(
      films.map((film) => (film.id === updatedFilm.id ? updatedFilm : film))
    );
  };

  const addFilm = (newFilm: Film) => {
    setFilms([...films, newFilm]);
  };

  const deleteFilm = async (id: number) => {
    try {
      await api.delete(`/films/${id}`);
      setFilms(films.filter((film) => film.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Spinner color="$purple1" />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
        DASHBOARD
      </Text>
      <Text style={{ fontSize: 18, color: "#fff" }}>FILMS</Text>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {films.map((film) => (
          <TouchableOpacity
            key={film.id}
            onPress={() =>
              navigation.navigate("ScenesDashboard", { filmId: film.id })
            }
          >
            <YStack
              space="$2"
              padding="$2"
              borderRadius="$2"
              backgroundColor="#7A0E4D"
              marginBottom={12}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
                {film.title}
              </Text>
              <Text style={{ color: "#fff" }}>{film.director}</Text>
              <Text style={{ color: "#fff" }}>{film.releaseDate}</Text>
              <Text style={{ color: "#fff" }}>{film.duration} min</Text>
              <Text style={{ color: "#fff" }}>{film.languages}</Text>
              <Text style={{ color: "#fff" }}>{film.genre}</Text>
              <Text style={{ color: "#fff" }}>{film.mainCharacter}</Text>
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
                  onPress={() => setEditingFilm(film)}
                />
                <Button
                  theme="alt2"
                  icon={Trash}
                  onPress={() => deleteFilm(film.id)}
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
        onPress={() => setAddingFilm(true)}
      />

      {editingFilm && (
        <Modal
          transparent={true}
          visible={!!editingFilm}
          onRequestClose={() => setEditingFilm(null)}
        >
          <EditFilmModal
            film={editingFilm}
            onSave={saveFilm}
            onClose={() => setEditingFilm(null)}
          />
        </Modal>
      )}

      {addingFilm && (
        <Modal
          transparent={true}
          visible={addingFilm}
          onRequestClose={() => setAddingFilm(false)}
        >
          <AddFilmModal onSave={addFilm} onClose={() => setAddingFilm(false)} />
        </Modal>
      )}
    </View>
  );
};

export default FilmDashboard;

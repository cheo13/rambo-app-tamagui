export interface Film {
  id: number;
  title: string;
  director: string;
  releaseDate: string;
  duration: number;
  languages: string;
  genre: string;
  imageUrl?: string;
  mainCharacter: string;
}

export interface Scene {
  id: number;
  title: string;
  description: string;
  location: string;
  minutes: number;
}

export interface Character {
  id: number;
  name: string;
  role: string;
  actor: string;
}

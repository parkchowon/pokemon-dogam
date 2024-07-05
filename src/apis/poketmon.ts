import axios from "axios";

export const fetchPokemon = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  return response.json();
};

export const fetchPokemons = async (id: string) => {
  const response = await axios.get(
    `http://localhost:3000/api/pokemons?page=${id}`
  );
  const data = await response.data.data;
  return data;
};

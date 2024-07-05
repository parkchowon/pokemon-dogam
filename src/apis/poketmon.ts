import axios from "axios";

export const fetchPokemon = async (id: string) => {
  const response = await fetch(
    `https://pokemon-dogam.vercel.app/api/pokemons/${id}`
  );
  return response.json();
};

export const fetchPokemons = async (id: string) => {
  const response = await axios.get(
    `https://pokemon-dogam.vercel.app/api/pokemons?page=${id}`
  );
  const data = await response.data.data;
  return data;
};

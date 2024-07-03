export const fetchPokemon = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/pokemons/${id}`);
  return response.json();
};

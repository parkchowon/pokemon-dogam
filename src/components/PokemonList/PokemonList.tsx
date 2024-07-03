"use client";
import { Pokemon } from "@/schemas/pokemon.schema";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PokemonCard from "../PokemonCard";

function PokemonList() {
  const { data: pokemons, isPending } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/pokemons");
      const data = await response.data;
      return data;
    },
  });

  if (isPending) return <p>Loading...</p>;
  return (
    <ul className="grid gap-x-4 gap-y-8 grid-cols-5 w-fit place-content-center mt-12">
      {pokemons.map((pokemon: Pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
      })}
    </ul>
  );
}

export default PokemonList;

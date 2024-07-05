"use client";
import { fetchPokemons } from "@/apis/poketmon";
import { Pokemon } from "@/schemas/pokemon.schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import PokemonCard from "../PokemonCard";

function PokemonList() {
  const [page, setPage] = useState<number>(1);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  const {
    data: pokemons,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page.toString()),
  });

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  });

  const handleScrollEvent = () => {
    if (isPending) return false;
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("scroll down");
      setPage((prevPage) => prevPage + 1);
      refetch();
    }
  };

  useEffect(() => {
    if (pokemons) return setPokemonList([...pokemonList, ...pokemons]);
  }, [pokemons]);

  return (
    <div className="flex flex-col">
      <ul className="grid gap-x-4 gap-y-8 mobile:grid-cols-2 md:grid-cols-5 w-fit place-content-center mt-12 mb-12">
        {pokemonList.map((pokemon: Pokemon) => {
          return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </ul>
      {isPending ? (
        <div className="flex items-center justify-center w-full h-[200px]">
          <BeatLoader color="red" />
        </div>
      ) : (
        false
      )}
    </div>
  );
}

export default PokemonList;

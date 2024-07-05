import { Pokemon } from "@/schemas/pokemon.schema";
import axios, { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

const TOTAL_POKEMON = 1000;
const PAGE_SIZE = 30;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  console.log(page);
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const allPokemonPromises = Array.from({ length: PAGE_SIZE }, (_, index) => {
      const id = index + 1 + offset;
      if (id > TOTAL_POKEMON) return null;

      return Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);
    }).filter(Boolean) as Array<
      Promise<[AxiosResponse<Pokemon>, AxiosResponse<any>]>
    >; //null 값을 없애는 것

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse], _) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    const totalPages = Math.ceil(TOTAL_POKEMON / PAGE_SIZE);
    const hasNextPage = page < totalPages;

    return NextResponse.json({
      data: allPokemonData,
      totalPages,
      hasNextPage,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};

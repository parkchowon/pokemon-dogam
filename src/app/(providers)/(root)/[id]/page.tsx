import { fetchPokemon } from "@/apis/poketmon";
import { Pokemon } from "@/schemas/pokemon.schema";
import Image from "next/image";

async function DetailPage({ params }: { params: { id: string } }) {
  const pokemonData: Pokemon = await fetchPokemon(params.id);

  return (
    <div>
      <Image
        src={pokemonData.sprites.front_default}
        width={200}
        height={200}
        alt={`${pokemonData.name}의 사진`}
      />
      <p>No.{pokemonData.id}</p>
      <p>{pokemonData.korean_name}</p>
      <p>{pokemonData.weight}</p>
    </div>
  );
}

export default DetailPage;

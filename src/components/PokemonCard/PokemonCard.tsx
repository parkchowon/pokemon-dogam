import { Pokemon } from "@/schemas/pokemon.schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Chip from "../Chip";

interface PokemonProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonProps) {
  // if (pokemon.id === 1) {
  //   console.log(pokemon);
  // }

  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${pokemon.id}`);
  };

  return (
    <li
      onClick={handleCardClick}
      className="flex flex-col w-fit items-center cursor-pointer"
    >
      <Image
        src={pokemon.sprites.front_default}
        width={200}
        height={200}
        alt={`${pokemon.korean_name}의 외형 사진입니다.`}
        className="rounded-md border bg-white hover:shadow-lg hover:-translate-y-1 transition"
      />
      <div className="w-full text-left px-2">
        <p className="text-[14px] text-gray-400 pt-1">No.{pokemon.id}</p>
        <h6 className="text-lg font-semibold py-1">{pokemon.korean_name}</h6>
        <div className="flex flex-row">
          {pokemon.types.map((type, index) => {
            return (
              <Chip
                key={index}
                intent={type.type.name}
                label={type.type.name}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
}

export default PokemonCard;

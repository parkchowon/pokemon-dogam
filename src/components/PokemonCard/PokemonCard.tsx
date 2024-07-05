import { Pokemon } from "@/schemas/pokemon.schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Chip from "../Chip";

const validIntents = [
  "default",
  "grass",
  "poison",
  "fire",
  "water",
  "bug",
  "flying",
  "normal",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ice",
  "dragon",
  "steel",
  "ghost",
] as const;

type ValidIntent = (typeof validIntents)[number];

// 유효한 intent 값인지 검사하는 함수
function isValidIntent(intent: any): intent is ValidIntent {
  return validIntents.includes(intent);
}

interface PokemonProps {
  pokemon: Pokemon;
}

function PokemonCard({ pokemon }: PokemonProps) {
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
            const intent = type.type.name;
            const validIntent = isValidIntent(intent) ? intent : "default";
            return (
              <Chip key={index} intent={validIntent} label={type.type.name} />
            );
          })}
        </div>
      </div>
    </li>
  );
}

export default PokemonCard;

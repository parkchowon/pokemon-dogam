import { fetchPokemon } from "@/apis/poketmon";
import Chip from "@/components/Chip";
import { Pokemon } from "@/schemas/pokemon.schema";
import Image from "next/image";

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

async function DetailPage({ params }: { params: { id: string } }) {
  const pokemonData: Pokemon = await fetchPokemon(params.id);

  return (
    <div className="flex flex-col items-center pt-7 w-full h-fit min-h-dvh bg-gray-100">
      {/**포켓몬 정보 div */}
      <div className="flex md:flex-row mobile:flex-col mobile:w-[250px] md:w-[500px] lg:w-[700px] h-fit justify-center items-center bg-white mobile:pb-5">
        <Image
          src={pokemonData.sprites.front_default}
          width={300}
          height={300}
          alt={`${pokemonData.name}의 사진`}
        />
        <div className="flex flex-col w-[200px] md:items-start mobile:items-center">
          <p className="text-sm text-gray-400">No.{pokemonData.id}</p>
          <p className="text-2xl font-semibold">{pokemonData.korean_name}</p>
          <p className="text-sm text-gray-400 mt-3 mb-1">타입</p>
          <div className="flex">
            {pokemonData.types.map((type, index) => {
              const intent = type.type.name;
              const validIntent = isValidIntent(intent) ? intent : "default";
              return (
                <Chip
                  key={index}
                  intent={validIntent}
                  label={type.type.korean_name}
                />
              );
            })}
          </div>
          <p className="text-sm text-gray-400 mt-3 mb-1">특성</p>
          <div className="flex">
            {pokemonData.abilities.map((ability, index) => {
              return (
                <Chip
                  key={index}
                  intent="default"
                  label={ability.ability.korean_name}
                />
              );
            })}
          </div>
          <div className="flex mt-3">
            <div className="mr-3">
              <p className="text-sm text-gray-400">키</p>
              <p>{pokemonData.height}0cm</p>
            </div>
            <div className="ml-2">
              <p className="text-sm text-gray-400">몸무게</p>
              <p>{pokemonData.weight}00g</p>
            </div>
          </div>
        </div>
      </div>
      {/**스킬 목록 div */}
      <div className="flex flex-col bg-white mobile:w-[250px] md:w-[500px] lg:w-[700px] h-fit my-7 rounded-md pb-5 px-7">
        <p className="text-lg font-semibold text-center py-6">스킬 목록</p>
        <ul className="text-center">
          {pokemonData.moves.map((move, index) => {
            return (
              <li
                key={index}
                className="mobile:text-[11px] sm:text-[13px] text-center w-fit h-fit py-1 px-3 my-1 border rounded-full inline-block [&+&]:mx-1"
              >
                {move.move.korean_name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DetailPage;

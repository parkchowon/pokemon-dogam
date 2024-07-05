import PokemonBall from "@/assets/images/pokemon_logo.svg";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex item-center justify-center py-5 font-extrabold text-2xl shadow-lg shadow-gray-100">
      <Link href={"/"} className="flex flex-row gap-x-2">
        <Image src={PokemonBall} alt="pokemon ball" width={30} />
        <p>포켓몬 도감</p>
      </Link>
    </header>
  );
}

export default Header;

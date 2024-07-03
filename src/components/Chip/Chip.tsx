import { VariantProps, cva } from "class-variance-authority";

const chipVariants = cva(
  "flex items-center w-fit h-[20px] px-3 [&+&]:mx-2 text-[13px] rounded-full",
  {
    variants: {
      intent: {
        default: "text-black",
        grass: "bg-green-500 text-white ",
        poison: "bg-purple-700 text-white ",
        fire: "bg-red-500 text-white",
        water: "bg-blue-500 text-white",
        bug: "bg-bug text-white",
        flying: "bg-sky-200 text-white",
        normal: "bg-zinc-300 text-white",
        electric: "bg-yellow-400 text-white",
        ground: "bg-yellow-700 text-white",
        fairy: "bg-pink-300 text-white",
        fighting: "bg-orange-400 text-white",
        psychic: "bg-pink-400 text-white",
        rock: "bg-zinc-500 text-white",
        ice: "bg-sky-400 text-white",
        dragon: "bg-indigo-500 text-white",
        steel: "bg-slate-400 text-white",
        ghost: "bg-purple-900 text-white",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

type ChipVariantsType = VariantProps<typeof chipVariants>;

type ChipProps = {
  label: string;
} & ChipVariantsType;

function Chip({ label, intent }: ChipProps) {
  return <div className={chipVariants({ intent })}>{label}</div>;
}

export default Chip;

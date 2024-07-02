"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function RootPage() {
  const { data: pokemons, isPending } = useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/pokemons");
      const data = await response.data;
      return data;
    },
  });

  if (isPending) return <p>Loading...</p>;
  return <div>page</div>;
}

export default RootPage;

import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  url: string;
}

const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [sortByName, setSortByName] = useState<string>(""); //changed
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon.");
        }
        const data = await response.json();
        // console.log(data);
        console.log("hehe");

        let filteredResults: Pokemon[];
        filteredResults = data.results;
        console.log(filteredResults);
        if (sortByName && sortByName === "Ascending") {
          filteredResults = filteredResults.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          console.log("asc");
        } else if (sortByName && sortByName === "Descending") {
          filteredResults = filteredResults.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          console.log("desc");
        }
        setPokemonList(filteredResults);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [sortByName]);

  return { pokemonList, loading, error, sortByName, setSortByName };
};

export default usePokemonList;

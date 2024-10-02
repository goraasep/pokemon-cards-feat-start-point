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
  const [searchByName, setSearchByName] = useState<string>("");
  const MAX_FETCH_DATA = 10000;
  const LOCAL_STORAGE_KEY = "pokemonData";
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        let filteredResults: Pokemon[];
        const storedPokemonData = localStorage.getItem(LOCAL_STORAGE_KEY);
        // const storedPokemonData = "";
        if (
          storedPokemonData &&
          storedPokemonData.length > 0 &&
          !searchByName
        ) {
          const parsedData: Pokemon[] = JSON.parse(storedPokemonData);
          filteredResults = parsedData;
          console.log("stored");
        } else {
          console.log("not stored");
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${
              searchByName ? MAX_FETCH_DATA : 50
            }`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Pokémon.");
          }
          const data = (await response.json()) as { results: Pokemon[] };
          filteredResults = data.results;
          if (!searchByName) {
            localStorage.setItem(
              LOCAL_STORAGE_KEY,
              JSON.stringify(filteredResults)
            );
          }
        }

        if (searchByName) {
          const regex = new RegExp(searchByName, "i"); // Case-insensitive regex
          filteredResults = filteredResults.filter((pokemon) =>
            regex.test(pokemon.name)
          );
        }
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
  }, [sortByName, searchByName]);

  return {
    pokemonList,
    loading,
    error,
    sortByName,
    setSortByName,
    setSearchByName,
  };
};

export default usePokemonList;

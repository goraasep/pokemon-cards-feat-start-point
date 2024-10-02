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
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${
            searchByName ? MAX_FETCH_DATA : 20
          }`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon.");
        }
        const data = await response.json();
        // console.log(data);
        // console.log("hehe");

        let filteredResults: Pokemon[];
        filteredResults = data.results;
        // console.log(filteredResults);
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

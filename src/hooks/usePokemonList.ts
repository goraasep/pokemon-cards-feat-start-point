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
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const MAX_FETCH_DATA = 10000;
  const LOCAL_POKEMON_DATA = "pokemonData";

  // setPage(parsedPage);
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        let filteredResults: Pokemon[];
        let testCount = 0;
        let pagination = (page - 1) * 20;
        const storedPokemonData = localStorage.getItem(LOCAL_POKEMON_DATA);
        const storedCount = localStorage.getItem("pokemonCount");
        const storedPage = localStorage.getItem("pokemonPage");
        const parsedPage: number = JSON.parse(storedPage as string);
        // setPage(parsedPage);
        // const storedPokemonData = "";
        if (
          storedPokemonData &&
          storedPokemonData.length > 0 &&
          !searchByName &&
          page === parsedPage
        ) {
          const parsedData: Pokemon[] = JSON.parse(storedPokemonData);
          const parsedCount: number = JSON.parse(storedCount as string);
          setPage(parsedPage);
          filteredResults = parsedData;
          testCount = parsedCount;
          console.log("stored");
        } else {
          console.log("not stored");
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${
              searchByName ? 0 : pagination
            }&limit=${searchByName ? MAX_FETCH_DATA : 20}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch Pokémon.");
          }
          const data = (await response.json()) as {
            results: Pokemon[];
            count: number;
          };
          console.log(data.count);
          filteredResults = data.results;
          testCount = data.count;
          console.log(testCount);

          if (!searchByName) {
            localStorage.setItem(
              LOCAL_POKEMON_DATA,
              JSON.stringify(filteredResults)
            );
            localStorage.setItem("pokemonPage", page.toString());
            localStorage.setItem("pokemonCount", testCount.toString());
          }
          // setPage(1);
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
        setCount(testCount);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, [sortByName, searchByName, page]);

  return {
    pokemonList,
    loading,
    error,
    sortByName,
    setSortByName,
    setSearchByName,
    count,
    page,
    setPage,
  };
};

export default usePokemonList;

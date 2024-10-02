import { createContext, FC, ReactNode, useEffect, useState } from "react";
import usePokemonList from "../hooks/usePokemonList";
import { MAX_POKEMON_PER_PAGE } from "../constant/pokemonConstant";
interface Pokemon {
  name: string;
  url: string;
}
interface PokemonProps {
  sortType: string;
  searchQuery: string;
  isSingleGrid: boolean;
  handleSortType: (type: string) => void;
  handleSearchQuery: (value: string) => void;
  handleSingleGrid: () => void;
  handleDoubleGrid: () => void;
  page: number;
  handlePage: (page: number) => void;
  pokemonList: Pokemon[];
  loading: boolean;
  error: any;
  count: number;
}
const ctxDefaultValues: PokemonProps = {
  sortType: "",
  searchQuery: "",
  isSingleGrid: true,
  handleSortType: () => {},
  handleSearchQuery: () => {},
  handleSingleGrid: () => {},
  handleDoubleGrid: () => {},
  page: 1,
  handlePage: () => {},
  pokemonList: [],
  loading: false,
  error: null,
  count: 0,
};
export const PokemonContext = createContext<PokemonProps>(ctxDefaultValues);
const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sortType, setSortType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSingleGrid, setIsSingleGrid] = useState<boolean>(true);
  // const [page, setPage] = useState<number>(1);
  const {
    pokemonList,
    loading,
    error,
    setSortByName,
    setSearchByName,
    count,
    page,
    setPage,
  } = usePokemonList();
  const handleSortType = (type: string) => {
    setSortType(type);
    setSortByName(type);
  };

  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
    setSearchByName(value);
  };

  const handleSingleGrid = () => {
    setIsSingleGrid(true);
  };

  const handleDoubleGrid = () => {
    setIsSingleGrid(false);
  };

  const handlePage = (page: number) => {
    if (
      page >= 1 &&
      page * MAX_POKEMON_PER_PAGE <= count + MAX_POKEMON_PER_PAGE
    ) {
      setPage(page);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  return (
    <PokemonContext.Provider
      value={{
        sortType: sortType,
        searchQuery: searchQuery,
        isSingleGrid: isSingleGrid,
        handleSortType: handleSortType,
        handleSearchQuery: handleSearchQuery,
        handleSingleGrid: handleSingleGrid,
        handleDoubleGrid: handleDoubleGrid,
        page: page,
        handlePage: handlePage,
        pokemonList: pokemonList,
        loading: loading,
        error: error,
        count: count,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;

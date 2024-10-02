import { createContext, FC, ReactNode, useState } from "react";
import usePokemonList from "../hooks/usePokemonList";
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
  pokemonList: Pokemon[];
  loading: boolean;
  error: any;
}
const ctxDefaultValues: PokemonProps = {
  sortType: "",
  searchQuery: "",
  isSingleGrid: true,
  handleSortType: () => {},
  handleSearchQuery: () => {},
  handleSingleGrid: () => {},
  handleDoubleGrid: () => {},
  pokemonList: [],
  loading: false,
  error: null,
};
export const PokemonContext = createContext<PokemonProps>(ctxDefaultValues);
const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [sortType, setSortType] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSingleGrid, setIsSingleGrid] = useState<boolean>(true);
  const { pokemonList, loading, error, setSortByName, setSearchByName } =
    usePokemonList();
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
        pokemonList: pokemonList,
        loading: loading,
        error: error,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;

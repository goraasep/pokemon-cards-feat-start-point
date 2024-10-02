import { FC, useState } from "react";

import SortingAndGrid from "../components/SortingAndGrid";
import usePokemonList from "../hooks/usePokemonList";
import Card from "../components/Card";
import Header from "../components/Header";
interface Pokemon {
  name: string;
  url: string;
}
const Home: FC = () => {
  const [isSingleGrid, setIsSingleGrid] = useState(true);
  const [dropdownType, setDropdownType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const { pokemonList, loading, error, setSortByName, setSearchByName } =
    usePokemonList();
  if (loading || !pokemonList) return <div>Loading...</div>;
  if (error) return <div>Something is wrong</div>;
  //   console.log(pokemonList);
  const handleSingleGrid = () => {
    setIsSingleGrid(true);
  };

  const handleDoubleGrid = () => {
    setIsSingleGrid(false);
  };
  const handleDropdownType = (type: string) => {
    setSortByName(type);
    setDropdownType(type);
  };

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
    setSearchByName(value);
  };
  return (
    <div>
      <Header handleSearchValue={handleSearchValue} isHome={true} />

      <SortingAndGrid
        isSingleGrid={isSingleGrid}
        dropdownType={dropdownType}
        handleSingleGrid={handleSingleGrid}
        handleDoubleGrid={handleDoubleGrid}
        handleDropdownType={handleDropdownType}
      />
      <div className="px-5 py-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div
            className={`px-5 py-4 grid ${
              isSingleGrid ? "grid-cols-1" : "grid-cols-2"
            } gap-5`}
          >
            {pokemonList.map((each, index) => (
              <Card key={index} name={each.name} isSingleGrid={isSingleGrid} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

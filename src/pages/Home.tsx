import { FC, useState } from "react";
import pokemon from "../assets/pokemon.png";
import search from "../assets/search.svg";
import SortingAndGrid from "../components/SortingAndGrid";
import usePokemonList from "../hooks/usePokemonList";
import Card from "../components/Card";
interface Pokemon {
  name: string;
  url: string;
}
const Home: FC = () => {
  const [isSingleGrid, setIsSingleGrid] = useState(true);
  const [dropdownType, setDropdownType] = useState<string>("");
  const { pokemonList, loading, error, setSortByName } = usePokemonList();
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
  return (
    <div>
      <div className="h-12 flex justify-between items-center px-5 border-b custom-border-color border-solid py-[6px]">
        <img className="h-[35px]" src={pokemon} alt="" />
        <img className="w-5" src={search} alt="" />
      </div>

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
            className={`px-5 py-4 grid grid-cols-${isSingleGrid ? 1 : 2} gap-5`}
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

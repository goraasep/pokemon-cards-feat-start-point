import { FC, useContext } from "react";

import SortingAndGrid from "../components/SortingAndGrid";
import Card from "../components/Card";
import Header from "../components/Header";
import { PokemonContext } from "../context/PokemonContext";
const Home: FC = () => {
  const { isSingleGrid, pokemonList, loading, error } =
    useContext(PokemonContext);

  if (loading || !pokemonList) return <div>Loading...</div>;
  if (error) return <div>Something is wrong</div>;

  return (
    <div>
      <Header isHome={true} />

      <SortingAndGrid isSingleGrid={isSingleGrid} />
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

import { FC, useContext } from "react";
// import { MAX_POKEMON_PER_PAGE } from "../constant/pokemonConstant";
import SortingAndGrid from "../components/SortingAndGrid";
import Card from "../components/Card";
import Header from "../components/Header";
import { PokemonContext } from "../context/PokemonContext";
const Home: FC = () => {
  const { isSingleGrid, pokemonList, loading, error, page, handlePage, count } =
    useContext(PokemonContext);

  if (loading || !pokemonList) return <div>Loading...</div>;
  if (error) return <div>Something is wrong</div>;

  return (
    <div>
      <Header isHome={true} />
      <SortingAndGrid isSingleGrid={isSingleGrid} />
      <div className="px-5 pt-2 flex justify-between text-custom-gray">
        <div>
          Page {page} of {Math.floor(count / 20 + 1)}
        </div>
        <div className="flex gap-2 justify-center">
          <div
            onClick={() => {
              handlePage(page - 1);
            }}
          >
            {"<"}
          </div>
          <div
            onClick={() => {
              handlePage(page + 1);
            }}
          >
            {">"}
          </div>
        </div>
      </div>
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

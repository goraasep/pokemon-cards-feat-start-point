import { FC } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import usePokemonDetails from "../hooks/usePokemonDetail";
const Pokemon: FC = () => {
  const { name } = useParams();
  if (!name) return <div>Something is wrong</div>;
  const { pokemonDetails, loading, error } = usePokemonDetails(name);

  if (loading || !pokemonDetails) return <div>Loading...</div>;
  if (error) return <div>Something is wrong</div>;
  return (
    <>
      <Header isHome={false} />
      <div className="w-full h-full px-6 py-8">
        <div className="text-lg text-custom-gray">#{pokemonDetails.id}</div>
        <div className="mb-3">
          <img src={pokemonDetails.artworkFront} alt="pokemon image" />
        </div>
        <div className="w-full mb-1 flex items-center justify-between h-[38px]">
          <span className="text-4xl text-white font-bold leading-[30px] capitalize">
            {pokemonDetails.name}
          </span>
          <img
            src={pokemonDetails.spriteFront}
            className="object-fill"
            alt="pokemon sprites"
          />
        </div>
        <div className="rounded-2xl bg-custom-detail-card p-4 flex flex-col gap-2">
          <div className=" text-custom-gray leading-[14px]">Health</div>
          <div className="w-full rounded-full bg-custom-black-2 h-[6px]">
            <div
              style={{
                width: `${pokemonDetails.health}%`,
              }}
              className="rounded-full bg-custom-green h-full"
            ></div>
          </div>
          <div className=" items-center flex gap-2 font-bold leading-7 pb-[10px] text-white border-b-[1px] custom-border-grey">
            <div className="text-2xl ">{pokemonDetails.health}</div>
            <div className="text-base font-normal">from 100</div>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-1 basis-1/2">
              <span className="leading-[14px] text-custom-gray">Attack</span>
              <span className="text-white text-2xl font-bold">
                {pokemonDetails.attack}
              </span>
            </div>
            <div className="flex flex-col gap-1 basis-1/2">
              <span className="leading-[14px] text-custom-gray">Defense</span>
              <span className="text-white text-2xl font-bold">
                {pokemonDetails.defense}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pokemon;

import { FC } from "react";
import usePokemonDetails from "../../hooks/usePokemonDetail";
import { useNavigate } from "react-router-dom";
interface CardProps {
  name: string;
  isSingleGrid: boolean;
}

const Card: FC<CardProps> = ({ name, isSingleGrid }) => {
  const { pokemonDetails, loading, error } = usePokemonDetails(name);
  const navigate = useNavigate();

  if (loading || !pokemonDetails) return <div>Loading...</div>;
  if (error) return <div>Something is wrong</div>;
  const handleClick = () => {
    navigate(`/pokemon/${pokemonDetails.name}`);
  };
  return (
    <div onClick={handleClick} className="w-full rounded-2xl bg-custom-white">
      {isSingleGrid && (
        <div className="px-3 pt-3 flex justify-between">
          <div className="flex gap-2 ">
            {pokemonDetails.types.map((type, index) => (
              <div
                key={index}
                className="text-sm text-green-400 font-bold capitalize"
              >
                {type}
              </div>
            ))}
          </div>
          <div className="font-bold text-custom-black">
            #{pokemonDetails.id}
          </div>
        </div>
      )}

      <div className={isSingleGrid ? "mx-12" : "mx-3 pt-7"}>
        <img src={pokemonDetails.artworkFront} alt="pokemon" />
      </div>

      <div className="text-lg text-custom-black font-bold leading-[14px] mb-[15px] text-center capitalize">
        {pokemonDetails.name}
      </div>
    </div>
  );
};

export default Card;

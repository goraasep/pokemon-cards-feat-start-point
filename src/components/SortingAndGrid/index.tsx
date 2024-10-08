import single_grid from "../../assets/single_grid.svg";
import two_grid from "../../assets/two_grid.svg";
import arrow_down from "../../assets/arrow_down.svg";
import { useContext, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
interface SortingAndGridProps {
  isSingleGrid: boolean;
}

const SortingAndGrid: React.FC<SortingAndGridProps> = ({ ...props }) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const { handleSingleGrid, handleDoubleGrid, handleSortType, sortType } =
    useContext(PokemonContext);

  const handleDropdown = (type: string) => {
    handleSortType(type);
    setDropdown(false);
  };
  return (
    <div className="flex justify-between px-5 pt-4 gap-6">
      <div className="text-custom-gray flex flex-col justify-center bg-lighter-blue w-full rounded-lg overflow-hidden">
        <div
          onClick={() => setDropdown(!dropdown)}
          className="flex items-center justify-between w-full px-2"
        >
          <div>Sort by {sortType ? sortType : ""}</div>
          <img src={arrow_down} alt="" />
        </div>
        {dropdown && (
          <>
            <div
              onClick={() => handleDropdown("Ascending")}
              className="custom-dropdown cursor-pointer w-full text-center"
            >
              Ascending
            </div>
            <div
              onClick={() => handleDropdown("Descending")}
              className="custom-dropdown cursor-pointer w-full text-center"
            >
              Descending
            </div>
          </>
        )}
      </div>
      <div className="flex items-center w-[70px] h-[32px] justify-between rounded-lg overflow-hidden">
        <div
          onClick={handleSingleGrid}
          className={`flex items-center justify-center ${
            props.isSingleGrid ? "bg-lighter-blue" : "bg-darker-blue"
          } w-full h-full`}
        >
          <img src={single_grid} alt="" />
        </div>
        <div
          onClick={handleDoubleGrid}
          className={`flex items-center justify-center ${
            props.isSingleGrid ? "bg-darker-blue" : "bg-lighter-blue"
          } w-full h-full custom-border`}
        >
          <img src={two_grid} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SortingAndGrid;

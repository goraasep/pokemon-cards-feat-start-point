import { FC, useContext, useEffect, useRef, useState } from "react";
import pokemon from "../../assets/pokemon.png";
import searchImg from "../../assets/search.svg";
import { useDebouncedCallback } from "use-debounce";
import { PokemonContext } from "../../context/PokemonContext";
interface Props {
  isHome: boolean;
}
const Header: FC<Props> = ({ ...props }) => {
  const { searchQuery, handleSearchQuery } = useContext(PokemonContext);
  const [search, setSearch] = useState(searchQuery);
  const [isSearch, setIsSearch] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const debounced = useDebouncedCallback((value) => {
    setDebouncedValue(value);
  }, 500);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounced(event.target.value);
    setSearch(event.target.value);
  };

  useEffect(() => {
    handleSearchQuery(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [isSearch]);

  if (!props.isHome) {
    return (
      <div className="h-12 flex justify-start items-center px-5 border-b custom-border-color border-solid py-[6px] gap-8">
        <img className="h-[35px]" src={pokemon} alt="" />
      </div>
    );
  }
  return (
    <div className="h-12 flex justify-between items-center px-5 border-b custom-border-color border-solid py-[6px] gap-8">
      <img className="h-[35px]" src={pokemon} alt="" />
      {isSearch ? (
        <input
          ref={inputRef}
          className="w-full rounded-lg px-3 py-[6px] focus"
          placeholder="Search..."
          type="text"
          value={search}
          onChange={handleChange}
        />
      ) : (
        <img
          onClick={() => setIsSearch(!isSearch)}
          className="w-5"
          src={searchImg}
          alt=""
        />
      )}
    </div>
  );
};
export default Header;

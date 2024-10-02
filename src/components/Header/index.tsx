import { FC, useEffect, useState } from "react";
import pokemon from "../../assets/pokemon.png";
import searchImg from "../../assets/search.svg";
import { useDebouncedCallback } from "use-debounce";
interface Props {
  handleSearchValue: (value: string) => void;
}
const Header: FC<Props> = ({ ...props }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const debounced = useDebouncedCallback((value) => {
    setDebouncedValue(value);
    props.handleSearchValue(value);
  }, 500);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debounced(event.target.value);
  };
  useEffect(() => {
    console.log(debouncedValue);
  }, [debouncedValue]);
  return (
    <div className="h-12 flex justify-between items-center px-5 border-b custom-border-color border-solid py-[6px] gap-8">
      <img className="h-[35px]" src={pokemon} alt="" />
      {isSearch ? (
        <input
          className="w-full rounded-lg px-3 py-[6px]"
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

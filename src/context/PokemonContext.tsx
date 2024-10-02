import { createContext, FC, ReactNode, useState } from "react";
interface PokemonProps {
  dropdownType: string;
}
const ctxDefaultValues: PokemonProps = {
  dropdownType: "",
};
export const PokemonContext = createContext<PokemonProps>(ctxDefaultValues);
const PokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  //   const [count, handleIncrement, handleDecrement] = useCounter();
  const [dropdownType, setDropdownType] = useState<string>("");

  return (
    <PokemonContext.Provider
      value={{
        dropdownType: dropdownType,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;

import "./App.css";
// import usePokemonList from './hooks/usePokemonList'
// import usePokemonDetails from './hooks/usePokemonDetail'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
function App() {
  // Use the custom hook to fetch pokemon list
  // Example below
  // const list = usePokemonList();
  // const detail = usePokemonDetails("bulbasaur");

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/pokemon/:name" element={<Pokemon />}></Route>
      </Routes>
    </>
  );
}

export default App;

import './App.css';
import NavBar from "./components/NavBar"
import Pokedex from './components/Pokedex';
import SearchBar from './components/SearchBar';
import  { useState, useEffect } from 'react';
import { getPokemonData, getPokemons, searchPokemon } from './api';
import { FavoriteProvider } from './contexts/favoriteContext';

const localStorageKey = "favorites_pokemon";

function App() {
const [pokemons, setPokemons] = useState([]);
const [page, setPage] = useState(1);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(true);
const [favorites, setFavorites] = useState([]);
const [notFound, setNotFound] = useState(false);
const [searching, setSearching] = useState(false);

const fetchPokemons = async() => {
  try {
    setLoading(true);
    const data = await getPokemons(25, 25 * page);
    const promises = data.results.map(async(pokemon)=> {
      return await getPokemonData(pokemon.url)
    })
    const results = await Promise.all(promises);
    setPokemons(results);
    setLoading(false);
    setTotal(Math.ceil(data.count / 25));
    setNotFound(false);
  } catch (error) {}
}

const loadFavoritePokemons = () => {
  const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  setFavorites(pokemons);
}

useEffect(() => {
  loadFavoritePokemons();
}, [])

useEffect( (e) => {
  if(!searching){
    fetchPokemons()
  }

}, [page])

const updateFavoritePokemon = (name) => {
  const updated = [...favorites];
  const isFavorite = updated.indexOf(name);
if(isFavorite >= 0){
  updated.splice(isFavorite, 1);

}else {
  updated.push(name)
}
setFavorites(updated);
window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
}

const onSearch = async(pokemon) => {
  if(!pokemon) {
 return fetchPokemons();
  }
  setLoading(true);
  setNotFound(false);
  setSearching(true);
  const result = await searchPokemon(pokemon);
  if(!result) {
    setNotFound(true);
    setLoading(false);
    return;
} else{
  setPokemons([result]);
  setPage(0);
  setTotal(1);
}
setLoading(false);
setSearching(false);
  }

  return (
    <FavoriteProvider value={{
    favoritesPokemon: favorites, 
    updateFavoritePokemon: updateFavoritePokemon
    }}>
    <div>
         <NavBar/>
    <div className="App">
         <SearchBar onSearch={onSearch}/>
         {notFound ? 
         (<div className="not-found-text">No se ha encontrado el Pokemon</div>)
         :
        (<Pokedex pokemons={pokemons}
         page={page}
         setPage={setPage}
         total={total}
         loading={loading}/> 
        )}
    </div>
    </div>
    </FavoriteProvider>
  );
}

export default App;

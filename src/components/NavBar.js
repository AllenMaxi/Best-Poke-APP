import React from 'react';
import favoriteContext from '../contexts/favoriteContext';

const {useContext} = React;

const NavBar = () => {
const {favoritesPokemon} = useContext(favoriteContext)


let imgURL = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    return(
        <nav>
        <div/>
            <div>
            <img src = {imgURL}
           alt="pokedex-logo" 
           className = "navbar-image"/>
           </div>
        <div>&#10084;&#65039; {favoritesPokemon.length}</div>
        </nav>
    )
}

export default NavBar;
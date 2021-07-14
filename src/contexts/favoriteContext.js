import React from 'react';

const favoriteContext = React.createContext({
    favoritesPokemon: [],
    updateFavoritePokemon: () => null
})

export const FavoriteProvider = favoriteContext.Provider;
export default favoriteContext;
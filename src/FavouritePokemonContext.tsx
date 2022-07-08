import React from 'react';

export const FavouritePokemonContext = React.createContext({
  pokemons: [],
  togglePokemonFavourite: (isFavourite: boolean, item: BasicPokemonInfo) => {},
});

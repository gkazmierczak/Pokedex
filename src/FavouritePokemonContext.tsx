import React from 'react';
import {BasicPokemonInfo} from './CustomTypes';

export const FavouritePokemonContext = React.createContext({
  pokemons: [],
  togglePokemonFavourite: (isFavourite: boolean, item: BasicPokemonInfo) => {},
  selectedPokemon: undefined,
  setSelectedPokemon: (pokemon: BasicPokemonInfo) => {},
});

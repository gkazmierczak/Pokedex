import React from 'react';
import {BasicPokemonInfo, FavouritePokemonContextType} from './CustomTypes';

export const FavouritePokemonContext =
  React.createContext<FavouritePokemonContextType>({
    pokemons: [],
    togglePokemonFavourite: (
      _isFavourite: boolean,
      _item: BasicPokemonInfo,
    ) => {},
    selectedPokemon: {
      data: {types: [], stats: []},
      imgUri: '',
      name: 'none',
      url: '',
    },
    setSelectedPokemon: (_pokemon: BasicPokemonInfo) => {},
  });

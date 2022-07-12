import React from 'react';
import {
  GraphQLFavouritePokemonContextType,
  GraphQLPokemonInfo,
} from './CustomTypes';

export const FavouritePokemonContext =
  React.createContext<GraphQLFavouritePokemonContextType>({
    pokemons: [],
    togglePokemonFavourite: (
      _isFavourite: boolean,
      _item: GraphQLPokemonInfo,
    ) => {},
    selectedPokemon: {
      pokemon_v2_pokemonstats: [],
      pokemon_v2_pokemontypes: [],
      name: '',
      id: 0,
    },
    setSelectedPokemon: (_pokemon: GraphQLPokemonInfo) => {},
  });

import {StackNavigationHelpers} from '@react-navigation/stack/lib/typescript/src/types';

export type PokemonTypeData = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonStatData = {
  base_stat: string;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type BasicPokemonInfo = {
  name: string;
  url: string;
  imgUri: string;
  data: {types: PokemonTypeData[]; stats: PokemonStatData[]};
};

export type GraphQLPokemonStatData = {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
};
export type GraphQLPokemonTypeData = {
  pokemon_v2_type: {
    name: string;
  };
};

export type GraphQLPokemonInfo = {
  name: string;
  id: number;
  pokemon_v2_pokemonstats: GraphQLPokemonStatData[];
  pokemon_v2_pokemontypes: GraphQLPokemonTypeData[];
};

export type HomeStackParamList = {
  Home: HomeScreenProps;
  Pokemon: BasicPokemonInfo;
};

export type HomeScreenProps = {
  navigation: StackNavigationHelpers;
};

export type GraphQLHomeScreenProps = {
  navigation: StackNavigationHelpers;
  data: {
    data: {
      pokemon_v2_pokemon: GraphQLPokemonInfo[];
    };
    fetchMore: ({}) => {};
  };
};

export type HomeScreenState = {
  pokemons: BasicPokemonInfo[];
  offset: number;
};

export type FavouritePokemonContextType = {
  pokemons: BasicPokemonInfo[];
  togglePokemonFavourite: (
    _isFavourite: boolean,
    _item: BasicPokemonInfo,
  ) => void;
  selectedPokemon: BasicPokemonInfo;
  setSelectedPokemon: (_pokemon: BasicPokemonInfo) => void;
};

export type GraphQLFavouritePokemonContextType = {
  pokemons: GraphQLPokemonInfo[];
  togglePokemonFavourite: (
    _isFavourite: boolean,
    _item: GraphQLPokemonInfo,
  ) => void;
  selectedPokemon: GraphQLPokemonInfo;
  setSelectedPokemon: (_pokemon: GraphQLPokemonInfo) => void;
};

export type MapScreenState = {
  markers: MarkerData[];
  modalVisible: boolean;
  lastMapPressCoordinate: Coordinate;
  newMarkerDescription: string;
};

export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type MarkerData = {
  coordinate: Coordinate;
  description: string;
};

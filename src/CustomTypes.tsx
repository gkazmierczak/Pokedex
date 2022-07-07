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

export type HomeStackParamList = {
  Home: HomeScreenProps;
  Pokemon: BasicPokemonInfo;
};

export type HomeScreenProps = {
  navigation: StackNavigationHelpers;
};
export type HomeScreenState = {
  pokemons: BasicPokemonInfo[];
  offset: number;
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

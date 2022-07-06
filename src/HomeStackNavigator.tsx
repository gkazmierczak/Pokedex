import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonScreen from './PokemonScreen';
import HomeScreen from './HomeScreen';
import {HomeScreenProps} from './HomeScreen';
export type BasicPokemonInfo = {
  name: string;
  url: string;
  imgUri: string;
  data: object;
};

export type HomeStackParamList = {
  Home: HomeScreenProps;
  Pokemon: BasicPokemonInfo;
};

const Stack = createStackNavigator<HomeStackParamList>();
class HomeStackNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pokemon" component={PokemonScreen} />
      </Stack.Navigator>
    );
  }
}

export default HomeStackNavigator;

import React from 'react';
import {View, FlatList} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonScreen from './PokemonScreen';
import HomeScreen from './HomeScreen';

const Stack = createStackNavigator();
class HomeStackNavigator extends React.Component {
  constructor(props: Object) {
    super(props);
  }

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

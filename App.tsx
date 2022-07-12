import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapScreen from './src/MapScreen';
import FavouriteScreen from './src/FavouriteScreen';
import HomeStackNavigator from './src/HomeStackNavigator';
import {MMKV} from 'react-native-mmkv';
import FavouritePokemonContextProvider from './src/FavouritePokemonContextProvider';

export const storage = new MMKV();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <FavouritePokemonContextProvider>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen
            name="Pokedex"
            component={HomeStackNavigator}
            options={{headerShown: false}}
          />
          <Tab.Screen
            name="Favourite"
            component={FavouriteScreen}
            options={{unmountOnBlur: true}}
          />
          <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </FavouritePokemonContextProvider>
  );
};

export default App;

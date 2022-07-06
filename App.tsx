import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapScreen from './src/MapScreen';
import FavouriteScreen from './src/FavouriteScreen';
import HomeStackNavigator from './src/HomeStackNavigator';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;

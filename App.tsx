/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemons: [], offset: 0};
    this.getPokemon();
  }
  getPokemon = async () => {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=10' +
        '&offset=' +
        this.state.offset.toString(),
    );
    const data = await response.json();
    let pokemons = [...this.state.pokemons, ...data.results];
    this.setState({pokemons: pokemons, offset: pokemons.length});
  };
  handlePokemonPress = item => {
    console.log(item.name);
    this.props.navigation.navigate('Favourite');
  };
  renderItem = ({item}) => {
    return (
      <TouchableHighlight onPress={() => this.handlePokemonPress(item)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
            borderColor: '#000000',
            borderWidth: 1,
            width: Dimensions.get('window').width,
            height: 100,
          }}>
          <Text>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.state.pokemons && (
          <FlatList
            data={this.state.pokemons}
            renderItem={this.renderItem}
            keyExtractor={item => item.name.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              this.getPokemon(this.state.offset, 10);
            }}
          />
        )}
        {console.log(this.state.pokemons)}
      </View>
    );
  }
}
function FavouriteScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Second screen</Text>
    </View>
  );
}

function MapScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Map screen</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

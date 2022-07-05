import React from 'react';
import {View, FlatList} from 'react-native';
import ListItem from './ListItem';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonScreen from './PokemonScreen';

const Stack = createStackNavigator();
class HomeScreen extends React.Component {
  state = {pokemons: [], offset: 0};
  constructor(props: Object) {
    super(props);
    this.getPokemon();
  }
  query = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=';
  getPokemon = async () => {
    const response = await fetch(this.query + this.state.offset.toString());
    const data = await response.json();
    let pokemons = [...this.state.pokemons, ...data.results];
    this.setState({pokemons: pokemons, offset: pokemons.length});
  };
  handlePokemonPress = (item: Object) => {
    console.log(item);
    this.props.navigation.navigate('Pokemon', {screen: 'Pokemon'});
  };

  render() {
    return (
      <View>
        <Stack.Navigator>
          <Stack.Screen name="Pokemon" component={PokemonScreen} />
        </Stack.Navigator>
        <FlatList
          data={this.state.pokemons}
          renderItem={({item}) => (
            <ListItem item={item} onPress={this.handlePokemonPress} />
          )}
          keyExtractor={item => item.name.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            this.getPokemon(this.state.offset, 10);
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;

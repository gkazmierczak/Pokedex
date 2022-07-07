import React from 'react';
import {View, FlatList} from 'react-native';
import ListItem from './ListItem';
import {
  BasicPokemonInfo,
  HomeScreenProps,
  HomeScreenState,
} from './CustomTypes';

class HomeScreen extends React.Component<HomeScreenProps, HomeScreenState> {
  state: Readonly<HomeScreenState> = {pokemons: [], offset: 0};
  constructor(props: HomeScreenProps) {
    super(props);
    this.getMorePokemons();
  }

  query = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=';

  getMorePokemons = async () => {
    const response = await fetch(this.query + this.state.offset.toString());
    const data = await response.json();
    const pokemons = [...this.state.pokemons, ...data.results];
    this.setState({pokemons, offset: pokemons.length});
    this.state.pokemons.map(this.getPokemonData);
  };
  getPokemonData = async (pokemon: BasicPokemonInfo) => {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    const pokemons = [...this.state.pokemons];
    pokemons[pokemons.indexOf(pokemon)] = {
      name: pokemon.name,
      url: pokemon.url,
      imgUri: data.sprites.front_default,
      data: data,
    };
    this.setState({pokemons: pokemons});
  };

  handlePokemonPress = (item: BasicPokemonInfo) => {
    this.props.navigation.navigate('Pokemon', {item});
  };

  render() {
    return (
      <View>
        <FlatList
          extraData={this.state}
          data={this.state.pokemons}
          renderItem={({item}: {item: BasicPokemonInfo}) => (
            <ListItem item={item} onPress={this.handlePokemonPress} />
          )}
          keyExtractor={item => item.name.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            this.getMorePokemons();
          }}
        />
      </View>
    );
  }
}

export default HomeScreen;

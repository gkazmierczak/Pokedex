import React from 'react';
import {Button, Text, View, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {storage} from '../App';
import {GraphQLPokemonInfo} from './CustomTypes';
import {FavouritePokemonContext} from './FavouritePokemonContext';
import PokemonIcon from './PokemonIcon';
type FavouriteScreenState = {
  pokemonData: GraphQLPokemonInfo;
};
class FavouriteScreen extends React.Component<FavouriteScreenState> {
  state: Readonly<FavouriteScreenState> = {
    pokemonData: {
      pokemon_v2_pokemonstats: [],
      pokemon_v2_pokemontypes: [],
      name: '',
      id: 0,
    },
  };

  componentDidMount() {
    this.loadFavouritePokemon();
  }

  unfavouritePokemon = () => {
    storage.delete('favourite_pokemon');
    this.setState({
      pokemonData: {
        data: {types: [], stats: []},
        imgUri: '',
        name: 'none',
        url: '',
      },
    });
  };

  loadFavouritePokemon = async () => {
    if (storage.contains('favourite_pokemon')) {
      const jsonPokemon = storage.getString('favourite_pokemon');
      if (jsonPokemon !== undefined) {
        const pokemonObject = JSON.parse(jsonPokemon);
        this.setState({pokemonData: pokemonObject});
      }
    }
  };

  renderTypes(pokemon: GraphQLPokemonInfo) {
    const types = pokemon.pokemon_v2_pokemontypes;
    return (
      <View style={styles.types}>
        <Text style={styles.typeText}>Types:</Text>
        {types.map(type => {
          return (
            <Text key={type.pokemon_v2_type.name} style={styles.typeText}>
              {type.pokemon_v2_type.name}
            </Text>
          );
        })}
      </View>
    );
  }

  renderStats(pokemon: GraphQLPokemonInfo) {
    const stats = pokemon.pokemon_v2_pokemonstats;
    return (
      <View>
        {stats.map(stat => {
          return (
            <Text key={stat.pokemon_v2_stat.name} style={styles.typeText}>
              {stat.pokemon_v2_stat.name} : {stat.base_stat}
            </Text>
          );
        })}
      </View>
    );
  }

  renderNoFavourite() {
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/240px-Pokebola-pokeball-png-0.png',
          }}
        />
        <Text style={styles.headlineText}>No favourite pokemon selected.</Text>
        <Text style={styles.typeText}>Selected pokemon will appear here.</Text>
      </View>
    );
  }

  renderFavouriteList(
    pokemons: GraphQLPokemonInfo[],
    onPress: (a: GraphQLPokemonInfo) => void,
  ) {
    return (
      <FlatList
        extraData={pokemons}
        data={pokemons}
        renderItem={({item}: {item: GraphQLPokemonInfo}) => (
          <PokemonIcon item={item} onPress={() => onPress(item)} />
        )}
        horizontal={true}
        keyExtractor={item => item.name.toString()}
      />
    );
  }

  renderSelectedPokemon(
    pokemon: GraphQLPokemonInfo,
    onPress: (a: boolean, b: GraphQLPokemonInfo) => void,
  ) {
    if (pokemon.name !== '') {
      const {name, id} = pokemon;
      return (
        <View>
          <FastImage
            style={styles.image}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            }}
          />
          <Text style={styles.text}>{name}</Text>
          {this.renderTypes(pokemon)}
          {this.renderStats(pokemon)}
          <Button
            title="Unfavourite"
            color={'#e9c46a'}
            onPress={() => onPress(true, pokemon)}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <FavouritePokemonContext.Consumer>
        {({
          pokemons,
          selectedPokemon,
          setSelectedPokemon,
          togglePokemonFavourite,
        }) => {
          if (pokemons.length > 0) {
            return (
              <View style={styles.container}>
                {this.renderFavouriteList(pokemons, setSelectedPokemon)}
                {this.renderSelectedPokemon(
                  selectedPokemon,
                  togglePokemonFavourite,
                )}
              </View>
            );
          }
          return this.renderNoFavourite();
        }}
      </FavouritePokemonContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#2a9d8f',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    borderRadius: 25,
    backgroundColor: '#e9c46a',
  },
  image: {
    justifyContent: 'center',
    width: 256,
    height: 256,
    backgroundColor: '#e9c46a',
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#264653',
    borderRadius: 64,
    padding: 0,
  },
  text: {
    fontFamily: 'Kefa Regular',
    fontWeight: 'bold',
    fontSize: 32,
  },
  headlineText: {
    fontFamily: 'Kefa Regular',
    fontWeight: 'bold',
    fontSize: 24,
  },
  types: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  typeText: {
    fontFamily: 'Kefa Regular',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 8,
  },
});

export default FavouriteScreen;

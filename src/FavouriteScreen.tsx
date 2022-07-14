import AnimatedLottieView from 'lottie-react-native';
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

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
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
  getTypeStyle(type: string) {
    return {
      margin: 5,
      backgroundColor: typeColors[type],
      borderRadius: 10,
    };
  }

  renderTypes(pokemon: GraphQLPokemonInfo) {
    const types = pokemon.pokemon_v2_pokemontypes;
    return (
      <View style={styles.types}>
        {types.map(type => {
          return (
            <View
              key={type.pokemon_v2_type.name}
              style={this.getTypeStyle(type.pokemon_v2_type.name)}>
              <Text key={type.pokemon_v2_type.name} style={styles.typeText}>
                {type.pokemon_v2_type.name}
              </Text>
            </View>
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
        {/* <FastImage
          style={styles.image}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/240px-Pokebola-pokeball-png-0.png',
          }}
        /> */}
        <AnimatedLottieView
          source={require('../assets/pokeball.json')}
          autoPlay
          loop
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
        <View style={styles.selectedPokemon}>
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
  selectedPokemon: {
    alignItems: 'center',
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

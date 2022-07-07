import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {storage} from '../App';
import {BasicPokemonInfo} from './CustomTypes';

type FavouriteScreenState = {
  pokemonData: BasicPokemonInfo;
};
class FavouriteScreen extends React.Component<FavouriteScreenState> {
  state: Readonly<FavouriteScreenState> = {
    pokemonData: {
      data: {types: [], stats: []},
      imgUri: '',
      name: 'none',
      url: '',
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
  renderTypes() {
    const {data} = this.state.pokemonData;
    return (
      <View style={styles.types}>
        <Text style={styles.typeText}>Types:</Text>
        {data.types.map(type => {
          return (
            <Text key={type.slot} style={styles.typeText}>
              {type.type.name}
            </Text>
          );
        })}
      </View>
    );
  }
  renderStats() {
    const {data} = this.state.pokemonData;
    return (
      <View>
        {data.stats.map(stat => {
          return (
            <Text key={stat.stat.name} style={styles.typeText}>
              {stat.stat.name} : {stat.base_stat}
            </Text>
          );
        })}
      </View>
    );
  }

  render() {
    const {imgUri, name} = this.state.pokemonData;
    if (name !== 'none') {
      return (
        <View style={styles.container}>
          <FastImage
            style={styles.image}
            source={{
              uri: imgUri,
            }}
          />
          <Text style={styles.text}>{name}</Text>
          {this.renderTypes()}
          {this.renderStats()}
          <Button title="unfavourite" onPress={this.unfavouritePokemon} />
        </View>
      );
    }
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 256,
    height: 256,
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
    padding: 10,
  },
});

export default FavouriteScreen;

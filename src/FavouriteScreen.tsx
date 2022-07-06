import React from 'react';
import {Button, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {storage} from '../App';
import {BasicPokemonInfo} from './HomeStackNavigator';
import {styles} from './PokemonScreen';
type FavouriteScreenState = {
  pokemonData: BasicPokemonInfo | undefined;
};
class FavouriteScreen extends React.Component<undefined, FavouriteScreenState> {
  state: Readonly<FavouriteScreenState> = {
    pokemonData: undefined,
  };
  constructor(props: undefined) {
    super(props);
  }
  componentDidMount() {
    this.loadFavouritePokemon();
  }

  loadFavouritePokemon = async () => {
    if (storage.contains('favourite_pokemon')) {
      const jsonPokemon = storage.getString('favourite_pokemon');
      if (jsonPokemon !== undefined) {
        const pokemonObject = JSON.parse(jsonPokemon);
        console.log(pokemonObject.name);
        this.setState({pokemonData: pokemonObject});
      }
    }
  };
  render() {
    if (this.state.pokemonData !== undefined) {
      return (
        <View style={styles.container}>
          <FastImage
            style={styles.image}
            source={{
              uri: this.state.pokemonData.imgUri,
            }}
          />
          <Text style={styles.text}>{this.state.pokemonData.name}</Text>
          <View>
            <View style={styles.types}>
              <Text style={styles.typeText}>Types:</Text>
              {this.state.pokemonData.data.types.map(type => {
                return (
                  <Text key={type.slot} style={styles.typeText}>
                    {type.type.name}
                  </Text>
                );
              })}
            </View>

            {this.state.pokemonData.data.stats.map(stat => {
              return (
                <Text key={stat.stat.name} style={styles.typeText}>
                  {stat.stat.name} : {stat.base_stat}
                </Text>
              );
            })}
          </View>
          <Button
            title="unfavourite"
            onPress={() => storage.delete('favourite_pokemon')}
          />
        </View>
      );
    }
  }
}

export default FavouriteScreen;

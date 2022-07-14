import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GraphQLPokemonInfo} from './CustomTypes';
import {FavouritePokemonContext} from './FavouritePokemonContext';

type Props = {
  route: RouteProp<{params: {item: GraphQLPokemonInfo}}>;
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
class PokemonScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  getTypeStyle(type: string) {
    return {
      margin: 5,
      backgroundColor: typeColors[type],
      borderRadius: 10,
    };
  }

  renderTypes() {
    const types = this.props.route.params.item.pokemon_v2_pokemontypes;
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

  renderStats() {
    const stats = this.props.route.params.item.pokemon_v2_pokemonstats;
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

  isPokemonFavourite(
    pokemons: GraphQLPokemonInfo[],
    pokemon: GraphQLPokemonInfo,
  ) {
    return pokemons.some(el => el.name === pokemon.name);
  }

  render() {
    const {item} = this.props.route.params;
    const {name} = item;
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`,
          }}
        />
        <Text style={styles.text}>{name}</Text>
        {this.renderTypes()}
        {this.renderStats()}
        <FavouritePokemonContext.Consumer>
          {({pokemons, togglePokemonFavourite}) => {
            const isFavourite = this.isPokemonFavourite(pokemons, item);
            return (
              <Button
                title={isFavourite ? 'Unfavourite' : 'Favourite'}
                onPress={() => togglePokemonFavourite(isFavourite, item)}
              />
            );
          }}
        </FavouritePokemonContext.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#2a9d8f',
  },
  image: {
    justifyContent: 'center',
    width: 256,
    height: 256,
    backgroundColor: '#e9c46a',
    borderWidth: 2,
    borderColor: '#264653',
    borderRadius: 64,
    padding: 0,
    marginTop: 32,
  },
  text: {
    fontFamily: 'Kefa Regular',
    fontWeight: 'bold',
    fontSize: 32,
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

export default PokemonScreen;

import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BasicPokemonInfo} from './CustomTypes';
import {FavouritePokemonContext} from './FavouritePokemonContext';

type Props = {
  route: RouteProp<{params: {item: BasicPokemonInfo}}>;
};

class PokemonScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderTypes() {
    const {types} = this.props.route.params.item.data;
    return (
      <View style={styles.types}>
        <Text style={styles.typeText}>Types:</Text>
        {types.map(type => {
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
    const {stats} = this.props.route.params.item.data;
    return (
      <View>
        {stats.map(stat => {
          return (
            <Text key={stat.stat.name} style={styles.typeText}>
              {stat.stat.name} : {stat.base_stat}
            </Text>
          );
        })}
      </View>
    );
  }

  isPokemonFavourite(pokemons: BasicPokemonInfo[], pokemon: BasicPokemonInfo) {
    console.log(pokemons);
    return pokemons.some(el => el.name === pokemon.name);
  }

  render() {
    const {item} = this.props.route.params;
    const {imgUri, name} = item;
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

export default PokemonScreen;

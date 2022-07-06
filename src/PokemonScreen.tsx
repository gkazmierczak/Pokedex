import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import FastImage from 'react-native-fast-image';
import {storage} from '../App';
import {BasicPokemonInfo} from './HomeStackNavigator';

type Props = {
  route: RouteProp<{params: {item: BasicPokemonInfo}}>;
};

class PokemonScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const {data, imgUri, name} = this.props.route.params.item;
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{
            uri: imgUri,
          }}
        />
        <Text style={styles.text}>{name}</Text>
        <View>
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

          {data.stats.map(stat => {
            return (
              <Text key={stat.stat.name} style={styles.typeText}>
                {stat.stat.name} : {stat.base_stat}
              </Text>
            );
          })}
        </View>
        <Button
          title="Favourite"
          onPress={() => {
            storage.set(
              'favourite_pokemon',
              JSON.stringify(this.props.route.params.item),
            );
          }}
        />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
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

import {RouteProp} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BasicPokemonInfo} from './HomeStackNavigator';

type Props = {
  route: RouteProp<{params: {item: BasicPokemonInfo}}>;
};
class PokemonScreen extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <FastImage
          style={styles.image}
          source={{
            uri: this.props.route.params.item.imgUri,
          }}
        />
        <Text style={styles.text}>{this.props.route.params.item.name}</Text>
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
});

export default PokemonScreen;

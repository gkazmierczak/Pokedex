import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BasicPokemonInfo} from './CustomTypes';

type Props = {
  item: BasicPokemonInfo;
  onPress(item: BasicPokemonInfo): void;
};

class PokemonIcon extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {item, onPress} = this.props;
    return (
      <View>
        <TouchableHighlight onPress={() => onPress(item)}>
          <View style={styles.icon}>
            <FastImage style={styles.image} source={{uri: item.imgUri}} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#00ff00',
    borderWidth: 1,
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  image: {
    width: 64,
    height: 64,
  },
  text: {
    fontFamily: 'Kefa Regular',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default PokemonIcon;

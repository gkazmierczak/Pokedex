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
        <TouchableHighlight
          style={styles.touchable}
          underlayColor={'#e76f51'}
          onPress={() => onPress(item)}>
          <View style={styles.icon}>
            <FastImage style={styles.image} source={{uri: item.imgUri}} />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#264653',
    backgroundColor: '#e9c46a',
    margin: 3,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

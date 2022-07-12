import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BasicPokemonInfo} from './CustomTypes';

type Props = {
  item: BasicPokemonInfo;
  onPress(item: BasicPokemonInfo): void;
};

class ListItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {item, onPress} = this.props;
    return (
      <View style={styles.bg}>
        <TouchableHighlight
          underlayColor={'#e76f51'}
          style={styles.touchable}
          activeOpacity={0.6}
          onPress={() => onPress(item)}>
          <View style={styles.listItem}>
            <FastImage style={styles.image} source={{uri: item.imgUri}} />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    width: 300,
    borderRadius: 25,
    marginTop: 5,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#264653',
    borderWidth: 2,
    width: 300,
    borderRadius: 25,
    backgroundColor: '#e9c46a',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontFamily: 'Kefa Regular',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bg: {
    backgroundColor: '#2a9d8f',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default ListItem;

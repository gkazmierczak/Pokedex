import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
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
      <View>
        <TouchableHighlight onPress={() => onPress(item)}>
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
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderColor: '#000000',
    borderWidth: 1,
    width: Dimensions.get('window').width,
    height: 100,
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
});
export default ListItem;

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

class ListItem extends React.Component {
  state = {pokemons: [], offset: 0};

  render() {
    return (
      <View>
        <TouchableHighlight onPress={() => this.props.onPress(this.props.item)}>
          <View style={styles.listItem}>
            <Text>{this.props.item.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderColor: '#000000',
    borderWidth: 1,
    width: Dimensions.get('window').width,
    height: 100,
  },
});
export default ListItem;

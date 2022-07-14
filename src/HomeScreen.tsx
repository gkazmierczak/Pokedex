import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import ListItem from './ListItem';
import {
  GraphQLHomeScreenProps,
  GraphQLPokemonInfo,
  HomeScreenState,
} from './CustomTypes';
import {withQuery} from './withQuery';
import AnimatedLottieView from 'lottie-react-native';
class HomeScreen extends React.Component<
  GraphQLHomeScreenProps,
  HomeScreenState
> {
  state: Readonly<HomeScreenState> = {
    pokemons: [],
    offset: 0,
  };

  constructor(props: GraphQLHomeScreenProps) {
    super(props);
  }

  query = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=';

  handlePokemonPress = (item: GraphQLPokemonInfo) => {
    this.props.navigation.push('Pokemon', {item});
  };

  onEndReached() {
    const {data} = this.props;
    const pokemons = data.data.pokemon_v2_pokemon;
    data.fetchMore({
      variables: {
        offset: pokemons.length,
      },
      updateQuery: (
        prevResult: GraphQLPokemonInfo[],
        {
          fetchMoreResult,
        }: {fetchMoreResult?: {pokemon_v2_pokemon: GraphQLPokemonInfo[]}},
      ) => {
        if (
          !fetchMoreResult ||
          fetchMoreResult.pokemon_v2_pokemon.length === 0
        ) {
          return prevResult;
        }
        return {
          pokemon_v2_pokemon: pokemons.concat(
            fetchMoreResult.pokemon_v2_pokemon,
          ),
        };
      },
    });
  }

  renderFlatlist(data: {pokemon_v2_pokemon: GraphQLPokemonInfo[]} | undefined) {
    if (data !== undefined) {
      return (
        <FlatList
          extraData={this.props}
          data={data.pokemon_v2_pokemon}
          renderItem={({item}: {item: GraphQLPokemonInfo}) => (
            <ListItem item={item} onPress={this.handlePokemonPress} />
          )}
          keyExtractor={item => item.name.toString()}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            this.onEndReached();
          }}
        />
      );
    }
    return (
      <AnimatedLottieView
        style={styles.lottie}
        source={require('../assets/loading.json')}
        autoPlay
        loop
      />
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View style={styles.lottie}>
        {this.renderFlatlist(data.data)}
        {/* {data.data !== undefined && (
          
        )} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
    backgroundColor: '#2a9d8f',
    alignItems: 'center',
  },
});

export default withQuery(HomeScreen);

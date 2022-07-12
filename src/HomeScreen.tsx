import React from 'react';
import {View, FlatList} from 'react-native';
import ListItem from './ListItem';
import {
  GraphQLHomeScreenProps,
  GraphQLPokemonInfo,
  HomeScreenState,
} from './CustomTypes';
import {withQuery} from './withQuery';
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
  render() {
    const {data} = this.props;
    return (
      <View>
        {data.data !== undefined && (
          <FlatList
            extraData={this.props}
            data={data.data.pokemon_v2_pokemon}
            renderItem={({item}: {item: GraphQLPokemonInfo}) => (
              <ListItem item={item} onPress={this.handlePokemonPress} />
            )}
            keyExtractor={item => item.name.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              this.onEndReached();
            }}
          />
        )}
      </View>
    );
  }
}

export default withQuery(HomeScreen);

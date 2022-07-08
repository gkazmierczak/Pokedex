import React from 'react';
import {storage} from '../App';
import {BasicPokemonInfo} from './CustomTypes';
import {FavouritePokemonContext} from './FavouritePokemonContext';

class FavouritePokemonContextProvider extends React.Component {
  state = {
    favouritePokemons: [],
  };
  componentDidMount() {
    this.getFavouritePokemons();
  }
  getFavouritePokemons = async () => {
    if (storage.contains('favourite_pokemons')) {
      const jsonPokemon = storage.getString('favourite_pokemons');
      if (jsonPokemon !== undefined) {
        const pokemonObject = JSON.parse(jsonPokemon);
        this.setState({favouritePokemons: pokemonObject});
      }
    }
  };
  togglePokemonFavourite(isFavourite: boolean, item: BasicPokemonInfo) {
    let newPokemons = [];
    if (isFavourite) {
      newPokemons = this.state.favouritePokemons.filter(val => val !== item);
    } else {
      newPokemons = [...this.state.favouritePokemons, item];
    }
    storage.set('favourite_pokemons', JSON.stringify(newPokemons));
  }
  render() {
    return (
      <FavouritePokemonContext.Provider
        value={{
          pokemons: this.state.favouritePokemons,
          togglePokemonFavourite: this.togglePokemonFavourite.bind(this),
        }}>
        {this.props.children}
      </FavouritePokemonContext.Provider>
    );
  }
}
export default FavouritePokemonContextProvider;

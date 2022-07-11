import React from 'react';
import {storage} from '../App';
import {BasicPokemonInfo} from './CustomTypes';
import {FavouritePokemonContext} from './FavouritePokemonContext';

class FavouritePokemonContextProvider extends React.Component {
  state = {
    favouritePokemons: [],
    selectedPokemon: undefined,
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
    if (storage.contains('selected_pokemon')) {
      const jsonPokemon = storage.getString('selected_pokemon');
      if (jsonPokemon !== undefined) {
        const pokemonObject = JSON.parse(jsonPokemon);
        this.setState({selectedPokemon: pokemonObject});
      }
    }
  };
  togglePokemonFavourite(isFavourite: boolean, item: BasicPokemonInfo) {
    let newPokemons = [];
    if (isFavourite) {
      newPokemons = this.state.favouritePokemons.filter(
        val => val.name !== item.name,
      );
    } else {
      newPokemons = [...this.state.favouritePokemons, item];
    }
    this.setState({favouritePokemons: newPokemons});
    storage.set('favourite_pokemons', JSON.stringify(newPokemons));
  }
  setSelectedPokemon(selectedPokemon: BasicPokemonInfo) {
    this.setState({
      selectedPokemon: selectedPokemon,
    });
    console.log(this.state.selectedPokemon);
    // console.log(selectedPokemon);
  }
  render() {
    return (
      <FavouritePokemonContext.Provider
        value={{
          pokemons: this.state.favouritePokemons,
          togglePokemonFavourite: this.togglePokemonFavourite.bind(this),
          setSelectedPokemon: this.setSelectedPokemon.bind(this),
          selectedPokemon: this.state.selectedPokemon,
        }}>
        {this.props.children}
      </FavouritePokemonContext.Provider>
    );
  }
}
export default FavouritePokemonContextProvider;

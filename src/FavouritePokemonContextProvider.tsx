import React from 'react';
import {storage} from '../App';
import {BasicPokemonInfo, FavouritePokemonContextType} from './CustomTypes';
import {FavouritePokemonContext} from './FavouritePokemonContext';

type Props = {
  children: React.ReactNode;
};
class FavouritePokemonContextProvider extends React.Component<
  Props,
  FavouritePokemonContextType
> {
  state: Readonly<FavouritePokemonContextType> = {
    pokemons: [],
    selectedPokemon: {
      data: {types: [], stats: []},
      imgUri: '',
      name: '',
      url: '',
    },
    togglePokemonFavourite: this.togglePokemonFavourite,
    setSelectedPokemon: this.setSelectedPokemon,
  };
  componentDidMount() {
    this.getFavouritePokemons();
  }
  getFavouritePokemons = async () => {
    if (storage.contains('favourite_pokemons')) {
      const jsonPokemon = storage.getString('favourite_pokemons');
      if (jsonPokemon !== undefined) {
        const pokemonObject = JSON.parse(jsonPokemon);
        this.setState({pokemons: pokemonObject});
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
    const {selectedPokemon} = this.state;
    let newPokemons = [];
    if (isFavourite) {
      newPokemons = this.state.pokemons.filter(val => val.name !== item.name);
      if (selectedPokemon !== undefined && selectedPokemon.name === item.name) {
        this.setState({
          selectedPokemon: {
            data: {types: [], stats: []},
            imgUri: '',
            name: '',
            url: '',
          },
        });
      }
    } else {
      newPokemons = [...this.state.pokemons, item];
    }
    this.setState({pokemons: newPokemons});
    storage.set('favourite_pokemons', JSON.stringify(newPokemons));
  }
  setSelectedPokemon(selectedPokemon: BasicPokemonInfo) {
    this.setState({
      selectedPokemon: selectedPokemon,
    });
  }
  render() {
    return (
      <FavouritePokemonContext.Provider
        value={{
          pokemons: this.state.pokemons,
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

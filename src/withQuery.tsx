import {useQuery, gql} from '@apollo/client';
import React from 'react';

export const pokemonQuery = gql`
  query getPokemons($offset: Int) {
    pokemon_v2_pokemon(limit: 10, offset: $offset) {
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
      id
    }
  }
`;

export const withQuery = (Component: any) => {
  return (props: JSX.IntrinsicAttributes) => {
    const data = useQuery(pokemonQuery);
    console.log('query update');
    return <Component {...props} data={data} />;
  };
};

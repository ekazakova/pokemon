import { createReducer, on } from '@ngrx/store';
import { PokemonsActions } from './pokemons.actions';
import { PokemonsState } from '../models/state';

export const initialState: PokemonsState = {
  pokemons: [],
  loading: true
};

export const pokemonsReducer = createReducer(
  initialState,
  // on(PokemonsApiActions.retrievedPokemonsList, (state, { pokemons }) => {
  //   return {...state, pokemons: [...pokemons], loading: false}
  // }),
  on(PokemonsActions.set, (state, action) => {
    return {...state, pokemons: [...action.pokemons], loading: false }
  }),
  on(PokemonsActions.updatePokemon, (state, { id, name, imageUrl,height, weight, moves, abilities }) => {
    return {...state, pokemons: state.pokemons.map(pokemon =>
      pokemon.id === id
        ? { ...pokemon, name, imageUrl, height, weight, moves, abilities }
        : pokemon
    )}
  })
);
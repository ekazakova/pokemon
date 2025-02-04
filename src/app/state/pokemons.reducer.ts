import { createReducer, on } from '@ngrx/store';

import { Pokemon } from '../models/pokemon';
import { PokemonsActions, PokemonsApiActions } from './pokemons.actions';

export const initialState: ReadonlyArray<Pokemon> = [];

export const pokemonsReducer = createReducer(
  initialState,
  on(PokemonsApiActions.retrievedPokemonsList, (_state, { pokemons }) => pokemons),
  on(PokemonsActions.set, (state, action) => action.pokemons)
);
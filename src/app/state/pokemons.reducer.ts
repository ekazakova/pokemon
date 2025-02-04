import { createReducer, on } from '@ngrx/store';

import { Pokemon } from '../models/pokemon';
import { PokemonsActions, PokemonsApiActions } from './pokemons.actions';

export const initialState: ReadonlyArray<Pokemon> = [];

export const pokemonsReducer = createReducer(
  initialState,
  on(PokemonsApiActions.retrievedPokemonsList, (_state, { pokemons }) => pokemons),
  on(PokemonsActions.set, (state, action) => action.pokemons),
  on(PokemonsActions.updatePokemon, (state, { id, name, imageUrl,height, weight, moves, abilities }) => {
    return state.map(pokemon =>
      pokemon.id === id
        ? { ...pokemon, name, imageUrl, height, weight, moves, abilities } // Update height and weight
        : pokemon // Keep other Pokémon unchanged
    );
  })
);
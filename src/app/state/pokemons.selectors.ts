import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';
import { PokemonsState } from '../models/state';

export const selectPokemonsSate =
  createFeatureSelector<PokemonsState>('pokemons');

  export const selectPokemons = createSelector(
    selectPokemonsSate,
    (state: PokemonsState) => state.pokemons
 );
  export const selectPokemonById = (id: number) => createSelector(
    selectPokemons,
    (pokemons: ReadonlyArray<Pokemon>) => pokemons.find(pokemon => pokemon.id === id)
  );

  export const selectLoading = createSelector(
    selectPokemonsSate,
    (state: PokemonsState) => state.loading
  );
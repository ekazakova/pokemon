import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';

export const selectPokemons =
  createFeatureSelector<ReadonlyArray<Pokemon>>('pokemons');

  export const selectAllPokemons = createSelector(
    selectPokemons,
    (state: ReadonlyArray<Pokemon>) => state
  );

  export const selectPokemonById = (id: number) => createSelector(
    selectAllPokemons,
    (pokemons: ReadonlyArray<Pokemon>) => pokemons.find(pokemon => pokemon.id === id)
  );
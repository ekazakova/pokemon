import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';

export const selectPokemons =
  createFeatureSelector<Pokemon[]>('pokemons');

  export const selectAllPokemons = createSelector(
    selectPokemons,
    (state: Pokemon[]) => state
  );

  export const selectPokemonById = (id: number) => createSelector(
    selectAllPokemons,
    (pokemons: Pokemon[]) => pokemons.find(pokemon => pokemon.id === id)
  );
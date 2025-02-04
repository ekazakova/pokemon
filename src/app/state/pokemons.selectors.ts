import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';

export const selectPokemons =
  createFeatureSelector<ReadonlyArray<Pokemon>>('pokemons');

  export const selectPokemonById = (id: number) => createSelector(
    selectPokemons,
    (pokemons: ReadonlyArray<Pokemon>) => pokemons.find(pokemon => pokemon.id === id)
  );
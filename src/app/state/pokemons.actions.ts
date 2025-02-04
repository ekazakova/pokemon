import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';

export const PokemonsActions = createActionGroup({
  source: 'Pokemons',
  events: {
    'Init': emptyProps(),
    'Set': props<{pokemons: Pokemon[]}>(),
    // 'Update Pokemon': props<{ id: number; name: string, imageUrl: string, height: number, weight: number, abilities: string[], moves: string[] }>(),
    'Update Pokemon': props<{ id: number; name: string; imageUrl: string; height: number; weight: number, moves: string[], abilities: string[] }>(),
  },
});

export const PokemonsApiActions = createActionGroup({
  source: 'Pokemons API',
  events: {
    'Retrieved Pokemons List': props<{ pokemons: ReadonlyArray<Pokemon> }>(),
  },
});
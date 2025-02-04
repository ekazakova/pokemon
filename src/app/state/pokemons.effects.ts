import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PokemonsActions, PokemonsApiActions } from './pokemons.actions';
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { Pokemon } from '../models/pokemon';
import { selectPokemons } from './pokemons.selectors';
import { PokemonsService } from '../services/pokemons.service';

const LOCAL_STORAGE_KEY = 'pokemons';

export class PokemonsEffects {
    private store: Store<{ pokemons: Pokemon[] }> = inject(Store);
    private actions$: Actions = inject(Actions);
    private pokemonsService: PokemonsService = inject(PokemonsService)

    loadPokemons = createEffect(() =>
        this.actions$.pipe(
            ofType(PokemonsActions.init),
            switchMap(() => {
                const data = localStorage.getItem(LOCAL_STORAGE_KEY);
                if(data) {
                    const storedPokemons = JSON.parse(data);
                    return of(PokemonsActions.set({pokemons: storedPokemons}))
                }
                return this.pokemonsService.getPokemons().pipe(
                    tap((pokemons: Pokemon[]) => {
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pokemons))
                    }),
                    switchMap((pokemons: Pokemon[]) => of(PokemonsActions.set({pokemons: pokemons})))
                )
                  
            })
        )
    );

    updatePokemon = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PokemonsActions.updatePokemon),
                withLatestFrom(this.store.select(selectPokemons)),
                tap(([action, pokemons]) => {
                    console.log(action, pokemons);
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pokemons));
                })
            ),
        { dispatch: false }
    );
}

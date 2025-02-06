import { inject, Injectable } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { catchError, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { PokemonsActions } from './pokemons.actions';
import { selectPokemons } from './pokemons.selectors';
import { PokemonsService } from '../services/pokemons.service';
import { Pokemon } from '../models/pokemon';
import { LOCAL_STORAGE_KEY } from '../utils/constants';

@Injectable()
export class PokemonsEffects {
    private store: Store<{ pokemons: Pokemon[] }> = inject(Store);
    private actions$: Actions = inject(Actions);
    private message: NzMessageService = inject(NzMessageService);
    private pokemonsService: PokemonsService = inject(PokemonsService);
    private titlecase: TitleCasePipe = inject(TitleCasePipe);

    loadPokemons = createEffect(() =>
        this.actions$.pipe(
            ofType(PokemonsActions.init),
            switchMap(() => {
                const data = localStorage.getItem(LOCAL_STORAGE_KEY);
                if(data) {
                    const storedPokemons = JSON.parse(data);
                    return of(PokemonsActions.set({pokemons: storedPokemons, loading: false}))
                }
                return this.pokemonsService.getPokemons().pipe(
                    tap((pokemons: Pokemon[]) => {
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pokemons))
                    }),
                    switchMap((pokemons: Pokemon[]) => of(PokemonsActions.set({pokemons: pokemons, loading: false})))
                )
                  
            }),
            catchError(e => {
                console.log(e);
                return of(PokemonsActions.set({pokemons: [], loading: false}));
            })
        )
    );

    updatePokemon = createEffect(
        () =>
            this.actions$.pipe(
                ofType(PokemonsActions.updatePokemon),
                withLatestFrom(this.store.select(selectPokemons)),
                tap(([action, pokemons]) => {
                    this.message.create('success', `${this.titlecase.transform(action.name)} updated!`);
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pokemons));
                })
            ),
        { dispatch: false }
    );
}

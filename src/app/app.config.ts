import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';

import { routes } from './app.routes';
import { pokemonsReducer } from './state/pokemons.reducer';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PokemonsEffects } from './state/pokemons.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({pokemons: pokemonsReducer}),
    provideEffects(PokemonsEffects)
  ]
};

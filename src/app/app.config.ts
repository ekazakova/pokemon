import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { pokemonsReducer } from './state/pokemons.reducer';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PokemonsEffects } from './state/pokemons.effects';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    provideAnimations(),
    provideStore({pokemons: pokemonsReducer}),
    provideEffects(PokemonsEffects)
  ]
};

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListComponent } from './list/list.component';
import { Store } from '@ngrx/store';
import { PokemonsService } from './list/pokemons.service';
import { selectPokemons } from './state/pokemons.selectors';
import { PokemonsActions, PokemonsApiActions } from './state/pokemons.actions';
import { AsyncPipe } from '@angular/common';
import { Pokemon } from './models/pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // private pokemonsService: PokemonsService = inject(PokemonsService)
  private store: Store = inject(Store);


  constructor() {}

  ngOnInit() {
    console.log("app")
    this.store.dispatch(PokemonsActions.init())
    // this.pokemonsService
    //   .getPokemons()
    //   .subscribe((pokemons: Pokemon[]) =>
    //     this.store.dispatch(PokemonsApiActions.retrievedPokemonsList({ pokemons }))
    //   );
  }
}

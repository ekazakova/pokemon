import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { PokemonsActions } from './state/pokemons.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private store: Store = inject(Store);

  constructor() {}

  ngOnInit() {
    this.store.dispatch(PokemonsActions.init())
  }
}

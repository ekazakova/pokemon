import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { PokemonsActions } from './state/pokemons.actions';
import { selectLoading } from './state/pokemons.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, NzSpinModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  private store: Store = inject(Store);
  loading$!: Observable<boolean>;

  constructor() {}

  ngOnInit() {
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(PokemonsActions.init({loading: true}));
  }
}

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPokemons } from '../state/pokemons.selectors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [CommonModule, RouterModule],
  standalone: true
})
export class ListComponent {
  private store: Store = inject(Store);
  pokemons$ = this.store.select(selectPokemons);
}

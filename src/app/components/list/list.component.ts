import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPokemons } from '../../state/pokemons.selectors';
import { RouterModule } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [CommonModule, RouterModule, NzTypographyModule, NzCardModule, NzGridModule, NzListModule],
  standalone: true
})
export class ListComponent {
  private store: Store = inject(Store);
  pokemons$ = this.store.select(selectPokemons);
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectPokemons } from '../../state/pokemons.selectors';
import { RouterModule } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FALLBACK_IMAGE, LOCAL_STORAGE_KEY } from '../../utils/constants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  imports: [CommonModule, RouterModule, NzTypographyModule, NzCardModule, NzGridModule, NzListModule, NzImageModule, NzResultModule, NzButtonModule],
  standalone: true
})
export class ListComponent {
  private store: Store = inject(Store);
  pokemons$ = this.store.select(selectPokemons);
  fallbackImg = FALLBACK_IMAGE;

  onRefresh () {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    window.location.reload();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Pokemon } from '../../models/pokemon';
import { selectPokemonById } from '../../state/pokemons.selectors';
import { FALLBACK_IMAGE } from '../../utils/constants';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.less',
    standalone: true,
    imports: [CommonModule, RouterLink, TitleCasePipe, NzGridModule, NzTypographyModule, NzPageHeaderModule, NzSpaceModule, NzButtonModule, NzIconModule, NzFlexModule, NzDividerModule, NzImageModule],
})
export class DetailsComponent implements OnInit {
    private store: Store = inject(Store);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    pokemon$!: Observable<Pokemon | undefined>;
    fallbackImg = FALLBACK_IMAGE;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/error/404']);
            return;
        }
        this.pokemon$ = this.store.select(selectPokemonById(+id)).pipe(
            tap(pokemon => {
                if (!pokemon) {
                    throw new Error('No such pokemon found');
                }
            }),
            catchError(e => {
                console.log(e)
                this.router.navigate(['/error/404']);
                return of(undefined);
            })
        );
    }
    onBack() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}

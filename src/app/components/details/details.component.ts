import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPokemonById } from '../../state/pokemons.selectors';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrl: './details.component.scss',
    standalone: true,
    imports: [CommonModule,RouterLink],
})
export class DetailsComponent implements OnInit {
    private store: Store = inject(Store);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    pokemon$!: Observable<Pokemon | undefined>;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/']);
            return;
        }
        this.pokemon$ = this.store.select(selectPokemonById(+id));
     
    }
}

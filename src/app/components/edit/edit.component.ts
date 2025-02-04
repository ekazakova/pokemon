import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { selectPokemonById } from '../../state/pokemons.selectors';
import { PokemonsActions } from '../../state/pokemons.actions';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    standalone: true,
    imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
})
export class EditComponent {
    private store: Store = inject(Store);
    private route: ActivatedRoute = inject(ActivatedRoute);
    private router: Router = inject(Router);
    private fb: FormBuilder = inject(FormBuilder);

    pokemon$!: Observable<Pokemon | undefined>;
    form!: FormGroup;
    id!: number;

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            this.router.navigate(['/']);
            return;
        }
        this.id = +id;
        this.pokemon$ = this.store.select(selectPokemonById(this.id)).pipe(
            tap(pokemon => {
                this.form = this.fb.group({
                    name: [pokemon?.name, Validators.required], 
                    imageUrl: [pokemon?.imageUrl, Validators.required], 
                    height: [pokemon?.height, Validators.required], // Name field with validation
                    weight: [pokemon?.weight, [Validators.required]], // Email field with validation
                });
            })
        );
    }

    onSubmit(): void {
      console.log(this.form.value)
        // Dispatch the action to update the name
        this.store.dispatch(PokemonsActions.updatePokemon({ 
          id: this.id,  
          name: this.form.value?.['name'],
          imageUrl: this.form.value?.['imageUrl'],
          height: this.form.value?.['height'] || 0,
          weight: this.form.value?.['weight'] || 0
        }));
    }
}

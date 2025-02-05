import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzImageModule } from 'ng-zorro-antd/image';
import { selectPokemonById } from '../../state/pokemons.selectors';
import { PokemonsActions } from '../../state/pokemons.actions';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss',
    standalone: true,
    imports: [AsyncPipe, ReactiveFormsModule, CommonModule, NzGridModule, NzTypographyModule, NzPageHeaderModule, NzSpaceModule, NzButtonModule, NzIconModule, NzFlexModule, NzDividerModule, NzButtonModule, NzFormModule, NzInputModule, NzImageModule],
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
            this.onBack();
            return;
        }
        this.id = +id;
        this.pokemon$ = this.store.select(selectPokemonById(this.id)).pipe(
            tap(pokemon => {
                if (!pokemon) {
                    this.onBack();
                }
            }),
            tap(pokemon => {
                this.form = this.fb.group({
                    name: [pokemon?.name, Validators.required],
                    imageUrl: [pokemon?.imageUrl, Validators.required],
                    height: [
                        pokemon?.height,
                        [Validators.required, Validators.pattern('^[0-9]*$')],
                    ],
                    weight: [
                        pokemon?.weight,
                        [Validators.required, Validators.pattern('^[0-9]*$')],
                    ],
                    moves: this.fb.array(pokemon?.moves || []),
                    abilities: this.fb.array(pokemon?.abilities || []),
                });
            })
        );
    }

    get moves(): FormArray {
        return this.form.get('moves') as FormArray;
    }

    addMove(): void {
        this.moves.push(this.fb.control(''));
    }

    removeMove(index: number): void {
        this.moves.removeAt(index);
    }

    get abilities(): FormArray {
        return this.form.get('abilities') as FormArray;
    }

    addAbility(): void {
        this.abilities.push(this.fb.control(''));
    }

    removeAbility(index: number): void {
        this.abilities.removeAt(index);
    }

    onSubmit(): void {
        this.store.dispatch(
            PokemonsActions.updatePokemon({
                id: this.id,
                moves: this.moves.value,
                abilities: this.abilities.value,
                name: this.form.value?.['name'],
                imageUrl: this.form.value?.['imageUrl'],
                height: this.form.value?.['height'] || 0,
                weight: this.form.value?.['weight'] || 0,
            })
        );
    }

    onBack() {
        this.router.navigate(['../'], {relativeTo: this.route});
    }
}

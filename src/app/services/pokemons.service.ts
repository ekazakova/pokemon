import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { LIMIT, OFFSET } from '../utils/constants';

interface PokemonRawData {
  sprites: { home: { front_default: string }, front_default: string };
  abilities: { ability: { name: string } }[];
  moves: { move: { name: string } }[];
  height: number;
  weight: number;
}


@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/'; // Base API URL

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Pokemon[]> {
    console.log("getPokemons")
    return this.http
      .get<{ results: { name: string; url: string }[] }>(
        `https://pokeapi.co/api/v2/pokemon/?offset=${OFFSET}&limit=${LIMIT}`
      )
      .pipe(
        concatMap((response: { results: { name: string; url: string }[] }) => {
          
          const pokemonDetails$ = response.results.map((pokemon) => 
            this.getPokemonDetails(pokemon.url).pipe(
              map((details) => ({
                id: Number(pokemon.url.split('/').filter(Boolean).pop()),
                name: pokemon.name,
                ...details,
              }))
            )
          );
          return forkJoin(pokemonDetails$);
        })
      );
  }

  private getPokemonDetails(url: string): Observable<Partial<Pokemon>> {
    return this.http.get<PokemonRawData>(url).pipe(
      map((data) => {
        const details = {
          imageUrl: data.sprites?.home?.front_default || data.sprites.front_default,
          abilities: data.abilities.map((a) => a.ability.name),
          moves: data.moves.map((m) => m.move.name),
          height: data.height,
          weight: data.weight,
        };
        return details;
      })
    );
  }
}

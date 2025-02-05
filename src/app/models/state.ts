import { Pokemon } from "./pokemon";

export interface PokemonsState {
    loading: boolean;
    pokemons: Pokemon[];
}

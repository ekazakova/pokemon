export interface Pokemon {
    id: number;
    name: string;
    imageUrl?: string | undefined;
    height?: number;
    weight?: number;
    abilities?: string[];
    moves?: string[];
}

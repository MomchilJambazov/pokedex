export interface ApiItem {
    name: string,
    url: string,
}

export interface DefaultValues {
    avatar: string,
    name: string,
    height: number,
    weight: number,
    base_experience: number,
    capture_rate: number,
    habitat: string,
    short_description: string,
    color: string,
    hp: number,
    attack: number,
    defence: number,
    speed: number,
    special_attack: number,
    special_defence: number,
    type_1: string,
    type_2: string,
    ability_1: string,
    ability_2: string,
    ability_3: string,
}

export type FieldName = keyof DefaultValues;

export interface FieldProps {
    control: any,
    fieldName: FieldName,
    label: string,
    required?: boolean,
}

export interface ShortDescription {
    flavor_text: string,
    language: ApiItem,
    version: ApiItem,
}

export interface PokemonType {
    slot: number,
    type: ApiItem,
}

export interface PokemonStat {
    base_stat: number,
    effort: number,
    stat: ApiItem,
}

export interface PokemonAbility {
    slot: number,
    isHidden: boolean,
    ability: ApiItem,
}

export type AnyObject = Record<string, any>

export type NestedObject = Record<string, AnyObject>

export interface Pokemon {
    name: string,
    sprites: AnyObject,
    types: PokemonType[],
    id: number,
    height: number,
    weight: number,
    stats: PokemonStat[],
    base_experience: number,
    abilities: PokemonAbility[],
    flavor_text_entries: ShortDescription[],
    evolution_chain: ApiItem,
    capture_rate: number,
    habitat?: ApiItem,
}

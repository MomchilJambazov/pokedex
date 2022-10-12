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

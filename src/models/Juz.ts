export interface Juz {
    id: number;
    name: string;
    alternate_name: string;
}

export interface JuzListDTO {
    juzs: Juz[];
}
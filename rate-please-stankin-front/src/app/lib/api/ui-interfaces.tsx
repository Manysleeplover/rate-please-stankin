export interface ImageSize {
    width: number | `${number}` | undefined;
    height: number | `${number}` | undefined;
}


export interface TimetableSubject {
    id: number;
    groups: string[];
    name: string;
    type: string;
    subgroup: string;
    location: string;
    dateTime: Date;
    url: string;
}

export enum LesionType {
    "Лекция" = "",
    "Семинар" = "1",
    "Лабораторная работа" = "2"
}
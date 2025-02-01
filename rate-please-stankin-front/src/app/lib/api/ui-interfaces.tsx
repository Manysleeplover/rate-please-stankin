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
    dateTime: Date
    url: string;
}


export type SignInDTO = {
    username: string
    password: string
}

export type SignUpDTO = {
    username: string
    email: string
    password: string
}
import {UUID} from "node:crypto";

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

export type ScheduleDateIntervalRequest = {
    date: string,
    stgroup: string | "МДБ-23-09"
}

export type DailyScheduleDTO = {
    id: UUID,
    date: Date,
    stgroup: string,
    subject: string,
    audience: string  | null,
    startTime: string,
    endTime: string,
    subgroup: string | null,
    teacher: string,
    type: string
}

export type JwtAuthenticationResponse = {
    token: string,
    username: string,
    role: string
}
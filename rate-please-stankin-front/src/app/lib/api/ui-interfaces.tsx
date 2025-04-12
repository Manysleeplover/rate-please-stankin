import {UUID} from "node:crypto";

export interface ImageSize {
    width: number | `${number}` | undefined;
    height: number | `${number}` | undefined;
}

export type SemesterSchedule = {
    id: UUID
    firstClassDate: string
    lastClassDate: string
    stgroup: string
    versionDate: Date
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

export enum ScheduleType{
    StudentSchedule,
    CreateTaskSchedule
}

export type SaveTaskForClassRequest = {
    id: string,
    questions: Question[];
}

export type AnswerOption = {
    id: string;
    text: string;
    isCorrect: boolean;
};

export type Question = {
    id: string;
    title: string;
    answers: AnswerOption[];
};

export type TestFormData = {
    questions: Question[];
};
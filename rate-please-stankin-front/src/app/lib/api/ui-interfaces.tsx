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
    stgroup: string | "ИДМ-23-08"
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
    type: string,
    testId: string
    assessmentId: string
}

export type JwtAuthenticationResponse = {
    id: string,
    role: string
    name: string,
    email: string,
    token: string,
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

export type TaskForClassDTO = {
    id: string;
    dailySchedule: DailyScheduleDTO;
    taskList: QuestionDTO[];
};

export type QuestionDTO = {
    id: string;
    title: string;
    answers: AnswerOptionsDTO[];
};

export type AnswerOptionsDTO = {
    id: string;
    text: string;
    isCorrect: boolean;
};

export type StudentInfoDTO = {
    access_token: string,
    token_type: string,
    userInfo:  UserInfoDTO
}

export type UserInfoDTO = {
    name: string,
    surname: string,
    patronym: string,
    stgroup: string,
    cardid: string
}

export type MJStudentDataRequestDTO = {
    code: string,
    clientId: string,
    clientSecret: string
}
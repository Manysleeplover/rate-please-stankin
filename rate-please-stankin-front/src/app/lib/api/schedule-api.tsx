import {DailyScheduleDTO, ScheduleDateIntervalRequest, SemesterSchedule} from "@/app/lib/api/ui-interfaces";
import axios from "axios";

export const getScheduleByDateEndStgGroup = async (
    request: ScheduleDateIntervalRequest
): Promise<DailyScheduleDTO[]> => {
    return axios
        .get<DailyScheduleDTO[]>('http://localhost:8081/schedule/by-date', {
            params: request, // Передаем параметры как query string
        })
        .then((response) => {
            return response.data; // Возвращаем данные
        })
        .catch((error) => {
            console.error('Ошибка при выполнении запроса:', error);
            throw error; // Пробрасываем ошибку для обработки на уровне выше
        });
};

export const getSemesterSchedule = async (): Promise<SemesterSchedule[]> => {
    try {
        let response = await axios
            .get<SemesterSchedule[]>('http://localhost:8081/schedule/semester/all');
        return response.data; // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error; // Пробрасываем ошибку для обработки на уровне выше
    }
};


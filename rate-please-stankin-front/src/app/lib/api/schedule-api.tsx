import {DailyScheduleDTO, ScheduleDateIntervalRequest, SemesterSchedule} from "@/app/lib/api/ui-interfaces";
import axios from "axios";
import {BACKEND_API_URL} from "@/app/lib/api/default-api-signature";

export const getScheduleByDateEndStgGroup = async (
    request: ScheduleDateIntervalRequest
): Promise<DailyScheduleDTO[]> => {
    return axios
        .get<DailyScheduleDTO[]>(`${BACKEND_API_URL}/schedule/by-date`, {
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
            .get<SemesterSchedule[]>(`${BACKEND_API_URL}/schedule/semester/all`);
        return response.data; // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error; // Пробрасываем ошибку для обработки на уровне выше
    }
};


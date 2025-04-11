import {DailyScheduleDTO, ScheduleDateIntervalRequest, SemesterSchedule} from "@/app/lib/api/ui-interfaces";
import axios from "axios";

export const getScheduleByDateEndStgGroup = async (
    request: ScheduleDateIntervalRequest
): Promise<DailyScheduleDTO[]> => {
    return axios
        .get<DailyScheduleDTO[]>('http://localhost:8081/schedule/by-date-interval', {
            params: request, // Передаем параметры как query string
        })
        .then((response) => {
            console.log('Статус ответа:', response.status);
            console.log('Текст статуса:', response.statusText);
            console.log('Заголовки:', response.headers);
            console.log('Конфигурация запроса:', response.config);
            console.log('Данные ответа:', response.data); // Логируем данные ответа
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
        console.log('Статус ответа:', response.status);
        console.log('Текст статуса:', response.statusText);
        console.log('Заголовки:', response.headers);
        console.log('Конфигурация запроса:', response.config);
        console.log('Данные ответа:', response.data); // Логируем данные ответа
        return response.data; // Возвращаем данные
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error; // Пробрасываем ошибку для обработки на уровне выше
    }
};


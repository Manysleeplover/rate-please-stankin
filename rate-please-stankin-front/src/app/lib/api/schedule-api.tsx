import {DailyScheduleDTO, ScheduleDateIntervalRequest} from "@/app/lib/api/ui-interfaces";
import axios from "axios";

export const getScheduleByDateEndStgGroup =  (
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

// const handleSelect = (date: Date) => {
//     console.log(date); // Выбранная дата
//     setDate(date);
//     getScheduleByDateEndStgGroup(
//         {
//             date: date,
//             stgroup: "МДБ-23-09"
//         })
// };
import React from 'react';
import {Calendar} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Основные стили
import 'react-date-range/dist/theme/default.css'; // Тема по умолчанию
import {ru} from 'date-fns/locale';
import {getScheduleByDateEndStgGroup} from '@/app/lib/api/schedule-api';
import {DailyScheduleDTO} from "@/app/lib/api/ui-interfaces";

/**
 * Документация по react-date-range: https://github.com/hypeserver/react-date-range
 * @constructor
 */

interface MyCalendarProps {
    targetDate?: Date; // Начальная дата (опционально)
    onChangeDate: (date: Date) => void; // Функция для обработки изменения даты
    onChangeSchedule: (dailyScheduleList: DailyScheduleDTO[]) => void;
    group: string
}

const MyCalendar: React.FC<MyCalendarProps> = ({ targetDate, onChangeDate, onChangeSchedule, group = 'МДБ-23-09' }) => {
    const handleSelect = async (date: Date) => {
        console.log(date); // Выбранная дата
        onChangeDate(date);

        // Запрос к API для получения расписания
        onChangeSchedule(await getScheduleByDateEndStgGroup({
            date: formatDate(date),
            stgroup: group,
        }));
    };

    return (
        <div>
            <Calendar
                locale={ru} // Локализация на русский
                date={targetDate}
                onChange={handleSelect}
            />
        </div>
    );
};

export default MyCalendar;

function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
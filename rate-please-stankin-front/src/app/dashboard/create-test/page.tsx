'use client';

import { useEffect, useState } from 'react';
import { getSemesterSchedule } from "@/app/lib/api/schedule-api";
import { SemesterSchedule } from "@/app/lib/api/ui-interfaces";

export default function SelectForm() {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [semesterScheduleItem, setSemesterScheduleItem] = useState<SemesterSchedule[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getSemesterSchedule();
                setSemesterScheduleItem(resp);
            } catch (error) {
                console.error("Error fetching schedule:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []); // Пустой массив зависимостей = выполнить только при монтировании

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Selected: ${selectedOption}`);
    };


    if (isLoading) {
        return <div className="p-4 max-w-md mx-auto">Загрузка...</div>;
    }

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Выберите группу</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="group-select" className="block mb-2">
                        Группы:
                    </label>
                    <select
                        id="group-select"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">-- Выберите --</option>
                        {semesterScheduleItem.map((option) => (
                            <option key={option.id} value={option.stgroup}>
                                {option.stgroup} | {option.firstClassDate} - {option.lastClassDate}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Отправить
                </button>
            </form>
            {selectedOption && (
                <p className="mt-4">Вы выбрали: <strong>{selectedOption}</strong></p>
            )}
        </div>
    );
}
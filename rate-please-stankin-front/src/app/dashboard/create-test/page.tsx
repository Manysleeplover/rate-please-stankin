'use client';

import {useEffect, useState} from 'react';
import {getSemesterSchedule} from '@/app/lib/api/schedule-api';
import {ScheduleType, SemesterSchedule} from '@/app/lib/api/ui-interfaces';
import SchedulePage from '@/app/dashboard/schedule/page';

export default function SelectForm() {
    const defaultValue: string = "-- Выберите группу --"
    const [selectedOption, setSelectedOption] = useState<string>(defaultValue);
    const [semesterScheduleItem, setSemesterScheduleItem] = useState<SemesterSchedule[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadSchedule, setIsLoadSchedule] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getSemesterSchedule();
                setSemesterScheduleItem(resp);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Selected: ${selectedOption}`);
    };

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }




    return (
        <>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-xl font-bold mb-4">Выберите группу</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="group-select" className="block mb-2">
                            Группы:
                        </label>
                        <select
                            id="group-select"
                            value={selectedOption}
                            onChange={(e) => {
                                if (e.target.value === defaultValue) {
                                    setIsLoadSchedule(false);
                                } else {
                                    setSelectedOption(e.target.value);
                                    setIsLoadSchedule(true);
                                }
                            }}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value={defaultValue}>{defaultValue}</option>
                            {semesterScheduleItem.map((option) => (
                                <option key={option.id} value={option.stgroup}>
                                    {option.stgroup} | {formatDate(option.firstClassDate)} - {formatDate(option.lastClassDate)}
                                </option>
                            ))}
                        </select>
                    </div>
                </form>
            </div>

            {
                isLoadSchedule &&
                <SchedulePage
                    group={selectedOption}
                    type={ScheduleType.CreateTaskSchedule}
                />
            }
        </>
    );
}
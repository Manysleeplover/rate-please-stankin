// components/TestsList.tsx
'use client';

import { useEffect, useState } from 'react';
import { TaskForClassDTO } from "@/app/lib/api/ui-interfaces";
import {deleteTaskForClassByTaskId, getTaskForClassByTaskId} from "@/app/lib/api/task-for-class-api";
import {useParams, useRouter} from "next/navigation";

export default function TestsList() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams()["testId"];
    const [isDeleting, setIsDeleting] = useState(false);
    const [taskForClass, setTaskForClass] = useState<TaskForClassDTO>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getTaskForClassByTaskId(params);
                setTaskForClass(resp);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [params]);

    const handleDelete = async (testId: string) => {
        if (!confirm('Вы уверены, что хотите удалить этот тест?')) return;

        try {
            setIsDeleting(true);
            await deleteTaskForClassByTaskId(params)
            alert("Тест удалён успешно создан!");
            router.push(`/dashboard/test/create`)
        } catch (error) {
            console.error('Ошибка при удалении теста:', error);
            alert('Не удалось удалить задание');
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!taskForClass) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500 text-lg">Тест не найден</p>
            </div>
        );
    }

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8 transition-all hover:shadow-lg">
                {/* Шапка с информацией о расписании */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {taskForClass.dailySchedule.subject}
                            </h2>
                            <p className="text-gray-600">
                                {new Date(taskForClass.dailySchedule.date).toLocaleDateString('ru-RU', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDelete(taskForClass.id)}
                            disabled={isDeleting}
                            className="mt-4 md:mt-0 bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg transition-all duration-300
                                      disabled:opacity-50 flex items-center justify-center min-w-32"
                        >
                            {isDeleting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Удаление...
                                </>
                            ) : (
                                'Удалить задание'
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                        <div className="space-y-2">
                            <DetailItem label="Группа" value={taskForClass.dailySchedule.stgroup} />
                            <DetailItem label="Подгруппа" value={taskForClass.dailySchedule.subgroup || 'Не указана'} />
                            <DetailItem label="Преподаватель" value={taskForClass.dailySchedule.teacher} />
                        </div>
                        <div className="space-y-2">
                            <DetailItem label="Аудитория" value={taskForClass.dailySchedule.audience || 'Не указана'} />
                            <DetailItem
                                label="Время"
                                value={`${formatTime(taskForClass.dailySchedule.startTime)} - ${formatTime(taskForClass.dailySchedule.endTime)}`}
                            />
                            <DetailItem label="Тип занятия" value={taskForClass.dailySchedule.type} />
                        </div>
                    </div>
                </div>

                {/* Список вопросов */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                        Вопросы теста ({taskForClass.taskList.length})
                    </h3>

                    {taskForClass.taskList.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-gray-400">Нет вопросов в этом тесте</p>
                        </div>
                    ) : (
                        taskForClass.taskList.map((question, index) => (
                            <div key={question.id} className="bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-100">
                                <div className="flex items-start">
                                    <span className="flex-shrink-0 bg-blue-100 text-blue-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded-full">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-800 mb-3">{question.title}</h3>
                                        <ul className="space-y-2">
                                            {question.answers.map((answer) => (
                                                <li
                                                    key={answer.id}
                                                    className={`pl-3 py-2 border-l-4 ${answer.isCorrect
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-gray-200'}`}
                                                >
                                                    <div className="flex items-center">
                                                        {answer.isCorrect && (
                                                            <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        <span className={answer.isCorrect ? 'text-green-700 font-medium' : 'text-gray-700'}>
                                                            {answer.text}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// Компонент для отображения деталей
function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex">
            <span className="text-gray-500 font-medium w-32 flex-shrink-0">{label}:</span>
            <span className="text-gray-800">{value}</span>
        </div>
    );
}
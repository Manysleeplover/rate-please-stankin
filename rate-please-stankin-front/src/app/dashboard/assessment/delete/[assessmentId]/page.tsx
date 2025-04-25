'use client';

import { useEffect, useState } from 'react';
import { TaskForClassDTO } from "@/app/lib/api/ui-interfaces";
import { deleteTaskForClassByTaskId, getTaskForClassByTaskId } from "@/app/lib/api/task-for-class-api";
import { useParams, useRouter } from "next/navigation";

export default function TestsList() {
    const router = useRouter();
    const params = useParams();
    const testId = params.testId as string;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [taskForClass, setTaskForClass] = useState<TaskForClassDTO | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const resp = await getTaskForClassByTaskId(testId);
                setTaskForClass(resp);
                setError(null);
            } catch (error) {
                console.error('Error fetching test:', error);
                setError('Не удалось загрузить тест');
                setTaskForClass(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [testId]);

    const handleDelete = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить этот тест?')) return;

        try {
            setIsDeleting(true);
            setError(null);

            await deleteTaskForClassByTaskId(testId);
            router.push('/dashboard/test/create');
        } catch (error) {
            console.error('Error deleting test:', error);
            setError('Не удалось удалить тест');
        } finally {
            setIsDeleting(false);
        }
    };

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (error || !taskForClass) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 text-lg">{error || 'Тест не найден'}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Основная карточка с тестом */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
                {/* Шапка с информацией о тесте */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">
                                {taskForClass.dailySchedule.subject}
                            </h2>
                            <p className="text-blue-100">
                                {new Date(taskForClass.dailySchedule.date).toLocaleDateString('ru-RU', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`mt-4 md:mt-0 px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center justify-center min-w-32
                                      ${isDeleting ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'} text-white shadow-md`}
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
                                <>
                                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Удалить тест
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Тело карточки */}
                <div className="p-6">
                    {/* Информация о расписании */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                            <DetailCard
                                icon={
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                }
                                title="Группа"
                                value={taskForClass.dailySchedule.stgroup}
                                subtitle={taskForClass.dailySchedule.subgroup ? `Подгруппа: ${taskForClass.dailySchedule.subgroup}` : 'Без подгруппы'}
                            />

                            <DetailCard
                                icon={
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                }
                                title="Преподаватель"
                                value={taskForClass.dailySchedule.teacher}
                            />
                        </div>

                        <div className="space-y-4">
                            <DetailCard
                                icon={
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                }
                                title="Аудитория"
                                value={taskForClass.dailySchedule.audience || 'Не указана'}
                            />

                            <DetailCard
                                icon={
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                }
                                title="Время"
                                value={`${formatTime(taskForClass.dailySchedule.startTime)} - ${formatTime(taskForClass.dailySchedule.endTime)}`}
                            />
                        </div>
                    </div>

                    {/* Список вопросов */}
                    <div className="border-t pt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            Вопросы теста ({taskForClass.taskList.length})
                        </h3>

                        {taskForClass.taskList.length === 0 ? (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Нет вопросов в этом тесте</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {taskForClass.taskList.map((question, index) => (
                                    <div key={question.id} className="bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-200">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium text-gray-800 mb-3">{question.title}</h3>
                                                <ul className="space-y-3">
                                                    {question.answers.map((answer) => (
                                                        <li
                                                            key={answer.id}
                                                            className={`pl-4 py-2 border-l-4 ${answer.isCorrect ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${answer.isCorrect ? 'border-green-500 bg-green-500' : 'border-gray-400'}`}></div>
                                                                <span className={answer.isCorrect ? 'text-green-700 font-medium' : 'text-gray-700'}>
                                                                    {answer.text}
                                                                </span>
                                                                {answer.isCorrect && (
                                                                    <span className="ml-2 text-green-600">✓ Верный ответ</span>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Компонент карточки детали
function DetailCard({ icon, title, value, subtitle }: {
    icon: React.ReactNode;
    title: string;
    value: string;
    subtitle?: string;
}) {
    return (
        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="bg-blue-100 p-2 rounded-lg">
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-500">{title}</h4>
                <p className="text-lg font-semibold text-gray-800">{value}</p>
                {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
}
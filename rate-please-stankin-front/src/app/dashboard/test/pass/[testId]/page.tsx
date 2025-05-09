'use client';

import {useEffect, useState} from 'react';
import {TaskForClassDTO} from "@/app/lib/api/ui-interfaces";
import {getTaskForClassByTaskId, savePassedTestResult} from "@/app/lib/api/task-for-class-api";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";

export default function TestsList() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const testId = params.testId as string;
    const [taskForClass, setTaskForClass] = useState<TaskForClassDTO | null>(null);
    const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState<number | null>(null);

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

    const formatTime = (timeString: string) => {
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };

    const handleAnswerSelect = (questionId: string, answerId: string) => {
        if (isSubmitted) return;

        setUserAnswers(prev => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    const handleSubmit = async () => {
        if (!taskForClass || !session?.user) return;

        try {
            setIsSubmitted(true);

            // Подсчет правильных ответов
            const calculatedScore = taskForClass.taskList.reduce((count, question) => {
                const selectedAnswerId = userAnswers[question.id];
                if (!selectedAnswerId) return count;

                const isCorrect = question.answers.some(a =>
                    a.id === selectedAnswerId && a.isCorrect
                );
                return isCorrect ? count + 1 : count;
            }, 0);
            const calculatedPercent = Math.round(
                (calculatedScore / taskForClass.taskList.length) * 100
            );

            setScore(calculatedScore);

            await savePassedTestResult(
                session.user.token,
                calculatedPercent,
                testId,
                session.user.id
            );
        } catch (error) {
            console.error('Failed to save test result:', error);
            setError('Ошибка при сохранении результатов');
            setIsSubmitted(false);
        }
    };

    const calculateProgress = () => {
        if (!taskForClass) return 0;
        return (Object.keys(userAnswers).length / taskForClass.taskList.length) * 100;
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
            {/* Информационная карточка */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transition-all hover:shadow-lg">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold mb-1">
                                {taskForClass.dailySchedule?.subject}
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
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                            {taskForClass.dailySchedule.type}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                    <div className="space-y-2">
                        <DetailItem label="Группа" value={taskForClass.dailySchedule.stgroup}/>
                        <DetailItem label="Подгруппа" value={taskForClass.dailySchedule.subgroup || 'Не указана'}/>
                        <DetailItem label="Преподаватель" value={taskForClass.dailySchedule.teacher}/>
                    </div>
                    <div className="space-y-2">
                        <DetailItem label="Аудитория" value={taskForClass.dailySchedule.audience || 'Не указана'}/>
                        <DetailItem
                            label="Время"
                            value={`${formatTime(taskForClass.dailySchedule.startTime)} - ${formatTime(taskForClass.dailySchedule.endTime)}`}
                        />
                        <DetailItem label="Тип занятия" value={taskForClass.dailySchedule.type}/>
                    </div>
                </div>
            </div>

            {/* Прогресс бар */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">
                        Прогресс: {Object.keys(userAnswers).length} из {taskForClass.taskList.length}
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                        {Math.round(calculateProgress())}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{width: `${calculateProgress()}%`}}
                    ></div>
                </div>
            </div>

            {/* Список вопросов */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 transition-all hover:shadow-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Вопросы теста ({taskForClass.taskList.length})
                </h3>

                {taskForClass.taskList.length === 0 ? (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                        <p className="text-gray-400">Нет вопросов в этом тесте</p>
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
                                            {question.answers.map((answer) => {
                                                const isSelected = userAnswers[question.id] === answer.id;
                                                let answerStyle = "border-gray-300 hover:border-blue-300";

                                                if (isSubmitted) {
                                                    answerStyle = answer.isCorrect
                                                        ? "border-green-500 bg-green-50"
                                                        : isSelected
                                                            ? "border-red-500 bg-red-50"
                                                            : "border-gray-300";
                                                } else if (isSelected) {
                                                    answerStyle = "border-blue-500 bg-blue-50";
                                                }

                                                return (
                                                    <li
                                                        key={answer.id}
                                                        className={`pl-4 py-2 border-l-4 cursor-pointer transition-colors ${answerStyle}`}
                                                        onClick={() => handleAnswerSelect(question.id, answer.id)}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                                                                isSelected ? "border-blue-500 bg-blue-500" : "border-gray-400"
                                                            }`}></div>
                                                            <span className={isSubmitted && answer.isCorrect ? 'text-green-700 font-medium' : 'text-gray-700'}>
                                                                {answer.text}
                                                            </span>
                                                            {isSubmitted && answer.isCorrect && isSelected && (
                                                                <span className="ml-2 text-green-600">
                                                                    ✓ Верно
                                                                </span>
                                                            )}
                                                            {isSubmitted && !answer.isCorrect && isSelected && (
                                                                <span className="ml-2 text-red-600">
                                                                    ✗ Неверно
                                                                </span>
                                                            )}
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Панель действий */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                {isSubmitted ? (
                    <>
                        <div className="bg-white p-4 rounded-lg shadow-md flex-1 text-center">
                            <h4 className="text-lg font-semibold mb-2">Результат теста</h4>
                            <p className="text-2xl font-bold text-blue-600">
                                {score} из {taskForClass.taskList.length} ({Math.round((score! / taskForClass.taskList.length) * 100)}%)
                            </p>
                        </div>
                    </>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(userAnswers).length !== taskForClass.taskList.length}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                        Завершить тест
                    </button>
                )}
            </div>
        </div>
    );
}


function DetailItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex">
            <span className="text-gray-500 font-medium w-32 flex-shrink-0">{label}:</span>
            <span className="text-gray-800">{value}</span>
        </div>
    );
}

// Вынесенные подкомпоненты (DetailColumn, ProgressBar, QuestionsList, ActionPanel)
// должны быть реализованы аналогично оригиналу с сохранением стилей
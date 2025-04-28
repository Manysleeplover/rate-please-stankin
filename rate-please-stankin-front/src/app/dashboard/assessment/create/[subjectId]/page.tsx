'use client'

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AssessmentDTO, AssessmentQuestion } from "@/app/lib/api/ui-interfaces";
import { useParams, useRouter } from "next/navigation";
import { postSaveAssessment } from "@/app/lib/api/assessment-api";
import { useSession } from "next-auth/react";

export default function AssessmentCreator() {
    const params = useParams();
    const subjectId = params.subjectId as string;
    const router = useRouter();
    const { data: session } = useSession();
    const [assessment, setAssessment] = useState<AssessmentDTO>({
        id: uuidv4(),
        questions: []
    });
    const [newQuestion, setNewQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addQuestion = () => {
        if (!newQuestion.trim()) return;

        const newQuestionItem: AssessmentQuestion = {
            id: uuidv4(),
            question: newQuestion.trim()
        };

        setAssessment(prev => ({
            ...prev,
            questions: [...prev.questions, newQuestionItem]
        }));
        setNewQuestion('');
        setError(null);
    };

    const removeQuestion = (id: string) => {
        setAssessment(prev => ({
            ...prev,
            questions: prev.questions.filter(q => q.id !== id)
        }));
    };

    const updateQuestion = (id: string, newText: string) => {
        setAssessment(prev => ({
            ...prev,
            questions: prev.questions.map(q =>
                q.id === id ? { ...q, question: newText } : q
            )
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.token || assessment.questions.length === 0) return;

        try {
            setIsLoading(true);
            setError(null);

            await postSaveAssessment(
                session.user.token,
                subjectId,
                assessment
            );

            router.push(`/dashboard/test/create`);
        } catch (error) {
            console.error('Failed to save assessment:', error);
            setError('Не удалось сохранить опрос');
        } finally {
            setIsLoading(false);
        }
    };

    const generateNewId = () => {
        setAssessment(prev => ({
            ...prev,
            id: uuidv4()
        }));
    };

    const resetForm = () => {
        setAssessment({
            id: uuidv4(),
            questions: []
        });
        setNewQuestion('');
        setError(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-indigo-800 mb-2">Конструктор опросов</h1>
                    <p className="text-lg text-indigo-600">Создайте новый опрос</p>
                    <p className="text-lg text-indigo-600">Ответом на каждый вопрос должна быть численная оценка!</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="assessment-id" className="block text-sm font-medium text-gray-700 flex items-center">
                                <svg className="w-4 h-4 mr-1 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                ID опроса
                            </label>
                            <button
                                type="button"
                                onClick={generateNewId}
                                className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center"
                            >
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Сгенерировать новый
                            </button>
                        </div>
                        <input
                            type="text"
                            id="assessment-id"
                            value={assessment.id}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm font-mono"
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Введите текст вопроса"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addQuestion())}
                            />
                            <button
                                type="button"
                                onClick={addQuestion}
                                disabled={!newQuestion.trim()}
                                className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${newQuestion.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                            >
                                Добавить
                            </button>
                        </div>

                        {assessment.questions.length > 0 ? (
                            <ul className="space-y-3">
                                {assessment.questions.map((q, index) => (
                                    <li key={q.id} className="group flex items-start p-3 bg-gray-50 rounded-lg shadow-sm border border-gray-200 hover:border-indigo-200 transition-colors">
                                        <span className="mr-3 bg-indigo-100 text-indigo-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium flex-shrink-0">
                                            {index + 1}
                                        </span>
                                        <input
                                            type="text"
                                            value={q.question}
                                            onChange={(e) => updateQuestion(q.id, e.target.value)}
                                            className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none text-gray-700"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(q.id)}
                                            className="ml-3 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Удалить вопрос"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">Нет добавленных вопросов</p>
                                <p className="text-xs text-gray-400 mt-1">Добавьте первый вопрос выше</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                        <button
                            type="button"
                            onClick={resetForm}
                            disabled={assessment.questions.length === 0}
                            className={`px-4 py-2 border rounded-md shadow-sm text-sm font-medium flex items-center justify-center ${assessment.questions.length > 0 ? 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300' : 'text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Очистить все
                        </button>
                        <button
                            type="submit"
                            disabled={assessment.questions.length === 0 || isLoading}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white flex items-center justify-center ${assessment.questions.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                    </svg>
                                    Сохранить опрос
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
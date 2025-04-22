'use client'

import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {AssessmentDTO, AssessmentQuestion, SaveAssessmentRequestDTO} from "@/app/lib/api/ui-interfaces";
import {useParams, useRouter} from "next/navigation";
import {postSaveAssessment} from "@/app/lib/api/assessment-api";
import {useSession} from "next-auth/react";


export default function AssessmentCreator() {
    const params = useParams()["subjectId"]
    const router = useRouter();
    const { data: session } = useSession();
    const [assessment, setAssessment] = useState<AssessmentDTO>({
        id: uuidv4(),
        questions: []
    });

    const [newQuestion, setNewQuestion] = useState('');

    const addQuestion = () => {
        if (newQuestion.trim()) {
            const newQuestionItem: AssessmentQuestion = {
                id: uuidv4(),
                question: newQuestion.trim()
            };

            setAssessment(prev => ({
                ...prev,
                questions: [...prev.questions, newQuestionItem]
            }));
            setNewQuestion('');
        }
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        postSaveAssessment(
            session.user.token,
            params,
            assessment
        ).then(r => console.log(r))
        alert("Опрос успешно создан!");
        router.push(`/dashboard/test/create`)
        console.log('Создан опрос:', assessment);
        // Здесь можно добавить API вызов для сохранения
    };

    const generateNewId = () => {
        setAssessment(prev => ({
            ...prev,
            id: uuidv4()
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Конструктор опросов</h1>
                    <p className="text-lg text-gray-600">Создайте новый опрос с уникальными вопросами</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <label htmlFor="assessment-id" className="block text-sm font-medium text-gray-700">
                                ID опроса
                            </label>
                            <button
                                type="button"
                                onClick={generateNewId}
                                className="text-xs text-indigo-600 hover:text-indigo-800"
                            >
                                Сгенерировать новый ID
                            </button>
                        </div>
                        <input
                            type="text"
                            id="assessment-id"
                            value={assessment.id}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 text-sm"
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                value={newQuestion}
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder="Введите текст вопроса"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                onKeyDown={(e) => e.key === 'Enter' && addQuestion()}
                            />
                            <button
                                type="button"
                                onClick={addQuestion}
                                disabled={!newQuestion.trim()}
                                className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${newQuestion.trim() ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                Добавить вопрос
                            </button>
                        </div>

                        {assessment.questions.length > 0 ? (
                            <ul className="space-y-3">
                                {assessment.questions.map((q, index) => (
                                    <li key={q.id} className="group flex items-start p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                                        <span className="mr-3 text-gray-500 mt-1">{index + 1}.</span>
                                        <input
                                            type="text"
                                            value={q.question}
                                            onChange={(e) => updateQuestion(q.id, e.target.value)}
                                            className="flex-1 bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeQuestion(q.id)}
                                            className="ml-3 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center py-6 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">Нет добавленных вопросов</p>
                                <p className="text-sm text-gray-400 mt-1">Начните добавлять вопросы выше</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                        <button
                            type="button"
                            onClick={() => setAssessment({ id: uuidv4(), questions: [] })}
                            disabled={assessment.questions.length === 0}
                            className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${assessment.questions.length > 0 ? 'text-gray-700 bg-white hover:bg-gray-50' : 'text-gray-400 bg-gray-100 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            Очистить все
                        </button>
                        <button
                            type="submit"
                            disabled={assessment.questions.length === 0}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${assessment.questions.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-300 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            Сохранить опрос
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
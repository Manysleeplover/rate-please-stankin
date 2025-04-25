'use client';

import { useEffect, useState } from 'react';
import { AssessmentDTO } from "@/app/lib/api/ui-interfaces";
import { useParams, useRouter } from "next/navigation";
import {deleteAssessmentById, getGetAssessmentById} from "@/app/lib/api/assessment-api";
import {useSession} from "next-auth/react";

export default function AssessmentViewer() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams();
    const assessmentId = params.assessmentId as string;
    const [isDeleting, setIsDeleting] = useState(false);
    const [assessment, setAssessment] = useState<AssessmentDTO | null>();
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading' || !assessmentId || !session?.user?.token) {
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const resp = await getGetAssessmentById(session.user.token, assessmentId);
                setAssessment(resp);
                setError(null);
            } catch (error) {
                console.error('Error fetching assessment:', error);
                setError('Не удалось загрузить опрос');
                setAssessment(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [assessmentId, session?.user?.token, status]);

    const handleDelete = async () => {
        if (!confirm('Вы уверены, что хотите удалить этот опрос?')) return;

        try {
            setIsDeleting(true);
            await deleteAssessmentById(session.user.token, assessmentId);
            router.push('/dashboard/assessments');
        } catch (error) {
            console.error('Ошибка при удалении опроса:', error);
            setError('Не удалось удалить опрос');
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

    if (error || !assessment) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 text-lg">{error || 'Опрос не найден'}</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8 transition-all hover:shadow-lg">
                {/* Шапка с информацией об опросе */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Опрос #{assessment.id}
                            </h2>
                            <p className="text-gray-600">
                                Создан: {new Date().toLocaleDateString('ru-RU')}
                            </p>
                        </div>
                        <button
                            onClick={handleDelete}
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
                                'Удалить опрос'
                            )}
                        </button>
                    </div>
                </div>

                {/* Список вопросов */}
                <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Вопросы ({assessment.questions.length})
                    </h3>

                    {assessment.questions.length === 0 ? (
                        <div className="text-center py-6 bg-gray-50 rounded-lg">
                            <p className="text-gray-500">Нет вопросов в этом опросе</p>
                        </div>
                    ) : (
                        assessment.questions.map((question, index) => (
                            <div key={question.id} className="bg-gray-50 rounded-lg p-5 shadow-sm border border-gray-100">
                                <div className="flex items-start">
                                    <span className="flex-shrink-0 bg-blue-100 text-blue-800 text-sm font-medium mr-3 px-2.5 py-0.5 rounded-full">
                                        {index + 1}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-800">{question.question}</h3>
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

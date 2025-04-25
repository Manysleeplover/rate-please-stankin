'use client'

import {useEffect, useState, useRef} from 'react';
import {useParams, useRouter} from "next/navigation";
import {AssessmentDTO, PassedAssessmentRequestDTO} from "@/app/lib/api/ui-interfaces";
import {getGetAssessmentById, postSubmitAssessmentRatings} from "@/app/lib/api/assessment-api";
import {useSession} from "next-auth/react";

export default function AssessmentForm() {
    const params = useParams();
    const router = useRouter();
    const assessmentId = params?.assessmentId as string;
    const { data: session, status } = useSession();
    const [assessment, setAssessment] = useState<AssessmentDTO | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const ratingsRef = useRef<Record<string, {question: string; rate: number | null}>>({});

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
                // Инициализируем ratingsRef
                ratingsRef.current = resp.questions.reduce((acc, question) => {
                    acc[question.id] = {
                        question: typeof question.question === 'number'
                            ? question.question.toString()
                            : question.question,
                        rate: null
                    };
                    return acc;
                }, {} as Record<string, {question: string; rate: number | null}>);
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

    const handleRatingChange = (questionId: string, rate: number | null) => {
        if (ratingsRef.current[questionId]) {
            ratingsRef.current[questionId].rate = rate;
        }
    };

    const handleSubmit = async () => {
        if (!assessmentId || !session?.user?.token) {
            setError('Не авторизован или отсутствует ID опроса');
            return;
        }

        // Преобразуем оценки в массив PassedAssessmentRequestDTO
        const ratings: PassedAssessmentRequestDTO[] = Object.entries(ratingsRef.current)
            .map(([id, {question, rate}]) => ({
                id,
                question,
                rate: rate || 0 // если rate null (чего быть не должно после валидации), ставим 0
            }));

        // Проверяем, что все вопросы оценены
        const allRated = ratings.every(item => item.rate !== null && item.rate > 0);
        if (!allRated) {
            setError('Пожалуйста, оцените все вопросы');
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            await postSubmitAssessmentRatings(
                session.user.token,
                assessmentId,
                ratings
            );

            // Перенаправляем после успешной отправки
            alert("Оценки успешно отправлены");
            router.push('/dashboard/schedule');
        } catch (error) {
            console.error('Error submitting ratings:', error);
            setError('Не удалось отправить оценки. Пожалуйста, попробуйте снова.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'loading' || isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (!assessment) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500 text-lg">Опрос не найден</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-indigo-800 mb-2">Оценка занятия</h1>
                    <p className="text-lg text-indigo-600">Пожалуйста, оцените каждый вопрос по 10-балльной шкале</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {assessment?.questions.map((question, index) => (
                        <QuestionRating
                            key={question.id}
                            questionId={question.id}
                            question={typeof question.question === 'number'
                                ? question.question
                                : question.question}
                            index={index}
                            isLast={index === assessment?.questions.length - 1}
                            onRatingChange={(rate) => handleRatingChange(question.id, rate)}
                        />
                    ))}

                    <div className="px-6 py-5 bg-gray-50 text-right">
                        {error && (
                            <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
                        )}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Отправка...
                                </>
                            ) : 'Отправить оценки'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface QuestionRatingProps {
    questionId: string;
    question: string;
    index: number;
    isLast: boolean;
    onRatingChange: (rating: number | null) => void;
}

function QuestionRating({questionId, question, index, isLast, onRatingChange}: QuestionRatingProps) {
    const [rating, setRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

    const handleRating = (ratingValue: number) => {
        setRating(ratingValue);
        onRatingChange(ratingValue);
    };

    return (
        <div className={`px-6 py-5 ${!isLast ? 'border-b border-gray-200' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-lg font-medium text-gray-800 mb-2 sm:mb-0">
                    {index + 1}. {question}
                </p>
                <div className="flex items-center">
                    <div className="flex">
                        {[...Array(10)].map((_, i) => {
                            const ratingValue = i + 1;
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    className="focus:outline-none"
                                    onClick={() => handleRating(ratingValue)}
                                    onMouseEnter={() => setHoverRating(ratingValue)}
                                    onMouseLeave={() => setHoverRating(null)}
                                >
                                    <StarIcon
                                        filled={
                                            (hoverRating !== null && ratingValue <= hoverRating) ||
                                            (hoverRating === null && rating !== null && ratingValue <= rating)
                                        }
                                    />
                                </button>
                            );
                        })}
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-500">
                        {rating !== null ? `${rating}/10` : "0/10"}
                    </span>
                </div>
            </div>
        </div>
    );
}

function StarIcon({filled}: { filled: boolean }) {
    return (
        <svg
            className={`w-8 h-8 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
    );
}
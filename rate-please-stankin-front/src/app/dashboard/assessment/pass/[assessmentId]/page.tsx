'use client'

import { useState } from 'react';
import {AssessmentDTO} from "@/app/lib/api/ui-interfaces";
const defaultQuestions: AssessmentDTO = {
    questions: [
        "Насколько чётко и понятно были сформулированы цели занятия?",
        "Насколько материал занятия соответствовал заявленной теме?",
        "Оцените уровень подготовки преподавателя (знание предмета, умение объяснять)?",
        "Насколько интересно и вовлекающе было проведено занятие?",
        "Были ли полезны использованные материалы (презентации, раздатки, примеры)?",
        "Насколько эффективно преподаватель отвечал на вопросы?",
        "Оцените баланс теории и практики на занятии.",
        "Насколько комфортной была атмосфера во время занятия?",
        "Считаете ли вы, что полученные знания можно применить на практике?",
        "Как бы вы оценили общую организацию занятия (тайминг, логичность изложения)?",
        "Были ли учтены индивидуальные особенности обучающихся?",
        "Хотели бы вы рекомендовать подобные занятия другим?"
    ]
};

export default function AssessmentForm({ questionList = defaultQuestions.questions }: { questionList?: string[] }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-indigo-800 mb-2">Оценка вопросов</h1>
                    <p className="text-lg text-indigo-600">Пожалуйста, оцените каждый вопрос по 10-балльной шкале</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {questionList.map((question, index) => (
                        <QuestionRating
                            key={index}
                            question={question}
                            index={index}
                            isLast={index === questionList.length - 1}
                        />
                    ))}

                    <div className="px-6 py-5 bg-gray-50 text-right">
                        <button
                            type="submit"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Отправить оценки
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuestionRating({ question, index, isLast }: { question: string; index: number; isLast: boolean }) {
    const [rating, setRating] = useState<number | null>(null);
    const [hoverRating, setHoverRating] = useState<number | null>(null);

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
                                    onClick={() => setRating(ratingValue)}
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

function StarIcon({ filled }: { filled: boolean }) {
    return (
        <svg
            className={`w-8 h-8 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
    );
}
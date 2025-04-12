'use client'

import { useState } from 'react';
import {TaskForClassDTO} from "@/app/lib/api/ui-interfaces";

type TestFormProps = {
    questions: TaskForClassDTO | undefined;
};

export default function TestForm({ questions }: TestFormProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions?.taskList[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions?.taskList.length - 1;

    const handleAnswerSelect = (questionId: string, answerId: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answerId
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions?.taskList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        let correctAnswers = 0;

        questions?.taskList.forEach(question => {
            const selectedAnswerId = selectedAnswers[question.id];
            if (selectedAnswerId) {
                const selectedAnswer = question.answers.find(a => a.id === selectedAnswerId);
                if (selectedAnswer?.isCorrect) {
                    correctAnswers++;
                }
            }
        });

        setScore(Math.round((correctAnswers / questions?.taskList.length) * 100));
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Результаты теста</h2>
                <p className="text-lg mb-4">Ваш результат: {score}%</p>
                <button
                    onClick={() => {
                        setCurrentQuestionIndex(0);
                        setSelectedAnswers({});
                        setIsSubmitted(false);
                        setScore(0);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Пройти тест снова
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4">
        <span className="text-gray-600">
          Вопрос {currentQuestionIndex + 1} из {questions.taskList.length}
        </span>
            </div>

            <h2 className="text-xl font-bold mb-4">{currentQuestion.title}</h2>

            <div className="space-y-2 mb-6">
                {currentQuestion.answers.map(answer => (
                    <div key={answer.id} className="flex items-center">
                        <input
                            type="radio"
                            id={answer.id}
                            name={currentQuestion.id}
                            checked={selectedAnswers[currentQuestion.id] === answer.id}
                            onChange={() => handleAnswerSelect(currentQuestion.id, answer.id)}
                            className="mr-2"
                        />
                        <label htmlFor={answer.id}>{answer.text}</label>
                    </div>
                ))}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 py-2 rounded ${currentQuestionIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
                >
                    Назад
                </button>

                {!isLastQuestion ? (
                    <button
                        onClick={handleNextQuestion}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Следующий вопрос
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Завершить тест
                    </button>
                )}
            </div>
        </div>
    );
}
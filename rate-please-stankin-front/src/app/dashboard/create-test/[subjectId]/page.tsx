"use client";

import {useState} from "react";
import {useFieldArray, useForm} from "react-hook-form";
import {useParams, useRouter} from "next/navigation";
import {SaveTaskForClassRequest, TestFormData} from "@/app/lib/api/ui-interfaces";
import {saveTaskForClass} from "@/app/lib/api/task-for-class-api";

export default function TestCreatorForm() {
    const params = useParams()["subjectId"]
    const router = useRouter();

    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const { register, control, handleSubmit, watch, setValue } = useForm<TestFormData>({
        defaultValues: {
            questions: [
                {
                    id: crypto.randomUUID(),
                    title: "",
                    answers: [
                        { id: crypto.randomUUID(), text: "", isCorrect: false },
                        { id: crypto.randomUUID(), text: "", isCorrect: false },
                    ],
                },
            ],
        },
    });

    const { fields: questions, append: appendQuestion, remove: removeQuestion } = useFieldArray({
        control,
        name: "questions",
    });

    const addNewQuestion = () => {
        appendQuestion({
            id: crypto.randomUUID(),
            title: "",
            answers: [
                { id: crypto.randomUUID(), text: "", isCorrect: false },
                { id: crypto.randomUUID(), text: "", isCorrect: false },
            ],
        });
        setActiveQuestion(questions.length);
    };

    const deleteQuestion = (index: number) => {
        removeQuestion(index);
        if (activeQuestion >= index) {
            setActiveQuestion(Math.max(0, activeQuestion - 1));
        }
    };

    const addNewAnswer = (questionIndex: number) => {
        const currentAnswers = watch(`questions.${questionIndex}.answers`);
        setValue(`questions.${questionIndex}.answers`, [
            ...currentAnswers,
            { id: crypto.randomUUID(), text: "", isCorrect: false }
        ]);
    };

    const removeAnswer = (questionIndex: number, answerIndex: number) => {
        const currentAnswers = watch(`questions.${questionIndex}.answers`);
        const newAnswers = currentAnswers.filter((_, idx) => idx !== answerIndex);
        setValue(`questions.${questionIndex}.answers`, newAnswers);
    };

    const setCorrectAnswer = (questionIndex: number, answerIndex: number) => {
        const currentAnswers = watch(`questions.${questionIndex}.answers`);
        const newAnswers = currentAnswers.map((answer, idx) => ({
            ...answer,
            isCorrect: idx === answerIndex
        }));
        setValue(`questions.${questionIndex}.answers`, newAnswers);
    };

    const onSubmit = (data: TestFormData) => {
        console.log("Форма отправлена:", data);

        const request: SaveTaskForClassRequest = {
            id: params,
            questions: data.questions
        }
        console.log(request)

        saveTaskForClass(request).then(r => console.log(r))
        alert("Тест успешно создан!");
        router.push(`/dashboard/create-test`)
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6">Создание теста</h1>

            <div className="flex mb-4 overflow-x-auto pb-2">
                {questions.map((question, index) => (
                    <button
                        key={question.id}
                        onClick={() => setActiveQuestion(index)}
                        className={`px-4 py-2 mr-2 rounded-md ${
                            activeQuestion === index
                                ? "bg-stankin_blue text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                    >
                        Вопрос {index + 1}
                    </button>
                ))}
                <button
                    onClick={addNewQuestion}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    +
                </button>
            </div>

            {questions.length > 0 && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                Вопрос {activeQuestion + 1}
                            </h2>
                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => deleteQuestion(activeQuestion)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Удалить вопрос
                                </button>
                            )}
                        </div>

                        <input
                            {...register(`questions.${activeQuestion}.title`)}
                            placeholder="Введите вопрос"
                            className="w-full p-3 border border-gray-300 rounded-md mb-4"
                            required
                        />

                        <h3 className="font-medium mb-2">Варианты ответов:</h3>
                        <div className="space-y-3 mb-4">
                            {watch(`questions.${activeQuestion}.answers`)?.map((answer, index) => (
                                <div key={answer.id} className="flex items-center">
                                    <input
                                        type="radio"
                                        name={`correctAnswer-${activeQuestion}`}
                                        checked={answer.isCorrect}
                                        onChange={() => setCorrectAnswer(activeQuestion, index)}
                                        className="mr-3"
                                    />
                                    <input
                                        {...register(
                                            `questions.${activeQuestion}.answers.${index}.text`
                                        )}
                                        placeholder={`Вариант ${index + 1}`}
                                        className="flex-1 p-2 border border-gray-300 rounded-md"
                                        required
                                    />
                                    {watch(`questions.${activeQuestion}.answers`).length > 2 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAnswer(activeQuestion, index)}
                                            className="ml-2 text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => addNewAnswer(activeQuestion)}
                            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 mb-6"
                        >
                            + Добавить вариант ответа
                        </button>
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-stankin_blue text-white rounded-md hover:bg-blue-700"
                        >
                            Сохранить тест
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
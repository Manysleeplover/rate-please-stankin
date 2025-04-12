"use client";

import TestForm from "@/app/ui/task-for-class/TaskForClassForm";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {getTaskForClassByTaskId} from "@/app/lib/api/task-for-class-api";
import {TaskForClassDTO} from "@/app/lib/api/ui-interfaces";


export default function TestPage() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const params = useParams()["testId"]
    const [taskForClass, setTaskForClass] = useState<TaskForClassDTO>()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await getTaskForClassByTaskId(params);
                setTaskForClass(resp)
            } catch (error) {
                console.error('Error fetching schedule:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="p-4 max-w-md mx-auto">
                Загрузка...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Тестирование</h1>
                <TestForm questions={taskForClass} />
            </div>
        </div>
    );
}
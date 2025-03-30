'use client'


import React, {useEffect} from "react";
import {useRouter} from 'next/navigation'; // Используем useRouter из next/navigation
import {getToken} from '@/app/lib/security/auth';


export default function CreateTestPage() {
    const router = useRouter(); // Инициализируем роутер
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/sign-in'); // Перенаправление, если пользователь не авторизован
        }
    }, [router]); // Добавляем router в зависимости useEffect




    return (
        <main className="w-2/3 ml-auto mr-auto">
            Создание тестов
        </main>
    )
}
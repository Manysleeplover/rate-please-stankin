'use client' // Убедитесь, что компонент является клиентским

import { useRouter } from 'next/navigation'; // Используем useRouter из next/navigation
import { getToken } from '@/app/lib/security/auth';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter(); // Инициализируем роутер

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/sign-in'); // Перенаправление, если пользователь не авторизован
        }
    }, [router]); // Добавляем router в зависимости useEffect

    return <p>Домашняя страница</p>;
}
'use client' // Убедитесь, что компонент является клиентским

import { useRouter } from 'next/navigation'; // Используем useRouter из next/navigation
import {getToken, removeToken} from '@/app/lib/security/auth';
import { useEffect } from 'react';

export default function Page() {
    const router = useRouter(); // Инициализируем роутер


    function handleClick() {
        removeToken()
    }

    return (
        <>
            <button
                onClick={() => handleClick()}
            >
                Очистить куки
            </button>
            <p>Домашняя страница</p>

        </>
    );
}
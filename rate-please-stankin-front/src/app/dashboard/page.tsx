'use client' // Убедитесь, что компонент является клиентским

import {removeToken} from '@/app/lib/security/auth';

export default function Page() {
 // Инициализируем роутер
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
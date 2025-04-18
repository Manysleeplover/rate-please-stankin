'use client'

import LoginForm from "@/app/ui/login/login-form";
import LoginBackgroundImage from "@/app/ui/login/login-background-image";
import StankinLogo from "@/app/ui/common/stankin-logo";
import { useRouter } from 'next/navigation'; // Используем useRouter из next/navigation
import { getToken } from '@/app/lib/security/auth';
import {Suspense, useEffect} from 'react';


export default function SignInPage() {
    const router = useRouter(); // Инициализируем роутер

    useEffect(() => {
        const token = getToken();
        if (token) {
            router.push('/dashboard'); // Перенаправление, если пользователь не авторизован
        }
    }, [router]); // Добавляем router в зависимости useEffect



    return (
        <main className="flex   justify-center md:h-screen">
            <div>
                <StankinLogo width={300} height={300} />
                <div>
                    <Suspense>
                        <LoginForm/>
                    </Suspense>
                </div>
                <LoginBackgroundImage/>
            </div>

        </main>
    );
}



'use client'

import { Button } from "@/app/ui/common/button";
import { SetStateAction, useState } from 'react';
import { AtSymbolIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { singUpAPIRequest } from "@/app/lib/api/login-form-api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {setCoolie} from "@/app/lib/cookies/auth";

export default function SignUpForm() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleUsernameInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setUsername(event.target.value);
    };

    const handleEmailInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handlePasswordInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    const handleEnterButtonAction = async (event: React.FormEvent) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        try {
            const response = await singUpAPIRequest({ username, email, password });
            setCoolie(response);
            router.push('/dashboard');
            // Здесь можно добавить редирект или другие действия после успешной регистрации
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleEnterButtonAction} className="space-y-3">
            <div className="flex-1 border-2 rounded-lg bg-white px-6 pb-4 pt-4">
                <h1 className="mb-3 text-xl">Регистрация</h1>
                <div className="w-full">
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="username"
                        >
                            Имя пользователя
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="username"
                                placeholder="Введите имя пользователя"
                                required
                                onChange={handleUsernameInputChange}
                            />
                            <UserIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Введите email"
                                required
                                onChange={handleEmailInputChange}
                            />
                            <AtSymbolIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                            htmlFor="password"
                        >
                            Пароль
                        </label>
                        <div className="relative">
                            <input
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Введите пароль"
                                required
                                minLength={6}
                                onChange={handlePasswordInputChange}
                            />
                            <KeyIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                            />
                        </div>
                    </div>
                </div>
                <Button
                    type="submit" // Указываем тип кнопки как submit
                    className="items-center justify-center mt-4 w-full"
                >
                    Зарегистрироваться
                </Button>
                <div className="pt-3 pb-1">
                    <Link
                        href="/login"
                        className="underline text-stankin_blue"
                    >
                        Войти
                    </Link>
                </div>
            </div>
        </form>
    );
}
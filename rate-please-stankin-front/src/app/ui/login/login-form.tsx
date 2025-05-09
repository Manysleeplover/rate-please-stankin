'use client'

import {Button} from "@/app/ui/common/button";
import React, {useActionState} from 'react';
import {ExclamationCircleIcon, KeyIcon, UserIcon} from "@heroicons/react/16/solid";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {authenticate} from '@/app/lib/actions';

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    const [errorMessage, formAction] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <form action={formAction} className="space-y-3">
            <div className="flex-1 border-2 rounded-lg bg-white px-6 pb-4 pt-4">
                <h1 className="mb-3 text-xl">Вход</h1>
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
                                id="username"
                                type="username"
                                name="username"
                                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                                placeholder="Введите имя пользователя"
                                required
                            />
                            <UserIcon
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
                            />
                            <KeyIcon
                                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"
                            />
                        </div>
                    </div>
                </div>
                <input type="hidden" name="redirectTo" value={callbackUrl}/>
                <Button
                    type="submit" // Указываем тип кнопки как submit
                    className="items-center justify-center mt-4 w-full aria-disabled={isPending}"
                >
                    Войти
                </Button>
                <div className="pt-3 pb-1">
                    <Link
                        href="/sign-up"
                        className="underline text-stankin_blue"
                    >
                        Зарегистрироваться
                    </Link>
                </div>
                {errorMessage && (
                    <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    </>
                )}
            </div>
        </form>
    );
}
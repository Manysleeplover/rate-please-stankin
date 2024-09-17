import {Button} from "@/app/ui/common/button";
import {authenticate} from '@/app/lib/actions';
import {useActionState} from 'react';

// /* Form Log In */
//
// box-sizing: border-box;
//
// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 24px;
// gap: 24px;
//
// position: absolute;
// width: 320px;
// min-width: 320px;
// height: 316px;
// left: 560px;
// top: 351px;
//
// background: rgba(255, 255, 255, 0.33);
// border: 1px solid #D9D9D9;
// border-radius: 8px;


export default function LoginForm() {
    return <form className="space-y-3 ">
        <div className="flex-1 border-2 rounded-lg bg-white px-6 pb-4 pt-4">
            <h1 className={` mb-3 text-xl`}>
                Вход
            </h1>
            <div className="w-full">
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
                    </div>
                </div>
            </div>
            <Button className=" items-center justify-center mt-4 w-full">
                Войти
            </Button>
            <div className="pt-3 pb-1">
                <a
                    href={`ur`}
                    className="underline text-stankin_blue"
                >
                    Зарегистрироваться
                </a>
            </div>
        </div>
    </form>
}

/* Text Link */


import Cookies from 'js-cookie';
import {JwtAuthenticationResponse} from "@/app/lib/api/ui-interfaces";

// Сохранение токена в куки
export const setToken = (token: string) => {
    Cookies.set('token', token, { expires: 1 }); // Кука на 1 день
};

// Получение токена из кук
export const getToken = () => {
    return Cookies.get('token');
};
export const getRole = () => {
    return Cookies.get('role');
};
export const getUsername = () => {
    return Cookies.get('username');
};

// Удаление токена
export const removeToken = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    Cookies.remove('role');
};

export const setCoolie = (params: JwtAuthenticationResponse) => {
    Cookies.set("token", params.token, { expires: 1 })
    Cookies.set("username", params.username, { expires: 1 })
    Cookies.set("role", params.role, { expires: 1 })
}
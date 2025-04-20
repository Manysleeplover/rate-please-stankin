import {AxiosHeaders, AxiosHeaderValue} from "axios";

/**
 * Генерирует хедеры по умолчанию
 * @returns Объект с хедерами
 */
export function getDefaultHeaders(token: string): AxiosHeaders {
    const headers = new AxiosHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('Accept-Language', 'ru-RU,ru;q=0.9');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
}


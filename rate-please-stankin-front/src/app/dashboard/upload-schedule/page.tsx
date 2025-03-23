'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Используем useRouter из next/navigation
import { getToken } from '@/app/lib/security/auth';

const FileUploadComponent = () => {
    const router = useRouter(); // Инициализируем роутер
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/sign-in'); // Перенаправление, если пользователь не авторизован
        }
    }, [router]);




    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    // Обработчик выбора файла
    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Сохраняем выбранный файл в состоянии
    };

    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setMessage('Пожалуйста, выберите файл');
            return;
        }

        // Создаем объект FormData
        const formData = new FormData();
        formData.append('pdfFile', file); // 'pdfFile' — имя поля, которое ожидает сервер

        try {
            // Отправляем файл на сервер
            const response = await axios.post('http://localhost:3030/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Указываем тип содержимого
                },
            });

            // Обрабатываем ответ от сервера
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Ошибка при загрузке файла');
            console.error('Ошибка:', error);
        }
    };

    return (
        <div>
            <h1>Загрузка файла</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
                <button type="submit">Загрузить</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUploadComponent;
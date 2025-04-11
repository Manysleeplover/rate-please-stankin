'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getToken } from '@/app/lib/security/auth';

const FileUploadComponent = () => {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/sign-in');
        }
    }, [router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setMessage('Пожалуйста, выберите файл');
            return;
        }

        const formData = new FormData();
        formData.append('pdfFile', file);

        try {
            const response = await axios.post('http://localhost:3030/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage('Ошибка при загрузке файла');
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4">Загрузка файла</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Выберите PDF файл:
                    </label>
                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-stankin_blue text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Загрузить
                </button>
            </form>

            {message && (
                <p className={`mt-4 p-2 rounded-md ${
                    message.includes('Ошибка')
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                }`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default FileUploadComponent;
'use client'

import {Schedule} from "@/app/ui/schedule/subject-layout";

import React, {useEffect, useState} from "react";
import MyCalendar from "@/app/ui/schedule/calendar";
import {DailyScheduleDTO} from "@/app/lib/api/ui-interfaces";
import { useRouter } from 'next/navigation'; // Используем useRouter из next/navigation
import { getToken } from '@/app/lib/security/auth';





export default function SchedulePage() {
    const router = useRouter(); // Инициализируем роутер
    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push('/sign-in'); // Перенаправление, если пользователь не авторизован
        }
    }, [router]); // Добавляем router в зависимости useEffect


    const [date, setDate] = useState(new Date());
    const [dailyScheduleList, setDailyScheduleList] = useState<DailyScheduleDTO[]>()


    return (
        <main className="w-2/3 ml-auto mr-auto">
            <MyCalendar
                targetDate={date}
                onChangeDate={setDate}
                onChangeSchedule={setDailyScheduleList}
            />
            <div className=" rounded-xl bg-gray-50 p-2 shadow-sm border-gray-200 ">
                <div>
                    <Schedule subjects={dailyScheduleList}/>
                </div>
            </div>
        </main>
    )
}
'use client';

import {Schedule} from "@/app/ui/schedule/Schedule";
import React, {useState} from "react";
import MyCalendar from "@/app/ui/schedule/calendar";
import {DailyScheduleDTO, ScheduleType} from "@/app/lib/api/ui-interfaces";
import {useRouter} from 'next/navigation';
import {getStudentInfoDTOCookie} from "@/app/lib/cookies/cookies";

interface SchedulePageProps {
    group?: string;
    type?: ScheduleType;
}

export default function SchedulePage({
                                         group,
                                         type = ScheduleType.StudentSchedule
                                     }: SchedulePageProps) {
    const router = useRouter();
    const studentInfoDTOCookie = getStudentInfoDTOCookie()

    const [date, setDate] = useState(new Date());
    const [dailyScheduleList, setDailyScheduleList] = useState<DailyScheduleDTO[]>();

    return (
        <main className="w-2/3 ml-auto mr-auto">
            { !!studentInfoDTOCookie &&
                <>
                    <MyCalendar
                        targetDate={date}
                        onChangeDate={setDate}
                        onChangeSchedule={setDailyScheduleList}
                        group={studentInfoDTOCookie.userInfo.stgroup }
                    />
                    <div className="rounded-xl bg-gray-50 p-2 shadow-sm border-gray-200">
                        <div>
                            <Schedule
                                subjects={dailyScheduleList}
                                type={type}
                            />
                        </div>
                    </div>
                </>
            }

        </main>
    );
}
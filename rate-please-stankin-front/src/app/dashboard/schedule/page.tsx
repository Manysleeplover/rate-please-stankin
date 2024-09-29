'use client'

import {Subject} from "@/app/ui/schedule/subject-layout";
import scheduleMock from "@/app/lib/mocks/schedule-mock";
import Calendar from 'react-calendar';
import {useState} from "react";
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


export default function SchedulePage() {
    const [value, onChange] = useState<Value>(new Date());
    const subjects = scheduleMock
    return (
        <main className="w-2/3 ml-auto mr-auto">
            <Calendar onChange={onChange} value={value} />
            <div className=" rounded-xl bg-gray-50 p-2 shadow-sm border-gray-200 ">
                <div>
                    <Subject subjects={subjects}/>
                </div>
            </div>
        </main>
    )
}
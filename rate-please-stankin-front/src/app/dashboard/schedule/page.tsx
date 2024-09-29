'use client'

import {Calendar} from "@nextui-org/calendar";
import {parseDate} from "@internationalized/date";
import {Subject} from "@/app/ui/schedule/subject-layout";
import scheduleMock from "@/app/lib/mocks/schedule-mock";


export default function SchedulePage() {
    const subjects = scheduleMock
    return (
        <main className="w-2/3 ml-auto mr-auto">
            <div className="flex gap-x-4">

                <Calendar aria-label="Date (No Selection)" className=""/>
                <Calendar aria-label="Date (Uncontrolled)" defaultValue={parseDate("2020-02-03")}/>

            </div>
            {/*<CalendarDateRangeIcon width={100} height={100}/>*/}
            <div className=" rounded-xl bg-gray-50 p-2 shadow-sm border-gray-200 border-2">
                <div>
                    <Subject subjects={subjects}/>
                </div>
            </div>
        </main>
    )
}
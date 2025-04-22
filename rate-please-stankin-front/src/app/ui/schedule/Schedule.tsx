import {FC} from "react";
import {getLesionStyle, getSubGroupStyle} from "@/app/ui/dashboard/schedule/style";
import {DailyScheduleDTO, ScheduleType} from "@/app/lib/api/ui-interfaces";
import {Time} from "@internationalized/date";
import {BookOpenIcon, PencilIcon, StarIcon} from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';


interface ScheduleProps {
    subjects: DailyScheduleDTO[] | undefined;
    type: ScheduleType
}

export const Schedule: FC<ScheduleProps> = ({subjects, type }) => {
    const router = useRouter(); // Инициализация роутера
    const handleCreateTest = (subject: DailyScheduleDTO) => {
        router.push(`/dashboard/test/create/${subject.id.toString()}`);
    };
    const handlePassTest = (subject: DailyScheduleDTO) => {
        router.push(`/dashboard/test/pass/${subject.testId.toString()}`);
    };
    const handleDeleteTest = (subject: DailyScheduleDTO) => {
        router.push(`/dashboard/test/delete/${subject.testId.toString()}`);
    };

    return (
        <>
            {subjects && subjects.length > 0?
                subjects
                    .sort((subject1, subject2) => parseTime(subject1.startTime) > parseTime(subject2.startTime) ? 1 : -1)
                    .map((subject) => {
                            return (
                                <div key={subject.id}>
                                    <div
                                         className="w-11/12 bg-white ml-auto mr-auto rounded-xl p-2 shadow-sm mt-2 mb-2 border-stankin_blue border-2">
                                        <div className="justify-between flex">
                                            <span className="text-stankin_blue">{subject.subject}</span>
                                            <span className="text-stankin_blue">{subject.startTime  + " - " + subject.endTime}</span>
                                        </div>
                                        <div className="mt-1 mb-1">{subject.stgroup}</div>
                                        <div className="mb-1 justify-between flex">
                                            <div>
                                                <span className={getLesionStyle(subject.type)}>{subject.type}</span>
                                                {!!(subject.subgroup) && (
                                                    <span
                                                        className={`${getSubGroupStyle(subject.subgroup)} ml-1`}>{subject.subgroup}</span>
                                                )
                                                }
                                            </div>
                                            { subject.testId === "null" && ((type === ScheduleType.CreateTaskSchedule) &&
                                                <button className="bg-stankin_blue text-white rounded-xl pl-2 pr-2"
                                                        onClick={() => handleCreateTest(subject)}
                                                >
                                                    <div className="justify-between flex">
                                                        <PencilIcon
                                                            height={20}
                                                            width={20}
                                                        />
                                                        Создать тест
                                                    </div>
                                                </button>
                                                )
                                            }

                                            {
                                                subject.testId !== "null" &&((type === ScheduleType.CreateTaskSchedule) &&
                                                    <button className="bg-stankin_blue text-white rounded-xl pl-2 pr-2"
                                                            onClick={() => handleDeleteTest(subject)}
                                                    >
                                                        <div className="justify-between flex">
                                                            <PencilIcon
                                                                height={20}
                                                                width={20}
                                                            />
                                                            Удалить тест
                                                        </div>
                                                    </button>
                                                )
                                            }

                                            { subject.testId === "null" && ((type === ScheduleType.CreateTaskSchedule) &&
                                                <button className="bg-stankin_blue text-white rounded-xl pl-2 pr-2"
                                                        onClick={() => handleCreateTest(subject)}
                                                >
                                                    <div className="justify-between flex">
                                                        <StarIcon
                                                            height={20}
                                                            width={20}
                                                        />
                                                        Создать опрос
                                                    </div>
                                                </button>
                                            )
                                            }

                                            {
                                                subject.testId !== "null" &&((type === ScheduleType.CreateTaskSchedule) &&
                                                    <button className="bg-stankin_blue text-white rounded-xl pl-2 pr-2"
                                                            onClick={() => handleDeleteTest(subject)}
                                                    >
                                                        <div className="justify-between flex">
                                                            <StarIcon
                                                                height={20}
                                                                width={20}
                                                            />
                                                            Удалить опрос
                                                        </div>
                                                    </button>
                                                )
                                            }

                                            { (type === ScheduleType.StudentSchedule) &&
                                            <button className="bg-stankin_blue text-white rounded-xl pl-2 pr-2">
                                                <div className="justify-between flex">
                                                    <StarIcon
                                                        height={20}
                                                        width={20}
                                                    />
                                                    Оценить занятие
                                                </div>
                                            </button>
                                            }
                                        </div>
                                        <div className="mb-1 justify-between flex">
                                            <span>
                                                {subject.teacher}
                                            </span>
                                            { (type === ScheduleType.StudentSchedule) && !!subject.testId && subject.testId != "null" &&
                                            <button
                                                className="bg-stankin_blue text-white rounded-xl pl-2 pr-2"
                                                onClick={() => handlePassTest(subject)}
                                            >
                                                <div className="justify-between flex">
                                                        <BookOpenIcon
                                                            height={20}
                                                            width={20}
                                                        />
                                                <span className="ml-1">Пройти задание</span>
                                                </div>
                                            </button>
                                            }
                                        </div>
                                        <div className="justify-between flex">
                                        <span>
                                            <a href={"https://edu.stankin.ru/"}
                                               className="bg-sky-100 text-blue-600 rounded-xl pl-2 pr-2">
                                                Ссылка на ЭОС
                                            </a>
                                        </span>
                                            <span>{subject.audience}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    ) :
                (
                    <>
                        <div className="flex justify-center">
                            <span className="text-gray-400 text-xl">Нет пар</span>
                        </div>
                    </>
                )
            }
        </>
    )
}

function parseTime(timeString: string): Time {
    const [hours, minutes] = timeString.split(':');
    return new Time(
        parseInt(hours, 10),
        parseInt(minutes, 10),
        parseInt(minutes, 0),
        parseInt(minutes, 0),
    )
}
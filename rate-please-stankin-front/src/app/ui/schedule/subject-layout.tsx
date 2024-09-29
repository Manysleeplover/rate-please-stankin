import {FC} from "react";
import {getLesionStyle, getSubGroupStyle} from "@/app/ui/dashboard/schedule/style";
import {TimetableSubject} from "@/app/lib/api/ui-interfaces";


interface SubjectProps {
    subjects: Array<TimetableSubject>;
}

export const Subject: FC<SubjectProps> = ({
                                              subjects
                                          }) => {
    return (
        <>
            {!!subjects ? subjects.map((subject) => {
                        return (
                            <>
                                <div key={subject.id}
                                     className="w-11/12 bg-white ml-auto mr-auto rounded-xl p-2 shadow-sm mt-2 mb-2 border-stankin_blue border-2">
                                    <div className="text-stankin_blue">{subject.name}</div>
                                    <div className="mt-1 mb-1">{subject.groups}</div>
                                    <div className="mb-1">
                                        <span className={getLesionStyle(subject.type)}>{subject.type}</span>
                                        {!!(subject.subgroup) && (
                                            <span
                                                className={`${getSubGroupStyle(subject.subgroup)} ml-1`}>{subject.subgroup}</span>
                                        )
                                        }
                                    </div>
                                    <div className="justify-between flex">
                            <span>
                                <a href={subject.url}
                                   className="bg-sky-100 text-blue-600 rounded-xl pl-1 pr-1">
                                    ЭОС
                                </a>
                            </span>
                                        <span>{subject.location}</span>
                                    </div>
                                </div>
                            </>
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
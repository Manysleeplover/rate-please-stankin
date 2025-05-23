'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {postSecureStudentProfile, postGetStudentInfoDTO} from "@/app/lib/api/modular-magazine-api";
import {StudentInfoDTO} from "@/app/lib/api/ui-interfaces";
import {getStudentInfoDTOCookie, setStudentInfoDTOCookie} from "@/app/lib/cookies/cookies";
import StudentProfile from "@/app/dashboard/mj-oauth/student-info-form";
import {useSession} from "next-auth/react";

export default function OauthForm() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const [studentInfoDTO, setStudentInfoDTO] = useState<StudentInfoDTO>()
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const studentInfoDTOCookie = getStudentInfoDTOCookie();
        const codeParam = searchParams.get("code");

        // Если есть данные в куках, устанавливаем их сразу
        if (studentInfoDTOCookie) {
            setStudentInfoDTO(studentInfoDTOCookie);
        }

        const fetchData = async () => {
            if (!codeParam || !session?.user?.token) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const resp = await postGetStudentInfoDTO(codeParam, session.user.token);
                setStudentInfoDTO(resp);
                setStudentInfoDTOCookie(resp);
            } catch (error) {
                console.error('Error fetching student info:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchParams, session?.user?.token]);

    const handleSecureAction = () => {
        postSecureStudentProfile(session?.user.token ,studentInfoDTO!.userInfo);
    }

    return (
        <div className="space-y-4 p-4 flex justify-center">
            {!!studentInfoDTO ? (
                <div className="flex-col flex items-center justify-between">
                    <StudentProfile
                        data={studentInfoDTO}
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-700 text-sm sm:text-base font-medium text-center sm:text-left">
                            Закрепить данные студента с текущей учётной записью?
                        </p>

                        <button className="px-5 py-2 bg-stankin_blue text-white rounded-lg hover:bg-stankin_blue transition-all
                                             duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5
                                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                onClick={() => handleSecureAction()}
                        >
                            Подтвердить
                        </button>

                    </div>
                </div>
                ) :
                <a
                href={oauthUrl.toString()}
                    className="inline-block px-6 py-2 bg-stankin_blue text-white rounded-md hover:bg-stankin_blue transition-colors duration-200"
                >
                    Войти в модульный журнал
                </a>
            }
        </div>
    );
}

const oauthUrl = new URL("https://lk.stankin.ru/webapi/oauth/authorize");
oauthUrl.searchParams.append("response_type", "code");
oauthUrl.searchParams.append("client_id", "rate-please-stankin");
oauthUrl.searchParams.append("redirect_uri", "http://localhost:3030/dashboard/mj-oauth");
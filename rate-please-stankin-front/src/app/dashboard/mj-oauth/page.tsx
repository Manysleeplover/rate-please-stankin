'use client'

import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {postStudentInfoDTO} from "@/app/lib/api/modular-magazine-api";
import {StudentInfoDTO} from "@/app/lib/api/ui-interfaces";
import {setStudentInfoDTOCookie} from "@/app/lib/security/auth";
import StudentProfile from "@/app/dashboard/mj-oauth/student-info-form";

export default function OauthForm() {

    const [code, setCode] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const [studentInfoDTO, setStudentInfoDTO] = useState<StudentInfoDTO>()

    useEffect(() => {

        const codeParam = searchParams.get("code");
        if( codeParam !== null && codeParam != null){
            const fetchData = async () => {
                try {
                    const resp = await postStudentInfoDTO(codeParam);
                    setStudentInfoDTO(resp)
                    setStudentInfoDTOCookie(resp)
                } catch (error) {
                    console.error('Error fetching schedule:', error);
                }

            };

            fetchData()
            setCode(codeParam);
        }

    }, [searchParams]);




    return (
        <div className="space-y-4 p-4 flex justify-center">
            {code && !!studentInfoDTO ? (
                    <StudentProfile
                        data={studentInfoDTO}
                    />
                ) :
                <a
                    href={oauthUrl.toString()}
                    className="inline-block px-6 py-2 bg-stankin_blue text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
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
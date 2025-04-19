import Cookies from 'js-cookie';
import {JwtAuthenticationResponse, StudentInfoDTO} from "@/app/lib/api/ui-interfaces";
import {z} from 'zod';

const setStudentInfoDTOCookie = (info: StudentInfoDTO) => {
    Cookies.set("studentInfo", JSON.stringify(info))
}

const getStudentInfoDTOCookie = (): StudentInfoDTO | null => {
    return parseStudentInfo(Cookies.get("studentInfo"))
}

const setJwtAuthenticationResponseCookie = (user: JwtAuthenticationResponse | string) => {
    try{
        user as JwtAuthenticationResponse
    } catch (e) {
        console.error(e)
    }
    Cookies.set("jwtAuthenticationResponse", JSON.stringify(user))
}

const getJwtAuthenticationResponseCookie = ():JwtAuthenticationResponse | null => {
    return parseJwtAuthenticationResponse(Cookies.get("jwtAuthenticationResponse"))
}

export {
    setStudentInfoDTOCookie,
    getStudentInfoDTOCookie,
    setJwtAuthenticationResponseCookie,
    getJwtAuthenticationResponseCookie,
    removeToken
}

const removeToken = () => {
    const allCookies = Cookies.get();

// Удаляем каждую
    Object.keys(allCookies).forEach(cookieName => {
        Cookies.remove(cookieName, { path: '/', domain: window.location.hostname });
    });
}

function parseStudentInfo(jsonString: string): StudentInfoDTO | null {
    try {
        const parsed = JSON.parse(jsonString);
        return StudentInfoSchema.parse(parsed) as StudentInfoDTO;
    } catch (error) {
        console.error('Невалидный JSON или структура данных');
        return null
    }
}

function parseJwtAuthenticationResponse(jsonString: string): JwtAuthenticationResponse | null {
    try {
        const parsed = JSON.parse(jsonString);
        return JwtAuthenticationResponseSchema.parse(parsed) as JwtAuthenticationResponse;
    } catch (error) {
        console.error('Невалидный JSON или структура данных');
        return null
    }
}

const JwtAuthenticationResponseSchema = z.object({
    token: z.string(),
    username: z.string(),
    role: z.string()
})

// Создаем схему валидации
const UserInfoSchema = z.object({
    name: z.string(),
    surname: z.string(),
    patronym: z.string(),
    stgroup: z.string(),
    cardid: z.string(),
});

const StudentInfoSchema = z.object({
    access_token: z.string(),
    token_type: z.string(),
    userInfo: UserInfoSchema,
});


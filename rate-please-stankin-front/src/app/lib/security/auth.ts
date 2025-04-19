import Cookies from 'js-cookie';
import {StudentInfoDTO} from "@/app/lib/api/ui-interfaces";
import {z} from 'zod';

const setStudentInfoDTOCookie = (info: StudentInfoDTO) => {
    Cookies.set("studentInfo", JSON.stringify(info))
}

const getStudentInfoDTOCookie = (): StudentInfoDTO | null => {
    return parseStudentInfo(Cookies.get("studentInfo"))
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

export {setStudentInfoDTOCookie, getStudentInfoDTOCookie, removeToken}

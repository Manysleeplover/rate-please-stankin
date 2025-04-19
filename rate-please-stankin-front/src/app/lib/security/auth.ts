import Cookies from 'js-cookie';
import {StudentInfoDTO} from "@/app/lib/api/ui-interfaces";
import {z} from 'zod';


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


const setStudentInfoDTOCookie = (info: StudentInfoDTO) => {
    Cookies.set("studentInfo", JSON.stringify(info))
}


const getStudentInfoDTOCookie = (): StudentInfoDTO => {
    return parseStudentInfo(Cookies.get("studentInfo"))
}

function parseStudentInfo(jsonString: string): StudentInfoDTO {
    try {
        const parsed = JSON.parse(jsonString);
        return StudentInfoSchema.parse(parsed) as StudentInfoDTO;
    } catch (error) {
        throw new Error('Невалидный JSON или структура данных');
    }
}

export {setStudentInfoDTOCookie, getStudentInfoDTOCookie}
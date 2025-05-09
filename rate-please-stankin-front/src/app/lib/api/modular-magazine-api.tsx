import {MJStudentDataRequestDTO, StudentInfoDTO, UserInfoDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";
import {BACKEND_API_URL, getDefaultHeaders} from "@/app/lib/api/default-api-signature";

export const postGetStudentInfoDTO = async (code: string, token: string): Promise<StudentInfoDTO> => {
    const requestData: MJStudentDataRequestDTO = {
        code: code,
        clientId: "rate-please-stankin",
        clientSecret: "Ys7dXD8eLuqQ"
    };

    const response = await axios.post<StudentInfoDTO>(
        `${BACKEND_API_URL}/mj/oaut/req`,
        requestData,
        {
            headers: getDefaultHeaders(token)
        }
    )
    return response.data
}

export const postSecureStudentProfile = async (token: string, req: UserInfoDTO) => {
    axios
        .post(`${BACKEND_API_URL}/mj/profile/secure`, req, {
            headers: getDefaultHeaders(token)
        })
        .then( (resp) => {
            console.log(resp)
        })
}
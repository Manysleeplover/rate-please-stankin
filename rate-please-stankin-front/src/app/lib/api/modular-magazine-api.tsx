import {MJStudentDataRequestDTO, StudentInfoDTO, UserInfoDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";
import {getDefaultHeaders} from "@/app/lib/api/default-headers";

export const postStudentInfoDTO = async (code: string): Promise<StudentInfoDTO> => {
    const requestData: MJStudentDataRequestDTO = {
        code: code,
        clientId: "rate-please-stankin",
        clientSecret: "Ys7dXD8eLuqQ"
    };

    const response = await axios.post<StudentInfoDTO>(
        "http://localhost:8081/mj/oaut/req",
        requestData
    )
    return response.data
}

export const postSecureStudentProfile = async (token: string, req: UserInfoDTO) => {
    axios
        .post("http://localhost:8081/mj/profile/secure", req, {
            headers: getDefaultHeaders(token)
        })
        .then( (resp) => {
            console.log(resp)
        })
}
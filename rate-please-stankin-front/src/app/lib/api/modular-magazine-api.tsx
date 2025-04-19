import {MJStudentDataRequestDTO, StudentInfoDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";

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

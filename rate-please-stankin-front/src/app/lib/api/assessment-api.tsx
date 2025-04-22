import {SaveAssessmentRequestDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";
import {getDefaultHeaders} from "@/app/lib/api/default-headers";

export const postSaveAssessment = async (token: string, dailyScheduleId: string, request: SaveAssessmentRequestDTO) => {
    const response = await axios.post(`http://localhost:8081/assessment/${dailyScheduleId}`, request,
        {
            headers: getDefaultHeaders(token)
        }
    );
    return response.data;
}
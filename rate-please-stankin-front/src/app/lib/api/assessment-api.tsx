import {AssessmentDTO, PassedAssessmentRequestDTO, SaveAssessmentRequestDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";
import {BACKEND_API_URL, getDefaultHeaders} from "@/app/lib/api/default-api-signature";

export const postSaveAssessment = async (token: string, dailyScheduleId: string, request: SaveAssessmentRequestDTO) => {
    const response = await axios.post(`${BACKEND_API_URL}/assessment/${dailyScheduleId}`, request,
        {
            headers: getDefaultHeaders(token)
        }
    );
    return response.data;
}

export const getGetAssessmentById = async (token: string, assessmentId: string): Promise<AssessmentDTO> => {
    const response = await axios.get<AssessmentDTO>(`${BACKEND_API_URL}/assessment/${assessmentId}`,
        {
            headers: getDefaultHeaders(token)
        }
    )
    return response.data
}

export async function postSubmitAssessmentRatings(
    token: string,
    assessmentId: string,
    data: PassedAssessmentRequestDTO[]

) {
    try {
        const response = await axios.post(
            `${BACKEND_API_URL}/assessment/${assessmentId}/ratings`,
            data,
            {
                headers: getDefaultHeaders(token)
            }
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to submit ratings');
        }
        throw new Error('Failed to submit ratings');
    }
}
import {SaveTaskForClassRequest, TaskForClassDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";
import {BACKEND_API_URL, getDefaultHeaders} from "@/app/lib/api/default-api-signature";

export const saveTaskForClass = async (request: SaveTaskForClassRequest) => {
    const response = await axios.post(`${BACKEND_API_URL}/task`, request);
    return response.data;
}

export const getTaskForClassByTaskId = async (request: string | Array<string> | undefined): Promise<TaskForClassDTO> => {
    const response = await axios.get<TaskForClassDTO>(`${BACKEND_API_URL}/task/${request}`)
    return response.data
}

export const deleteTaskForClassByTaskId = async (request: string | Array<string> | undefined) => {
    const response = await axios.delete(`${BACKEND_API_URL}/task/${request}`)
    return response.data
}

export const savePassedTestResult = async (token: string, percentage: number, testTaskId: string, userId: string) => {
    const response = await axios.post(`${BACKEND_API_URL}/task/passed`, {percentage, testTaskId, userId}, {
        headers : getDefaultHeaders(token)
    })
    return response.data
}

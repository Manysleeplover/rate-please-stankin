import {SaveTaskForClassRequest, TaskForClassDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";
import {getDefaultHeaders} from "@/app/lib/api/default-headers";

export const saveTaskForClass = async (request: SaveTaskForClassRequest) => {
    const response = await axios.post('http://localhost:8081/task', request);
    return response.data;
}

export const getTaskForClassByTaskId = async (request: string | Array<string> | undefined): Promise<TaskForClassDTO> => {
    const response = await axios.get<TaskForClassDTO>(`http://localhost:8081/task/${request}`)
    return response.data
}

export const deleteTaskForClassByTaskId = async (request: string | Array<string> | undefined) => {
    const response = await axios.delete(`http://localhost:8081/task/${request}`)
    return response.data
}

export const savePassedTestResult = async (token: string, percentage: number, testTaskId: string, userId: string) => {
    const response = await axios.post(`http://localhost:8081/task/passed`, {percentage, testTaskId, userId}, {
        headers : getDefaultHeaders(token)
    })
    return response.data
}

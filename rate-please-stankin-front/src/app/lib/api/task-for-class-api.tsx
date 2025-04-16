import {SaveTaskForClassRequest, TaskForClassDTO} from "@/app/lib/api/ui-interfaces";
import axios from "axios";

export const saveTaskForClass = async (request: SaveTaskForClassRequest): Promise<any> => {
    const response = await axios.post<any>('http://localhost:8081/task', request);
    return response.data;
}

export const getTaskForClassByTaskId = async (request: string | Array<string> | undefined): Promise<TaskForClassDTO> => {
    const response = await axios.get<TaskForClassDTO>(`http://localhost:8081/task/${request}`)
    return response.data
}

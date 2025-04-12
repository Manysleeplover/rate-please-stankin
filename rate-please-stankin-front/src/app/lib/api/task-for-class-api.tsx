import {SaveTaskForClassRequest} from "@/app/lib/api/ui-interfaces";
import axios from "axios";

export const saveTaskForClass = async (request: SaveTaskForClassRequest): Promise<any> => {
    const response = await axios.post<any>('http://localhost:8081/task/save', request);
    return response.data;
}
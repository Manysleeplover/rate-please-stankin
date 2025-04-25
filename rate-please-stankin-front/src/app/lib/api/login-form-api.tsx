import axios from "axios";
import {JwtAuthenticationResponse, SignInDTO, SignUpDTO} from "@/app/lib/api/ui-interfaces";
import {BACKEND_API_URL} from "@/app/lib/api/default-api-signature";

export const singInAPIRequest = async (signInDTO: SignInDTO): Promise<JwtAuthenticationResponse | string> => {
    return await axios.post<JwtAuthenticationResponse>(`${BACKEND_API_URL}/auth/sign-in`, signInDTO)
        .then((res) =>  res.data)
        .catch((ex) => `Ошибка времени запроса к /auth/sign-in: ${ex}`);
}


export const singUpAPIRequest = async (signUpDTO: SignUpDTO): Promise<JwtAuthenticationResponse> => {
    const response = await axios.post<JwtAuthenticationResponse>(`${BACKEND_API_URL}/auth/sign-up`, signUpDTO);
    return response.data;
}

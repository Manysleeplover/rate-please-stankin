import axios from "axios";
import {JwtAuthenticationResponse, SignInDTO, SignUpDTO} from "@/app/lib/api/ui-interfaces";

export const singInAPIRequest = async (signInDTO: SignInDTO): Promise<JwtAuthenticationResponse | string> => {
    return await axios.post<JwtAuthenticationResponse>('http://localhost:8081/auth/sign-in', signInDTO)
        .then((res) =>  res.data)
        .catch((ex) => `Ошибка времени запроса к /auth/sign-in: ${ex}`);
}


export const singUpAPIRequest = async (signUpDTO: SignUpDTO): Promise<JwtAuthenticationResponse> => {
    const response = await axios.post<JwtAuthenticationResponse>('http://localhost:8081/auth/sign-up', signUpDTO);
    return response.data;
}

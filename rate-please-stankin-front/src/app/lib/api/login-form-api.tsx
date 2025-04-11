import axios from "axios";
import {JwtAuthenticationResponse, SignInDTO, SignUpDTO} from "@/app/lib/api/ui-interfaces";

export const singInAPIRequest = async (signInDTO: SignInDTO): Promise<JwtAuthenticationResponse> => {
    const response = await axios.post<JwtAuthenticationResponse>('http://localhost:8081/auth/sign-in', signInDTO);
    return response.data;
}


export const singUpAPIRequest = async (signUpDTO: SignUpDTO): Promise<JwtAuthenticationResponse> => {
    const response = await axios.post<JwtAuthenticationResponse>('http://localhost:8081/auth/sign-up', signUpDTO);
    return response.data;
}

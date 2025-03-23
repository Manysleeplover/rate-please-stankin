import axios from "axios";
import {JwtAuthenticationResponse, SignInDTO, SignUpDTO} from "@/app/lib/api/ui-interfaces";

export const singInAPIRequest = async (signInDTO: SignInDTO): Promise<JwtAuthenticationResponse> => {
    const response = await axios.post<JwtAuthenticationResponse>('http://localhost:8081/auth/sign-in', signInDTO);
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    return response.data;
}


export const singUpAPIRequest = async (signUpDTO: SignUpDTO): Promise<JwtAuthenticationResponse> => {
    const response = await axios.post<JwtAuthenticationResponse>('http://localhost:8081/auth/sign-up', signUpDTO);
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
    return response.data;
}

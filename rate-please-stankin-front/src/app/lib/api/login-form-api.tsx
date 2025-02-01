import axios from "axios";
import {SignInDTO, SignUpDTO} from "@/app/lib/api/ui-interfaces";

export const singInAPIRequest = (signInDTO: SignInDTO) => {
    axios.post('http://localhost:8081/auth/sign-in', signInDTO)
        .then((response) => {
            console.log(response.data)
            console.log(response.status)
            console.log(response.statusText)
            console.log(response.headers)
            console.log(response.config)
        })
}


export const singUpAPIRequest = (signUpDTO: SignUpDTO) => {
    axios.post('http://localhost:8081/auth/sign-up', signUpDTO)
        .then((response) => {
            console.log(response.data)
            console.log(response.status)
            console.log(response.statusText)
            console.log(response.headers)
            console.log(response.config)
        })
}

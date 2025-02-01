import axios from "axios";
import {SignInDTO} from "@/app/lib/api/ui-interfaces";

export const singInAPIRequest = (loginDTO: SignInDTO) => {
    axios.post('http://localhost:8081/auth/sign-in', loginDTO)
        .then((response) => {
            console.log(response.data)
            console.log(response.status)
            console.log(response.statusText)
            console.log(response.headers)
            console.log(response.config)
        })
}

export const singUpAPIRequest = (loginDTO: SignInDTO) => {
    axios.post('http://localhost:8081/auth/sign-in', loginDTO)
        .then((response) => {
            console.log(response.data)
            console.log(response.status)
            console.log(response.statusText)
            console.log(response.headers)
            console.log(response.config)
        })
}

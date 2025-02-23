import axios from "axios";

export const sendFileToParser = (file: any) => {
    axios.post('http://localhost:3030/upload', file,{
        headers: {
            // `Content-Type` will be automatically set by the browser
            'Accept': 'application/json', // Just an example, adjust as needed
        }
    })
        .then((response) => {
            console.log(response.data)
            console.log(response.status)
            console.log(response.statusText)
            console.log(response.headers)
            console.log(response.config)
        })
}

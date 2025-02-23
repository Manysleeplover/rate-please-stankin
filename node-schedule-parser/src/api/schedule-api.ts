import axios from "axios";

const sendScheduleJsonToServer = (scheduleJson: string) => {
    console.log("Совершаяется отправка на bakcend")
    axios.post('http://localhost:8080/schedule', scheduleJson,{
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

module.exports = sendScheduleJsonToServer

const axios = require('axios').default;

let url = "http://localhost:4000"

export const signUpApi = async (inputValue: any) => {
    console.log("start", inputValue)
    let email = inputValue.email
    let name = inputValue.name
    let password = inputValue.password
    let Signupdata = await axios.post(`${url}/createUser/${name}/${email}/${password}`)
    // console.log("11111111",logindata)
    return Signupdata
}

export const loginApi = async (inputValue: any) => {
    console.log("start", inputValue)
    let email = inputValue.email
    let password = inputValue.password
    let loginData = await axios.post(`${url}/loginUser/${email}/${password}`)
    // console.log("11111111",logindata)forgotPassword
    return loginData
}

export const forgotPasswordApi = async (inputValue: any) => {
    console.log("start", inputValue)
    let email = inputValue.email
    let forgotData = await axios.post(`${url}/forgotPassword/${email}`)
    // console.log("11111111",logindata)
    return forgotData
}

export const resetPasswordApi = async (inputValue: any) => {
    let a:any = localStorage.getItem("token")
    let parseToken = JSON.parse(a)
    console.log("start", inputValue,parseToken)
    let email = parseToken.email
    let password = inputValue.password
    let confirm_password = inputValue.confirm_password
    let forgotData = await axios.post(`${url}/resetPassword/${email}/${password}/${confirm_password}`)
    // console.log("11111111",logindata)
    return forgotData
}

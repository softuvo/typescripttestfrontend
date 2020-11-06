import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import { signUpApi } from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function Signup() {
    let history = useHistory()
    const [inputValue, setInputValue] = useState({
        name: "",
        email: "",
        password: ""
    })
    toast.configure()
    const handleLogin = () => {
        history.push("/login")
    }

    function Namehandler(event: any) {
        let emailvalue = { ...inputValue, name: event.target.value }
        setInputValue(emailvalue)
    }
    const emailhandler = (event: any) => {
        let namevalue = { ...inputValue, email: event.target.value }
        setInputValue(namevalue)
    }
    const Passwordhandler = (event: any) => {
        let passwordvalue = { ...inputValue, password: event.target.value }
        setInputValue(passwordvalue)
    }

    console.log("inputValue", inputValue)

    const handleSubmit = () => {
        signUpApi(inputValue).then(resp => {
            if (resp.data.message == "User register successfully") {
                notify("success")
                history.push("/login")
            }
        }).catch(error => {
            notify("loginerror")
            console.log("error", error)
        })
    }
    const notify = (msg: any) => {
        if (msg == "error") {
            toast.error("Please fill the data")
        } else if (msg == "success") {
            toast.success("User Register Successfully")
        } else if (msg == "loginerror") {
            toast.error("User already exist")
        }
    }
    return (
        <div className="App">
            <p>Signup</p>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">name</Label>
                    <Input onChange={Namehandler} type="text" id="examplename" placeholder="Enter name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={emailhandler} type="email" name="email" id="exampleEmail" placeholder="Enter email" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange={Passwordhandler} type="password" name="password" id="examplePassword" placeholder="Enter password" />
                </FormGroup>
                <Button style={{ cursor: "pointer" }} onClick={() => handleLogin()}>Sigin</Button>
                <Button onClick={() => handleSubmit()}>Submit</Button>
            </Form>
        </div>
    );
}

export default Signup;


// const axios = require('axios').default;

// let url = "http://localhost:4000"

// export const signUp = async ({ email, password, name }) => {
//     // console.log("start",email,password)
//     let Signupdata = await axios.post(`${url}/createUser/${name}/${email}/${password}`, {
//         email,
//         password
//     })
//     // console.log("11111111",logindata)
//     return Signupdata
// }

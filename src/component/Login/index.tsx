import React,{useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useHistory } from "react-router-dom"
import { loginApi } from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function Login() {
    let history = useHistory()
    toast.configure()

    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    })

    const handleForgotpassword =() => {
        history.push("/forgotpassword")
    }

    const emailhandler = (event: any) => {
        let namevalue = { ...inputValue, email: event.target.value }
        setInputValue(namevalue)
    }
    const Passwordhandler = (event: any) => {
        let passwordvalue = { ...inputValue, password: event.target.value }
        setInputValue(passwordvalue)
    }

    const handleSubmit = () => {
        loginApi(inputValue).then(resp => {
            console.log("resp",resp)
            localStorage.setItem("token", JSON.stringify(resp.data.Info))
            if (resp.data.message == "User Login successfully") {
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
            toast.success("User Login Successfully")
        } else if (msg == "loginerror") {
            toast.error("Please fill valid email password")
        }
    }
    console.log("inputValue", inputValue)

    return (
        <div className="App">
            <p>LOGIN SCREEN</p>
            <Form>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={emailhandler}type="email" name="email" id="exampleEmail" placeholder="Enter email" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange={Passwordhandler} type="password" name="password" id="examplePassword" placeholder="Enter password" />
                </FormGroup>
                <Button onClick={() => handleSubmit()}>Submit</Button>
                <p>Forgot Your Password ?<button onClick={() => handleForgotpassword()}>Click here</button></p>
            </Form>
        </div>
    );
}

export default Login;

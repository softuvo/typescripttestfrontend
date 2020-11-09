import React,{useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useHistory } from "react-router-dom"
import { loginApi } from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';
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
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const handleSubmit = (event:any) => {
        event.preventDefault()
        if(!inputValue.email.match(regexp)){
            notify("emailerror")
            return false
        }
        loginApi(inputValue).then(resp => {
            console.log("resp",resp)
            localStorage.setItem("token", JSON.stringify(resp.data.Info))
            if (resp.data.message == "User Login successfully") {
                notify("success")
                history.push("/")
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
            toast.error("User not found")
        }else if(msg == "emailerror"){
            toast.error("Please fill the valid email address")
        }
    }
    console.log("inputValue", inputValue)

    return (
        <div className="layout_box">
            <p>LOGIN SCREEN</p>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={emailhandler}type="email" name="email" id="exampleEmail" placeholder="Enter email" required />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange={Passwordhandler} type="password" name="password" id="examplePassword" placeholder="Enter password" required/>
                </FormGroup>
                <div className="forgot_password"><button  onClick={() => handleForgotpassword()}>Forgot Your Password ?</button></div>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Login;

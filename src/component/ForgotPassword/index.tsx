import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { useHistory } from "react-router-dom"
import { forgotPasswordApi } from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function ForgotPassword() {
    let history = useHistory()

    toast.configure()

  let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


    const [inputValue, setInputValue] = useState({
        email: "",
    })

    const emailhandler = (event: any) => {
        let namevalue = { ...inputValue, email: event.target.value }
        setInputValue(namevalue)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if(!inputValue.email.match(regexp)){
            console.log("inssssssssssssssss")
            notify("error")
            return false
        }
        forgotPasswordApi(inputValue).then(resp => {
            console.log("resp", resp)
            if (resp.data.message == "Your frogot password request acceptes please reset your password") {
                notify("success")
                history.push("/resetpassword")
            }
        }).catch(error => {
            notify("loginerror")
            console.log("error", error)
        })
    }
    const notify = (msg: any) => {
        if (msg == "error") {
            toast.error("Please fill the valid email address")
        } else if (msg == "success") {
            toast.success("Forgot request successfully")
        } else if (msg == "loginerror") {
            toast.error("User not found")
        }
    }
    console.log("inputValue", inputValue)
    return (
        <div className="layout_box">
            <p>FORGOT YOUR PASSWORD</p>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input onChange={emailhandler} type="email" name="email" id="exampleEmail" placeholder="Enter email" required />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
}

export default ForgotPassword;

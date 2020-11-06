import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import { resetPasswordApi } from "../../api"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const axios = require('axios').default;

function ResetPassword() {
    let history = useHistory()

    toast.configure()

    const [inputValue, setInputValue] = useState({
        password: "",
        confirm_password: ""
    })

    const passwordhandler = (event: any) => {
        let namevalue = { ...inputValue, password: event.target.value }
        setInputValue(namevalue)
    }
    const confirmhandler = (event: any) => {
        let namevalue = { ...inputValue, confirm_password: event.target.value }
        setInputValue(namevalue)
    }

    const handleSubmit = (event : any) => {
        event.preventDefault()
        resetPasswordApi(inputValue).then(resp => {
            console.log("resp", resp)
            if (resp.data.message == "Password reset successfully") {
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
            toast.success("Password reset successfully")
        } else if (msg == "loginerror") {
            toast.error("Password and confirm password doesnot match")
        }
    }
    console.log("inputValue", inputValue)
    return (
        <div className="layout_box">
            <p>RESET YOUR PASSWORD</p>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input onChange={passwordhandler} type="password" name="password" id="examplePassword" placeholder="Enter password" required/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Confirm Password</Label>
                    <Input onChange={confirmhandler} type="password" name="confirm_password" id="examplePassword" placeholder="Enter password" required />
                </FormGroup>
                <Button >Submit</Button>
            </Form>
        </div>
    );
}

export default ResetPassword;

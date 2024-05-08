import React from "react";
import { Button, Form, Heading, InputBox } from "./index";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  async function signUp(data) {
try {
  
  const response  = await axios.post("http://localhost:3000/api/v1/user/register",data)

  const data = await response.data

  if(!data){
    
  }
  toast(response.data.msg)

  navigate("/")
} catch (error) {
  toast.error(error.response.data.msg)

}

  }
  return (
    <div>
      <Heading>Register</Heading>
      <Form onSubmit={handleSubmit(signUp)}>
        <InputBox
          type="text"
          placeholder="First name"
          label="Enter your first name"
          {...register("firstName", { required: true })}
        />
        <InputBox
          type="text"
          placeholder="Last name (Optional)"
          label="Enter your last name"
          {...register("lastName", { required: false })}
        />
        <InputBox
          type="text"
          placeholder="Username"
          label="Enter your Username"
          {...register("username", { required: true })}
        />
        <InputBox
          type="email"
          placeholder="Email"
          label="Enter your email"
          {...register("email", { required: true })}
        />
        <InputBox
          type="password"
          placeholder="Password"
          label="Enter your Password"
          {...register("password", { required: true })}
        />
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}

export default Register;

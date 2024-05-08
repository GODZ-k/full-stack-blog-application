import React from 'react'
import {Heading , Form , InputBox , Button} from './index'
import {useForm} from "react-hook-form"
import axios from "axios"

function Signin() {

  const {register,handleSubmit} = useForm()

  async function Login(data){
const response = await axios.post("http://localhost:3000/api/v1/user/login" ,data)
console.log(response.data)
    
  }
  return (
   <div>
     <Heading>Sign In</Heading>
      <Form onSubmit={handleSubmit(Login)}>
        <InputBox
          type="email"
          placeholder="Email"
          label="Enter your Email"
          {...register("email",{required:true})}
        />
        <InputBox type="password" placeholder="Password" label="Enter your Password" {...register("password",{required:true})} />
        <Button type="submit">Sign in</Button>
      </Form>
   </div>
  )
}

export default Signin
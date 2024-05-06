import React from 'react'
import {Heading , Form , InputBox , Button} from './index'

function Signin() {
  return (
   <div>
     <Heading>Sign In</Heading>
      <Form>
        <InputBox
          type="email"
          placeholder="Email"
          label="Enter your Email"
        />
        <InputBox type="password" placeholder="Password" label="Enter your Password" />
        <Button type="submit">Sign in</Button>
      </Form>
   </div>
  )
}

export default Signin
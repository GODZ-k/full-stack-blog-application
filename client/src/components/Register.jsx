import React from "react";
import { Button, Form, Heading, InputBox } from "./index";




function Register() {
  return (
    <div>
    <Heading>Register</Heading>
      <Form>
        <InputBox
          type="text"
          placeholder="First name"
          label="Enter your first name"
        />
        <InputBox
          type="text"
          placeholder="Last name (Optional)"
          label="Enter your last name"
        />
        <InputBox type="text" placeholder="Username" label="Enter your Username" />
        <InputBox type="email" placeholder="Email" label="Enter your email" />
        <InputBox type="password" placeholder="Password" label="Enter your Password" />
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
}

export default Register;

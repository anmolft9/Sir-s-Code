import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { CustomInputField } from "../customInputField/CustomInputField";

export const ResetPasswordForm = ({ handleOnPasswordUpdate }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    setError("");

    ///error boundry

    if (name === "confirmPassword") {
      form.password !== value &&
        setError("pasword and confirm password must match");
      !form.password && setError("passwod must be provided");
      form.password.length < 6 &&
        setError("password must be longer than 6 character");
      !/[a-z]/.test(form.password) && setError("password must be 1 lower Case");
      !/[A-Z]/.test(form.password) && setError("password must be 1 Upper Case");
      !/[0-9]/.test(form.password) &&
        setError("password must have at least one number");
    }
    //passwod mus be provided
    //password must be longer than 6 character
    //password must be 1 Upper Case
    //password must be 1 lower Case
    //password must be atleast one number
    //pasword and confirm password must match
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...rest } = form;
    handleOnPasswordUpdate(rest);
  };
  console.log(form);
  return (
    <div className="form">
      <h2>Reset New Password</h2>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        <CustomInputField
          onChange={handleOnChange}
          label="OTP"
          name="otp"
          required={true}
          type="number"
          placeholder="check your email for otp"
        />
        <CustomInputField
          onChange={handleOnChange}
          label="Password"
          name="password"
          required={true}
          type="password"
          placeholder="******"
        />
        <Form.Group>
          <Form.Text className="py-3">
            Note: Password must contain at least one number,lowercase, and
            uppercase and must be longer than 6 characters.
          </Form.Text>
        </Form.Group>
        <CustomInputField
          onChange={handleOnChange}
          label="ConfirmPassword"
          name="confirmPassword"
          required={true}
          type="password"
          placeholder="******"
        />
        <Form.Group>
          <Form.Text className="py-3">
            {error && <Alert variant="danger">{error}</Alert>}
          </Form.Text>
        </Form.Group>
        <Form.Group className="d-grid">
          <Button variant="warning" type="submit">
            Update Password
          </Button>
        </Form.Group>
        <a href="/reset-password">Request OTP</a>
      </Form>
    </div>
  );
};

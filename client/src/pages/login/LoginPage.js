import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInputField } from "../../components/customInputField/CustomInputField";
import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import { autoLogin, loginUserAction } from "./userAction";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({});

  const { user } = useSelector((state) => state.admin);

  const origin =
    (location.state && location.state.from && location.state.from.pathname) ||
    "/dashboard";

  useEffect(() => {
    user._id ? navigate(origin) : dispatch(autoLogin());
  }, [user, navigate, dispatch]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUserAction(form));
  };

  return (
    <div>
      <Header />

      <Container className="page-main">
        <div className="form">
          <h3>Welcome back!</h3>
          <hr />
          <Form onSubmit={handleOnSubmit}>
            <CustomInputField
              onChange={handleOnChange}
              label="Email"
              type="email"
              name="email"
              required={true}
              placeholder="your@email.com"
            />
            <CustomInputField
              onChange={handleOnChange}
              label="Password"
              type="password"
              name="password"
              required={true}
              placeholder="******"
            />
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <div className="text-end">
            <a href="/reset-password">Forgot Password?</a>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default LoginPage;

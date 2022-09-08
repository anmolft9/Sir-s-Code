import React, { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CustomInputField } from "../../components/customInputField/CustomInputField";
import { AdminLayout } from "../../components/layout/AdminLayout";
import {
  updateAdminPasswordAction,
  updateAdminProfileAction,
} from "../login/userAction";

export const AdminProfile = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [password, setPassword] = useState({});
  const [error, setError] = useState("");

  const { user } = useSelector((state) => state.admin);

  useEffect(() => {
    user?._id && setForm(user);
  }, [user]);

  const handleOnProfileUpdate = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleOnProfileSubmit = (e) => {
    console.log(e);
    // console.log("sdsds");
    e.preventDefault();

    const { address, dob, fName, lName, phone, _id } = form;
    dispatch(
      updateAdminProfileAction({ address, dob, fName, lName, phone, _id })
    );

    // console.log(form);
  };
  /////password
  const handleOnPasswordUpdate = (e) => {
    const { newPassword } = password;
    const { name, value } = e.target;

    setError("");

    if (name === "confirmPassword") {
      newPassword === !value && setError("jhfjdhjkhajkdhf");
      newPassword.length < 6 && setError("password must be 6 character long");
      !/[a-z]/.test(newPassword) && setError("password must have 1 lower case");
      !/[A-Z]/.test(newPassword) && setError("password must have 1 upper case");
      !/[0-9]/.test(newPassword) &&
        setError("password must have at least 1 number");

      !newPassword && setError("password is required");
    }

    setPassword({ ...password, [name]: value });
  };

  //   console.log(password, error);
  const handleOnPasswordSubmit = (e) => {
    // console.log("updated");
    // console.log("sdsds");
    e.preventDefault();
    const { newPassword, confirmPassword } = password;
    console.log(newPassword, confirmPassword);

    if (!password.password || newPassword !== confirmPassword) {
      return alert(
        "either current password field is empty or new password and confirm password do not match"
      );
    }

    updateAdminPasswordAction({
      password: password.password,
      newPassword,
      _id: user._id,
    });

    // const { address, dob, fName, lName, phone, _id } = form;
    // dispatch(
    //   updateAdminProfileAction({ address, dob, fName, lName, phone, _id })
    // );

    // console.log(form);
  };

  const inputFields = [
    {
      name: "fName",
      value: form.fName,
      label: "First Name",
      type: "text",
      placeholder: "smith",
      required: true,
    },
    {
      name: "lName",
      value: form.lName,
      label: "last Name",
      type: "text",
      required: true,
    },
    {
      name: "email",
      value: form.email,
      label: "email",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      value: form.phone,
      label: "phone",
      type: "text",
      required: true,
    },
    {
      name: "address",
      value: form.address,
      label: "address",
      type: "text",
    },
    {
      name: "dob",
      value: form.dob ? form.dob : null,
      label: "DOB",
      type: "date",
    },
  ];
  return (
    <div>
      <AdminLayout>
        <div>
          <h2>Update your profile</h2>
          <hr />

          <Form onSubmit={handleOnProfileSubmit}>
            {inputFields.map((input, i) => (
              <CustomInputField {...input} onChange={handleOnProfileUpdate} />
            ))}
            <Button type="submit" variant="warning">
              Update Profile
            </Button>
          </Form>
        </div>
        <div className="mt-5">
          <h2>Update password</h2>
          <hr />
          <Form onSubmit={handleOnPasswordSubmit}>
            <CustomInputField
              onChange={handleOnPasswordUpdate}
              type="password"
              name="password"
              required
              label="current password"
            />

            <CustomInputField
              onChange={handleOnPasswordUpdate}
              type="password"
              name="newPassword"
              required
              label="new password"
            />
            <Form.Group className="mb-3">
              <Form.Text>
                Password must have a lowercase letter, uppercase,number and at
                least 6 characters.
              </Form.Text>
            </Form.Group>

            <CustomInputField
              onChange={handleOnPasswordUpdate}
              type="password"
              name="confirmPassword"
              required
              label="confirm password"
            />
            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" variant="warning" disable={error}>
              Update Password
            </Button>
          </Form>
        </div>
      </AdminLayout>
    </div>
  );
};

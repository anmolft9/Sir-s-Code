import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postPmsAction } from "../../pages/payment-method/pmAction";
import { CustomInputField } from "../customInputField/CustomInputField";
import { CustomModal } from "../model/Model";

const initialState = {
  status: "",
  name: "",
  description: "",
};
export const AddPaymentMethod = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(postPmsAction(form));
  };

  const inputeFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Enter category name",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required: true,
      placeholder: "Write Information about the payment method",
    },
  ];
  return (
    <CustomModal title="Add new payment method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
          />
        </Form.Group>
        {inputeFields.map((item, i) => (
          <CustomInputField key={i} {...item} onChange={handleOnChange} />
        ))}

        <Form.Group>
          <Button variant="success" type="submit">
            Add Payment Method
          </Button>
        </Form.Group>
      </Form>
    </CustomModal>
  );
};

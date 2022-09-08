import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  postPmsAction,
  updatePmAction,
} from "../../pages/payment-method/pmAction";
import { CustomInputField } from "../customInputField/CustomInputField";
import { CustomModal } from "../model/Model";

const initialState = {
  status: "",
  name: "",
  description: "",
};
export const EditPaymentMethod = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);

  const { selectPm } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    setForm(selectPm);
  }, [selectPm]);

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
    const { createdAt, updatedAt, __v, ...rest } = form;

    dispatch(updatePmAction(rest));
  };

  const inputeFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Enter category name",
      value: form.name,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      required: true,
      placeholder: "Write Information about the payment method",
      value: form.description,
    },
  ];
  return (
    <CustomModal title="Edit payment method">
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Check
            type="switch"
            name="status"
            label="Status"
            onChange={handleOnChange}
            checked={form.status === "active"}
          />
        </Form.Group>
        {inputeFields.map((item, i) => (
          <CustomInputField key={i} {...item} onChange={handleOnChange} />
        ))}

        <Form.Group>
          <Button variant="success" type="submit">
            Update Payment Method
          </Button>
        </Form.Group>
      </Form>
    </CustomModal>
  );
};

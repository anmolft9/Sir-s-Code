import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../pages/categories/categoryAction";
import { postProductsAction } from "../../pages/products/productAction";
import { CustomInputField } from "../customInputField/CustomInputField";

const initialState = {
  status: "inactive",
  catId: null,
  name: "",
  sku: "",
  qty: "",
  price: 0,
  salesPrice: 0,
  salesStartDate: null,
  salesEndDate: null,
  description: "",
};

export const AddProductForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [images, setImges] = useState([]);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());
  }, [categories, dispatch]);

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

  const handleOnImageSelect = (e) => {
    const { files } = e.target;
    console.log(files);
    setImges(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    //set data with FormData
    const formData = new FormData();
    //append form data
    for (const key in form) {
      formData.append(key, form[key]);
    }
    // append images

    [...images].map((img) => formData.append("images", img));

    dispatch(postProductsAction(formData));
  };

  const inputFields = [
    {
      name: "name",
      value: form.name,
      label: "Name",
      type: "text",
      placeholder: "Product Name",
      required: true,
    },
    {
      name: "sku",
      value: form.sku,
      label: "SKU",
      type: "text",
      placeholder: "Product's unique code",
      required: true,
    },
    {
      name: "qty",
      value: form.qty,
      label: "QTY",
      type: "number",
      placeholder: "50",
      required: true,
    },
    {
      name: "price",
      value: form.price,
      label: "Price",
      type: "number",
      placeholder: "343",
      min: 1,
      required: true,
    },
    {
      name: "salesPrice",
      value: form.salesPrice,
      label: "Sales Price",
      type: "number",
      placeholder: "300",
    },
    {
      name: "salesStartDate",
      value: form.salesStartDate,
      label: "Sales Start Date",
      type: "date",
    },
    {
      name: "salesEndDate",
      value: form.salesEndDate,
      label: "Sales End Date",
      type: "date",
    },
    {
      name: "description",
      value: form.description,
      label: "Description",
      type: "text",
      as: "textarea",
      rows: 10,
      placeholder: "Product description",
      required: true,
    },
    {
      name: "images",
      type: "file",
      accept: "image/*",
      multiple: true,
    },
  ];
  return (
    <div>
      <Form className="py-5" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Check
            name="status"
            type="switch"
            label="Status"
            checked={form.status === "active"}
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group className="py-3">
          <Form.Label>Assign to Category</Form.Label>
          <Form.Select name="catId" onChange={handleOnChange} required>
            <option value=""> Select Category</option>
            {categories.length > 0 &&
              categories.map(
                (item) =>
                  !item.parentId && (
                    <option value={item._id}>{item.name}</option>
                  )
              )}
          </Form.Select>
        </Form.Group>

        {inputFields.map((item, i) => (
          <CustomInputField
            {...item}
            onChange={
              item.name === "images" ? handleOnImageSelect : handleOnChange
            }
          />
        ))}
        <Button variant="primary" type="submit">
          Submit Product
        </Button>
      </Form>
    </div>
  );
};

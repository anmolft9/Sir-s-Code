import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../pages/categories/categoryAction";
import {
  postProductsAction,
  updateProductsAction,
} from "../../pages/products/productAction";
import { setSelectedProduct } from "../../pages/products/productSlice";
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
  thumbnail: "",
};

export const EditProductForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [images, setImges] = useState([]);
  const [imgToDelete, setImgToDelete] = useState([]);
  const { selectedProduct } = useSelector((state) => state.products);
  console.log(selectedProduct);

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    !categories.length && dispatch(getCategoriesAction());
    setForm(selectedProduct);
  }, [categories, dispatch, selectedProduct]);

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
    const { sku, slug, rating, createdAt, updatedAt, __v, ...rest } = form;
    //append form data
    for (const key in rest) {
      formData.append(key, rest[key]);
    }
    // append images

    [...images].map((img) => formData.append("newImages", img));

    ///attach the image that need to be deletedb
    formData.append("imgToDelte", imgToDelete);

    dispatch(updateProductsAction(formData));
  };

  const handleOnImageDelete = (e) => {
    const { checked, value } = e.target;
    if (checked === true) {
      setImgToDelete([...imgToDelete, value]);
    } else {
      setImgToDelete(imgToDelete.filter((img) => img !== value));
    }
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
                  item.parentId && <option value={item._id}>{item.name}</option>
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

        <div className="my-5">
          {selectedProduct?.images?.length &&
            selectedProduct.images.map((imgLink) => (
              <div key={imgLink}>
                <Form.Check
                  type="radio"
                  label="use as thumbnail"
                  value={imgLink}
                  name="thumbnail"
                  checked={imgLink === form.thumbnail}
                />
                <img
                  src={process.env.REACT_APP_SERVER_ROOT + imgLink}
                  width="150px"
                  alt=""
                  crossOrigin="anonymous"
                />
                <Form.Check
                  label="Delete"
                  value={imgLink}
                  onChange={handleOnImageDelete}
                />
              </div>
            ))}
        </div>
        <Button variant="primary" type="submit">
          Submit Product
        </Button>
      </Form>
    </div>
  );
};

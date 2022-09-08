import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  postCategoriesAction,
  updateCategoriesAction,
} from "../../pages/categories/categoryAction";
import { CustomModal } from "../model/Model";

const initialState = {
  status: "inactive",
  name: "",
  parentId: null,
};

export const EditCatForm = ({ selectedCat }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCat);
  }, [selectedCat]);

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

    const { __v, slug, createdAt, updatedAt, ...rest } = form;
    dispatch(updateCategoriesAction(rest));
  };

  return (
    <CustomModal title="Edit Category">
      <Form
        className="py-4 mb-5 border p-3 shadow-lg rounded"
        onSubmit={handleOnSubmit}
      >
        <Row className="g-2">
          <Col md="2">
            <Form.Group>
              <Form.Check
                name="status"
                label="status"
                type="switch"
                checked={form.status === "active"}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group>
              <Form.Select name="parentId" onChange={handleOnChange}>
                <option value=""> Select Parent Category</option>
                {categories.length > 0 &&
                  categories.map(
                    (item) =>
                      !item.parentId && (
                        <option
                          value={item._id}
                          selected={item._id === form.parentId}
                        >
                          {item.name}
                        </option>
                      )
                  )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="4">
            <Form.Group>
              <Form.Control
                name="name"
                type="text"
                value={form.name}
                placeholder="Enter category name"
                onChange={handleOnChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md="2">
            <Button variant="primary" type="submit">
              Update Category
            </Button>{" "}
          </Col>
        </Row>
      </Form>
    </CustomModal>
  );
};

import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoriesAction,
  getCategoriesAction,
} from "../../pages/categories/categoryAction";
import { setModalShow } from "../../pages/system-state/systemSlice";
import { EditCatForm } from "../cat-form/EditCatForm";

export const CategoryTable = () => {
  const dispatch = useDispatch();
  const [selectedCat, setSelectedCat] = useState({});

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  const handleOnEdit = (cat) => {
    setSelectedCat(cat);
    dispatch(setModalShow());
  };

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure, you want to delete this category?")) {
      dispatch(deleteCategoriesAction(_id));
    }
  };

  const parentCats = categories.filter(({ parentId }) => !parentId);
  const childCats = categories.filter(({ parentId }) => parentId);
  return (
    <Row>
      <EditCatForm selectedCat={selectedCat} />
      <Table striped hover bordered>
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parentCats.length > 0 &&
            parentCats.map((item) => (
              <>
                <tr key={item._id} className="bg-info">
                  <td
                    className={
                      item.status === "active" ? "text-success" : "text-danger"
                    }
                  >
                    {item.status}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.parentId ? "Chilren" : "Parent"}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleOnDelete(item._id)}
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="warning"
                      onClick={() => handleOnEdit(item)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
                {childCats.map(
                  (cat) =>
                    cat.parentId === item._id && (
                      <tr key={cat._id}>
                        <td
                          className={
                            cat.status === "active"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {cat.status}
                        </td>
                        <td>{cat.name}</td>
                        <td>{cat.parentId ? "Chilren" : "Parent"}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleOnDelete(cat._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            onClick={() => handleOnEdit(cat)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    )
                )}
              </>
            ))}
        </tbody>
      </Table>
    </Row>
  );
};

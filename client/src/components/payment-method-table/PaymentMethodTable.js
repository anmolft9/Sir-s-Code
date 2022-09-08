import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePmAction,
  getPmsAction,
} from "../../pages/payment-method/pmAction";
import { setSelectedPM } from "../../pages/payment-method/pmSlice";
import { setModalShow } from "../../pages/system-state/systemSlice";
import { AddPaymentMethod } from "../payment-method-forms/AddPaymentMethod";
import { EditPaymentMethod } from "../payment-method-forms/EditPaymentMethod";

export const PaymentMethodTable = ({ showForm, handleOnAddPM }) => {
  const dispatch = useDispatch();

  const { paymentMethods } = useSelector((state) => state.paymentMethod);

  useEffect(() => {
    dispatch(getPmsAction());
  }, [dispatch]);

  const handleOnDelete = (_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      dispatch(deletePmAction(_id));
      alert(_id);
    }
  };

  const handleOnEdit = (item) => {
    dispatch(setSelectedPM(item));
    handleOnAddPM("edit");
  };

  const pmForm = {
    add: <AddPaymentMethod />,
    edit: <EditPaymentMethod />,
  };

  return (
    <div>
      {pmForm[showForm]}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>{item.status}</td>
              <td>{item.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleOnEdit(item)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleOnDelete(item._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

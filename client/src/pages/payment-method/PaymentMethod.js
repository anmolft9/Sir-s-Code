import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { AddPaymentMethod } from "../../components/payment-method-forms/AddPaymentMethod";
import { PaymentMethodTable } from "../../components/payment-method-table/PaymentMethodTable";
import { setModalShow } from "../system-state/systemSlice";

const PaymentMethod = () => {
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState("");

  const handleOnAddPM = (str) => {
    dispatch(setModalShow());
    setShowForm(str);
  };
  return (
    <AdminLayout>
      <h4 className="py-4">Paymet Method mgmt.</h4>
      <hr />

      <div className="text-end py-3">
        <Button variant="primary" onClick={() => handleOnAddPM("add")}>
          <i className="fa-solid fa-plus"></i> Add New Payment Method
        </Button>
      </div>
      <PaymentMethodTable showForm={showForm} handleOnAddPM={handleOnAddPM} />
    </AdminLayout>
  );
};

export default PaymentMethod;

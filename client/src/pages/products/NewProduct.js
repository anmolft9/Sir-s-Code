import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { AddProductForm } from "../../components/product-form/AddProductForm";

const NewProduct = () => {
  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/products">
          <Button variant="none">
            <i class="fa-solid fa-angle-left"></i> Back
          </Button>
        </Link>
      </div>
      <h1>Add New Product </h1>
      <hr />
      <div>
        <AddProductForm />
      </div>
    </AdminLayout>
  );
};

export default NewProduct;

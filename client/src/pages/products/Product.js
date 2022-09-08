import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { ProductTable } from "../../components/product-table/ProductTable";

const Product = () => {
  return (
    <AdminLayout>
      <h1>Products</h1>

      <div className="text-end">
        <Link to="/product/new">
          <Button variant="primary">
            <i class="fa-solid fa-plus"></i> Add New Product
          </Button>
        </Link>
        <hr />
      </div>
      <div className="product-list mt-5">
        <ProductTable />
      </div>
    </AdminLayout>
  );
};

export default Product;

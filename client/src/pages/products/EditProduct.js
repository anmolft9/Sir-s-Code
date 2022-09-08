import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { EditProductForm } from "../../components/product-form/EditProductForm";
import { deleteProductsAction, getSingleProductsAction } from "./productAction";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const { selectedProduct } = useSelector((state) => state.products);

  useEffect(() => {
    _id && dispatch(getSingleProductsAction(_id));
  }, [_id, dispatch]);

  const handleOnDelete = () => {
    if (window.confirm("Are you sure, you want to delete this product?")) {
      const { thumbnail, images } = selectedProduct;
      const imgs = [thumbnail, ...images];

      deleteProductsAction(_id, [...new Set(imgs)]);
    }
  };

  return (
    <AdminLayout>
      <div className="mt-3 mb-3">
        <Link to="/products">
          <Button variant="none">
            <i class="fa-solid fa-angle-left"></i> Back
          </Button>
        </Link>
      </div>
      <h1>Update Product </h1>
      <hr />
      <div className="">
        <EditProductForm />
      </div>

      <div className="text-end py-3">
        <Button variant="danger" onClick={handleOnDelete}>
          Delete Product
        </Button>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;

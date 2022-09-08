import { toast } from "react-toastify";
import {
  deleteProduct,
  fetchProducts,
  postProduct,
  updateProduct,
} from "../../helpers/axiosHelper";
import { setProducts, setSelectedProduct } from "./productSlice";

export const getProductsAction = () => async (dispatch) => {
  const { status, products } = await fetchProducts();
  status === "success" && dispatch(setProducts(products));
};

export const getSingleProductsAction = (_id) => async (dispatch) => {
  const { status, products } = await fetchProducts(_id);
  status === "success" && dispatch(setSelectedProduct(products));
};

export const postProductsAction = async (data) => {
  const responsePending = postProduct(data);
  toast.promise(responsePending, { pending: "Please wait..." });

  const { status, message } = await responsePending;

  toast[status](message);
};

export const updateProductsAction = async (data) => async (dispatch) => {
  const responsePending = updateProduct(data);
  toast.promise(responsePending, { pending: "Please wait..." });

  const { status, message } = await responsePending;
  toast[status](message);
  status === "success" && dispatch(getSingleProductsAction(data._id));
};
export const deleteProductsAction = async (_id, data) => {
  const responsePending = deleteProduct(_id, data);
  toast.promise(responsePending, { pending: "Please wait..." });

  const { status, message } = await responsePending;

  toast[status](message);
};

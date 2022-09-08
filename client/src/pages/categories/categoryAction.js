import { toast } from "react-toastify";
import {
  deleteCategory,
  fetchCategory,
  postCategory,
  updateCategory,
} from "../../helpers/axiosHelper";
import { setCategories } from "./categorySlice";

export const getCategoriesAction = () => async (dispatch) => {
  const { status, categories } = await fetchCategory();

  status === "success" && dispatch(setCategories(categories));
};

export const postCategoriesAction = (data) => async (dispatch) => {
  const pormisePending = postCategory(data);
  toast.promise(pormisePending, { pending: "Please wait ..." });

  const { status, message } = await pormisePending;
  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};

export const updateCategoriesAction = (data) => async (dispatch) => {
  const pormisePending = updateCategory(data);
  toast.promise(pormisePending, { pending: "Please wait ..." });

  const { status, message } = await pormisePending;
  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};

export const deleteCategoriesAction = (_id) => async (dispatch) => {
  const pormisePending = deleteCategory(_id);
  toast.promise(pormisePending, { pending: "Please wait ..." });

  const { status, message } = await pormisePending;
  toast[status](message);

  status === "success" && dispatch(getCategoriesAction());
};

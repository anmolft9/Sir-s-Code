import { toast } from "react-toastify";
import { deletePM, fetchPM, postPM, updatePM } from "../../helpers/axiosHelper";
import { setModalShow } from "../system-state/systemSlice";
import { setPaymentMethods } from "./pmSlice";

export const getPmsAction = () => async (dispatch) => {
  const { status, pm } = await fetchPM();

  status === "success" && dispatch(setPaymentMethods(pm));
};

export const postPmsAction = (data) => async (dispatch) => {
  const promisePending = postPM(data);

  toast.promise(promisePending, { pending: "Please wait ..." });

  const { status, message } = await promisePending;

  toast[status](message);

  status === "success" && dispatch(setModalShow()) && dispatch(getPmsAction());
};

export const deletePmAction = (_id) => async (dispatch) => {
  const promisePending = deletePM(_id);

  toast.promise(promisePending, { pending: "Please wait ..." });

  const { status, message } = await promisePending;

  toast[status](message);

  status === "success" && dispatch(getPmsAction());
};

export const updatePmAction = (data) => async (dispatch) => {
  const promisePending = updatePM(data);

  toast.promise(promisePending, { pending: "Please wait ..." });

  const { status, message } = await promisePending;

  toast[status](message);

  status === "success" && dispatch(setModalShow()) && dispatch(getPmsAction());
};

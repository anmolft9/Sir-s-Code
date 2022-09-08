import { toast } from "react-toastify";
import {
  getAdminUser,
  getNewAccessJWT,
  loginAdminUser,
  updateAdminUser,
  updateAdminUserPassword,
} from "../../helpers/axiosHelper";
import { setAdminUser } from "./userSlice";

export const loginUserAction = (data) => async (dispatch) => {
  const resultPromise = loginAdminUser(data);

  toast.promise(resultPromise, { pending: "please wait.." });

  const { status, message, user, accessJWT, refreshJWT } = await resultPromise;

  toast[status](message);

  if (status === "success") {
    sessionStorage.setItem("accessJWT", accessJWT);
    localStorage.setItem("refreshJWT", refreshJWT);
    dispatch(setAdminUser(user));
  }
};

export const adminLogout = () => (dispatch) => {
  dispatch(setAdminUser({}));
  sessionStorage.removeItem("accessJWT");
  localStorage.removeItem("refreshJWT");
};

//fetch user and mount in the redux store
export const getAdminUserAction = (token) => async (dispatch) => {
  const { status, message, user } = await getAdminUser(token);
  status === "success" && dispatch(setAdminUser(user));
};

export const autoLogin = () => async (dispatch) => {
  const accessJWT = sessionStorage.getItem("accessJWT");
  const refreshJWT = localStorage.getItem("refreshJWT");
  //esle

  if (accessJWT) {
    //if accessJWT exist, fetch user and mont user in our redux store
    dispatch(getAdminUserAction());
  } else if (refreshJWT) {
    // if refreshJWT exist only, fetch new accessJWT and fetch user using the newly fetch accessJWT
    const token = await getNewAccessJWT();
    token ? dispatch(getAdminUserAction(token)) : dispatch(adminLogout());
  } else {
    dispatch(adminLogout());
  }
};

export const updateAdminProfileAction = (data) => async (dispatch) => {
  const promisePending = updateAdminUser(data);
  toast.promise(promisePending, { pending: "please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
  status === "success" && dispatch(getAdminUserAction);
};

export const updateAdminPasswordAction = async (data) => {
  const promisePending = updateAdminUserPassword(data);
  toast.promise(promisePending, { pending: "please wait..." });
  const { status, message } = await promisePending;
  toast[status](message);
  // status === "success" && dispatch(getAdminUserAction);
};

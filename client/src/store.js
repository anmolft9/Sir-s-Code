import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./pages/login/userSlice";
import systemReducer from "./pages/system-state/systemSlice";
import categoryReducer from "./pages/categories/categorySlice";
import paymentMethodReducer from "./pages/payment-method/pmSlice";
import productReducer from "./pages/products/productSlice";

const store = configureStore({
  reducer: {
    admin: userReducer,
    system: systemReducer,
    category: categoryReducer,
    paymentMethod: paymentMethodReducer,
    products: productReducer,
  },
});

export default store;

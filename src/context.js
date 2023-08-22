import React, {
  useState,
  useReducer,
  useRef,
  useContext,
  useEffect,
} from "react";
import cartItems from "./data";

import reducer from "./reducer";

// Url
const url = "https://course-api.com/react-useReducer-cart-project";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  amount: 0,
  total: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   Clear All from cart
  const clearCart = () => {
    return dispatch({ type: "REMOVE_ALL" });
  };

  const removeItem = (id) => {
    return dispatch({ type: "REMOVE", payload: id });
  };

  const incItem = (id) => {
    return dispatch({ type: "INCREASE", payload: id });
  };
  const decItem = (id) => {
    return dispatch({ type: "DECREASE", payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{ ...state, clearCart, incItem, decItem, removeItem }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };

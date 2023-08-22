const reducer = (state, action) => {
  // ClearCart
  if (action.type === "REMOVE_ALL") {
    return {
      ...state,
      cart: [],
    };
  }

  //   remove singlItem
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }

  // increase Item
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }
  // decrease Item
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));

    return { ...state, amount, total };
  };

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }

  return state;
};

export default reducer;

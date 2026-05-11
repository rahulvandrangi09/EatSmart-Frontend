import { createContext, useState } from "react";

export const Dailycontext = createContext(null);

const Dailycontextprovider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});

  const addToCart = (id) => {
    setCartItem((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCartItem((prev) => {
      const newCount = (prev[id] || 0) - 1;
      if (newCount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newCount };
    });
  };

  const getTotal = () => {
    let total = 0;
    for (const id in cartItem) {
      const product = all_products.find((p) => p.id === id);
      if (product) {
        total += product.new_price * cartItem[id];
      }
    }
    return total;
  };

  const getTotalItems = () => {
    return Object.values(cartItem).reduce((sum, count) => sum + count, 0);
  };

  const contextValue = {
    all_products,
    cartItem,
    addToCart,
    removeFromCart,
    getTotal,
    getTotalItems,
  };

  return (
    <Dailycontext.Provider value={contextValue}>
      {props.children}
    </Dailycontext.Provider>
  );
};

export default Dailycontextprovider;
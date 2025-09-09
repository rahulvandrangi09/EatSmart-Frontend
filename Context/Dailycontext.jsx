import { createContext, useState, useEffect } from "react";
import personalCareData from "../Components/Assests/new_collections"; // ✅ daily essentials dataset
import recipes from "../Components/Assests/all_recipes";

export const Dailycontext = createContext(null);

const Dailycontextprovider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});

  // Fetch expiry items (quick discounts) and merge with daily essentials
  useEffect(() => {
    const fetchQuickDiscounts = async () => {
      try {
        const res = await fetch("http://localhost:5000/quickdiscounts");
        const data = await res.json();

        // ✅ Merge daily essentials (local dataset) + backend products
        setAllProducts([...personalCareData, ...data]);
      } catch (err) {
        console.error("Error fetching quick discounts:", err);

        // ✅ Fallback to local data if backend fails
        setAllProducts([...personalCareData]);
      }
    };

    fetchQuickDiscounts();
  }, []);

  // Add to cart
  const addToCart = (id) => {
    setCartItem((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItem((prev) => {
      if (!prev[id]) return prev;
      const newCart = { ...prev };
      newCart[id] = newCart[id] - 1;
      if (newCart[id] <= 0) delete newCart[id];
      return newCart;
    });
  };

  // Count total items
  const gettotalitems = () =>
    Object.values(cartItem).reduce((acc, qty) => acc + qty, 0);

  // Calculate total price
  const getTotal = () =>
    Object.keys(cartItem).reduce((total, id) => {
      const product = all_products.find((p) => p.id === Number(id));
      if (!product) return total;
      return total + product.new_price * cartItem[id];
    }, 0);

  return (
    <Dailycontext.Provider
      value={{
        all_products,
        cartItem,
        all_recipes: recipes, // ✅ provide recipes dataset
        setAllProducts,
        addToCart,
        removeFromCart,
        gettotalitems,
        getTotal,
      }}
    >
      {props.children}
    </Dailycontext.Provider>
  );
};

export default Dailycontextprovider;

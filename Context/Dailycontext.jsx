import { createContext, useState, useEffect } from "react";
import personalCareData from "../Components/Assests/new_collections";
import recipes from "../Components/Assests/all_recipes";

export const Dailycontext = createContext(null);

const Dailycontextprovider = (props) => {
  const [all_products, setAllProducts] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(true);
  

  // 🔹 Normalize helper for consistent IDs
  const normalizeProducts = (data, offset = 0) =>
    data.map((item, index) => ({
      ...item,
      // ✅ Corrected: Ensure a unique ID by combining offset and index
      id: String(offset + index + 1),
      name: item.name || item.title || "Unnamed Product",
      new_price: item.new_price || item.price || 0,
      old_price: item.old_price || item.price || 0,
      image: item.image || "/default.png",
    }));

  // 🔹 Fetch backend products and merge with static data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/allproducts");
        let data = await res.json();
        if (!Array.isArray(data)) data = [];

        // ✅ Corrected: Use backend IDs directly, as they are now strings
        const normalizedStatic = normalizeProducts(personalCareData, 0);
        const backendProducts = data;

        setAllProducts([...normalizedStatic, ...backendProducts]);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        const normalizedStatic = normalizeProducts(personalCareData, 0);
        setAllProducts(normalizedStatic);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Cart functions
  const addToCart = (id) => {
    setCartItem((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItem((prev) => {
      if (!prev[id]) return prev;
      const newCart = { ...prev };
      newCart[id] -= 1;
      if (newCart[id] <= 0) delete newCart[id];
      return newCart;
    });
  };

  const gettotalitems = () => Object.values(cartItem).reduce((a, b) => a + b, 0);

  const getTotal = () =>
    Object.keys(cartItem).reduce((total, id) => {
      const product = all_products.find((p) => String(p.id) === String(id));
      if (!product) return total;
      return total + product.new_price * cartItem[id];
    }, 0);

  return (
    <Dailycontext.Provider
      value={{
        all_products,
        cartItem,
        all_recipes: recipes,
        addToCart,
        removeFromCart,
        gettotalitems,
        getTotal,
        loading,
      }}
    >
      {props.children}
    </Dailycontext.Provider>
  );
};

export default Dailycontextprovider;
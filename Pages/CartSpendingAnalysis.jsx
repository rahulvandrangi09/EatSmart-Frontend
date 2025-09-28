import React, { useContext, useEffect, useState } from "react";
import { Dailycontext } from "../Context/Dailycontext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CartSpendingAnalysis = () => {
  const { cartItem, all_products } = useContext(Dailycontext);

  const [dataChart, setDataChart] = useState({
    labels: ["Healthy", "Unhealthy"],
    datasets: [{ data: [0, 0], backgroundColor: ["#4CAF50", "#F44336"] }],
  });

  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    const classifyCart = async () => {
      const cartItems = Object.keys(cartItem)
        .filter((id) => cartItem[id] > 0)
        .map((id) => {
          const product = all_products.find((p) => String(p.id) === String(id));
          return product
            ? { name: product.name, price: product.new_price * cartItem[id] }
            : null;
        })
        .filter(Boolean);

      let healthyTotal = 0;
      let unhealthyTotal = 0;

      const processedItems = [];

      for (const item of cartItems) {
        try {
          const res = await fetch(
            `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
              item.name
            )}&search_simple=1&json=1&page_size=1`
          );
          const data = await res.json();
          const product = data.products?.[0];

          const sugar = parseFloat(product?.nutriments?.sugars_100g) || 0;
          const fat = parseFloat(product?.nutriments?.fat_100g) || 0;

          if (!product || sugar <= 10 && fat <= 10) {
            healthyTotal += item.price;
          } else {
            unhealthyTotal += item.price;
          }
        } catch {
          healthyTotal += item.price; // fallback
        }

        processedItems.push(item);
      }

      setItemsList(processedItems);
      setDataChart({
        labels: ["Healthy", "Unhealthy"],
        datasets: [{ data: [healthyTotal, unhealthyTotal], backgroundColor: ["#4CAF50", "#F44336"] }],
      });
    };

    classifyCart();
  }, [cartItem, all_products]);

  const isCartEmpty = itemsList.length === 0;

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h1>🛒 Cart Spending Report</h1>

      {isCartEmpty ? (
        <p style={{ marginTop: "40px", fontSize: "18px", color: "#666" }}>
          Add items to the cart to display spending analysis!
        </p>
      ) : (
        <>
          <div className="items">
            <h2>Items in Cart</h2>
            <ul>
              {itemsList.map((item, idx) => (
                <li key={idx}>
                  {item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
          </div>

          <div className="totals" style={{ margin: "20px 0" }}>
            <p>
              <strong>Healthy Spending:</strong> ₹{dataChart.datasets[0].data[0]}
            </p>
            <p>
              <strong>Unhealthy Spending:</strong> ₹{dataChart.datasets[0].data[1]}
            </p>
          </div>

          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <Pie data={dataChart} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartSpendingAnalysis;

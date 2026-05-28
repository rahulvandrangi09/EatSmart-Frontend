import React, { useContext, useEffect, useState } from "react";
import "./CSS/cartspendinganalysis.css";
import { Dailycontext } from "../Components/Context/Dailycontext";
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
    <div className="cart-spending-analysis">
      <div className="spending-container">
        <div className="spending-header">
          <h1 className="spending-title">🛒 Cart Spending Report</h1>
        </div>

        {isCartEmpty ? (
          <div className="empty-analysis">
            <div className="empty-icon">📦</div>
            <p className="empty-text">Add items to the cart to display spending analysis!</p>
          </div>
        ) : (
          <>
            <div className="spending-grid">
              <div className="spending-card">
                <div className="card-label">Healthy Spending</div>
                <div className="card-value positive">₹{dataChart.datasets[0].data[0]}</div>
              </div>
              <div className="spending-card">
                <div className="card-label">Unhealthy Spending</div>
                <div className="card-value negative">₹{dataChart.datasets[0].data[1]}</div>
              </div>
            </div>

            <div className="chart-section">
              <h3 className="chart-title">Spending Breakdown</h3>
              <div className="chart-container">
                <div className="chart-canvas">
                  <Pie data={dataChart} />
                </div>
              </div>
            </div>

            <div className="chart-section">
              <h3 className="chart-title">Items in Cart</h3>
              <div style={{ textAlign: 'left' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {itemsList.map((item, idx) => (
                    <li key={idx} style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.name}</span>
                      <strong>₹{item.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSpendingAnalysis;

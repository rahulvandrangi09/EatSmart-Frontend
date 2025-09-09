import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DailyEssentials from "../Pages/DailyEssentials";
import Category from "../Pages/Category";
import QuickDiscounts from "../Components/QuickDiscounts/Quickdiscounts.jsx";
import Chatbot from "../Pages/Chatbot.jsx";
import Productpage from "../Pages/Productpage";
import Recipeshow from "../Pages/Recipeshow.jsx";
import Cart from "../Pages/Cart";
import AuthPage from "../Pages/Auth.jsx"; // <--- Use AuthPage

import Dailycontextprovider from "../Context/Dailycontext.jsx";

const App = () => {
  return (
    <Dailycontextprovider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<DailyEssentials />} />
          <Route path="/smartrecipes" element={<Category cat="smartrecipes" />} />
          <Route path="/quickdiscounts" element={<QuickDiscounts cat="quickdiscount" />} />
          <Route path="/alfredai" element={<Chatbot />} />

          <Route path="/product/:productId" element={<Productpage />} />
          <Route path="/recipe/:recipeId" element={<Recipeshow />} />
          <Route path="/cart" element={<Cart />} />

          {/* ✅ AuthPage handles login/signup toggle */}
          <Route path="/login" element={<AuthPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Dailycontextprovider>
  );
};

export default App;

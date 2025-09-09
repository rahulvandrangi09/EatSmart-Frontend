import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "./CSS/chatBot.css";
import CartSpendingAnalysis from "./CartSpendingAnalysis";
import Cart from "./Cart";
const Chatbot = () => {
  const [input, setInput] = useState("");
  const [recipe, setRecipe] = useState(null);

  const handleSend = async () => {
    try {
      const res = await axios.post("http://localhost:5000/get-recipe", {
        recipe: input,
      });
      setRecipe(res.data);
    } catch (err) {
      setRecipe({ error: "Recipe not found." });
    }
  };

  return (
    <>
        <div className="chatbot">
        <h2>🍴 Recipe Chatbot</h2>

        <div className="chat-input-row">
            <input
            type="text"
            placeholder="Type a recipe"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSend}>Get Recipe</button>
        </div>

        {recipe && !recipe.error && (
            <>
            <div className="recipe-card">
                <h3 className="recipe-title">{recipe.title}</h3>

                <h4>Ingredients:</h4>
                <ul className="centered-ingredients">
                {recipe.ingredients?.map((i, idx) => (
                    <li key={idx}>{i}</li>
                ))}
                </ul>

                <h4>Instructions:</h4>
                <div className="instructions-wrapper">
                <ReactMarkdown
                    children={recipe.instructions || "Instructions not available"}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                />
                </div>
            </div>
            </>
        )}
        {recipe && recipe.error && <p className="error-text">{recipe.error}</p>}
        </div>
        <CartSpendingAnalysis/>
    </>
  );
};

export default Chatbot;
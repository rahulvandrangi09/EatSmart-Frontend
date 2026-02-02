import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import "./CSS/chatBot.css";
import CartSpendingAnalysis from "./CartSpendingAnalysis";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]); // Track ingredients array
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("recipe"); // 'recipe' or 'ingredients'

  // Add ingredient to list
  const addIngredient = () => {
    if (input.trim() && !ingredients.includes(input.trim())) {
      setIngredients([...ingredients, input.trim()]);
      setInput("");
    }
  };

  // Remove ingredient from list
  const removeIngredient = (idx) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  // Generate recipe from ingredients
  const generateRecipeFromIngredients = async () => {
    if (ingredients.length === 0) {
      setRecipe({ error: "Please add at least one ingredient." });
      return;
    }

    setLoading(true);
    setRecipe(null);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-recipe-from-ingredients`,
        { ingredients }
      );
      setRecipe(res.data);
    } catch (err) {
      console.error("Error:", err);
      setRecipe({ error: "Failed to generate recipe. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Search recipe by name
  const searchRecipeByName = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setRecipe(null);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/get-recipe`, {
        recipe: input,
      });
      setRecipe(res.data);
    } catch (err) {
      console.error("Error:", err);
      setRecipe({ error: "Recipe not found." });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (mode === "recipe") {
        searchRecipeByName();
      } else if (mode === "ingredients" && input.trim()) {
        addIngredient();
      }
    }
  };

  return (
    <>
      <div className="chatbot">
        <h2>🍴 Recipe Generator</h2>

        {/* Mode Toggle */}
        <div className="mode-toggle">
          <button
            className={`toggle-btn ${mode === "recipe" ? "active" : ""}`}
            onClick={() => {
              setMode("recipe");
              setIngredients([]);
              setRecipe(null);
              setInput("");
            }}
          >
            🔍 Search Recipe
          </button>
          <button
            className={`toggle-btn ${mode === "ingredients" ? "active" : ""}`}
            onClick={() => {
              setMode("ingredients");
              setRecipe(null);
              setInput("");
            }}
          >
            ⭐ Generate from Ingredients
          </button>
        </div>

        {/* Recipe Search Mode */}
        {mode === "recipe" && (
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Search for a recipe (e.g., Pasta, Biryani)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={searchRecipeByName}>Search</button>
          </div>
        )}

        {/* Ingredients Mode */}
        {mode === "ingredients" && (
          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Enter an ingredient and press Enter"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={addIngredient}>Add</button>
          </div>
        )}

        {/* Ingredients List */}
        {mode === "ingredients" && ingredients.length > 0 && (
          <div className="ingredients-list">
            <h4>Added Ingredients:</h4>
            <div className="ingredients-tags">
              {ingredients.map((ing, idx) => (
                <span key={idx} className="ingredient-tag">
                  {ing}
                  <button
                    className="remove-btn"
                    onClick={() => removeIngredient(idx)}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <button
              className="generate-btn"
              onClick={generateRecipeFromIngredients}
              disabled={loading}
            >
              🚀 Generate Recipe
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>
              {mode === "recipe"
                ? "Searching for recipe..."
                : "Generating recipe from ingredients..."}
            </p>
          </div>
        )}

        {/* Recipe Card */}
        {!loading && recipe && !recipe.error && (
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
        )}

        {/* Error State */}
        {!loading && recipe && recipe.error && (
          <p className="error-text">{recipe.error}</p>
        )}
      </div>

      <CartSpendingAnalysis />
    </>
  );
};

export default Chatbot;

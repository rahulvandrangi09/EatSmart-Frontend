import React, { useContext, useState } from "react";
import "./CSS/category.css";
import { Dailycontext } from "../Context/Dailycontext";
import dropdown from "../Components/Assests/dropdown_icon.png";
import RecipeItem from "../Components/RecipeItem/Recipeitem";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const Category = (props) => {
  const { all_recipes } = useContext(Dailycontext);

  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(12);

  // Add ingredient manually or on Enter
  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  // Remove ingredient
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Call AI backend
  const handleGenerateRecipe = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient");
      return;
    }

    setLoading(true); // start loading
    setGeneratedRecipe(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/smartrecipes`,
        {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
        }
      );

      const data = await response.json();
      console.log("AI Recipe Response:", data);

      if (data.error) {
        setGeneratedRecipe({ error: data.error });
      } else {
        setGeneratedRecipe(data);
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      setGeneratedRecipe({ error: "Failed to generate recipe. Please try again." });
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Sort recipes
  const sortRecipes = (recipes) => {
    let sorted = [...recipes];
    switch (sortBy) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return sorted;
  };

  // Filter by category and sort
  const filteredRecipes = sortRecipes(
    all_recipes.filter((item) => item.category === props.cat)
  );

  // Get recipes to display based on itemsToShow
  const recipesToDisplay = filteredRecipes.slice(0, itemsToShow);
  const totalRecipes = filteredRecipes.length;

  // Handle explore more
  const handleExploreMore = () => {
    setItemsToShow((prev) => prev + 12);
  };

  return (
    <div className="category">
      {/* AI Recipe Generator Section */}
      <div className="ai-recipe-section">
        <h2>🤖 AI Recipe Generator</h2>
        
      <div className="findrecipe">
        <input
          type="text"
          className="recipefinder"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter an ingredient and press Enter"
        />
        <button onClick={handleAddIngredient}>Add</button>
      </div>

      {/* Show entered ingredients */}
      {ingredients.length > 0 && (
      <div className="ingredients-list">
        {ingredients.map((ing, index) => (
          <span key={index} className="ingredient-chip">
            {ing}
            <button
              className="remove-chip"
              onClick={() => removeIngredient(index)}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      )}

      {/* Generate Recipe Button */}
      {ingredients.length > 0 && (
        <button className="generate-btn" onClick={handleGenerateRecipe} disabled={loading}>
          {loading ? "Generating..." : "🚀 Generate Recipe"}
        </button>
      )}

      {/* Show loading symbol */}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cooking up your recipe... 🍳</p>
        </div>
      )}

      {/* Display AI Generated Recipe */}
      {generatedRecipe && !generatedRecipe.error && !loading && (
        <div className="generated-recipe-card">
          <h3 className="recipe-title">🍴 AI Generated Recipe</h3>

          <h4>Recipe: {generatedRecipe.title}</h4>

          <h4>Ingredients:</h4>
          <ul className="centered-ingredients">
            {generatedRecipe.ingredients?.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          <h4>Instructions:</h4>
          <div className="instructions-wrapper">
            <ReactMarkdown
              children={generatedRecipe.instructions || "Instructions not available"}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            />
          </div>
        </div>
      )}

      {/* Error message */}
      {generatedRecipe && generatedRecipe.error && (
        <div className="error-message">
          <p>❌ {generatedRecipe.error}</p>
        </div>
      )}
      </div>

      <hr className="separator" />

      {/* Recipe Category Display */}
      <div className="recipecategory-index">
        <p>
          <span>Showing 1-{Math.min(itemsToShow, totalRecipes)}</span> out of{" "}
          {totalRecipes} recipes
        </p>
        <div className="recipecategory-sort-container">
          <div
            className="recipecategory-sort"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            Sort by <img src={dropdown} alt="dropdown" />
          </div>
          {showSortDropdown && (
            <div className="sort-dropdown">
              <div
                className="sort-option"
                onClick={() => {
                  setSortBy("default");
                  setShowSortDropdown(false);
                }}
              >
                {sortBy === "default" && "✓ "} Default
              </div>
              <div
                className="sort-option"
                onClick={() => {
                  setSortBy("name-asc");
                  setShowSortDropdown(false);
                }}
              >
                {sortBy === "name-asc" && "✓ "} Name: A to Z
              </div>
              <div
                className="sort-option"
                onClick={() => {
                  setSortBy("name-desc");
                  setShowSortDropdown(false);
                }}
              >
                {sortBy === "name-desc" && "✓ "} Name: Z to A
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recipes Display */}
      <div className="recipecategoryproducts">
        {recipesToDisplay.length > 0 ? (
          recipesToDisplay.map((item, i) => (
            <RecipeItem
              key={i}
              id={item.id}
              img={item.image}
              name={item.name}
              description={item.description}
            />
          ))
        ) : (
          <p className="no-recipes">No recipes found in this category.</p>
        )}
      </div>

      {/* Explore More Button */}
      {itemsToShow < totalRecipes && (
        <div className="category-loadmore" onClick={handleExploreMore}>
          Explore More
        </div>
      )}
    </div>
  );
};

export default Category;

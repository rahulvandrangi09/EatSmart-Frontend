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

  // Call AI backend
  const handleGenerateRecipe = async () => {
    try {
      const response = await fetch("http://localhost:5000/smartrecipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });

      const data = await response.json();
      console.log("AI Recipe Response:", data);

      setGeneratedRecipe(data); // <-- now contains recipeText + stepImages
    } catch (error) {
      console.error("Error generating recipe:", error);
      setGeneratedRecipe(null);
    }
  };

  return (
    <div className="category">
      {/* Ingredient Input */}
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
      <div className="ingredients-list">
        {ingredients.map((ing, index) => (
          <span key={index} className="ingredient-chip">
            {ing}
          </span>
        ))}
      </div>

      {/* Generate Recipe Button */}
      {ingredients.length >= 4 && (
        <button className="generate-btn" onClick={handleGenerateRecipe}>
          Generate Recipe
        </button>
      )}

      {/* Display AI Generated Recipe */}
      {/* Display AI Generated Recipe */}
      {generatedRecipe && generatedRecipe.recipeText && (
        <div className="generated-recipe-card">
          <h3 className="recipe-title">🍴 AI Generated Recipe</h3>

          <h4>Ingredients:</h4>
          <ul className="centered-ingredients">
            {ingredients.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>

          <h4>Instructions:</h4>
          <div className="instructions-wrapper">
            <ReactMarkdown
              children={generatedRecipe.recipeText}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            />
          </div>

          {/* Show step images if any */}
          {generatedRecipe.stepImages &&
            generatedRecipe.stepImages.map((img, idx) =>
              img ? (
                <div key={idx} className="step-image">
                  <p>Step {idx + 1}</p>
                  <img
                    src={`data:image/png;base64,${img.data}`}
                    alt={`Step ${idx + 1}`}
                    style={{
                      maxWidth: "400px",
                      borderRadius: "8px",
                      margin: "10px auto",
                      display: "block",
                    }}
                  />
                </div>
              ) : null
            )}
        </div>
      )}

      {/* Existing Recipe Category Display */}
      <div className="recipecategory-index">
        <p>
          <span>Showing 1-12 </span> out of 36 products
        </p>
        <div className="recipecategory-sort">
          Sort by <img src={dropdown} alt="" />
        </div>
      </div>

      <div className="recipecategoryproducts">
        {all_recipes.map((item, i) =>
          props.cat === item.category ? (
            <RecipeItem
              key={i}
              id={item.id}
              img={item.image}
              name={item.name}
              description={item.description}
            />
          ) : null
        )}
      </div>

      <div className="category-loadmore">Explore More</div>
    </div>
  );
};

export default Category;

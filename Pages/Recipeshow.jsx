import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Dailycontext } from "../Context/Dailycontext";
import "./CSS/recipeshow.css";

const Recipeshow = () => {
  const { all_recipes } = useContext(Dailycontext);
  const { recipeId } = useParams();

  // ✅ Compare as string, since IDs are "rec-1", "rec-2" etc.
  const recipe = all_recipes.find((r) => r.id === recipeId);

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div className="recipeshow">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} className="recipe-img" />
      <p className="recipe-desc">{recipe.description}</p>
      <h3>Procedure</h3>
      <p className="recipe-procedure">{recipe.procedure}</p>
    </div>
  );
};

export default Recipeshow;

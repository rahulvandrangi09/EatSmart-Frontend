import React from "react";
import "./recipeitem.css";
import { Link } from "react-router-dom";

const RecipeItem = ({ id, img, name, description }) => {
  return (
    <div className="recipe-item" data-id={id}>
      <div className="recipe-item-img">
        <Link to={`/recipe/${id}`}>
          <img src={img} alt={name} />
        </Link>
      </div>

      <p className="recipe-item-name">{name}</p>
      {description && (
        <p className="recipe-item-description">{description}</p>
      )}
    </div>
  );
};

export default RecipeItem;

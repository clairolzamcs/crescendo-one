/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useRouteMatch } from "react-router-dom";
import { IRecipe } from "../shared/IRecipes";
import { IngredientsModal } from "./IngredientsModal";

export interface RecipesProps {
  id: String;
  request: IRecipe[];
}

export const Recipes: React.FC<RecipesProps> = ({ id, request }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const match = useRouteMatch();
  const history = useHistory();
  const pageUrl = useRef(match.url);
  const selectedRecipe = request.filter((res) => res.uuid === id);

  const ingredients = selectedRecipe.map((item) => item.ingredients);
  const directions = selectedRecipe.map((item) => {
    return item.directions;
  });

  return (
    <div>
      {selectedRecipe.map((item) => (
        <div>
          <div style={{ textAlign: "center" }}>
            <h4>{item.title}</h4>
            <h5>{item.description}</h5>
          </div>
          <div>
            <p>Servings: {item.servings} persons</p>
            <p>Preparation Time: {item.prepTime} mins</p>
            <p>Cooking Time: {item.cookTime} mins</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button variant="outline-info" onClick={() => setModalShow(true)}>
              Click to view Ingredients
            </Button>
            <IngredientsModal
              show={modalShow}
              onNavigatePage={() => {
                history.replace(pageUrl.current);
                setModalShow(false);
              }}
              ingredients={ingredients}
            />
          </div>

          <div>
            <h6>Directions</h6>
            {directions.map((result) =>
              result.map((desc, index) => (
                <ul>
                  <li key={index}>
                    {desc.instructions}{" "}
                    {desc.optional && (
                      <span style={{ fontStyle: "italic" }}>(optional)</span>
                    )}
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

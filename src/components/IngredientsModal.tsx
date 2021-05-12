/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IIngredient, ISpecial } from "../shared/IRecipes";

export interface IngredientsModalProps {
  show: boolean;
  onNavigatePage: (value?: boolean) => any;
  ingredients: IIngredient[][];
}

export const IngredientsModal: React.FC<IngredientsModalProps> = ({
  show,
  onNavigatePage,
  ingredients,
}) => {
  const [specialsData, setSpecialsData] = useState<ISpecial[]>([]);
  const isSpecial = (array: any[], id: String) =>
    array.filter((res: ISpecial) => res.ingredientId === id);

  const getSpecials = async () => {
    const result = await axios.get<ISpecial[]>(
      `http://localhost:3001/specials`
    );
    setSpecialsData(result.data);
  };

  useEffect(() => {
    getSpecials();
  }, []);

  return (
    <Modal
      onHide={() => {
        onNavigatePage();
      }}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Ingredients
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ingredients.map((result) =>
          result.map((desc, index) => {
            const specialRecipe = isSpecial(specialsData, desc.uuid);
            return (
              <div>
                <ul key={index}>
                  <li>
                    <p>{`${desc.amount} ${desc.measurement} of ${desc.name}`}</p>
                    {specialRecipe.map((special: ISpecial) => (
                      <div
                        style={{
                          marginTop: "-15px",
                          padding: "5px",
                          fontSize: "0.9rem",
                          background: "yellow",
                          color: "red",
                        }}
                      >
                        <div>Title: {special.title}</div>
                        <div>Type: {special.type}</div>
                        <div>Text: {special.text}</div>
                      </div>
                    ))}
                  </li>
                </ul>
              </div>
            );
          })
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onNavigatePage();
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Jumbotron,
  ListGroup,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { IRecipe } from "../shared/IRecipes";
import { Recipes } from "./Recipes";

export const Home: React.FC = () => {
  const [recipeData, setRecipeData] = useState<IRecipe[]>([]);

  const getRecipe = async () => {
    const result = await axios.get<IRecipe[]>(
      `http://localhost:3001/recipes`
    );
    setRecipeData(result.data);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <Container fluid style={{maxWidth: "75%", justifyContent: "center"}}>
      <Row>
        <Col>
          <Jumbotron fluid>
            <Container>
              <h1>Recipes!</h1>
              <p>Crescendo-javascript by Clairol Zam Salazar</p>
            </Container>
          </Jumbotron>
          {recipeData.map((item, index) => (
            <Accordion>
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    key={index}
                    as={Card.Header}
                    variant="link"
                    eventKey={`#/${item.uuid}`}
                  >
                    {item.title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={`#/${item.uuid}`}>
                  <Card.Body>
                    <Recipes id={item.uuid} request={recipeData} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

import React, { Component } from "react";
import { Form, Col, Row, Button, Image } from "react-bootstrap";

const API_KEY = "53bafcdd1856410d9718845f0b5e01ef";

let Count = 0;

const Recipe = props => (
  <div className="recipe-card">
    <h5>Recipe {Count++}</h5>
    <h5>{props.recipe.title}</h5>
    <h5>Servings: {props.recipe.servings}</h5>
    <Image
      className="recipe-img"
      src={"https://spoonacular.com/recipeImages/" + props.recipe.id + "-312x231.jpg"}
      fluid
    />
    <h5>{props.recipe.sourceUrl}</h5>
    <Button
      variant="warning"
      type="submit"
      onClick={() => {
        props.recipeSource(props.recipe);
      }}>
      Go to Recipe
    </Button>
  </div>
);

export default class recipegen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      diet: "Select Diet",
      num: 0
    };

    this.RecipeGenerate = this.RecipeGenerate.bind(this);
    this.dietChoice = this.dietChoice.bind(this);
    this.recipeSource = this.recipeSource.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&query=salad&number=3`,
      {
        method: "get",
        headers: new Headers({
          // Your header content
          Origin: "https://api.spoonacular.com/"
        })
      }
    )
      .then(response => response.json())
      .then(response => {
        this.setState({ recipes: response.results });
      });
  }

  recipeSource(id) {
    const currentrecipe = id;
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/${currentrecipe.id}/information?apiKey=${API_KEY}&?includeNutrition=false`,
      {
        method: "get",
        headers: new Headers({
          Origin: "https://api.spoonacular.com/"
        })
      }
    )
      .then(response => response.json())
      .then(response => {
        window.location.href = response.sourceUrl;
        currentrecipe.image = response.sourceUrl;
      });
  }

  RecipeList() {
    return this.state.recipes.map(currentrecipe => {
      return (
        <div style={{ maxWidth: "30vw" }}>
          <Recipe
            style={{ padding: "10rem" }}
            recipe={currentrecipe}
            recipeSource={this.recipeSource}
            key={currentrecipe._id}
          />
        </div>
      );
    });
  }

  RecipeGenerate(e) {
    e.preventDefault();
    if (this.state.diet !== "Select Diet") {
      const urr = `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/search?apiKey=${API_KEY}&diet=${this.state.diet}&number=6`;
      fetch(urr, {
        method: "get",
        headers: new Headers({
          Origin: "https://api.spoonacular.com/"
        })
      })
        .then(response => response.json())
        .then(response => {
          this.setState({ recipes: response.results });
        });
    }
  }

  dietChoice(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  render() {
    return (
      <div className="recipe-container">
        <div className="recipe-input-container">
          <Form>
            <Row>
              <Col>
                <Form.Group className="recipe-input-item" controlId="diet">
                  <Form.Control as="select" value={this.state.diet} onChange={this.dietChoice}>
                    <option readOnly>Select Diet</option>
                    <option>vegetarian</option>
                    <option>ketogenic</option>
                    <option>vegan</option>
                    <option>gluten Free</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Button className="recipe-input-item" variant="warning" type="submit on" onClick={this.RecipeGenerate}>
                  Recipe me
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="recipe-cards">
          {this.state.recipes.length === 0 && <h2 className="empty-text-sign">Select a Diet</h2>}
          {this.RecipeList()}
        </div>
      </div>
    );
  }
}

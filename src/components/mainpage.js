import React, { Component } from "react";
import { Button } from "react-bootstrap";

export default class mainpage extends Component {
  render() {
    return (
      <div className="main-page">
        <div className="main-title-container">
          <h1 className="main-title">Generatorr</h1>
        </div>
        <div className="main-button-container">
          <Button className="main-button" variant="danger" href="/memegen">
            Meme Generator
          </Button>
          <Button className="main-button" variant="success" href="/textmangen">
            Text Operations
          </Button>
          <Button className="main-button" variant="warning" href="/recipegen">
            Recipe Generator
          </Button>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Navbar className="justify-content-center" bg="dark" variant="dark">
          <Navbar.Brand href="/">Generatorr</Navbar.Brand>
          <Nav className="mr auto">
            <Nav.Link href="/memegen">Meme me</Nav.Link>
            <Nav.Link href="/textmangen">TextMan</Nav.Link>
            <Nav.Link href="/recipegen">Recipe me</Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

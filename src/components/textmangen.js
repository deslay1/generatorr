import React, { Component } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import Navbar from "./navbar";

export default class textmangen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textReverse: "",
      textReverseSubmit: "",
      textCounter: "",
      count_array: [],
      letter_array: []
    };

    this.textReverse = this.textReverse.bind(this);
    this.textReverseSubmit = this.textReverseSubmit.bind(this);

    this.textCounter = this.textCounter.bind(this);
    this.textCounterSubmit = this.textCounterSubmit.bind(this);
  }

  textReverse(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  textReverseSubmit(e) {
    e.preventDefault();
    const reverseValue = this.state.textReverse
      .split("")
      .reverse()
      .join("");
    this.setState({ textReverseSubmit: reverseValue });
  }

  textCounter(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  textCounterSubmit(e) {
    e.preventDefault();
    const count_object = [...this.state.textCounter].reduce((a, e) => {
      a[e] = a[e] ? a[e] + 1 : 1;
      return a;
    }, {});
    const count_array = Object.keys(count_object).map(function(key) {
      return count_object[key];
    });
    const letter_array = Object.keys(count_object);
    const index_space = letter_array.indexOf(" ");
    /*const index_comma = letter_array.indexOf(",");
    const index_period = letter_array.indexOf(".");
    const index_semicolon = letter_array.indexOf(";");
    const index_colon = letter_array.indexOf(":");
    const index_exclam = letter_array.indexOf("!");*/
    letter_array[index_space] = "yay! a space!";
    this.setState({ count_array: count_array, letter_array: letter_array });
  }

  getCounterList() {
    const arrayL = this.state.letter_array;
    const arrayC = this.state.count_array;
    const result = arrayL.reduce((acc, current, index) => {
      return [...acc, current, arrayC[index]];
    }, []);
    return result.map(function(entry, i) {
      if (i % 2 === 0) {
        return (
          <tr>
            <td>{entry}</td>
            <td>{result[i + 1]}</td>
          </tr>
        );
      }
    });
  }

  render() {
    return (
      <div className="textmangen">
        <Navbar />
        <div className="textman-container">
          <div className="textman-item-container">
            <div className="textman-item">
              <div className="textman-titles">
                <h3> Text Reverser</h3>
              </div>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="textReverse">
                      <Form.Control
                        type="text"
                        placeholder="Enter Text"
                        value={this.state.textReverse}
                        onChange={this.textReverse}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button variant="success" type="submit" onClick={this.textReverseSubmit}>
                      Reverse me
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div className="textman-item-output">
                <h3>{this.state.textReverseSubmit}</h3>
              </div>
            </div>
          </div>
          <div className="textman-item-container">
            <div className="textman-item">
              <div className="textman-titles">
                <h3> Letter Occurances</h3>
              </div>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="textCounter">
                      <Form.Control
                        type="text"
                        placeholder="Enter Text"
                        value={this.state.textCounter}
                        onChange={this.textCounter}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button variant="success" type="submit" onClick={this.textCounterSubmit}>
                      Count Letter Occurances
                    </Button>
                  </Col>
                </Row>
              </Form>
              <div className="textman-item-output">
                <table className="table">
                  <thead bg="info" className="thead">
                    <tr>
                      <th>Letter</th>
                      <th>Count</th>
                    </tr>
                  </thead>
                  <tbody>{this.getCounterList()}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

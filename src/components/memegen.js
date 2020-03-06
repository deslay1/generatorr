import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
/* 
const Meme = props => (
  <tr>
    <td>{props.meme.id}</td>
    <td>{props.meme.name}</td>
    <td>{props.meme.url}</td>
    <td>{props.meme.width}</td>
    <td>{props.meme.height}</td>
    <td>{props.meme.box_count}</td>
  </tr> 
); */

export default class memegen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topText: "",
      bottomText: "",
      previousImg: "",
      randomImg: "",
      memes: []
    };

    this.memeChange = this.memeChange.bind(this);
    this.memeGenerate = this.memeGenerate.bind(this);
    this.memePrevious = this.memePrevious.bind(this);
  }

  componentDidMount() {
    this.getMemes();
  }

  getMemes() {
    fetch("https://meme-api.herokuapp.com/gimme/dankmemes/100")
      .then(response => response.json())
      .then(response => {
        const { memes } = response;
        this.setState({ memes: memes });
      });
  }

  /*   MemesList() {
    return Array.from(this.state.memes).map(currentmeme => {
      return <Meme meme={currentmeme} key={currentmeme.id} />;
    });
  } */

  memeChange(e) {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  memeGenerate(e) {
    e.preventDefault();
    if (this.state.memes.length > 0) {
      const randNum = Math.floor(Math.random() * this.state.memes.length);
      const randMemeImg = this.state.memes[randNum].url;
      this.setState({ previousImg: this.state.randomImg, randomImg: randMemeImg });
    }
  }

  memePrevious(e) {
    e.preventDefault();
    if (this.state.previousImg) {
      this.setState({ randomImg: this.state.previousImg });
    }
  }

  render() {
    return (
      <div className="meme-container">
        <div className="button-container">
          <Button variant="secondary" type="submit" onClick={this.memePrevious}>
            Previous meme
          </Button>
        </div>
        <div className="meme">
          {this.state.randomImg === "" && <h2 className="empty-text-sign">Click "Meme me" to generate a meme</h2>}
          <Image className="meme-img" src={this.state.randomImg} fluid />
        </div>
        <div className="button-container">
          <Button variant="danger" type="submit" onClick={this.memeGenerate}>
            Meme me
          </Button>
        </div>
        {/* 
        <Form className="meme-form" onSubmit={this.memeSubmit}>
                    <Row>
            <Col sm={2}>
              <Form.Group controlId="topText">
                <Form.Label>Enter Top Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Top Text"
                  value={this.state.topText}
                  onChange={this.memeChange}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <Form.Group controlId="bottomText">
                <Form.Label>Enter Bottom text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Bottom Text"
                  value={this.state.bottomText}
                  onChange={this.memeChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="danger" type="submit">
            Generate meme
          </Button>
        </Form>  */}
        {/* <h3>Memes</h3>
        <div className="table-container">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Url</th>
                <th>Width</th>
                <th>Height</th>
                <th>Box Count</th>
              </tr>
            </thead>
            <tbody>{this.MemesList()}</tbody>
          </table>
        </div> */}
      </div>
    );
  }
}

import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import Navbar from "./navbar";

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
      <div className="memegen">
        <Navbar />
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
        </div>
      </div>
    );
  }
}

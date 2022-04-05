import React, { Component } from 'react';
import JokeList from './JokeList';

class Joke extends Component {
  render() {
    return <li>{this.props.joke}</li>;
  }
}

export default Joke;

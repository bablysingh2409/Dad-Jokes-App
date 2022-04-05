import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [], id: '' };
  }
  async componentDidMount() {
    const jokes = [];
    while (jokes.length < this.props.numJokesToGet) {
      let response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      jokes.push(response.data.Joke);
    }
  }
  render() {
    const showJokes = this.state.jokes.map((j) => <Joke joke={j} />);
    return (
      <div>
        <h1>Dad Jokes</h1>
        <ul>{showJokes}</ul>
      </div>
    );
  }
}
export default JokeList;

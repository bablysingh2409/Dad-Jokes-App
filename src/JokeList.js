import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: [] };
    // this.handleVotes = this.handleVotes.bind(this);
  }
  async componentDidMount() {
    let jokesContainer = [];
    for (let i = 0; i < this.props.numJokesToGet; i++) {
      let response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      jokesContainer.push({ id: uuidv4(), text: response.data.joke, votes: 0 });
    }

    this.setState({ jokes: jokesContainer });
  }
  handleVotes(id, delta) {
    this.setState((st) => ({
      jokes: st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j)),
    }));
  }
  render() {
    const jokes = this.state.jokes.map((j) => (
      <Joke
        joke={j.text}
        key={j.id}
        votes={j.votes}
        upvote={() => this.handleVotes(j.id, 1)}
        downvote={() => this.handleVotes(j.id, -1)}
      />
    ));
    return (
      <div>
        <h1>Dad Jokes</h1>
        <div>{jokes}</div>
        {this.state.votes}
      </div>
    );
  }
}
export default JokeList;

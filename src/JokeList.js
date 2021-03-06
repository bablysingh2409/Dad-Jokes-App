import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import { v4 as uuidv4 } from 'uuid';
import './JokeList.css';

class JokeList extends Component {
  static defaultProps = {
    numJokesToGet: 10,
  };
  constructor(props) {
    super(props);
    this.state = { jokes: JSON.parse(window.localStorage.getItem('jokes')) || [], loader: false };
    this.seenJokes = new Set(this.state.jokes.map((j) => j.text));
    console.log(this.seenJokes);
    this.handleClicks = this.handleClicks.bind(this);
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes();
    }
  }
  async getJokes() {
    let jokesContainer = [];
    try {
      while (jokesContainer.length < this.props.numJokesToGet) {
        let response = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        });
        let newJokes = response.data.joke;
        if (!this.seenJokes.has(newJokes)) {
          jokesContainer.push({ id: uuidv4(), text: newJokes, votes: 0 });
        } else {
          console.log(newJokes);
        }
      }
      this.setState(
        (st) => ({
          loader: false,
          jokes: [...st.jokes, ...jokesContainer],
        }),
        () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
      );
    } catch (err) {
      alert(err);
      this.setState({ loader: false });
    }
  }

  handleVotes(id, delta) {
    this.setState(
      (st) => ({
        jokes: st.jokes.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j)),
      }),
      () => window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))
    );
  }

  handleClicks() {
    this.setState({ loader: true }, this.getJokes);
  }
  render() {
    if (this.state.loader) {
      return (
        <div className="JokeList-spinner">
          <img
            src="https://icons8.com/preloaders/preloaders/116/Happy.gif"
            className="JokeList-smiley"
          />
          <h1 className="JokeList-title">Loading.....</h1>
        </div>
      );
    }
    const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title">
            <span>Dad</span> Jokes
          </h1>
          <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/320/face-with-tears-of-joy_1f602.png" />
          <button className="JokeList-getmore" onClick={this.handleClicks}>
            New Jokes
          </button>
        </div>
        <div className="JokeList-joke">
          {jokes.map((j) => (
            <Joke
              text={j.text}
              key={j.id}
              votes={j.votes}
              upvote={() => this.handleVotes(j.id, 1)}
              downvote={() => this.handleVotes(j.id, -1)}
            />
          ))}
          {this.state.votes}
        </div>
      </div>
    );
  }
}
export default JokeList;

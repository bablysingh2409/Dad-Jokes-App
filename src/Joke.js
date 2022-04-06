import React, { Component } from 'react';
import JokeList from './JokeList';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { AiOutlineArrowDown } from 'react-icons/ai';

class Joke extends Component {
  render() {
    return (
      <div>
        <div>
          <AiOutlineArrowUp onClick={this.props.upvote} />
          <button>{this.props.votes}</button>
          <AiOutlineArrowDown onClick={this.props.downvote} />
        </div>
        <div>{this.props.joke}</div>
      </div>
    );
  }
}

export default Joke;

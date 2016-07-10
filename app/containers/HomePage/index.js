import React from 'react';
import Confetti from 'react-confetti'

import {SpotifyPlayer} from './SpotifyPlayer';

import css from './HomePage.css'; // eslint-disable-line import/no-unresolved

import placeholder from './placeholder.jpeg'; // eslint-disable-line no-unused-vars


const HomePage = React.createClass({ // eslint-disable-line
  getInitialState() {
    return {
      partyMode: false,
    };
  },

  componentWillMount() {
    this.spotify = new SpotifyPlayer();
  },

  toggleParty() {
    this.setState({
      partyMode: !this.state.partyMode,
    })
  },

  componentWillUpdate(nextProps, nextState) {
    if (nextState.partyMode) {
      this.spotify.start();
    } else {
      this.spotify.stop();
    }
  },

  componentWillUnmount() {
    this.spotify.stop();
  },

  render() {
    return (
      <div className={css.image}>
        <div className={css.comingSoon}>
          Coming soon...
        </div>
        <div className={css.party} onClick={this.toggleParty}>
          {this.state.partyMode ? 'I need a breather!' : 'Let’s party!'}
          {this.state.partyMode && <Confetti gravity={.15} numberOfPieces={275} />}
        </div>
      </div>
    );
  },
});

export default HomePage;

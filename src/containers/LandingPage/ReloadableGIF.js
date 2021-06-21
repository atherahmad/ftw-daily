import React, { Component } from 'react';

import css from './LandingPage.css';

class ReloadableGIF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gif: require('../../assets/map.gif'),
      loaded: require('../../assets/map.gif'),
    };
  }

  componentDidMount() {
    document.getElementById('myCheck').style.opacity = 0;
    document.getElementById('gif').style.opacity = 0;

    setTimeout(() => {
      document.getElementById('gif').style.opacity = 1;

      document.getElementById('myCheck').click();
    }, 500);
  }
  reloadGif = () => {
    this.setState({ loaded: '' });
    setTimeout(() => {
      this.setState({ loaded: this.state.gif });
    }, 0);
  };

  render() {
    return (
      <div>
        <img
          onClick={function() {
            window.open('/s', '_self');
          }}
          className={css.gif}
          id="gif"
          src={this.state.loaded}
        />
        <button id="myCheck" onClick={this.reloadGif}>
          Replay Animation
        </button>
      </div>
    );
  }
}

export default ReloadableGIF;

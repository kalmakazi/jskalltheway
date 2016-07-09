import React from 'react';

import css from './HomePage.css';

import placeholder from './placeholder.jpeg';

const HomePage = React.createClass({
  render() {
    return (
      <div className={css.image}>
        <div>
          Coming soon...
        </div>
      </div>
    );
  },
});

export default HomePage;

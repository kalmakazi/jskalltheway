import React from 'react';

import css from './HomePage.css'; // eslint-disable-line import/no-unresolved

import placeholder from './placeholder.jpeg'; // eslint-disable-line no-unused-vars

const HomePage = React.createClass({ // eslint-disable-line
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

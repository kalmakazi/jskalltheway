import React from 'react';

import css from './Header.css';

const Link = React.createClass({ // eslint-disable-line
  propTypes: {
    children: React.PropTypes.element,
    refName: React.PropTypes.string,
    scrollToRef: React.PropTypes.func,
  },

  onClick() {
    this.props.scrollToRef(this.props.refName);
  },

  render() {
    return (
      <div className={css.link} onClick={this.onClick}>{this.props.children}</div>
    );
  },
});

// eslint-disable-line
const Header = React.createClass({ // eslint-disable-line
  propTypes: {
    scrollToRef: React.PropTypes.func,
  },

  render() {
    return (
      <div>
        <header className={css.header}>
          <div className={css.logo}>
            <div>Jennifer</div>
            <div className={css.plus}>&</div>
            <div>Stephen</div>
          </div>
          <nav className={css.nav}>
            <Link scrollToRef={this.props.scrollToRef} refName="events">Events</Link>
            <Link scrollToRef={this.props.scrollToRef} refName="accommodations">Accommodations</Link>
            <Link scrollToRef={this.props.scrollToRef} refName="registry">Registry</Link>
          </nav>
        </header>
        <div className={css.headerBuffer} />
      </div>
    );
  },
});

export default Header;

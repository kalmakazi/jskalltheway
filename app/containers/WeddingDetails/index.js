import React from 'react';
import ReactDOM from 'react-dom';
import scrollTo from 'scroll-to';
import GoogleMap from 'google-map-react';

import Header from './Header';

import css from './WeddingDetails.css'; // eslint-disable-line import/no-unresolved

const Pin = React.createClass({ // eslint-disable-line
  propTypes: {
    children: React.PropTypes.element,
  },

  render() {
    return (
      <div className={css.pin}>
        <div className={css.heart} />
        <div>{this.props.children}</div>
      </div>
    );
  },
});

const Section = React.createClass({ // eslint-disable-line
  propTypes: {
    children: React.PropTypes.element,
    title: React.PropTypes.string,
  },

  render() {
    return (
      <div className={css.section}>
        <div>
          {this.props.title && <h2 className={css.title}>{this.props.title}</h2>}
          <div className={css.text}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },
});

const EventItem = React.createClass({ // eslint-disable-line
  propTypes: {
    children: React.PropTypes.element,
    title: React.PropTypes.string,
  },

  render() {
    return (
      <div className={css.event}>
        <div>
          <h3 className={css.eventTitle}>{this.props.title}</h3>
          <div className={css.text}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },
});

const WeddingDetails = React.createClass({ // eslint-disable-line
  scrollToRef(refName) {
    const el = ReactDOM.findDOMNode(this.refs[refName]);
    const top = el.getBoundingClientRect().top;
    const targetPos = top + window.scrollY - 100;

    scrollTo(0, targetPos, { duration: 200 });
  },

  render() {
    return (
      <div className={css.weddingDetails}>
        <Header scrollToRef={this.scrollToRef} />
        <Section ref="events" title="Events">
          <EventItem title="The ceremony">
            <p>The ceremony starts promptly at 6:30pm at</p>
            <p>Tappan Hill Mansion, in Tarrytown, NY</p>
            <p>Shuttle service from the Westchester Marriot begins at 6:00pm.</p>
            <div className={css.mapContainer}>
              <GoogleMap
                apiKey="AIzaSyCD5KlH1HZRT3p8AR6_APEQslu5XskzIJU"
                center={[41.0718657, -73.8558148]}
                zoom={14}
              >
                <Pin lat="41.0718657" lng="-73.8558148">Tappan Hill Mansion</Pin>
              </GoogleMap>
            </div>
          </EventItem>

          <EventItem title="The reception">
            <p>8pm to midnight</p>
          </EventItem>

          <EventItem title="The after party">
            <p>Midnight</p>
            <p>Westchester Marriot</p>
          </EventItem>
        </Section>
        <Section ref="accommodations" title="Accommodations">
          You can reserve a room in our wedding block at the Westchester Marriot.
        </Section>
        <Section ref="registry" title="Registry">
          <p>
            We haven’t set this up yet. But you’ll definitely be able to spend
            money on us.
          </p>
          <p>That’s a promise.</p>
        </Section>
      </div>
    );
  },
});

export default WeddingDetails;

import React from 'react';
import ReactDOM from 'react-dom';
import scrollTo from 'scroll-to';
import GoogleMap from 'google-map-react';
import classNames from 'classnames';

import Header from './Header';

import bloomingdales from './pics/BloomingdalesLogo.png';
import crate from './pics/CrateLogo2.png';
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
    className: React.PropTypes.string,
    children: React.PropTypes.element,
    title: React.PropTypes.string,
  },

  render() {
    const sectionClassName = classNames({
      [css.section]: true,
      [this.props.className]: !!this.props.className,
    });

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

const Hero = React.createClass({
  render() {
    const title = this.props.title && <div className={css.heroTitle}>{this.props.title}</div>;
    const subtitle = this.props.subtitle && <div className={css.heroSubtitle}>{this.props.subtitle}</div>;

    const heroClassName = classNames({
      [css.hero]: true,
      [this.props.className]: true,
    });

    return (
      <div className={heroClassName}>
        <div className={css.heroText}>
          {title}
          {subtitle}
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

    scrollTo(0, targetPos, { duration: 400 });
  },

  render() {
    return (
      <div className={css.weddingDetails}>
        <Header scrollToRef={this.scrollToRef} />
        <Hero
          title="Jennifer and Stephen"
          subtitle="AUGUST 26, 2017"
          className={css.hands}
        />

        <Section ref="ceremony" title="Ceremony and Reception">
          <div className={css.spice}>
            <div className={css.column}>
              <p>The ceremony starts promptly at 6:30pm at Tappan Hill Mansion, in Tarrytown, NY.</p>
              <p>Shuttle service from the Westchester Marriot begins at 6:00pm.</p>
              <p>Black tie optional</p>
            </div>

            <div className={`${css.mapContainer} ${css.column}`}>
              <GoogleMap
                apiKey="AIzaSyCD5KlH1HZRT3p8AR6_APEQslu5XskzIJU"
                center={[41.0718657, -73.8558148]}
                zoom={14}
              >
                <Pin lat="41.0718657" lng="-73.8558148">Tappan Hill Mansion</Pin>
              </GoogleMap>
            </div>
          </div>
        </Section>

        <Hero className={css.cas} />

        <Section ref="accommodations" title="Accommodations">
          <div className={css.column}>
            Rooms are available in our wedding block at <a className={css.link} href="http://www.marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi?resLinkData=Allen/Kalmakis%20Wedding%20Weekend%5Enycwe%60ANWANWA%60129%60USD%60false%604%608/25/17%608/27/17%6008/07/2017&app=resvlink&stop_mobi=yes">the Westchester Marriot</a>.
            Book by August 7, 2017 to get our special rate.
          </div>
        </Section>

        <Hero className={css.garage} />

        <Section ref="registry" title="Registry">
          <div className={css.column}>
            <a className={css.logoWrapper} href="http://www.bloomingdales.com/registry/wedding/guest/?registryId=2326705">
              <img className={css.logo} src={bloomingdales} />
            </a>
          </div>
          <div className={css.column}>
            <a className={css.logoWrapper} href="http://www.crateandbarrel.com/gift-registry/jennifer-allen-and-stephen-kalmakis/r5608268">
              <img className={css.logo} src={crate} />
            </a>
          </div>
        </Section>

        <Hero className={css.lookback} />
      </div>
    );
  },
});

export default WeddingDetails;

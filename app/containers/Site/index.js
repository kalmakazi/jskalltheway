import React from 'react';
import classNames from 'classnames';

import bloomiesImg from './images/Bloomies.png';
import crateImg from './images/Crate.png';

import css from './index.css';

const NONBREAKING_SPACE = '\u00a0';

/**
 * TODOs:
 * - Page freeze for menu
 * - Hamburger -> X
 * - Transition menu open
 * - Jennifer and Stephen in menu
 * - Clean-up
 * - Async picture loader
 * - Party time
 * - Center header.
 *
 *
 * https://www.squarespace.com/websites/templates/charlotte
 */

const Section = React.createClass({
  render() {
    const imageClassName = classNames({
      [css.image]: true,
      [this.props.imageClassName]: this.props.imageClassName,
    });

    const image = !this.props.noImage && (
      <div className={css.imageWrapper} src={this.props.image}>
        <div className={imageClassName} />
      </div>
    );

    return (
      <div className={css.section}>
        {image}

        <h2 className={css.sectionTitle}>
          {this.props.title}
        </h2>
        <div className={css.sectionText}>
          {this.props.children}
        </div>
      </div>
    );
  },
});


const HeaderLink = function(props) {
  const linkClassName = classNames({
    [css.headerLink]: true,
    [css.headerLink_selected]: props.isSelected,
  });

  return (
    <a
      className={linkClassName}
      href={props.href}
    >
      {props.children}
    </a>
  );
};


const HeaderBase = React.createClass({
  getInitialState() {
    return {
      dropped: false
    };
  },

  componentDidMount() {
    if (this.props.triggerPos) {
      window.addEventListener('scroll', this.setDropped);
    }
  },

  setDropped(e) {
    const shouldBeDropped = window.scrollY >= 500;

    if (shouldBeDropped !== this.state.dropped) {
      this.setState({
        dropped: shouldBeDropped,
      });
    }
  },

  openMenu() {

  },

  render() {
    const headerClassName = classNames({
      [css.header]: true,
      [css.header_drop]: this.props.triggerPos,
      [css.header_dropped]: this.state.dropped,
      [css.header_hamburger]: this.props.isHamburger,
    });

    const us = !this.props.triggerPos && (
      <a className={css.us} href="/wip/">
        Jennifer & Stephen
      </a>
    );

    return (
      <div className={headerClassName}>
        <HeaderLink href="/wip" isSelected={this.props.selected === 'ceremony'}>
          Ceremony
        </HeaderLink>
        <HeaderLink href="/wip/accommodations" isSelected={this.props.selected === 'accommodations'}>
          Accommodations
        </HeaderLink>

        {us}

        <HeaderLink href="/wip/travel" isSelected={this.props.selected === 'travel'}>
          Travel
        </HeaderLink>
        <HeaderLink href="/wip/registry" isSelected={this.props.selected === 'registry'}>
          Registry
        </HeaderLink>
      </div>
    );
  },
});


const Header = React.createClass({
  getInitialState() {
    return {
      isMobile: this.isMobile(),
      menuOpen: false,
    };
  },

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: this.isMobile(),
      });
    });
  },

  isMobile() {
    return document.body.clientWidth < 600;
  },

  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  },

  renderMenuList() {
    return (
      <div className={css.menuList}>
        <a className={css.menuLink} href="/wip">
          Ceremony
        </a>
        <a className={css.menuLink} href="/wip/accommodations">
          Accommodations
        </a>
        <a className={css.menuLink} href="/wip/travel">
          Travel
        </a>
        <a className={css.menuLink} href="/wip/registry">
          Registry
        </a>
      </div>
    );
  },

  render() {
    const dropHeader = !this.state.isMobile && this.props.triggerPos && (
      <HeaderBase selected={this.props.selected} triggerPos={this.props.triggerPos} />
    );

    const hamburgerMenu = this.state.isMobile && (
      <div className={css.mobileMenu}>
        <div className={css.hamburger} onClick={this.toggleMenu}>
          <div className={css.topHam} />
          <div className={css.midHam} />
          <div className={css.botHam} />
        </div>

        {this.state.menuOpen && this.renderMenuList()}
      </div>
    );

    return (
      <header>
        {hamburgerMenu}
        <HeaderBase selected={this.props.selected} />
        {dropHeader}
      </header>
    );
  },
});


const Banner = React.createClass({
  render() {
    const bannerClassName = classNames({
      [css.banner]: true,
      [this.props.className]: !!this.props.className,
    });

    return (
      <div className={bannerClassName} ref={this.props.bannerRef}>
        <div className={css.bannerText}>
          <h1 className={css.bannerTitle}>{this.props.children}</h1>
        </div>
      </div>
    );
  },
});


export const Travel = React.createClass({ // eslint-disable-line
  getInitialState() {
    return {
      triggerPos: null,
    };
  },

  componentDidMount() {
    // Need a tick. Not sure why.
    setTimeout(() => {
      this.setState({
        triggerPos: this.banner.getBoundingClientRect().height,
      });
    }, 0)
  },

  render() {
    return (
      <div>
        <Header
          selected="travel"
          triggerPos={this.state.triggerPos}
        />

        <Banner className={css.banner_travel} bannerRef={banner => this.banner = banner}>Travel</Banner>

        <Section noImage={true} title="Getting to Westchester">
          <h3>From NYC</h3>
          <p>Take MetroNorth from Grand Central Terminal to Hudson on the Croton-Harmon line.</p>
          <a className={css.inlineLink} href="http://tripplanner.mta.info/mytrip/ui_web/customplanner/TripPlanner.aspx">See schedule</a>

          <h3>From Boston</h3>
          <p><a className={css.inlineLink} href="https://goo.gl/maps/onfiKVpHRqM2" target="_blank">Use Google</a>. They know better than we do!</p>
        </Section>

        <Section noImage={true} title="Getting to Tappan Hill Mansion">
          <h3>From the Westchester Marriott</h3>
          <p>Shuttles will be provided from the Westchester Marriott before and after the ceremony.</p>
        </Section>
      </div>
    );
  },
});


export const Accommodations = React.createClass({ // eslint-disable-line
  getInitialState() {
    return {
      triggerPos: null,
    };
  },

  componentDidMount() {
    // Need a tick. Not sure why.
    setTimeout(() => {
      this.setState({
        triggerPos: this.banner.getBoundingClientRect().height,
      });
    }, 0)
  },

  render() {
    return (
      <div>
        <Header
          selected="accommodations"
          triggerPos={this.state.triggerPos}
        />

        <Banner className={css.banner_accommodations} bannerRef={banner => this.banner = banner}>Accommodations</Banner>

        <Section noImage={true} title="Hotel">
          <p>Westchester Marriott</p>
          <p>670 White Plains Rd</p>
          <p>Tarrytown, NY 10591</p>
          <a
            href="http://www.marriott.com/meeting-event-hotels/group-corporate-travel/groupCorp.mi?resLinkData=Allen/Kalmakis%20Wedding%20Weekend%5Enycwe%60ANWANWA%60129%60USD%60false%604%608/25/17%608/27/17%6008/07/2017&app=resvlink&stop_mobi=yes"
            target="_blank"
          >
            Hotel block reservations
          </a>
          <a href="https://goo.gl/maps/LqTEhEKMFUE2" target="_blank">See map</a>
          <p>Book by August 7, 2017 to get our special rate.</p>
        </Section>
      </div>
    );
  },
});


export const Registry = React.createClass({ // eslint-disable-line
  getInitialState() {
    return {
      triggerPos: null,
    };
  },

  componentDidMount() {
    // Need a tick. Not sure why.
    setTimeout(() => {
      this.setState({
        triggerPos: this.banner.getBoundingClientRect().height,
      });
    }, 0)
  },

  render() {
    return (
      <div>
        <Header
          selected="registry"
          triggerPos={this.state.triggerPos}
        />

        <Banner className={css.banner_registry} bannerRef={banner => this.banner = banner}>Registry</Banner>

        <div className={css.registryContent}>
          <div className={css.registryText}>
            <p>No gift is greater than your presence at our wedding.</p>
            <p>For those who have requested it, we’re registered at the following stores:</p>
          </div>
          <div>
            <a
              className={css.registryLink}
              href="http://www.bloomingdales.com/registry/wedding/guest/?registryId=2326705"
              target="_blank"
            >
              <img className={css.registryImage} src={bloomiesImg} />
            </a>
          </div>
          <div>
            <a
              className={css.registryLink}
              href="http://www.crateandbarrel.com/gift-registry/jennifer-allen-and-stephen-kalmakis/r5609316"
              target="_blank"
            >
              <img className={css.registryImage} src={crateImg} />
            </a>
          </div>
        </div>
      </div>
    );
  },
});


const Homepage = React.createClass({ // eslint-disable-line
  getInitialState() {
    return {
      triggerPos: null,
    };
  },

  componentDidMount() {
    // Need a tick. Not sure why.
    setTimeout(() => {
      this.setState({
        triggerPos: this.hero.getBoundingClientRect().height,
      });
    }, 0)
  },

  render() {
    return (
      <div>
        <Header
          selected="ceremony"
          triggerPos={this.state.triggerPos}
        />

        <div className={css.hero} ref={hero => this.hero = hero}>
          <div className={css.heroText}>
            <h1 className={css.title}>Celebrate with{NONBREAKING_SPACE}us</h1>
            <div className={css.details}>
              <div>August 26, 2017</div>
            </div>
          </div>
        </div>

        <Section imageClassName={css.image_ceremony} title="The Ceremony">
          <h3>6:30pm</h3>
          <p>Tappan Hill Mansion</p>
          <p>200 Gunpowder Ln</p>
          <p>Tarrytown, NY 10591</p>
          <a href="https://goo.gl/maps/yQKd6BEMz472">See map</a>
        </Section>

        <Section imageClassName={css.image_reception} title="The Reception">
          <h3>7:00pm - 12:00am</h3>
          <p>Tappan Hill Mansion</p>
          <p>200 Gunpowder Ln</p>
          <p>Tarrytown, NY 10591</p>
          <a href="https://goo.gl/maps/yQKd6BEMz472" target="_blank">See map</a>
        </Section>

        <Section imageClassName={css.image_afterparty} title="The Afterparty">
          <h3>12:00am</h3>
          <p>Cooper’s Mill</p>
          <p>at the Westchester Marriott</p>
          <p>670 White Plains Rd</p>
          <p>Tarrytown, NY 10591</p>
          <a href="https://goo.gl/maps/kJBypvuySSs" target="_blank">See map</a>
        </Section>
      </div>
    );
  },
});

export default Homepage;

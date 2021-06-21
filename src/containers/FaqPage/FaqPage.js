import React, { Component } from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '..';
import { NamedLink, Footer } from '../../components';

import { FormattedMessage } from '../../util/reactIntl';

import css from './FAQPage.css';

import axios from 'axios';

import FAQ from './FAQ';

import insta from '../../assets/instagram.png';
import fb from '../../assets/facebook.png';

export class FaqPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      subPage: 'third',
      contactForm: '1',
      name: '',
      message: '',
      email: '',
    };
  }

  render() {
    const firstNextClick = () => {
      this.setState({ contactForm: '2' });
      this.setState({ subPage: 'fourth' });
      window.scrollTo({ top: 0 });
    };

    const firstClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.setState({ subPage: 'first' });
    };
    const secondClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.setState({ subPage: 'second' });
    };

    const thirdClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.setState({ subPage: 'third' });
    };

    const fourthClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.setState({ subPage: 'fourth' });
    };

    const { siteTwitterHandle, siteFacebookPage } = config;
    const siteTwitterPage = twitterPageURL(siteTwitterHandle);

    const buttonClick = () => {
      var menuText = document.getElementById('menuText');
      menuText.classList.add(css.menuText_active);

      window.location.href = '/s?bounds=69.99494455%2C175.31638722%2C-62.46576751%2C-169.88909712';
    };

    const aboutClick = () => {
      window.location.href = '/about';
    };

    let options = {
      sectionClassName: 'section',
      anchors: [
        'sectionOne',
        'sectionTwo',
        'sectionThree',
        'sectionFour',
        'sectionFive',
        'sectionLast',
      ],
      scrollBar: false,
      navigation: false,
      verticalAlign: false,
      sectionPaddingTop: '0px',
      sectionPaddingBottom: '0px',
      arrowNavigation: true,
      delay: 700,
    };

    let props = this.props;

    return (
      <StaticPage
        title="FAQ"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'FAQPage',
          description: 'FAQ Socialbnb',
          name: 'FAQ page',
        }}
      >
        <div className={css.Wrapper}>
          <div id="topbar" className={css.topbar} style={{ position: 'fixed', width: '100vw' }}>
            <TopbarContainer />
          </div>

          <div className={css.LeftFooterContent}>
            <img src={insta} className={css.socialmedia}></img>
            <img src={fb} className={css.socialmedia2}></img>
          </div>
          <div>
            <h1 className={css.header}>
              <FormattedMessage id="faq.title" />
            </h1>
            <FAQ></FAQ>
            <br />
            <br />
            <div className={css.section}>
              <Footer></Footer>
            </div>
          </div>
        </div>
      </StaticPage>
    );
  }
}

export default FaqPage;

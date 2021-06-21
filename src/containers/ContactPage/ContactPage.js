import React, { Component } from 'react';
import { StaticPage, TopbarContainer } from '..';
import { ContactForm } from '../../forms';
import { sendMail } from '../../util/api';
import { FormattedMessage } from '../../util/reactIntl';

import css from './ContactPage.css';
import contactPerson from './Nils.jpg';

export class ContactPage extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      subPage: 'third',
      contactForm: '1',
      submitInProgress: false,
      ready: false,
    };
    this.onMessageSubmit = this.onSubmit.bind(this);
    this.firstNextClick = this.firstNextClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (window.location.hash) {
      if (window.location.hash === '#FAQ') {
        window.location = '/FAQ#FAQ';
        this.setState({ subPage: 'third' });
      } else if (window.location.hash === '#contact') {
        window.location = '/FAQ#contact';
        this.setState({ subPage: 'fourth' });
      }
    }
  }

  onSubmit(values, form) {
    this.setState({
      submitInProgress: true,
    });
    const { name, email, message } = values;

    sendMail({
      to: process.env.REACT_APP_CONTACT_TO_MAIL,
      from: process.env.REACT_APP_CONTACT_FROM_MAIL,
      subject: `Nachricht von ${name}`,
      text: message,
      html: `<strong>${message}</strong>`,
      replyTo: email,
    }).then(response => {
      console.log(response);
      if (response[0].statusCode === 202) {
        this.setState({
          submitInProgress: false,
          ready: true,
        });
      }
    });
  }

  firstNextClick() {
    this.setState({ contactForm: '2' });
    this.setState({ subPage: 'fourth' });
    window.scrollTo({ top: 0 });
  }

  render() {
    return (
      <StaticPage
        title="About Us"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'AboutPage',
          description: 'About Saunatime',
          name: 'About page',
        }}
      >
        <div className={css.Wrapper}>
          {' '}
          <div id="topbar">
            <TopbarContainer />
          </div>
          <div className={css.contactFormWrapper}>
            <span className={css.line1}></span>
            <span className={css.line2}></span>
            <div className={css.contactPerson}>
              <img src={contactPerson} height="100%"></img>
            </div>

            <ContactForm
              onSubmit={this.onSubmit}
              contactForm={this.state.contactForm}
              firstNextClick={this.firstNextClick}
              submitInProgress={this.state.submitInProgress}
              ready={this.state.ready}
            />

            <div className={css.alternativeContact}>
              <span className={css.alternativeContactTitle}>
                <FormattedMessage id="contactForm.alternative" />
              </span>{' '}
              {/* <br /> */}
              <div className={css.linkContainer}>
                <a href="mailto:info@socialbnb.org">info@socialbnb.org</a>
                <br />
                <a href="tel:+49 221 5622 762">+49 221 5622 762</a>
              </div>
            </div>
          </div>
        </div>
      </StaticPage>
    );
  }
}

export default ContactPage;

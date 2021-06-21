import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './NewsletterForm.css';

import cooperation from './images/cooperation.png';

import axios from 'axios';

export class NewsletterForm extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      subPage: 'first',
      contactForm: '1',
      name: '',
      message: '',
      email: '',
    };
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onMessageChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: 'https://flex-api.sharetribe.com/send',
      data: this.state,
    }).then(response => {
      if (response.data.status === 'success') {
        alert('Message Sent.');
        this.resetForm();
      } else if (response.data.status === 'fail') {
        alert('Message failed to send.');
      }
    });
  }

  render() {
    return (
      <div>
        <div className={css.content}>
          <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
            <div className="form-group">
              <input
                type="name"
                placeholder="Max Mustermann"
                className={css.form_control_1}
                id="email"
                aria-describedby="emailHelp"
                value={this.state.email}
                onChange={this.onEmailChange.bind(this)}
              />
              {/* <input
                type="email"
                placeholder="max@mail.com"
                className={css.form_control}
                id="email"
                aria-describedby="emailHelp"
                value={this.state.email}
                onChange={this.onEmailChange.bind(this)}
              /> */}
            </div>

            <button
              type="submit"
              // className={css.submitButtonEmpty}
              className={this.state.email === '' ? css.submitButtonEmpty : css.submitButton}
            >
              <FormattedMessage id="ContactForm.go2" />
            </button>
          </form>
        </div>
      </div>
    );
  }
}

NewsletterForm.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

NewsletterForm.propTypes = {
  rootClassName: string,
  className: string,
};

export default NewsletterForm;

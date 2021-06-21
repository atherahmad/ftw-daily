import React, { Component } from 'react';

import css from './NewsletterPanel.css';
import { FormattedMessage } from '../../util/reactIntl';
import { PrimaryButton } from '../Button/Button';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class NewsletterPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responseHidden: true,
      name: '',
      lastName: '',
      email: '',
      conditions: false,
      submitted: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onConditionChange = this.onConditionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onConditionChange(e) {
    console.log(this.state.conditions);
    this.setState({
      conditions: !this.state.conditions,
    });
    console.log(this.state.conditions);
  }
  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onEmailChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      submitted: true,
    });

    if (re.test(this.state.email)) {
      const name = this.state.name;

      this.setState({
        responseHidden: false,
      });
    }
  }

  render() {
    return (
      <div>
        <form
          className={this.state.responseHidden ? css.form : css.hidden}
          onSubmit={this.handleSubmit}
        >
          <div>
            <div className={css.nameOuter}>
              <input
                type="text"
                name="Name"
                className={css.form_control_name}
                onChange={this.onNameChange}
                placeHolder="Max"
                noValidate
              ></input>
              {this.state.submitted && this.state.name === '' ? (
                <span className={css.errorMessage}>Name is required</span>
              ) : null}

              <input
                type="text"
                name="LastName"
                className={css.form_control_name}
                onChange={this.onNameChange}
                placeHolder="Mustermann"
                noValidate
              ></input>
              {this.state.submitted && this.state.lastName === '' ? (
                <span className={css.errorMessage}>Name is required</span>
              ) : null}
            </div>
            <input
              type="email"
              name="Email"
              className={css.form_control}
              onChange={this.onEmailChange}
              placeHolder="max@mail.com"
              noValidate
            ></input>
            {this.state.email !== '' && !re.test(this.state.email) ? (
              <span className={css.errorMessage}>Valid Email is required</span>
            ) : null}
          </div>
          {/* <div>
            <label id={css.conditionsLabel}>
              <FormattedMessage id="newsletter.checkboxText"></FormattedMessage>
              <div
                id={css.conditionsButton}
                className={this.state.conditions ? css.buttonClicked : css.buttonUnclicked}
              >
                X
              </div>

              <input type="checkbox" onChange={this.onConditionChange} style={{ opacity: '0%' }} />
            </label>
          </div> */}
          <PrimaryButton
            type="submit"
            className={
              //(this.state.name !== '' && re.test(this.state.email)) || this.state.submitted
              // ?
              css.submitButton
              // : css.submitButtonEmpty
            }
            disabled={
              // this.state.conditions &&
              this.state.name !== '' && re.test(this.state.email) ? '' : 'disabled'
            }
          >
            <FormattedMessage id="TopbarDesktop.login" />
          </PrimaryButton>
        </form>
        <div className={this.state.responseHidden ? css.hidden : css.response}>
          Du bist jetzt bei unserem Newsletter angemeldet.
        </div>
      </div>
    );
  }
}

export default NewsletterPanel;

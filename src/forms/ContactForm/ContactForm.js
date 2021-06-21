import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton } from '../../components';
import css from './ContactForm.css';

const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ContactFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        rootClassName,
        disabled,
        handleSubmit,
        intl,
        invalid,
        submitError,
        submitInProgress,
        ready,
        contactForm,
        firstNextClick,
        values,
      } = fieldRenderProps;
      const { name, email, message } = values;
      const errorMessage = (
        <p className="hello">
          <FormattedMessage id="ReviewForm.submitError" />
        </p>
      );
      const errorArea = submitError ? errorMessage : <p className={'hello'} />;
      const classes = classNames(rootClassName || className);
      const submitDisabled = invalid || disabled || submitInProgress;
      return (
        <Form className={'hello'} onSubmit={handleSubmit}>
          <div className={contactForm === '1' ? css.contactForm : css.contactForm_hide}>
            <h1 className={css.pageTitle_small}>
              <FormattedMessage id="contactForm.headline1" />

              <br />
              <FormattedMessage id="contactForm.headline2" />
            </h1>
            <div className="form-group">
              <Field name="name">
                {({ input, meta }) => (
                  <div>
                    <input type="text" placeholder="Max" className={css.form_control} {...input} />{' '}
                  </div>
                )}
              </Field>
              <Field name="email">
                {({ input, meta }) => (
                  <div>
                    <input
                      type="email"
                      placeholder="max@mail.com"
                      className={name === undefined ? css.form_control_hide : css.form_control}
                      id="email"
                      aria-describedby="emailHelp"
                      {...input}
                    />{' '}
                  </div>
                )}
              </Field>
            </div>

            <div
              className={
                name === undefined || !re.test(email) ? css.submitButtonEmpty : css.submitButton
              }
              onClick={firstNextClick}
            >
              <FormattedMessage id="contactForm.next" />
            </div>
          </div>

          <div className={contactForm === '2' ? css.contactForm : css.contactForm_hide}>
            <h1
              className={`${ready ? css.pageTitle_response : css.contactForm_hide} ${css.response}`}
            >
              <FormattedMessage id="contactForm.done1" />, {name}
              <br />
              <FormattedMessage id="contactForm.done2" />
            </h1>

            <div className={ready ? css.contactForm_hidden : css.contactForm}>
              <h1 className={css.pageTitle_small}>
                <FormattedMessage id="contactForm.secondHeadline1" />
                {name}, <br />
                <FormattedMessage id="contactForm.secondHeadline2" />
              </h1>

              <div className="form-group">
                {/* <label htmlFor="name">Name</label> */}
                <Field name="message">
                  {({ input, meta }) => (
                    <div>
                      <textarea
                        className="form-control"
                        rows="4"
                        className={css.form_control_big}
                        id="message"
                        {...input}
                      />
                    </div>
                  )}
                </Field>
              </div>
            </div>

            <PrimaryButton
              type="submit"
              className={message === undefined ? css.submitButtonEmpty : css.submitButton}
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={ready}
            >
              <FormattedMessage id="contactForm.send" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

ContactFormComponent.defaultProps = { className: null, rootClassName: null };
const { func, string } = PropTypes;

ContactFormComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
};

const ContactForm = compose(injectIntl)(ContactFormComponent);
ContactForm.displayName = 'ContactForm';

export default ContactForm;

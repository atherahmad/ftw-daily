import React, { useState } from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form, FieldTextInput } from '../../components';
import { maxLength, required, composeValidators, requiredFieldArrayCheckbox } from '../../util/validators';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { compose } from 'redux';

import { Prompt } from 'react-router';

import css from './EditListingCharacteristicsForm.css';

const TITLE_MAX_LENGTH = 4;

const EditListingCharacteristicsFormComponent = props => {
  const [content, setContent] = useState(0)
  const char1000Limit = 1000
  const [content1, setContent1] = useState(0)
  const char500Limit = 500
  const getValue = value => {
    if (value !== content) {
      setContent(value);
    }
  };

  const getValue1 = value => {
    if (value !== content1) {
      setContent1(value);
    }
  }
  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          disabled,
          ready,
          rootClassName,
          className,
          name,
          handleSubmit,
          pristine,
          saveActionMsg,
          updated,
          updateInProgress,
          fetchErrors,
          filterConfig,
          intl,
        } = formRenderProps;

        const classes = classNames(rootClassName || css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = disabled || submitInProgress;

        const { updateListingError, showListingsError } = fetchErrors || {};
        const errorMessage = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingFeaturesForm.updateFailed" />
          </p>
        ) : null;

        const titleRequiredMessage = intl.formatMessage({
          id: 'EditListingCharacteristicsForm.characteristicsRequired',
        });
        const maxLengthMessage = intl.formatMessage(
          { id: 'EditListingCharacteristicsForm.maxLength' },
          {
            maxLength: TITLE_MAX_LENGTH,
          }
        );

        const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);


        const descriptionMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.description',
        });
        const descriptionPlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.descriptionPlaceholder',
        });
        const descriptionRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.descriptionRequired',
        });

        const houserulesMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.houserules',
        });
        const houserulesPlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.houserulesPlaceholder',
        });
        const houserulesRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.houserulesRequired',
        });

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
          </p>
        ) : null;

        const handleChange = event => {
          console.log(event.dispatchConfig, event._dispatchInstances);
        };
        const handleSubmitPre = event => {
          handleSubmit(event);
        };

        const options = findOptionsForSelectFilter('characteristics', filterConfig);
        return (
          <Form className={classes} onSubmit={handleSubmitPre} onChange={handleChange}>
            <Prompt
              when={!pristine}
              message="You have unsaved changes, are you sure you want to leave?"
            />
            {errorMessage}
            {errorMessageShowListing}

            <div className={css.sectionTitle}>
              <FormattedMessage id="EditListingCharacteristicsForm.characteristicsTitle" />
            </div>
            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingCharacteristicsForm.characteristicsTip" />
              </p>
            </div>
            <FieldCheckboxGroup
              className={css.characteristics}
              id={name}
              name={name}
              options={options}
              validate={composeValidators(required(titleRequiredMessage), maxLength60Message,requiredFieldArrayCheckbox('one is required'))}
            />

            <br />
            <br />
            <div style={{ position: 'relative' }}>
              <p style={{ position: 'absolute', right: '0', bottom: '0' }}>
                {char1000Limit - content.length}
              </p>
              <FieldTextInput
                id="accomodationDescription"
                name="accomodationDescription"
                className={css.description}
                type="textarea"
                label={descriptionMessage}
                placeholder={descriptionPlaceholderMessage}
                getValue={getValue.bind(this)}
                validate={composeValidators(required(descriptionRequiredMessage))}
              />
            </div>

            <FieldTextInput
              style={{ display: 'none' }}
              type="textarea"
              id="accomodationDescription_de"
              name="accomodationDescription_de"
              initialValue={'Übersetzung hinzufügen'}
            />

            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingDescriptionForm.descriptionTip" />
              </p>
            </div>
            <br />
            <div style={{ position: 'relative' }}>
              <p style={{ position: 'absolute', right: '0', bottom: '0' }}>
                {char500Limit - content1.length}
              </p>
              <FieldTextInput
                id="houserules"
                name="houserules"
                className={css.description}
                type="textarea"
                label={houserulesMessage}
                placeholder={houserulesPlaceholderMessage}
                getValue={getValue1.bind(this)}
                validate={composeValidators(required(houserulesRequiredMessage))}
              />
            </div>
            <FieldTextInput
              style={{ display: 'none' }}
              type="textarea"
              id="houserules_de"
              name="houserules_de"
              initialValue={'Übersetzung hinzufügen'}
            />
            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingDescriptionForm.houserulesTip" />
              </p>
            </div>
            <Button
              className={css.submitButton}
              type="submit"
              inProgress={submitInProgress}
              disabled={submitDisabled}
              ready={submitReady}
            >
              {saveActionMsg}
            </Button>
          </Form>
        );
      }}
    />


  );
}

EditListingCharacteristicsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingCharacteristicsFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
  intl: intlShape.isRequired,
};

const EditListingCharacteristicsForm = EditListingCharacteristicsFormComponent;

export default compose(injectIntl)(EditListingCharacteristicsForm);

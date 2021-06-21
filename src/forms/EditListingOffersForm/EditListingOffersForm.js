import React, { useState } from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { compose } from 'redux';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form, FieldTextInput } from '../../components';
import { maxLength, required, composeValidators } from '../../util/validators';

import css from './EditListingOffersForm.css';
import { Prompt } from 'react-router';

const EditListingOffersFormComponent = props => {
  const [content, setContent] = useState(0)
  const char500Limit = 500
  const getValue = value => {
    if (value !== content) {
      setContent(value);
    }
  };
  return(
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
        surroundingsName,
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
          <FormattedMessage id="EditListingOffersForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingOffersForm.showListingFailed" />
        </p>
      ) : null;

      const activitiesLabelMessage = intl.formatMessage({
        id: 'EditListingOffersForm.activitiesLabel',
      });
      const activitiesPlaceholderMessage = intl.formatMessage({
        id: 'EditListingOffersForm.activitiesPlaceholder',
      });

      const activitiesTip = intl.formatMessage({
        id: 'EditListingOffersForm.activitiesTip',
      });

      const activitiesRequiredMessage = intl.formatMessage({
        id: 'EditListingOffersForm.activitiesRequired',
      });

      const options = findOptionsForSelectFilter('food', filterConfig);

      const surroundingOptions = findOptionsForSelectFilter('surroundings', filterConfig);

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <Prompt
            when={!pristine}
            message="You have unsaved changes, are you sure you want to leave?"
          />
          {errorMessage}
          {errorMessageShowListing}

          <div className={css.sectionTitle}>
            <FormattedMessage id="EditListingOffersForm.foodTitle" />
          </div>
          <div className={css.tip}>
            <p>
              <FormattedMessage id="EditListingOffersForm.foodTip" />
            </p>
          </div>
          <FieldCheckboxGroup className={css.features} id={name} name={name} options={options} />

          <br />
          <div className={css.sectionTitle}>
            <FormattedMessage id="EditListingOffersForm.surroundingsTitle" />
          </div>
          <div className={css.tip}>
            <p>
              <FormattedMessage id="EditListingOffersForm.surroundingsTip" />
            </p>
          </div>
          <FieldCheckboxGroup
            className={css.features}
            id={surroundingsName}
            name={surroundingsName}
            options={surroundingOptions}
          />
          <br />
          <div style={{ position: 'relative' }}>
              <p style={{ position: 'absolute', right: '0', bottom: '0' }}>
                {char500Limit - content.length}
              </p>
          <FieldTextInput
            id="activities"
            name="activities"
            className={css.activities}
            type="textarea"
            label={activitiesLabelMessage}
            placeholder={activitiesPlaceholderMessage}
            getValue={getValue.bind(this)}
            validate={composeValidators(required(activitiesRequiredMessage))}
          />
          </div>

          <FieldTextInput
            style={{ display: 'none' }}
            type="textarea"
            id="activities_de"
            name="activities_de"
            initialValue={'Übersetzung hinzufügen'}
          />
          <div className={css.tip}>
            <p>
              <FormattedMessage id="EditListingOffersForm.activitiesTip" />
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
EditListingOffersFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingOffersFormComponent.propTypes = {
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

const EditListingOffersForm = EditListingOffersFormComponent;

export default compose(injectIntl)(EditListingOffersForm);

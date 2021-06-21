import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import {
  autocompleteSearchRequired,
  autocompletePlaceSelected,
  composeValidators,
  required,
} from '../../util/validators';
import {
  Form,
  LocationAutocompleteInputField,
  Button,
  FieldTextInput,
  FieldSelect,
} from '../../components';
import * as validators from '../../util/validators';

import config from '../../config';
import getCountryCodes from '../../translations/countryCodes';

import css from './FindLocationForm.css';

const identity = v => v;

export const FindLocationFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
      } = formRenderProps;

      const titleRequiredMessage = intl.formatMessage({ id: 'EditListingLocationForm.address' });
      const addressPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressPlaceholder',
      });
      const addressRequiredMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressRequired',
      });
      const addressNotRecognizedMessage = intl.formatMessage({
        id: 'EditListingLocationForm.addressNotRecognized',
      });

      const optionalText = intl.formatMessage({
        id: 'EditListingLocationForm.optionalText',
      });

      const buildingMessage = intl.formatMessage(
        { id: 'EditListingLocationForm.building' },
        { optionalText: optionalText }
      );
      const buildingPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.buildingPlaceholder',
      });

      const arrivalMessage = intl.formatMessage({
        id: 'EditListingLocationForm.arrival',
      });
      const arrivalPlaceholderMessage = intl.formatMessage({
        id: 'EditListingLocationForm.arrivalPlaceholder',
      });
      const arrivalRequiredMessage = intl.formatMessage({
        id: 'EditListingLocationForm.arrivalRequired',
      });

      const cityLabel = intl.formatMessage({ id: 'StripePaymentAddress.cityLabel' });
      const cityPlaceholder = intl.formatMessage({ id: 'StripePaymentAddress.cityPlaceholder' });
      const cityRequired = validators.required(
        intl.formatMessage({
          id: 'StripePaymentAddress.cityRequired',
        })
      );

      const countryLabel = intl.formatMessage({ id: 'StripePaymentAddress.countryLabel' });
      const countryPlaceholder = intl.formatMessage({
        id: 'StripePaymentAddress.countryPlaceholder',
      });
      const countryRequired = validators.required(
        intl.formatMessage({
          id: 'StripePaymentAddress.countryRequired',
        })
      );

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLocationForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingLocationForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const countryCodes = getCountryCodes(config.locale);

      return (
        <Form className={classes}>
          <LocationAutocompleteInputField
            className={css.locationAddress}
            inputClassName={css.locationAutocompleteInput}
            iconClassName={css.locationAutocompleteInputIcon}
            predictionsClassName={css.predictionsRoot}
            validClassName={css.validLocation}
            autoFocus
            name="location"
            label={titleRequiredMessage}
            placeholder={addressPlaceholderMessage}
            useDefaultPredictions={false}
            format={identity}
            // valueFromForm={values.location}
            // validate={composeValidators(
            //   autocompleteSearchRequired(addressRequiredMessage),
            //   autocompletePlaceSelected(addressNotRecognizedMessage)
            // )}
          />

          <Button
            className={css.submitButton}
            // type="submit"
            // inProgress={submitInProgress}
            // disabled={submitDisabled}
            // ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

FindLocationFormComponent.defaultProps = {
  selectedPlace: null,
  fetchErrors: null,
};

FindLocationFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  selectedPlace: propTypes.place,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

const FindLocationForm = FindLocationFormComponent;

export default compose(injectIntl)(FindLocationForm);

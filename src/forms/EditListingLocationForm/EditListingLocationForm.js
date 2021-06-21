import React, { useState } from 'react';
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

import css from './EditListingLocationForm.css';
import { Prompt } from 'react-router';

const identity = v => v;

export const EditListingLocationFormComponent = props => {
  const [content, setContent] = useState(0)
  const char1000Limit = 1000
  const getValue = value => {
    if (value !== content) {
      setContent(value);
    }
  };
  return (
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

        // const countryCodes = getCountryCodes(config.locale);
        const countrys = getCountryCodes(config.locale);
        const countryCodes=countrys.sort(function (a, b) {
          if (a.name > b.name) {
              return 1;
          }
          if (b.name > a.name) {
              return -1;
          }
          return 0;
      });
        console.log(countryCodes);

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <Prompt
              when={!pristine}
              message="You have unsaved changes, are you sure you want to leave?"
            />
            {errorMessage}
            {errorMessageShowListing}
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
              valueFromForm={values.location}
              validate={composeValidators(
                autocompleteSearchRequired(addressRequiredMessage),
                autocompletePlaceSelected(addressNotRecognizedMessage)
              )}
            />

            {/* <FieldTextInput
            className={css.building}
            type="text"
            name="building"
            id="building"
            label={buildingMessage}
            placeholder={buildingPlaceholderMessage}
          /> */}
            <div className={css.city_country}>
              <FieldTextInput
                id="city"
                name="city"
                disabled={disabled}
                className={css.field}
                type="text"
                autoComplete="billing address-level2"
                label={cityLabel}
                placeholder={cityPlaceholder}
                validate={cityRequired}
                style={{ float: 'left' }}
              // onUnmount={() => form.change('city', undefined)}
              />

              <FieldSelect
                id="country"
                name="country"
                disabled={disabled}
                className={css.field}
                label={countryLabel}
                validate={countryRequired}
              >
                <option disabled value="">
                  {countryPlaceholder}
                </option>
                {countryCodes.map(country => {
                  return (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  );
                })}
              </FieldSelect>
            </div>
            <br />
            <div style={{ position: 'relative' }}>
              <p style={{ position: 'absolute', right: '0', bottom: '0' }}>
                {char1000Limit - content.length}
              </p>
              <FieldTextInput
                id="arrival"
                name="arrival"
                className={css.description}
                type="textarea"
                label={arrivalMessage}
                placeholder={arrivalPlaceholderMessage}
                getValue={getValue.bind(this)}
                validate={composeValidators(required(arrivalRequiredMessage))}
              />
            </div>
            <FieldTextInput
              style={{ display: 'none' }}
              type="textarea"
              id="arrival_de"
              name="arrival_de"
              initialValue={'Übersetzung hinzufügen'}
            />
            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingLocationForm.arrivalTip" />
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
EditListingLocationFormComponent.defaultProps = {
  selectedPlace: null,
  fetchErrors: null,
};

EditListingLocationFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingLocationFormComponent);

import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import {
  Form,
  Button,
  FieldTextInput,
  FieldCurrencyInput,
  FieldCheckboxGroup,
} from '../../components';
import CustomCategorySelectFieldMaybe from './CustomCategorySelectFieldMaybe';
import CustomRoomtypeSelectFieldMaybe from './CustomRoomtypeSelectFieldMaybe';
import CustomAccomodationtypeSelectFieldMaybe from './CustomAccomodationtypeSelectFieldMaybe';

import css from './EditListingDescriptionForm.css';

import config from '../../config';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';

import { findOptionsForSelectFilter } from '../../util/search';
import arrayMutators from 'final-form-arrays';

import { Prompt } from 'react-router';
import { useState } from 'react';

// import getCategoryCodes from '../../translations/categoryCodes';

const { Money } = sdkTypes;

const CATEGORIES_MAX_LENGTH = 2;

const TITLE_MAX_LENGTH = 60;

const EditListingDescriptionFormComponent = props => {
  const { initialValues } = props;
  console.log(initialValues);
  const [price, setPrice] = useState(initialValues.price ? initialValues.price.amount : 0);
  const [roomType, setroomType] = useState(initialValues.roomtype ? initialValues.roomtype : '');
  const getOnChange = value => {
    if (value != null) setPrice(value.amount);
    else setPrice(0);
  };
  return (
    <FinalForm
      {...props}
      mutators={{ ...arrayMutators }}
      render={formRenderProps => {
        const {
          roomtypes,
          accomodationtypes,
          categories,
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
          filterConfig,
          name,

          languages,
          isNewListingFlow,
        } = formRenderProps;

        const titleMessage = intl.formatMessage({ id: 'EditListingDescriptionForm.title' });
        const titlePlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.titlePlaceholder',
        });
        const titleRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.titleRequired',
        });
        const maxLengthMessage = intl.formatMessage(
          { id: 'EditListingDescriptionForm.maxLength' },
          {
            maxLength: TITLE_MAX_LENGTH,
          }
        );

        const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);

        const maxLengthMessageCategories = intl.formatMessage(
          { id: 'EditListingDescriptionForm.maxLength2' },
          {
            maxLength: CATEGORIES_MAX_LENGTH,
          }
        );
        const maxLength2Message = maxLength(maxLengthMessageCategories, CATEGORIES_MAX_LENGTH);

        const languagesTip = intl.formatMessage({
          id: 'EditListingDescriptionForm.languagesTip',
        });
        const languagesMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.languages',
        });
        const languagesPlaceholderMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.languagesPlaceholder',
        });
        const languagesRequiredMessage = intl.formatMessage({
          id: 'EditListingDescriptionForm.languagesRequired',
        });

        const { updateListingError, createListingDraftError, showListingsError } =
          fetchErrors || {};
        const errorMessageUpdateListing = updateListingError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
          </p>
        ) : null;

        // This error happens only on first tab (of EditListingWizard)
        const errorMessageCreateListingDraft = createListingDraftError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
          </p>
        ) : null;

        const errorMessageShowListing = showListingsError ? (
          <p className={css.error}>
            <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
          </p>
        ) : null;

        const unitType = config.bookingUnitType;
        const isNightly = unitType === LINE_ITEM_NIGHT;
        const isDaily = unitType === LINE_ITEM_DAY;
        const isShared = roomType === 'shared_bedroom';
        console.log(roomType);
        const translationKey = isShared
          ? 'EditListingPricingForm.pricePerBed'
          : isNightly
          ? 'EditListingPricingForm.pricePerNight'
          : isDaily
          ? 'EditListingPricingForm.pricePerDay'
          : 'EditListingPricingForm.pricePerUnit';

        const pricePerUnitMessage = intl.formatMessage({
          id: translationKey,
        });

        const pricePlaceholderMessage = intl.formatMessage({
          id: 'EditListingPricingForm.priceInputPlaceholder',
        });

        const priceRequired = validators.required(
          intl.formatMessage({
            id: 'EditListingPricingForm.priceRequired',
          })
        );
        const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
        const minPriceRequired = validators.moneySubUnitAmountAtLeast(
          intl.formatMessage(
            {
              id: 'EditListingPricingForm.priceTooLow',
            },
            {
              minPrice: formatMoney(intl, minPrice),
            }
          ),
          config.listingMinimumPriceSubUnits
        );
        const priceValidators = config.listingMinimumPriceSubUnits
          ? validators.composeValidators(priceRequired, minPriceRequired)
          : priceRequired;

        const classes = classNames(css.root, className);
        const submitReady = (updated && pristine) || ready;
        const submitInProgress = updateInProgress;
        const submitDisabled = invalid || disabled || submitInProgress;

        const options = findOptionsForSelectFilter('category', filterConfig);

        const languageOptions = findOptionsForSelectFilter('languages', filterConfig);

        // console.log(options);
        const roomTypeUpdate = e => {
          //var val = document.getElementById(e) ? document.getElementById(e). : '';
          var c = e.target ? e.target.value : '';
          c = roomType;
          setroomType(e);
          console.log(c);
        };
        const priceCalc =
          price !== 0 ? (
            <div className={css.sectionPrice}>
              <label>
                <FormattedMessage id="EditListingDescriptionForm.priceCalcFee" /> = $
                {Math.round(price * 0.0015 * 100) / 100}
              </label>

              <label>
                <FormattedMessage id="EditListingDescriptionForm.priceCalcEarn" /> = $
                {Math.round(price * 0.0085 * 100) / 100}
              </label>
            </div>
          ) : null;

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <Prompt
              when={!pristine && !isNewListingFlow}
              message="You have unsaved changes, are you sure you want to leave?"
            />
            {errorMessageCreateListingDraft}
            {errorMessageUpdateListing}
            {errorMessageShowListing}
            {/* <FieldTextInput
            id="title"
            name="title"
            className={css.title}
            type="text"
            label={titleMessage}
            placeholder={titlePlaceholderMessage}
            maxLength={TITLE_MAX_LENGTH}
            validate={composeValidators(required(titleRequiredMessage), maxLength60Message)}
            autoFocus
          /> */}

            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingDescriptionForm.intro" />
              </p>
            </div>

            <CustomRoomtypeSelectFieldMaybe
              id="roomtype"
              name="roomtype"
              categories={roomtypes}
              intl={intl}
              update={roomTypeUpdate}
              selectedroom={roomType}
            />
            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingDescriptionForm.roomtypeTip" />
              </p>
            </div>
            <br />

            <FieldCurrencyInput
              id="price"
              name="price"
              className={css.description}
              // autoFocus
              label={pricePerUnitMessage}
              placeholder={pricePlaceholderMessage}
              currencyConfig={config.currencyConfig}
              getOnChange={getOnChange.bind(this)}
              validate={priceValidators}
            />

            {priceCalc}
            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingDescriptionForm.priceTip" />
                <a
                  onClick={function() {
                    window.open('https://www.xe.com/de/currencyconverter/');
                  }}
                >
                  {' '}
                  <FormattedMessage id="EditListingDescriptionForm.priceTipLink" />
                </a>
                <FormattedMessage id="EditListingDescriptionForm.priceTipEnd" />
              </p>
            </div>
            <br />

            {/* <CustomAccomodationtypeSelectFieldMaybe
            id="accomodationtype"
            name="accomodationtype"
            categories={accomodationtypes}
            intl={intl}
          />
          <br /> */}

            {/* <CustomCategorySelectFieldMaybe
            id="category"
            name="category"
            categories={categories}
            intl={intl}
          />
          <br /> */}
            <div className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.categoryLabel" />
            </div>

            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingDescriptionForm.categoryTip" />
              </p>
            </div>
            <FieldCheckboxGroup
              className={css.description}
              id={name}
              name={name}
              options={options}
              validate={composeValidators(
                required(maxLengthMessageCategories),
                maxLength2Message,
                validators.requiredFieldArrayCheckbox('one is required')
              )}
            />

            <br />

            <div className={css.sectionTitle}>
              <FormattedMessage id="EditListingDescriptionForm.languages" />
            </div>

            <div className={css.tip}>
              <p>
                <FormattedMessage id="EditListingDescriptionForm.languagesTip" />
              </p>
            </div>

            <FieldCheckboxGroup
              className={css.description}
              id={languages}
              name={languages}
              options={languageOptions}
            />

            <FieldTextInput
              id="otherLanguages"
              name="otherLanguages"
              className={css.otherLanguages}
              type="textarea"
              label={' '}
              placeholder={languagesPlaceholderMessage}
            />

            <FieldTextInput
              style={{ display: 'none' }}
              type="textarea"
              id="otherLanguages_de"
              name="otherLanguages_de"
              initialValue={'Übersetzung hinzufügen'}
            />

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
};

EditListingDescriptionFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingDescriptionFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  filterConfig: propTypes.filterConfig,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  categories: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  roomtypes: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};
const EditListingDescriptionForm = EditListingDescriptionFormComponent;

export default compose(injectIntl)(EditListingDescriptionForm);

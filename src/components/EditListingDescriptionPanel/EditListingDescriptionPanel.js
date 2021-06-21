import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingDescriptionForm, EditListingPricingForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.css';

import { ensureListing, ensureUser } from '../../util/data';

import { types as sdkTypes } from '../../util/sdkLoader';
const { Money } = sdkTypes;

const CATEGORY_NAME = 'category';
const LANGUAGES_NAME = 'languages';

const EditListingDescriptionPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
    currentUser,
    isNewListingFlow,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { description, title, publicData, price } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  );

  const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  const roomtypeOptions = findOptionsForSelectFilter('roomtype', config.custom.filters);
  // const accomodationtypeOptions = findOptionsForSelectFilter(
  //   'accomodationtype',
  //   config.custom.filters
  // );

  const projectInformationRaw1 = ensureUser(currentUser);
  const projectInformation = projectInformationRaw1.attributes.profile.publicData;

  const category = publicData && publicData.category;
  const languages = publicData && publicData.languages;
  const initialValues = {
    price,
    title,
    category,
    roomtype: publicData.roomtype,
    // accomodationtype: publicData.accomodationtype,
    languages,
    otherLanguages: publicData.otherLanguages,
    otherLanguages_de: publicData.otherLanguages_de,
  };
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        isNewListingFlow={isNewListingFlow}
        className={css.form}
        name={CATEGORY_NAME}
        languages={LANGUAGES_NAME}
        initialValues={initialValues}
        saveActionMsg={submitButtonText}
        className={css.form}
        onSubmit={values => {
          const {
            title,
            roomtype,
            // accomodationtype,
            category = [],
            price,
            languages = [],
            otherLanguages,
            otherLanguages_de,
          } = values;
          const updateValues = {
            title: projectInformation.projectTitle + ' • ' + roomtype,
            // title: title.trim(),

            description: roomtype,
            publicData: {
              roomtype,

              // accomodationtype,
              category,
              languages,
              otherLanguages,
              otherLanguages_de,
            },
            price,
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryOptions}
        roomtypes={roomtypeOptions}
        // accomodationtypes={accomodationtypeOptions}
      />

      {/* {priceForm} */}
    </div>
  );
};

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingDescriptionPanel;
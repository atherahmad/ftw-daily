import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '..';
import { EditListingOffersForm } from '../../forms';

import css from './EditListingOffersPanel.css';

const FOOD_NAME = 'food';
const SURROUNDINGS_NAME = 'surroundings';

const EditListingOffersPanel = props => {
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
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingOffersPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingOffersPanel.createListingTitle" />
  );

  const food = publicData && publicData.food;
  const surroundings = publicData && publicData.surroundings;
  const initialValues = {
    food,
    surroundings,
    activities: publicData.activities,
    activities_de: publicData.activities_de,
  };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>

      <EditListingOffersForm
        className={css.form}
        name={FOOD_NAME}
        surroundingsName={SURROUNDINGS_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { food = [], surroundings = [], activities = '', activities_de = '' } = values;

          const updatedValues = {
            publicData: { food, surroundings, activities, activities_de },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
      {/* <EditListingOffersForm
        className={css.form}
        name={FOOD_NAME}
        publicData={publicData}
        initialValues={{ activities: publicData.activities, amenities: publicData.amenities }}
        onSubmit={values => {
          const { activities = '', amenities = [] } = values;
          const updateValues = {
            publicData: {
              activities,
              amenities,
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      /> */}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingOffersPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingOffersPanel.propTypes = {
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

export default EditListingOffersPanel;

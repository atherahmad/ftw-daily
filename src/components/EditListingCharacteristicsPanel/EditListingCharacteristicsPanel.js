import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureListing } from '../../util/data';
import { EditListingCharacteristicsForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingCharacteristicsPanel.css';

const CHARACTERISTICS_NAME = 'characteristics';

const EditListingCharacteristicsPanel = props => {
  const {
    rootClassName,
    className,
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
  const currentListing = ensureListing(listing);
  const { publicData } = currentListing.attributes;

  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingCharacteristicsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingCharacteristicsPanel.createListingTitle" />
  );

  const characteristics = publicData && publicData.characteristics;
  const initialValues = {
    characteristics,
    accomodationDescription: publicData.accomodationDescription,
    accomodationDescription_de: publicData.accomodationDescription_de,
    houserules: publicData.houserules,

    houserules_de: publicData.houserules_de,
  };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingCharacteristicsForm
        className={css.form}
        name={CHARACTERISTICS_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const {
            characteristics = [],
            accomodationDescription,
            accomodationDescription_de,
            houserules,
            houserules_de,
          } = values;

          const updatedValues = {
            publicData: {
              accomodationDescription,
              accomodationDescription_de,
              characteristics,
              houserules,
              houserules_de,
            },
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
    </div>
  );
};

EditListingCharacteristicsPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingCharacteristicsPanel.propTypes = {
  rootClassName: string,
  className: string,

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

export default EditListingCharacteristicsPanel;

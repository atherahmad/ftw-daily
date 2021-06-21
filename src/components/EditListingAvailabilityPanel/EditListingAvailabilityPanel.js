import React, { Component } from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingAvailabilityForm } from '../../forms';

import css from './EditListingAvailabilityPanel.css';

class EditListingAvailabilityPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomamount: null,
      bedamount: null,
      changed: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(formValues) {
    console.log(formValues.values);

    // this.setState({
    //   roomamount: formValues.values.roomamount,
    //   bedamount: formValues.values.bedamount,
    // });
    console.log(this.state);
  }

  render() {
    const {
      className,
      rootClassName,
      listing,
      availability,
      disabled,
      ready,
      onSubmit,
      onChange,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      errors,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    const currentListing = ensureOwnListing(listing);
    const { publicData } = currentListing.attributes;

    const ProjectRoomtype =
      publicData.roomtype === 'singlebedroom' ? (
        <FormattedMessage id="roomtypes.singlebedroom" />
      ) : publicData.roomtype === 'doublebedroom' ? (
        <FormattedMessage id="roomtypes.doublebedroom" />
      ) : publicData.roomtype === 'twobedroom' ? (
        <FormattedMessage id="roomtypes.twobedroom" />
      ) : publicData.roomtype === 'shared_bedroom' ? (
        <FormattedMessage id="roomtypes.shared_bedroom" />
      ) : publicData.roomtype === 'entire_accomodation' ? (
        <FormattedMessage id="roomtypes.entire_accomodation" />
      ) : publicData.roomtype === 'camping' ? (
        <FormattedMessage id="roomtypes.camping" />
      ) : null;

    // const bedamountStr =
    //   publicData.roomtype === 'singlebedroom'
    //     ? publicData.roomamount
    //     : publicData.roomtype === 'doublebedroom'
    //     ? publicData.roomamount * 2
    //     : publicData.roomtype === 'shared_bedroom'
    //     ? publicData.bedamount
    //     : publicData.roomtype === 'entire_accomodation'
    //     ? publicData.roomamount
    //     : null;

    // const bedamount = parseInt(bedamountStr);

    const isPublished =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;

    const availabilityPlan =
      (publicData.roomamount && publicData.roomtype === 'singlebedroom') ||
      publicData.roomtype === 'entire_accomodation'
        ? {
            type: 'availability-plan/day',
            entries: [
              { dayOfWeek: 'mon', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'tue', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'wed', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'thu', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'fri', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'sat', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'sun', seats: Number(publicData.roomamount) },
            ],
          }
        : (publicData.roomamount && publicData.roomtype === 'doublebedroom') ||
          publicData.roomtype === 'twobedroom' ||
          publicData.roomtype === 'camping'
        ? {
            type: 'availability-plan/day',
            entries: [
              { dayOfWeek: 'mon', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'tue', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'wed', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'thu', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'fri', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'sat', seats: Number(publicData.roomamount) },
              { dayOfWeek: 'sun', seats: Number(publicData.roomamount) },
            ],
          }
        : publicData.roomamount && publicData.roomtype === 'shared_bedroom'
        ? {
            type: 'availability-plan/day',
            entries: [
              { dayOfWeek: 'mon', seats: Number(publicData.bedamount) },
              { dayOfWeek: 'tue', seats: Number(publicData.bedamount) },
              { dayOfWeek: 'wed', seats: Number(publicData.bedamount) },
              { dayOfWeek: 'thu', seats: Number(publicData.bedamount) },
              { dayOfWeek: 'fri', seats: Number(publicData.bedamount) },
              { dayOfWeek: 'sat', seats: Number(publicData.bedamount) },
              { dayOfWeek: 'sun', seats: Number(publicData.bedamount) },
            ],
          }
        : {
            type: 'availability-plan/day',
            entries: [
              { dayOfWeek: 'mon', seats: 1 },
              { dayOfWeek: 'tue', seats: 1 },
              { dayOfWeek: 'wed', seats: 1 },
              { dayOfWeek: 'thu', seats: 1 },
              { dayOfWeek: 'fri', seats: 1 },
              { dayOfWeek: 'sat', seats: 1 },
              { dayOfWeek: 'sun', seats: 1 },
            ],
          };

    return (
      <div className={classes}>
        <h1 className={css.title}>
          {isPublished ? (
            <FormattedMessage
              id="EditListingAvailabilityPanel.title"
              values={{ listingTitle: <ListingLink listing={listing} /> }}
            />
          ) : (
            <FormattedMessage id="EditListingAvailabilityPanel.createListingTitle" />
          )}
        </h1>
        <EditListingAvailabilityForm
          className={css.form}
          listingId={currentListing.id}
          Roomtype={ProjectRoomtype}
          roomtypeKey={publicData.roomtype}
          initialValues={{
            availabilityPlan:
              publicData.roomtype === 'singlebedroom' ||
              publicData.roomtype === 'entire_accomodation'
                ? {
                    type: 'availability-plan/day',
                    entries: [
                      { dayOfWeek: 'mon', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'tue', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'wed', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'thu', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'fri', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'sat', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'sun', seats: Number(publicData.roomamount) },
                    ],
                  }
                : publicData.roomtype === 'doublebedroom' ||
                  publicData.roomtype === 'twobedroom' ||
                  publicData.roomtype === 'camping'
                ? {
                    type: 'availability-plan/day',
                    entries: [
                      { dayOfWeek: 'mon', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'tue', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'wed', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'thu', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'fri', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'sat', seats: Number(publicData.roomamount) },
                      { dayOfWeek: 'sun', seats: Number(publicData.roomamount) },
                    ],
                  }
                : publicData.roomtype === 'shared_bedroom'
                ? {
                    type: 'availability-plan/day',
                    entries: [
                      { dayOfWeek: 'mon', seats: Number(publicData.bedamount) },
                      { dayOfWeek: 'tue', seats: Number(publicData.bedamount) },
                      { dayOfWeek: 'wed', seats: Number(publicData.bedamount) },
                      { dayOfWeek: 'thu', seats: Number(publicData.bedamount) },
                      { dayOfWeek: 'fri', seats: Number(publicData.bedamount) },
                      { dayOfWeek: 'sat', seats: Number(publicData.bedamount) },
                      { dayOfWeek: 'sun', seats: Number(publicData.bedamount) },
                    ],
                  }
                : null,
            roomamount: publicData.roomamount,
            bedamount: publicData.bedamount,
          }}
          availability={availability}
          availabilityPlan={availabilityPlan}
          onSubmit={values => {
            const { roomamount, bedamount } = values;
            const updateValues = {
              publicData: {
                roomamount,
                bedamount:
                  publicData.roomtype === 'singlebedroom' ||
                  publicData.roomtype === 'entire_accomodation'
                    ? roomamount
                    : publicData.roomtype === 'doublebedroom' ||
                      publicData.roomtype === 'twobedroom' ||
                      publicData.roomtype === 'camping'
                    ? roomamount
                    : publicData.roomtype === 'shared_bedroom'
                    ? bedamount
                    : 1,
              },

              availabilityPlan:
                publicData.roomtype === 'singlebedroom' ||
                publicData.roomtype === 'entire_accomodation'
                  ? {
                      type: 'availability-plan/day',
                      entries: [
                        { dayOfWeek: 'mon', seats: Number(roomamount) },
                        { dayOfWeek: 'tue', seats: Number(roomamount) },
                        { dayOfWeek: 'wed', seats: Number(roomamount) },
                        { dayOfWeek: 'thu', seats: Number(roomamount) },
                        { dayOfWeek: 'fri', seats: Number(roomamount) },
                        { dayOfWeek: 'sat', seats: Number(roomamount) },
                        { dayOfWeek: 'sun', seats: Number(roomamount) },
                      ],
                    }
                  : publicData.roomtype === 'doublebedroom' ||
                    publicData.roomtype === 'twobedroom' ||
                    publicData.roomtype === 'camping'
                  ? {
                      type: 'availability-plan/day',
                      entries: [
                        { dayOfWeek: 'mon', seats: Number(roomamount) },
                        { dayOfWeek: 'tue', seats: Number(roomamount) },
                        { dayOfWeek: 'wed', seats: Number(roomamount) },
                        { dayOfWeek: 'thu', seats: Number(roomamount) },
                        { dayOfWeek: 'fri', seats: Number(roomamount) },
                        { dayOfWeek: 'sat', seats: Number(roomamount) },
                        { dayOfWeek: 'sun', seats: Number(roomamount) },
                      ],
                    }
                  : publicData.roomtype === 'shared_bedroom'
                  ? {
                      type: 'availability-plan/day',
                      entries: [
                        { dayOfWeek: 'mon', seats: Number(bedamount) },
                        { dayOfWeek: 'tue', seats: Number(bedamount) },
                        { dayOfWeek: 'wed', seats: Number(bedamount) },
                        { dayOfWeek: 'thu', seats: Number(bedamount) },
                        { dayOfWeek: 'fri', seats: Number(bedamount) },
                        { dayOfWeek: 'sat', seats: Number(bedamount) },
                        { dayOfWeek: 'sun', seats: Number(bedamount) },
                      ],
                    }
                  : null,
            };

            onSubmit(updateValues);
          }}
          onChange={onChange}
          saveActionMsg={submitButtonText}
          disabled={disabled}
          ready={ready}
          updated={panelUpdated}
          updateError={errors.updateListingError}
          updateInProgress={updateInProgress}
        />
      </div>
    );
  }
}

EditListingAvailabilityPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingAvailabilityPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  availability: shape({
    calendar: object.isRequired,
    onFetchAvailabilityExceptions: func.isRequired,
    onCreateAvailabilityException: func.isRequired,
    onDeleteAvailabilityException: func.isRequired,
  }).isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingAvailabilityPanel;

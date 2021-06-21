import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button, FieldSelect } from '../../components';

import ManageAvailabilityCalendar from './ManageAvailabilityCalendar';
import css from './EditListingAvailabilityForm.css';

import getRoomamountCodes from '../../translations/roomamountCodes';
import config from '../../config';
import * as validators from '../../util/validators';
import { Prompt } from 'react-router';

export class EditListingAvailabilityFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            ready,
            handleSubmit,
            intl,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
            availability,
            availabilityPlan,
            listingId,
            Roomtype,
            roomtypeKey,
          } = formRenderProps;

          console.log(roomtypeKey);
          const roomamountLabel = intl.formatMessage(
            {
              id: 'EditListingDescriptionForm.roomamountLabel',
            },
            { Roomtype: Roomtype }
          );
          const roomamountPlaceholder = intl.formatMessage({
            id: 'EditListingDescriptionForm.roomamountPlaceholder',
          });
          const roomamountRequired = validators.required(
            intl.formatMessage({
              id: 'EditListingDescriptionForm.roomamountRequired',
            })
          );

          const bedamountLabel = intl.formatMessage(
            {
              id: 'EditListingDescriptionForm.bedamountLabel',
            },
            { Roomtype: Roomtype }
          );
          const bedamountPlaceholder = intl.formatMessage({
            id: 'EditListingDescriptionForm.bedamountPlaceholder',
          });
          const bedamountRequired = validators.required(
            intl.formatMessage({
              id: 'EditListingDescriptionForm.bedamountRequired',
            })
          );

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingAvailabilityForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = (updated && pristine) || ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || disabled || submitInProgress;

          const roomamountCodes = getRoomamountCodes(config.locale);

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              <Prompt
                when={!pristine}
                message="You have unsaved changes, are you sure you want to leave?"
              />
              {errorMessage}

              <FieldSelect
                id="roomamount"
                name="roomamount"
                disabled={disabled}
                className={css.field}
                label={roomamountLabel}
                validate={roomamountRequired}
              >
                <option disabled value="">
                  {roomamountPlaceholder}
                </option>
                {roomamountCodes.map(roomamount => {
                  return (
                    <option key={roomamount.code} value={roomamount.code}>
                      {roomamount.code}
                    </option>
                  );
                })}
              </FieldSelect>
              <br />

              <FieldSelect
                id="bedamount"
                name="bedamount"
                disabled={disabled}
                className={
                  roomtypeKey === 'doublebedroom' ||
                  roomtypeKey === 'twobedroom' ||
                  roomtypeKey === 'singlebedroom' ||
                  roomtypeKey === 'entire_accomodation' ||
                  roomtypeKey === 'camping'
                    ? css.field_hide
                    : css.field
                }
                label={bedamountLabel}
                validate={roomtypeKey === 'shared_bedroom' ? bedamountRequired : null}
              >
                <option disabled value="">
                  {bedamountPlaceholder}
                </option>
                {roomamountCodes.map(roomamount => {
                  return (
                    <option key={roomamount.code} value={roomamount.code}>
                      {roomamount.code}
                    </option>
                  );
                })}
              </FieldSelect>
              <br />
              <div className={css.calendarWrapper}>
                <ManageAvailabilityCalendar
                  availability={availability}
                  availabilityPlan={availabilityPlan}
                  listingId={listingId}
                />
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
}

EditListingAvailabilityFormComponent.defaultProps = {
  updateError: null,
};

EditListingAvailabilityFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
  availability: object.isRequired,
  availabilityPlan: propTypes.availabilityPlan.isRequired,
};

export default compose(injectIntl)(EditListingAvailabilityFormComponent);

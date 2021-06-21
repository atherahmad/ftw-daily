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
import { maxLength, required, composeValidators, requiredFieldArrayCheckbox } from '../../util/validators';

import css from './EditListingFeaturesForm.css';
import { Prompt } from 'react-router';

const EditListingFeaturesFormComponent = props => {
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
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
        intl,
        values,
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

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingFeaturesForm.showListingFailed" />
        </p>
      ) : null;

      // const [otherState, setOther] = useState('');
      // const [index, setIndex] = useState(0);
      // const getValue = value => {
      //   values.amenities.map((option, index) => {
      //     if (option === 'other') {
      //       return setOther(value), setIndex(index);
      //     } else return null;
      //   });
      // };

      // const updateFilterConfig = () => {
      //   if (otherState.length !== 0) {
      //     values.amenities.splice(index, 1, otherState);
      //   }
      // };

      const packlistMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.packlist',
      });
      const packlistPlaceholderMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.packlistPlaceholder',
      });
      const packlistRequiredMessage = intl.formatMessage({
        id: 'EditListingDescriptionForm.packlistRequired',
      });

      const options = findOptionsForSelectFilter('amenities', filterConfig);

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <Prompt
            when={!pristine}
            message="You have unsaved changes, are you sure you want to leave?"
          />
          {errorMessage}
          {errorMessageShowListing}

          <div className={css.sectionTitle}>
            <FormattedMessage id="EditListingFeaturesForm.featuresTitle" />
          </div>
          <div className={css.tip}>
            <p>
              <FormattedMessage id="EditListingFeaturesForm.featuresTip" />
            </p>
          </div>
          <FieldCheckboxGroup
            className={css.features}
            // getValue={getValue.bind(this)}
            id={name}
            name={name}
            options={options}
            validate={requiredFieldArrayCheckbox('one is required')}
          />
          <div style={{ position: 'relative' }}>
              <p style={{ position: 'absolute', right: '0', bottom: '0' }}>
                {char500Limit - content.length}
              </p>
          <FieldTextInput
            id="packlist"
            name="packlist"
            className={css.description}
            type="textarea"
            label={packlistMessage}
            placeholder={packlistPlaceholderMessage}
            getValue={getValue.bind(this)}
            validate={composeValidators(required(packlistRequiredMessage))}
          />
          </div>

          <FieldTextInput
            style={{ display: 'none' }}
            type="textarea"
            id="packlist_de"
            name="packlist_de"
            initialValue={'Übersetzung hinzufügen'}
          />
          <div className={css.tip}>
            <p>
              <FormattedMessage id="EditListingDescriptionForm.packlistTip" />
            </p>
          </div>

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
            // onClick={updateFilterConfig}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);}

EditListingFeaturesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingFeaturesFormComponent.propTypes = {
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

const EditListingFeaturesForm = EditListingFeaturesFormComponent;

export default compose(injectIntl)(EditListingFeaturesForm);

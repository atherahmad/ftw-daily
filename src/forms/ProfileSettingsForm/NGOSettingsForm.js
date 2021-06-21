import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { maxLength, required, composeValidators } from '../../util/validators';

import { isUploadImageOverLimitError } from '../../util/errors';
import {
  Form,
  Avatar,
  ProjectAvatar,
  Button,
  ImageFromFile,
  IconSpinner,
  FieldTextInput,
} from '../../components';

import css from './NGOSettingsForm.css';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

const TITLE_MAX_LENGTH = 4;

class NGOSettingsFormComponent extends Component {
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false };
    this.submittedValues = {};

    this.state = {
      uploadDelay: false,
      content: '',
      content1: '',
      char80Limit: 80,
      char1000Limit: 1000,
    };
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }

  getValue = value => {
    if (value !== this.state.content) {
      this.setState({ content: value });
    }
  };

  getValue1 = value => {
    if (value !== this.state.content1) {
      this.setState({ content1: value });
    }
  };
  render() {
    return (
      <FinalForm
        {...this.props}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
            profileImage1,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form,
            values,
          } = fieldRenderProps;

          const user = ensureCurrentUser(currentUser);

          // First name
          const firstNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameLabel',
          });
          const firstNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNamePlaceholder',
          });
          const firstNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameRequired',
          });
          const firstNameRequired = validators.required(firstNameRequiredMessage);

          // Last name
          const lastNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameLabel',
          });
          const lastNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNamePlaceholder',
          });
          const lastNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          // Bio
          const bioLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.bioLabel',
          });
          const bioPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.bioPlaceholder',
          });

          const projectTitleLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.projectTitleLabel',
          });
          const projectTitlePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.projectTitlePlaceholder',
          });

          const projectTitleRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });

          const projectTitleRequired = validators.required(projectTitleRequiredMessage);

          const projectDescriptionLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.projectDescriptionLabel',
          });
          const projectDescriptionPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.projectDescriptionPlaceholder',
          });
          const projectDescriptionRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });

          const projectDescriptionRequired = validators.required(projectDescriptionRequiredMessage);

          const invalidProjectWebsite = intl.formatMessage({
            id: 'ProfileSettingsForm.invalidProjectURL',
          });

          const validateProjectWebsite = validators.validURL(invalidProjectWebsite);

          const projectImpactLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.projectImpactLabel',
          });
          const projectImpactPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.projectImpactPlaceholder',
          });

          const projectImpactRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });

          const projectImpactRequired = validators.required(projectImpactRequiredMessage);

          const optionalText = intl.formatMessage({
            id: 'EditListingLocationForm.optionalText',
          });
          const projectWebsiteLabel = intl.formatMessage(
            { id: 'ProfileSettingsForm.projectWebsiteLabel' },
            { optionalText: optionalText }
          );
          const projectWebsitePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.projectWebsitePlaceholder',
          });

          // const titleRequiredMessage = intl.formatMessage({
          //   id: 'EditListingCharacteristicsForm.characteristicsRequired',
          // });

          // const maxLengthMessage = intl.formatMessage(
          //   { id: 'EditListingCharacteristicsForm.maxLength' },
          //   {
          //     maxLength: TITLE_MAX_LENGTH,
          //   }
          // );

          // const maxLength60Message = maxLength(maxLengthMessage, TITLE_MAX_LENGTH);
          const maxLength80MessageText = intl.formatMessage(
            { id: 'ProfileSettingsForm.count' },
            {
              maxLength: 80,
            }
          );
          const maxLength1000MessageText = intl.formatMessage(
            { id: 'ProfileSettingsForm.count' },
            {
              maxLength: 1000,
            }
          );
          const maxLength80Message = validators.maxLength(maxLength80MessageText, 80);
          const maxLength1000Message = validators.maxLength(maxLength1000MessageText, 1000);

          const requiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.characteristicsRequired',
          });

          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
          const transientUser = { ...user, profileImage: transientUserProfileImage };

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!profileImage.file;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
          const imageFromFile =
            fileExists && (fileUploadInProgress || delayAfterUpload) ? (
              <ImageFromFile
                id={profileImage.id}
                className={errorClasses}
                // rootClassName={css.uploadingImage}
                // aspectRatioClassName={css.squareAspectRatio}
                file={profileImage.file}
              >
                {uploadingOverlay}
              </ImageFromFile>
            ) : null;

          // const projectImageFromFile =
          // fileExists && (fileUploadInProgress || delayAfterUpload) ? (
          //   <ImageFromFile
          //     id={profileImage.id}
          //     className={errorClasses}
          //     rootClassName={css.uploadingImage}
          //     aspectRatioClassName={css.squareAspectRatio}
          //     file={profileImage.file}
          //   >
          //     {uploadingOverlay}
          //   </ImageFromFile>
          // ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
          const avatarClasses = classNames(errorClasses, css.avatar, {
            [css.avatarInvisible]: this.state.uploadDelay,
          });
          const avatarComponent =
            !fileUploadInProgress && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            profileImage.imageId || fileUploadInProgress ? (
              <div className={css.avatarContainer}>
                {imageFromFile}
                {avatarComponent}
                <div className={css.changeAvatar}>
                  <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>
                <div className={css.avatarPlaceholderText}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProjectPicture" />
                </div>
                <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProjectPictureMobile" />
                </div>
              </div>
            );

          const submitError = updateProfileError ? (
            <div className={css.error}>
              <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
            </div>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid || pristine || pristineSinceLastSubmit || uploadInProgress || submitInProgress;

          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <div className={classNames(css.sectionContainer, css.lastSection123)}>
                  {/* <h3 className={css.sectionTitle}>
                    <FormattedMessage id="ProfileSettingsForm.projectHeading" />
                  </h3>

                  <h3 className={css.sectionTitle}>
                    <FormattedMessage id="ProfileSettingsForm.yourProjectPicture" />
                  </h3> */}

                  <Field
                    accept={ACCEPT_IMAGES}
                    id="profileImage"
                    name="profileImage"
                    label={chooseAvatarLabel}
                    type="file"
                    form={null}
                    uploadImageError={uploadImageError}
                    disabled={uploadInProgress}
                    validate={firstNameRequired}
                  >
                    {fieldProps => {
                      const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                      const { name, type } = input;
                      const onChange = e => {
                        const file = e.target.files[0];
                        form.change(`profileImage`, file);
                        form.blur(`profileImage`);
                        if (file != null) {
                          const tempId = `${file.name}_${Date.now()}`;
                          onImageUpload({ id: tempId, file });
                        }
                      };

                      let error = null;

                      if (isUploadImageOverLimitError(uploadImageError)) {
                        error = (
                          <div className={css.error}>
                            <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                          </div>
                        );
                      } else if (uploadImageError) {
                        error = (
                          <div className={css.error}>
                            <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                          </div>
                        );
                      }

                      return (
                        <div className={css.uploadAvatarWrapper}>
                          <label className={css.label} htmlFor={id}>
                            {label}
                          </label>
                          <input
                            accept={accept}
                            id={id}
                            name={name}
                            className={css.uploadAvatarInput}
                            disabled={disabled}
                            onChange={onChange}
                            type={type}
                          />
                          {error}
                        </div>
                      );
                    }}
                  </Field>
                  <div className={css.tip}>
                    <p>
                      <FormattedMessage id="ProfileSettingsForm.NGOtip" />
                    </p>
                  </div>
                  {/* <div className={css.fileInfo}>
                    <FormattedMessage id="ProfileSettingsForm.fileInfo" />
                  </div> */}
                  <br />
                  <h3 className={css.sectionTitle}>
                    <FormattedMessage id="ProfileSettingsForm.projectHeading" />
                  </h3>

                  <FieldTextInput
                    type="textarea"
                    id="projectTitle"
                    name="projectTitle"
                    label={projectTitleLabel}
                    placeholder={projectTitlePlaceholder}
                    validate={projectTitleRequired}
                    // validate={validators.composeValidators(
                    //   validators.required(titleRequiredMessage),
                    //   maxLength60Message
                    // )}
                    // getValue={this.getValue.bind(this)}
                  />

                  <br />
                  <div style={{ position: 'relative' }}>
                    <p style={{ position: 'absolute', right: '0', bottom: '0' }}>
                      {this.state.char80Limit - this.state.content.length}
                    </p>
                    <FieldTextInput
                      type="textarea"
                      id="projectImpact"
                      name="projectImpact"
                      label={projectImpactLabel}
                      placeholder={projectImpactPlaceholder}
                      validate={composeValidators(required(requiredMessage), maxLength80Message)}
                      getValue={this.getValue.bind(this)}
                    />
                  </div>
                  <FieldTextInput
                    style={{ display: 'none' }}
                    type="textarea"
                    id="projectImpact_de"
                    name="projectImpact_de"
                    initialValue={'Übersetzung hinzufügen'}
                  />
                  <div className={css.tip}>
                    <p>
                      <FormattedMessage id="ProfileSettingsForm.projectImpactTip" />
                    </p>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <p style={{ position: 'absolute', right: '0', bottom: '0' }}>
                      {this.state.char1000Limit - this.state.content1.length}
                    </p>
                    <FieldTextInput
                      type="textarea"
                      id="projectDescription"
                      name="projectDescription"
                      label={projectDescriptionLabel}
                      placeholder={projectDescriptionPlaceholder}
                      // validate={projectDescriptionRequired}
                      validate={composeValidators(required(requiredMessage), maxLength1000Message)}
                      getValue={this.getValue1.bind(this)}
                    />
                  </div>
                  <FieldTextInput
                    style={{ display: 'none' }}
                    type="textarea"
                    id="projectDescription_de"
                    name="projectDescription_de"
                    initialValue={'Übersetzung hinzufügen'}
                  />
                  <div className={css.tip}>
                    <p>
                      <FormattedMessage id="ProfileSettingsForm.projectDescriptionTip" />
                    </p>
                  </div>

                  <br />
                  <FieldTextInput
                    type="textarea"
                    id="projectWebsite"
                    name="projectWebsite"
                    label={projectWebsiteLabel}
                    placeholder={projectWebsitePlaceholder}
                    validate={validateProjectWebsite}
                  />

                  {/* <FieldTextInput
                  type="textarea"
                  id="bio"
                  name="bio"
                  label={bioLabel}
                  placeholder={bioPlaceholder}
                /> */}
                  {/* <p className={css.bioInfo}>
                  <FormattedMessage id="ProfileSettingsForm.bioInfo" />
                </p> */}
                </div>
              </div>
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourContactPerson" />
                </h3>
                <div className={css.nameContainer}>
                  <FieldTextInput
                    className={css.firstName}
                    type="text"
                    id="firstName"
                    name="firstName"
                    label={firstNameLabel}
                    placeholder={firstNamePlaceholder}
                    validate={firstNameRequired}
                  />
                  <FieldTextInput
                    className={css.lastName}
                    type="text"
                    id="lastName"
                    name="lastName"
                    label={lastNameLabel}
                    placeholder={lastNamePlaceholder}
                    validate={lastNameRequired}
                  />
                </div>
              </div>

              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={pristineSinceLastSubmit}
              >
                <FormattedMessage id="ProfileSettingsForm.saveChanges" />
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

NGOSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
};

NGOSettingsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const NGOSettingsForm = compose(injectIntl)(NGOSettingsFormComponent);

NGOSettingsForm.displayName = 'ProfileSettingsForm';

export default NGOSettingsForm;

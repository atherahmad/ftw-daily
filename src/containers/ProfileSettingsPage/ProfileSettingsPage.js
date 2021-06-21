import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import { ProfileSettingsForm, NGOSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';

import { updateProfile, uploadImage } from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.css';

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileSettingsPageComponent extends Component {
  render() {
    const {
      currentUser,
      image,
      onImageUpload,
      onUpdateProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
    } = this.props;

    const userVerification = ensureCurrentUser(currentUser);

    const verification = ensureCurrentUser(userVerification.attributes.profile.protectedData);
    const partner = verification.type;

    const projectInfoSubmittedRaw = ensureCurrentUser(
      userVerification.attributes.profile.publicData
    );
    const projectInfoSubmitted =
      typeof projectInfoSubmittedRaw.projectTitle === 'undefined' ? false : true;

    const handleSubmit = values => {
      const {
        firstName,
        lastName,
        bio: rawBio,
        projectTitle: rawProjectTitle,
        projectImpact: rawProjectImpact,
        projectImpact_de: rawProjectImpact_de,
        projectDescription: rawProjectDescription,
        projectDescription_de: rawProjectDescription_de,

        projectWebsite: rawProjectWebsite,
      } = values;

      // Ensure that the optional bio is a string
      const projectTitle = rawProjectTitle || '';
      const projectImpact = rawProjectImpact || '';
      const projectImpact_de = rawProjectImpact_de || '';

      const projectDescription = rawProjectDescription || '';
      const projectDescription_de = rawProjectDescription_de || '';

      const projectWebsite = rawProjectWebsite || '';

      const bio = rawBio || '';

      const profile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),

        bio,
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? {
              ...profile,
              profileImageId: uploadedImage.imageId,
              publicData: {
                projectTitle,
                projectImpact,
                projectImpact_de,
                projectDescription,
                projectDescription_de,
                projectWebsite,
              },
            }
          : {
              ...profile,
              publicData: {
                projectTitle,
                projectImpact,
                projectImpact_de,
                projectDescription,
                projectDescription_de,
                projectWebsite,
              },
            };

      onUpdateProfile(updatedValues).then(response => {
        setTimeout(() => {
          if (partner === 'host') {
            window.location.replace('/listings');
          }
        }, 500);
      });
    };

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName, bio } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const projectInformation = ensureCurrentUser(user.attributes.profile.publicData);

    const Traveler_or_NGO =
      partner === 'host' ? (
        <NGOSettingsForm
          className={css.form}
          currentUser={currentUser}
          initialValues={{
            firstName,
            lastName,
            bio,
            projectTitle: projectInformation.projectTitle,
            projectImpact: projectInformation.projectImpact,
            projectImpact_de: projectInformation.projectImpact_de,

            projectDescription: projectInformation.projectDescription,
            projectDescription_de: projectInformation.projectDescription_de,

            projectWebsite: projectInformation.projectWebsite,
            profileImage: user.profileImage,
          }}
          profileImage={profileImage}
          onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
          uploadInProgress={uploadInProgress}
          updateInProgress={updateInProgress}
          uploadImageError={uploadImageError}
          updateProfileError={updateProfileError}
          onSubmit={handleSubmit}
        />
      ) : (
        <ProfileSettingsForm
          className={css.form}
          currentUser={currentUser}
          initialValues={{
            firstName,
            lastName,
            bio,
            profileImage: user.profileImage,
          }}
          profileImage={profileImage}
          onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
          uploadInProgress={uploadInProgress}
          updateInProgress={updateInProgress}
          uploadImageError={uploadImageError}
          updateProfileError={updateProfileError}
          onSubmit={handleSubmit}
        />
      );

    const profileSettingsForm = user.id ? <>{Traveler_or_NGO}</> : null;

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <div style={{ width: '100vw', overflow: 'hidden' }}>
              <TopbarContainer currentPage="ProfileSettingsPage" />
              <UserNav
                partner={partner}
                projectInfoSubmitted={projectInfoSubmitted}
                selectedPageName="ProfileSettingsPage"
              />
            </div>
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>
                {/* {user.id ? (
                  <NamedLink
                    className={css.profileLink}
                    name="ProfilePage"
                    params={{ id: user.id.uuid }}
                  >
                    <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                  </NamedLink>
                ) : null} */}
              </div>
              {profileSettingsForm}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>{/* <Footer /> */}</LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

const { bool, func, object, shape, string } = PropTypes;

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    currentUser,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
});

const ProfileSettingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;

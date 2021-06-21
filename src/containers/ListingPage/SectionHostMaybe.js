import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { UserCard, Modal } from '../../components';
import { EnquiryForm } from '../../forms';
import { oneOfType } from 'prop-types';
import { propTypes } from '../../util/types';

import css from './ListingPage.css';

import { ensureUser, ensureCurrentUser } from '../../util/data';

const SectionHostMaybe = props => {
  const {
    title,
    listing,
    authorDisplayName,
    onContactUser,
    isEnquiryModalOpen,
    onCloseEnquiryModal,
    sendEnquiryError,
    sendEnquiryInProgress,
    onSubmitEnquiry,
    currentUser,
    onManageDisableScrolling,
  } = props;

  if (!listing.author) {
    return null;
  }

  const user = listing.author;
  const userIsCurrentUser = user && user.type === 'currentUser';
  const ensuredUser = userIsCurrentUser ? ensureCurrentUser(user) : ensureUser(user);

  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const isCurrentUser =
    ensuredUser.id && ensuredCurrentUser.id && ensuredUser.id.uuid === ensuredCurrentUser.id.uuid;

  const userVerification = ensureCurrentUser(currentUser);
  const verification = ensureCurrentUser(userVerification.attributes.profile.protectedData);
  const partner = verification.type;

  const content =
    !isCurrentUser && partner !== 'host' ? (
      <>
        <div className={css.line} />

        <h2 className={css.featuresTitle}>
          <FormattedMessage id="ListingPage.questions" />
        </h2>

        <UserCard user={listing.author} currentUser={currentUser} onContactUser={onContactUser} />
        <Modal
          id="ListingPage.enquiry"
          contentClassName={css.enquiryModalContent}
          isOpen={isEnquiryModalOpen}
          onClose={onCloseEnquiryModal}
          usePortal
          onManageDisableScrolling={onManageDisableScrolling}
        >
          <EnquiryForm
            className={css.enquiryForm}
            submitButtonWrapperClassName={css.enquirySubmitButtonWrapper}
            listingTitle={title}
            authorDisplayName={authorDisplayName}
            sendEnquiryError={sendEnquiryError}
            onSubmit={onSubmitEnquiry}
            inProgress={sendEnquiryInProgress}
          />
        </Modal>
        <br />
      </>
    ) : null;

  return (
    <div id="host" className={css.sectionHost}>
      {/* <h2 className={css.yourHostHeading}>
        <FormattedMessage id="ListingPage.yourHostHeading" />
      </h2> */}

      {content}
    </div>
  );
};

export default SectionHostMaybe;

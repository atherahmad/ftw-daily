import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';

import css from './ListingPage.css';

const SectionHostMaybe = props => {
  const { projectInformation } = props;

  const content =
    projectInformation.projectWebsite !== '' ? (
      <>
        <div className={css.line} />

        <h2 className={css.featuresTitle}>
          <FormattedMessage id="ListingPage.donateTitle" />
        </h2>
        <div className={css.contentWrappers}>
          <FormattedMessage id="ListingPage.donateText1" />

          <span style={{ color: '#1c7881' }}>{projectInformation.projectTitle}</span>
          <FormattedMessage id="ListingPage.donateText2" />
        </div>
        <div
          onClick={function() {
            window.open(projectInformation.projectWebsite);
          }}
          className={css.heroButton}
        >
          <FormattedMessage id="ListingPage.donateAction1" />
          {projectInformation.projectTitle}
          <FormattedMessage id="ListingPage.donateAction2" />
        </div>
      </>
    ) : null;

  return (
    <div id="host" className={css.sectionHost}>
      {content}
    </div>
  );
};

export default SectionHostMaybe;

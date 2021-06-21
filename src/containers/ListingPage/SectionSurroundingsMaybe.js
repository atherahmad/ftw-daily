import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
// import TabBar from './TabBar';

import css from './ListingPage.css';

const SectionSurroundingsMaybe = props => {
  const { options, publicData } = props;
  if (!publicData) {
    return null;
  }

  const selectedOptions = publicData && publicData.surroundings ? publicData.surroundings : [];
  return (
    <div className={css.sectionFeatures}>
      {/* <TabBar></TabBar> */}
      <PropertyGroup
        id="ListingPage.surroundings"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionSurroundingsMaybe;

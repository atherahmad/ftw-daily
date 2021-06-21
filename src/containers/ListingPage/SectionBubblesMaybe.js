import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { UspGroup } from '../../components';
// import TabBar from './TabBar';

import css from './ListingPage.css';

const SectionUspMaybe = props => {
  const { options, publicData } = props;
  if (!publicData) {
    return null;
  }

  const selectedOptions = publicData && publicData.amenities ? publicData.amenities : [];

  return (
    <div className={css.SectionUsp}>
      {/* <TabBar></TabBar> */}

      <UspGroup
        id="ListingPage.usp"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />
    </div>
  );
};

export default SectionUspMaybe;

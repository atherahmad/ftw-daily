/* eslint-disable no-console */
import React from 'react';
import ListingCardSmall from './ListingCardSmall ';
import { createUser, createListing, fakeIntl } from '../../util/test-data';

const listing = createListing('listing1', {}, { author: createUser('user1') });

const ListingCardWrapper = props => (
  <div style={{ maxWidth: '400px' }}>
    <ListingCardSmall {...props} />
  </div>
);

export const ListingCardWrapped = {
  component: ListingCardWrapper,
  props: {
    intl: fakeIntl,
    listing,
  },
};

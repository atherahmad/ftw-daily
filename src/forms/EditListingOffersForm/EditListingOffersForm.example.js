/* eslint-disable no-console */
import EditListingOffersForm from './EditListingOffersForm';

export const Empty = {
  component: EditListingOffersForm,
  props: {
    publicData: {},
    onSubmit: values => {
      console.log('Submit EditListingOffersForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save rules',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};

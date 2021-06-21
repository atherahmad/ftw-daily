/* eslint-disable no-console */
import FindLocationForm from './FindLocationForm';

export const Empty = {
  component: EditListingLocationForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingLocationForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save location',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
  },
  group: 'forms',
};

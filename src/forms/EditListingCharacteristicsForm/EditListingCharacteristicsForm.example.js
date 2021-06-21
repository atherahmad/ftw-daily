import EditListingCharacteristicssForm from './EditListingCharacteristicsForm';

const NAME = 'characteristics';

const initialValueArray = ['towels', 'jacuzzi', 'bathroom'];
const initialValues = { [NAME]: initialValueArray };

const filterConfig = [
  {
    id: 'characteristics',
    label: 'Merkmale',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_characteristics'],
    config: {
      mode: 'has_all',
      options: [
        {
          key: 'feat1',
          label: 'Feat 1',
        },
        {
          key: 'feat2',
          label: 'Feat 2',
        },
        {
          key: 'feat3',
          label: 'Feat 3',
        },
      ],
    },
  },
];

export const Characteristics = {
  component: EditListingCharacteristicsForm,
  props: {
    name: NAME,
    onSubmit: values => console.log('EditListingFeaturesForm submit:', values),
    initialValues: initialValues,
    saveActionMsg: 'Save characteristics',
    updated: false,
    updateInProgress: false,
    disabled: false,
    ready: false,
    filterConfig,
  },
  group: 'forms',
};

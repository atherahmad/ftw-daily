import React from 'react';
import { withRouter } from 'react-router-dom';
import SelectMultipleFilter from './SelectMultipleFilter';
import { stringify, parse } from '../../util/urlHelpers';

const URL_PARAM = 'pub_amenities';

const options = [
  {
    key: 'light',
    label: 'Licht/Lampe',
  },
  {
    key: 'electricity',
    label: 'Elektrizität',
  },
  {
    key: 'wardrobe',
    label: 'Kleiderschrank',
  },
  {
    key: 'safe',
    label: 'Safe',
  },
  {
    key: 'towels',
    label: 'Handtücher',
  },
  {
    key: 'internet',
    label: 'WiFi / Internet',
  },
  {
    key: 'mosquito_net',
    label: 'Moskitonetz',
  },
  {
    key: 'air_conditioning',
    label: 'Klimaanlage',
  },
  {
    key: 'fan',
    label: 'Ventilator',
  },
  {
    key: 'parking',
    label: 'Parkplatz',
  },
  {
    key: 'bedsheets',
    label: 'Bettwäsche',
  },
  {
    key: 'shower',
    label: 'Dusche',
  },
  {
    key: 'toilet',
    label: 'Toilette',
  },
  {
    key: 'sink',
    label: 'Waschbecken',
  },
  {
    key: 'private_kitchen',
    label: 'Private Küche',
  },
  {
    key: 'shared_kitchen',
    label: 'Geteilte Küche',
  },
];

const handleSubmit = (values, history) => {
  console.log('Submitting values', values);
  const queryParams = values ? `?${stringify(values)}` : '';
  history.push(`${window.location.pathname}${queryParams}`);
};

const AmenitiesFilterPopup = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const amenities = params[URL_PARAM];
  const initialValues = { [URL_PARAM]: !!amenities ? amenities : null };

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPopupExample"
      name="amenities"
      queryParamNames={[URL_PARAM]}
      label="Amenities"
      onSubmit={values => handleSubmit(values, history)}
      showAsPopup={true}
      liveEdit={false}
      options={options}
      initialValues={initialValues}
      contentPlacementOffset={-14}
    />
  );
});

export const AmenitiesFilterPopupExample = {
  component: AmenitiesFilterPopup,
  props: {},
  group: 'filters',
};

const AmenitiesFilterPlain = withRouter(props => {
  const { history, location } = props;

  const params = parse(location.search);
  const amenities = params[URL_PARAM];
  const initialValues = { [URL_PARAM]: !!amenities ? amenities : null };

  return (
    <SelectMultipleFilter
      id="SelectMultipleFilterPlainExample"
      name="amenities"
      queryParamNames={[URL_PARAM]}
      label="Amenities"
      onSubmit={values => {
        handleSubmit(values, history);
      }}
      showAsPopup={false}
      liveEdit={true}
      options={options}
      initialValues={initialValues}
    />
  );
});

export const AmenitiesFilterPlainExample = {
  component: AmenitiesFilterPlain,
  props: {},
  group: 'filters',
};

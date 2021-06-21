import { types as sdkTypes } from './util/sdkLoader';

const { LatLng, LatLngBounds } = sdkTypes;

// An array of locations to show in the LocationAutocompleteInput when
// the input is in focus but the user hasn't typed in any search yet.
//
// Each item in the array should be an object with a unique `id` (String) and a
// `predictionPlace` (util.types.place) properties.
export default [
  {
    id: 'default-Peru',
    predictionPlace: {
      address: 'Peru',
      bounds: new LatLngBounds(new LatLng(-0.03877685638356913,-68.6523288194706), new LatLng(-18.44830000727931,-81.38670006518649)),
    },
  },
  {
    id: 'default-Tanzania',
    predictionPlace: {
      address: 'Tanzania',
      bounds: new LatLngBounds(new LatLng(0.9843968413481883, 40.63980004969153), new LatLng(-11.76125392757591, 29.33999997140636)),
    },
  },
  {
    id: 'default-Thailand',
    predictionPlace: {
      address: 'Thailand',
      bounds: new LatLngBounds(new LatLng(20.46514296787411,105.6368119956324), new LatLng(5.613038011736927,97.34339596444781)),
    },
  },
  {
    id: 'default- Italien',
    predictionPlace: {
      address: ' Italien',
      bounds: new LatLngBounds(new LatLng(47.09199997988367,18.79759992139748), new LatLng(35.48969995195065,6.626720064926066)),
    },
  },
  // {
  //   id: 'default-ruka',
  //   predictionPlace: {
  //     address: 'Ruka',
  //     bounds: new LatLngBounds(new LatLng(66.16997, 29.16773), new LatLng(66.16095, 29.13572)),
  //   },
  // },
];

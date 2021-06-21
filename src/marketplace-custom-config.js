/*
 * Marketplace specific configuration.
 *
 * Every filter needs to have following keys:
 * - id:     Unique id of the filter.
 * - label:  The default label of the filter.
 * - type:   String that represents one of the existing filter components:
 *           BookingDateRangeFilter, KeywordFilter, PriceFilter,
 *           SelectSingleFilter, SelectMultipleFilter.
 * - group:  Is this 'primary' or 'secondary' filter?
 *           Primary filters are visible on desktop layout by default.
 *           Secondary filters are behind "More filters" button.
 *           Read more from src/containers/SearchPage/README.md
 * - queryParamNames: Describes parameters to be used with queries
 *                    (e.g. 'price' or 'pub_amenities'). Most of these are
 *                    the same between webapp URLs and API query params.
 *                    You can't change 'dates', 'price', or 'keywords'
 *                    since those filters are fixed to a specific attribute.
 * - config: Extra configuration that the filter component needs.
 *
 * Note 1: Labels could be tied to translation file
 *         by importing FormattedMessage:
 *         <FormattedMessage id="some.translation.key.here" />
 *
 * Note 2: If you need to add new custom filter components,
 *         you need to take those into use in:
 *         src/containers/SearchPage/FilterComponent.js
 *
 * Note 3: If you just want to create more enum filters
 *         (i.e. SelectSingleFilter, SelectMultipleFilter),
 *         you can just add more configurations with those filter types
 *         and tie them with correct extended data key
 *         (i.e. pub_<key> or meta_<key>).
 */

import Cookies from 'universal-cookie';
import React, { Component } from 'react';

import { FormattedMessage } from './util/reactIntl';

const cookies = new Cookies();

export const filters = [
  {
    id: 'category',
    label: (
      <>
        <FormattedMessage id="filter.topic" />
      </>
    ),
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_category'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      searchMode: 'has_any',
      options: [
        {
          key: 'Bildung',
          label: (
            <>
              <img src={require('./assets/categories/education.png')} width="30px"></img>{' '}
              <FormattedMessage id="filter.category.education" />
            </>
          ),
        },
        {
          key: 'Naturschutz',
          label: (
            <>
              <img src={require('./assets/categories/environment.png')} width="30px"></img>{' '}
              <FormattedMessage id="filter.category.environment" />
            </>
          ),
        },
        {
          key: 'Tierschutz',
          label: (
            <>
              <img src={require('./assets/categories/animal.png')} width="30px"></img>{' '}
              <FormattedMessage id="filter.category.animalCare" />
            </>
          ),
        },
        {
          key: 'Equality',
          label: (
            <>
              <img src={require('./assets/categories/equality.png')} width="30px"></img>{' '}
              <FormattedMessage id="filter.category.equality" />
            </>
          ),
        },
        {
          key: 'Health',
          label: (
            <>
              <img src={require('./assets/categories/health.png')} width="30px"></img>{' '}
              <FormattedMessage id="filter.category.health" />
            </>
          ),
        },
        {
          key: 'Sports',
          label: (
            <>
              <img src={require('./assets/categories/sports.png')} width="30px"></img>{' '}
              <FormattedMessage id="filter.category.sports" />
            </>
          ),
        },

        // { key: 'Bildung', label: <FormattedMessage id="filter.category.Bildung" /> },
        // { key: 'Naturschutz', label:  },
        // { key: 'Tierschutz', label: <FormattedMessage id="filter.category.Tierschutz" /> },
        // { key: 'Community', label: <FormattedMessage id="filter.category.Community" /> },
      ],
    },
  },

  {
    id: 'languages',
    label: (
      <>
        <FormattedMessage id="filter.languages" />
      </>
    ),
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_languages'],
    config: {
      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      searchMode: 'has_any',
      options: [
        {
          key: 'english',
          label: (
            <>
              <FormattedMessage id="filter.language.english" />{' '}
            </>
          ),
        },
        {
          key: 'spanish',
          label: (
            <>
              <FormattedMessage id="filter.language.spanish" />{' '}
            </>
          ),
        },
        {
          key: 'french',
          label: (
            <>
              {' '}
              <FormattedMessage id="filter.language.french" />
            </>
          ),
        },
        {
          key: 'german',
          label: (
            <>
              <FormattedMessage id="filter.language.german" />
            </>
          ),
        },
        {
          key: 'portuguese',
          label: (
            <>
              {' '}
              <FormattedMessage id="filter.language.portuguese" />
            </>
          ),
        },

        // { key: 'Bildung', label: <FormattedMessage id="filter.category.Bildung" /> },
        // { key: 'Naturschutz', label: <FormattedMessage id="filter.category.Naturschutz" /> },
        // { key: 'Tierschutz', label: <FormattedMessage id="filter.category.Tierschutz" /> },
        // { key: 'Community', label: <FormattedMessage id="filter.category.Community" /> },
      ],
    },
  },

  {
    id: 'roomtype',
    label: (
      <>
        <FormattedMessage id="filter.roomtype" />
      </>
    ),
    type: 'SelectSingleFilter',
    group: 'primary',
    queryParamNames: ['pub_roomtype'],
    config: {
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for the UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'singlebedroom',
          label: (
            <>
              <img src={require('./assets/icons/roomtypes/onebedroom.png')} width="30px"></img>{' '}
              <FormattedMessage id="roomtypes.singlebedroom" />
            </>
          ),
          labelMsgId: 'roomtypes.singlebedroom',
        },
        {
          key: 'doublebedroom',
          label: (
            <>
              <img src={require('./assets/icons/roomtypes/doublebedroom.png')} width="30px"></img>{' '}
              <FormattedMessage id="roomtypes.doublebedroom" />
            </>
          ),
          labelMsgId: 'roomtypes.doublebedroom',
        },
        {
          key: 'twobedroom',
          label: (
            <>
              <img src={require('./assets/icons/roomtypes/twobedroom.png')} width="30px"></img>{' '}
              <FormattedMessage id="roomtypes.twobedroom" />
            </>
          ),
          labelMsgId: 'roomtypes.twobedroom',
        },
        {
          key: 'shared_bedroom',
          label: (
            <>
              <img src={require('./assets/icons/roomtypes/shared_bedroom.png')} width="30px"></img>{' '}
              <FormattedMessage id="roomtypes.shared_bedroom" />
            </>
          ),
          labelMsgId: 'roomtypes.shared_bedroom',
        },
        {
          key: 'entire_accomodation',
          label: (
            <>
              <img
                src={require('./assets/icons/roomtypes/entire_accomodation.png')}
                width="30px"
              ></img>{' '}
              <FormattedMessage id="roomtypes.entire_accomodation" />
            </>
          ),
          labelMsgId: 'roomtypes.entire_accomodation',
        },
        {
          key: 'camping',
          label: (
            <>
              <img src={require('./assets/icons/roomtypes/camping.png')} width="30px"></img>{' '}
              <FormattedMessage id="roomtypes.camping" />
            </>
          ),
          labelMsgId: 'roomtypes.camping',
        },
      ],
    },
  },
  {
    id: 'price',
    label: (
      <>
        <FormattedMessage id="filter.price" />
      </>
    ),
    type: 'PriceFilter',
    group: 'primary',
    // Note: PriceFilter is fixed filter,
    // you can't change "queryParamNames: ['price'],"
    queryParamNames: ['price'],
    // Price filter configuration
    // Note: unlike most prices this is not handled in subunits
    config: {
      min: 0,
      max: 1000,
      step: 5,
    },
  },
  {
    id: 'characteristics',
    label: 'Highlights',
    type: 'SelectMultipleFilter',
    group: 'primary',
    queryParamNames: ['pub_characteristics'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.
      options: [
        {
          key: 'comfort',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.comfort" />
            </>
          ),
        },
        {
          key: 'adventure',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.adventure" />
            </>
          ),
        },
        {
          key: 'nature',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.nature" />
            </>
          ),
        },
        {
          key: 'near_beach',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.near_beach" />
            </>
          ),
        },
        {
          key: 'animallovers',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.animallovers" />
            </>
          ),
        },
        {
          key: 'sportlovers',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.sportlovers" />
            </>
          ),
        },

        {
          key: 'familyfriendly',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.familyfriendly" />
            </>
          ),
        },

        {
          key: 'trekking',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.trekking" />
            </>
          ),
        },
        {
          key: 'culture',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.culture" />
            </>
          ),
        },
        {
          key: 'barrier_free',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.barrier_free" />
            </>
          ),
        },
        {
          key: 'accessibility',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.accessibility" />
            </>
          ),
        },
        {
          key: 'projecttours_possible',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.projecttours_possible" />
            </>
          ),
        },
        {
          key: 'projecttours_impossible',
          label: (
            <>
              <FormattedMessage id="filter.characteristics.projecttours_impossible" />
            </>
          ),
        },
      ],
    },
  },

  // {
  //   id: 'keyword',
  //   label: 'Keyword',
  //   type: 'KeywordFilter',
  //   group: 'primary',
  //   // Note: KeywordFilter is fixed filter,
  //   // you can't change "queryParamNames: ['keywords'],"
  //   queryParamNames: ['keywords'],
  //   // NOTE: If you are ordering search results by distance
  //   // the keyword search can't be used at the same time.
  //   // You can turn on/off ordering by distance from config.js file.
  //   config: {},
  // },

  {
    id: 'food',
    label: (
      <>
        <FormattedMessage id="EditListingOffersForm.foodTitle" />
      </>
    ),
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_food'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.

      options: [
        {
          key: 'breakfast_inclusive',
          label: (
            <>
              <FormattedMessage id="filter.food.breakfast_inclusive" />
            </>
          ),
        },
        {
          key: 'breakfast_for_sale',
          label: (
            <>
              <FormattedMessage id="filter.food.breakfast_for_sale" />
            </>
          ),
        },
        {
          key: 'lunch_inclusive',
          label: (
            <>
              <FormattedMessage id="filter.food.lunch_inclusive" />
            </>
          ),
        },
        {
          key: 'lunch_for_sale',
          label: (
            <>
              <FormattedMessage id="filter.food.lunch_for_sale" />
            </>
          ),
        },

        {
          key: 'dinner_inclusive',
          label: (
            <>
              <FormattedMessage id="filter.food.dinner_inclusive" />
            </>
          ),
        },
        {
          key: 'dinner_for_sale',
          label: (
            <>
              <FormattedMessage id="filter.food.dinner_for_sale" />
            </>
          ),
        },
        {
          key: 'vegetarian_options',
          label: (
            <>
              <FormattedMessage id="filter.food.vegetarian_options" />
            </>
          ),
        },
        {
          key: 'vegan_options',
          label: (
            <>
              <FormattedMessage id="filter.food.vegan_options" />
            </>
          ),
        },

        {
          key: 'coffee_tee',
          label: (
            <>
              <FormattedMessage id="filter.food.coffee_tee" />
            </>
          ),
        },
      ],
    },
  },

  {
    id: 'amenities',
    label: (
      <>
        <FormattedMessage id="EditListingWizard.tabLabelFeatures" />
      </>
    ),
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_amenities'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.

      options: [
        {
          key: 'light',
          label: (
            <>
              <FormattedMessage id="filter.amenities.light" />
            </>
          ),
        },
        {
          key: 'electricity',
          label: (
            <>
              <FormattedMessage id="filter.amenities.electricity" />
            </>
          ),
        },

        {
          key: 'bedsheets',
          label: (
            <>
              <FormattedMessage id="filter.amenities.bedsheets" />
            </>
          ),
        },
        {
          key: 'sink',
          label: (
            <>
              <FormattedMessage id="filter.amenities.sink" />
            </>
          ),
        },
        {
          key: 'shower',
          label: (
            <>
              <FormattedMessage id="filter.amenities.shower" />
            </>
          ),
        },
        {
          key: 'toilet',
          label: (
            <>
              <FormattedMessage id="filter.amenities.toilet" />
            </>
          ),
        },

        {
          key: 'privat_bathroom',
          label: (
            <>
              <FormattedMessage id="filter.amenities.privat_bathroom" />
            </>
          ),
        },
        {
          key: 'shared_bathroom',
          label: (
            <>
              <FormattedMessage id="filter.amenities.shared_bathroom" />
            </>
          ),
        },
        {
          key: 'private_kitchen',
          label: (
            <>
              <FormattedMessage id="filter.amenities.private_kitchen" />
            </>
          ),
        },
        {
          key: 'shared_kitchen',
          label: (
            <>
              <FormattedMessage id="filter.amenities.shared_kitchen" />
            </>
          ),
        },
        {
          key: 'internet',
          label: (
            <>
              <FormattedMessage id="filter.amenities.internet" />
            </>
          ),
        },
        {
          key: 'computer',
          label: (
            <>
              <FormattedMessage id="filter.amenities.computer" />
            </>
          ),
        },
        {
          key: 'tv',
          label: (
            <>
              <FormattedMessage id="filter.amenities.tv" />
            </>
          ),
        },
        {
          key: 'mosquito_net',
          label: (
            <>
              <FormattedMessage id="filter.amenities.mosquito_net" />
            </>
          ),
        },
        {
          key: 'towels',
          label: (
            <>
              <FormattedMessage id="filter.amenities.towels" />
            </>
          ),
        },
        {
          key: 'fan',
          label: (
            <>
              <FormattedMessage id="filter.amenities.fan" />
            </>
          ),
        },
        {
          key: 'air_conditioning',
          label: (
            <>
              <FormattedMessage id="filter.amenities.air_conditioning" />
            </>
          ),
        },

        {
          key: 'heating',
          label: (
            <>
              <FormattedMessage id="filter.amenities.heating" />
            </>
          ),
        },
        {
          key: 'safe',
          label: (
            <>
              <FormattedMessage id="filter.amenities.safe" />
            </>
          ),
        },

        {
          key: 'wardrobe',
          label: (
            <>
              <FormattedMessage id="filter.amenities.wardrobe" />
            </>
          ),
        },

        {
          key: 'parking',
          label: (
            <>
              <FormattedMessage id="filter.amenities.parking" />
            </>
          ),
        },

        {
          key: 'luggage_storage',
          label: (
            <>
              <FormattedMessage id="filter.amenities.luggage_storage" />
            </>
          ),
        },

        {
          key: 'laundry_facilities',
          label: (
            <>
              <FormattedMessage id="filter.amenities.laundry_facilities" />
            </>
          ),
        },
      ],
    },
  },

  // {
  //   id: 'accomodationtype',
  //   label: 'Unterkunftstyp',
  //   type: 'SelectSingleFilter',
  //   group: 'secondary',
  //   queryParamNames: ['pub_accomodationtype'],
  //   config: {
  //     searchMode: 'has_all',

  //     options: [
  //       { key: 'Lodge', label: 'Lodge' },
  //       { key: 'Hostel', label: 'Hostel' },
  //       { key: 'Homestay', label: 'Homestay' },
  //     ],
  //   },
  // },

  {
    id: 'surroundings',
    label: (
      <>
        <FormattedMessage id="filter.price" />
      </>
    ),
    type: 'SelectMultipleFilter',
    group: 'secondary',
    queryParamNames: ['pub_surroundings'],
    config: {
      // Optional modes: 'has_all', 'has_any'
      // https://www.sharetribe.com/api-reference/marketplace.html#extended-data-filtering
      searchMode: 'has_all',

      // "key" is the option you see in Flex Console.
      // "label" is set here for this web app's UI only.
      // Note: label is not added through the translation files
      // to make filter customizations a bit easier.

      options: [
        {
          key: 'supermarket',
          label: (
            <>
              <FormattedMessage id="filter.surroundings.supermarket" />
            </>
          ),
        },
        {
          key: 'restaurant',
          label: (
            <>
              <FormattedMessage id="filter.surroundings.restaurant" />
            </>
          ),
        },
        {
          key: 'facility',
          label: (
            <>
              <FormattedMessage id="filter.surroundings.facility" />
            </>
          ),
        },
        {
          key: 'washing',
          label: (
            <>
              <FormattedMessage id="filter.surroundings.washing" />
            </>
          ),
        },

        {
          key: 'bank',
          label: (
            <>
              <FormattedMessage id="filter.surroundings.bank" />
            </>
          ),
        },
        {
          key: 'public_transport',
          label: (
            <>
              <FormattedMessage id="filter.surroundings.public_transport" />
            </>
          ),
        },
        {
          key: 'tour',
          label: (
            <>
              <FormattedMessage id="filter.surroundings.tour" />
            </>
          ),
        },
      ],
    },
  },

  // {
  //   id: 'dates',
  //   label: 'Dates',
  //   type: 'BookingDateRangeFilter',
  //   group: 'secondary',

  //   queryParamNames: ['dates'],
  //   config: {},
  // },
];

export const sortConfig = {
  // Enable/disable the sorting control in the SearchPage
  active: true,

  // Note: queryParamName 'sort' is fixed,
  // you can't change it since Flex API expects it to be named as 'sort'
  queryParamName: 'sort',

  // Internal key for the relevance option, see notes below.
  relevanceKey: 'relevance',

  // Keyword filter is sorting the results already by relevance.
  // If keyword filter is active, we need to disable sorting.
  conflictingFilters: ['keyword'],

  options: [
    {
      key: '-createdAt',
      label: (
        <>
          <FormattedMessage id="filter.sort.newest" />
        </>
      ),
    },
    {
      key: 'createdAt',
      label: (
        <>
          <FormattedMessage id="filter.sort.oldest" />
        </>
      ),
    },

    {
      key: '-price',
      label: (
        <>
          <FormattedMessage id="filter.sort.lowest_price" />
        </>
      ),
    },
    {
      key: 'price',
      label: (
        <>
          <FormattedMessage id="filter.sort.highest_price" />
        </>
      ),
    },

    // The relevance is only used for keyword search, but the
    // parameter isn't sent to the Marketplace API. The key is purely
    // for handling the internal state of the sorting dropdown.
    { key: 'relevance', label: 'Relevance', longLabel: 'Relevance (Keyword search)' },
  ],
};

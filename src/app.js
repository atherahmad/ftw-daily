import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

// react-dates needs to be initialized before using any react-dates component
// https://github.com/airbnb/react-dates#initialize
// NOTE: Initializing it here will initialize it also for app.test.js
import 'react-dates/initialize';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import difference from 'lodash/difference';
import mapValues from 'lodash/mapValues';
import moment from 'moment';
import { IntlProvider } from './util/reactIntl';
import configureStore from './store';
import routeConfiguration from './routeConfiguration';
import Routes from './Routes';
import config from './config';
import publicIp from 'public-ip';
import ipLocation from 'iplocation';
import Observer from 'fontfaceobserver';

// Flex template application uses English translations as default.
import defaultMessages from './translations/de.json';

import defaultMessagesEN from './translations/en.json';

// If you want to change the language, change the imports to match the wanted locale:
//   1) Change the language in the config.js file!
//   2) Import correct locale rules for Moment library
//   3) Use the `messagesInLocale` import to add the correct translation file.
//   4) To support older browsers we need add the correct locale for intl-relativetimeformat to `util/polyfills.js`

// Note that there is also translations in './translations/countryCodes.js' file
// This file contains ISO 3166-1 alpha-2 country codes, country names and their translations in our default languages
// This used to collect billing address in StripePaymentAddress on CheckoutPage

// Step 2:
// If you are using a non-english locale with moment library,
// you should also import time specific formatting rules for that locale
// e.g. for French: import 'moment/locale/fr';

// Step 3:
// If you are using a non-english locale, point `messagesInLocale` to correct .json file
import messagesInLocale from './translations/en.json';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

// If translation key is missing from `messagesInLocale` (e.g. fr.json),
// corresponding key will be added to messages from `defaultMessages` (en.json)
// to prevent missing translation key errors.

const addMissingTranslations = (sourceLangTranslations, targetLangTranslations) => {
  const sourceKeys = Object.keys(sourceLangTranslations);
  const targetKeys = Object.keys(targetLangTranslations);
  const missingKeys = difference(sourceKeys, targetKeys);

  const addMissingTranslation = (translations, missingKey) => ({
    ...translations,
    [missingKey]: sourceLangTranslations[missingKey],
  });

  return missingKeys.reduce(addMissingTranslation, targetLangTranslations);
};

//If a new user starts using the site the language is determined using his IP address,
//which is then used to find out if he is inside or outside germany and the language is set accordingly
const getClientIP = async () => await publicIp.v4({ fallbackUrls: ['https://ifconfig.co/ip'] });
const getCurrentLocation = async () => {
  await getClientIP().then(ip => {
    ipLocation(ip).then(loc => {
      // console.log(loc.country.name + 'is the location');
      if (!cookies.get('language')) {
        console.log('no prefrence');
        if (loc.country.name === 'Germany') {
          //console.log('finally DEU');
          cookies.set('language', 'de', {
            maxAge: 60 * 60 * 24 * 90,
          });
          window.location.reload();
        } else {
          cookies.set('language', 'en', {
            maxAge: 60 * 60 * 24 * 90,
          });
          window.location.reload();
        }
        window.location.reload();
      } else {
        console.log('prefrence ' + cookies.get('language'));
      }
    });
  });
};

const isDefaultLanguageInUse = config.locale === 'de';

const messages = cookies.get('language') === 'en' ? defaultMessagesEN : defaultMessages;
// const messages = isDefaultLanguageInUse
//   ? defaultMessages
//   : addMissingTranslations(defaultMessages, messagesInLocale);

const isTestEnv = process.env.NODE_ENV === 'test';

// Locale should not affect the tests. We ensure this by providing
// messages with the key as the value of each message.
const testMessages = mapValues(messages, (val, key) => key);
const localeMessages = isTestEnv ? testMessages : messages;

const setupLocale = () => {
  if (isTestEnv) {
    // Use english as a default locale in tests
    // This affects app.test.js and app.node.test.js tests
    config.locale = 'de';
    return;
  }

  // Set the Moment locale globally
  // See: http://momentjs.com/docs/#/i18n/changing-locale/
  moment.locale(config.locale);
};

export const ClientApp = props => {
  const { store } = props;
  setupLocale();

  useEffect(() => {
    //document.documentElement.className += ' GT-inactive';
    const GTFont = new Observer('GT Super Display Bold', {});

    //GTFont.load().then(function() {
    //document.documentElement.classList.remove('GT-inactive');
    //document.documentElement.classList.add('GT-active');
    //sessionStorage.foutFontsLoaded = true;
    //});
    //import('./font');
  }, []);

  return (
    <IntlProvider locale={config.locale} messages={localeMessages} textComponent="span">
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Routes routes={routeConfiguration()} />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </IntlProvider>
  );
};

const { any, string } = PropTypes;

ClientApp.propTypes = { store: any.isRequired };

export const ServerApp = props => {
  const { url, context, helmetContext, store } = props;
  setupLocale();
  HelmetProvider.canUseDOM = false;
  return (
    <IntlProvider locale={config.locale} messages={localeMessages} textComponent="span">
      <Provider store={store}>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url} context={context}>
            <Routes routes={routeConfiguration()} />
          </StaticRouter>
        </HelmetProvider>
      </Provider>
    </IntlProvider>
  );
};

ServerApp.propTypes = { url: string.isRequired, context: any.isRequired, store: any.isRequired };

/**
 * Render the given route.
 *
 * @param {String} url Path to render
 * @param {Object} serverContext Server rendering context from react-router
 *
 * @returns {Object} Object with keys:
 *  - {String} body: Rendered application body of the given route
 *  - {Object} head: Application head metadata from react-helmet
 */
export const renderApp = (url, serverContext, preloadedState) => {
  // Don't pass an SDK instance since we're only rendering the
  // component tree with the preloaded store state and components
  // shouldn't do any SDK calls in the (server) rendering lifecycle.
  const store = configureStore(preloadedState);

  const helmetContext = {};

  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={serverContext} helmetContext={helmetContext} store={store} />
  );
  const { helmet: head } = helmetContext;
  return { head, body };
};

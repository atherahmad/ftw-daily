//* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { array, arrayOf, bool, func, shape, string, oneOf, oneOfType } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_PENDING_APPROVAL, LISTING_STATE_CLOSED, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  LISTING_PAGE_DRAFT_VARIANT,
  LISTING_PAGE_PENDING_APPROVAL_VARIANT,
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_EDIT,
  createSlug,
} from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import {
  ensureListing,
  ensureOwnListing,
  ensureUser,
  userDisplayNameAsString,
} from '../../util/data';
import { richText } from '../../util/richText';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { initializeCardPaymentData } from '../../ducks/stripe.duck.js';
import {
  Page,
  NamedLink,
  NamedRedirect,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  BookingPanel,
  ListingCardSmall,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';

import {
  sendEnquiry,
  loadData,
  setInitialValues,
  fetchTransactionLineItems,
} from './ListingPage.duck';
import SectionImages from './SectionImages';
import SectionAvatar from './SectionAvatar';
import SectionHeading from './SectionHeading';
import SectionDescriptionMaybe from './SectionDescriptionMaybe';
import SectionBubblesMaybe from './SectionBubblesMaybe';

import SectionFeaturesMaybe from './SectionFeaturesMaybe';
import SectionSurroundingsMaybe from './SectionSurroundingsMaybe';

import SectionReviews from './SectionReviews';
import SectionHostMaybe from './SectionHostMaybe';
import SectionDonateMaybe from './SectionDonateMaybe';

import SectionRulesMaybe from './SectionRulesMaybe';
import SectionMapMaybe from './SectionMapMaybe';
import css from './ListingPage.css';

import { InlineTextButton } from '../../components';

import Sticky from 'react-sticky-el';

import TemporaryDrawer from './TemporaryDrawer';

import includes from 'lodash/includes';

import LoaderImage1 from '../../assets/loader/world.png';
import LoaderImage2 from '../../assets/loader/airplane.png';

import getCountryCodes from '../../translations/countryCodes';
import getCategoryCodes from '../../translations/categoryCodes';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE = 16;

const { UUID } = sdkTypes;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

const categoryLabel = (categories, key) => {
  const cat = categories.find(c => c.key === key);
  return cat ? cat.label : key;
};

export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const { enquiryModalOpenForListingId, params, user } = props;

    this.state = {
      pageClassNames: [],
      imageCarouselOpen: false,
      enquiryModalOpen: enquiryModalOpenForListingId === params.id,

      firstToggle: 'first',
      secondToggle: 'first',
      thirdToggle: 'first',
      country: '',
      city: '',
      projectDetailsOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onContactUser = this.onContactUser.bind(this);
    this.onSubmitEnquiry = this.onSubmitEnquiry.bind(this);

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }

  handleSubmit(values) {
    const {
      history,
      getListing,
      params,
      callSetInitialValues,
      onInitializeCardPaymentData,
    } = this.props;
    const listingId = new UUID(params.id);
    const listing = getListing(listingId);

    const { bookingDates, ...bookingData } = values;
    const initialValues = {
      listing,

      bookingData,

      bookingDates: {
        bookingStart: bookingDates.startDate,
        bookingEnd: bookingDates.endDate,
      },
      confirmPaymentError: null,
    };

    const saveToSessionStorage = !this.props.currentUser;

    const routes = routeConfiguration();
    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);

    callSetInitialValues(setInitialValues, initialValues, saveToSessionStorage);

    // Clear previous Stripe errors from store if there is any
    onInitializeCardPaymentData();

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        routes,
        {
          id: listing.id.uuid,
          slug: createSlug(listing.attributes.title),
        },
        {}
      )
    );
  }

  onContactUser() {
    const { currentUser, history, callSetInitialValues, params, location } = this.props;

    if (!currentUser) {
      const state = { from: `${location.pathname}${location.search}${location.hash}` };

      // We need to log in before showing the modal, but first we need to ensure
      // that modal does open when user is redirected back to this listingpage
      callSetInitialValues(setInitialValues, { enquiryModalOpenForListingId: params.id });

      // signup and return back to listingPage.
      history.push(createResourceLocatorString('SignupPage', routeConfiguration(), {}, {}), state);
    } else {
      this.setState({ enquiryModalOpen: true });
    }
  }

  onSubmitEnquiry(values) {
    const { history, params, onSendEnquiry } = this.props;
    const routes = routeConfiguration();
    const listingId = new UUID(params.id);
    const { message } = values;

    onSendEnquiry(listingId, message.trim())
      .then(txId => {
        this.setState({ enquiryModalOpen: false });

        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString('OrderDetailsPage', routes, { id: txId.uuid }, {})
        );
      })
      .catch(() => {
        // Ignore, error handling in duck file
      });
  }

  handleDrawerOpen() {
    window.location.hash = '#projectdetails';

    this.setState({ projectDetailsOpen: true });
  }

  handleDrawerClose() {
    window.location.hash = '';
    this.setState({ projectDetailsOpen: false });
  }

  componentDidMount() {
    if (window.location.hash === '#projectdetails') {
      this.setState({ projectDetailsOpen: true });
    } else {
      this.setState({ projectDetailsOpen: false });
    }
  }

  render() {
    const {
      unitType,
      isAuthenticated,
      currentUser,
      getListing,
      getOwnListing,
      intl,
      onManageDisableScrolling,
      params: rawParams,
      location,
      scrollingDisabled,
      showListingError,
      reviews,
      fetchReviewsError,
      sendEnquiryInProgress,
      sendEnquiryError,
      timeSlots,
      fetchTimeSlotsError,
      filterConfig,
      onFetchTransactionLineItems,
      lineItems,
      fetchLineItemsInProgress,
      fetchLineItemsError,
      user,
      listings,
    } = this.props;

    const listingId = new UUID(rawParams.id);

    const isPendingApprovalVariant = rawParams.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT;
    const isDraftVariant = rawParams.variant === LISTING_PAGE_DRAFT_VARIANT;
    const currentListing =
      isPendingApprovalVariant || isDraftVariant
        ? ensureOwnListing(getOwnListing(listingId))
        : ensureListing(getListing(listingId));

    const listingSlug = rawParams.slug || createSlug(currentListing.attributes.title || '');
    const params = { slug: listingSlug, userId: 'hee', ...rawParams };

    const listingType = isDraftVariant
      ? LISTING_PAGE_PARAM_TYPE_DRAFT
      : LISTING_PAGE_PARAM_TYPE_EDIT;
    const listingTab = isDraftVariant ? 'photos' : 'description';

    const isApproved =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_PENDING_APPROVAL;

    const pendingIsApproved = isPendingApprovalVariant && isApproved;

    // If a /pending-approval URL is shared, the UI requires
    // authentication and attempts to fetch the listing from own
    // listings. This will fail with 403 Forbidden if the author is
    // another user. We use this information to try to fetch the
    // public listing.
    const pendingOtherUsersListing =
      (isPendingApprovalVariant || isDraftVariant) &&
      showListingError &&
      showListingError.status === 403;
    const shouldShowPublicListingPage = pendingIsApproved || pendingOtherUsersListing;

    if (shouldShowPublicListingPage) {
      return <NamedRedirect name="ListingPage" params={params} search={location.search} />;
    }

    const projectInformationRaw1 = ensureListing(currentListing.author);
    const projectInformationRaw2 = ensureListing(projectInformationRaw1.attributes.profile);
    const projectInformation = projectInformationRaw2.publicData;

    const {
      description = '',
      geolocation = null,
      price = null,
      title = '',
      publicData,
    } = currentListing.attributes;

    console.log('projecttitle', title);

    // const address = publicData && publicData.location ? publicData.location.address : '';

    // const addressArray = address.split(' ');

    // const country = addressArray[addressArray.length - 1];
    // const city = addressArray[addressArray.length - 3];

    // const address1 = address.trim();

    // console.log(addressArray);

    // var returned = {};

    // var comma = addressArray.indexOf(',');

    // returned.city = addressArray.slice(addressArray.length - 3, -comma);

    // console.log(returned.city);

    const coordinates = ensureListing(currentListing.attributes.geolocation);

    const projectTitle = title.split(' • ')[0];

    const projectRoomtypeRaw = title.split(' • ')[1];

    const ProjectRoomtype =
      projectRoomtypeRaw === 'singlebedroom' ? (
        <FormattedMessage id="roomtypes.singlebedroom" />
      ) : projectRoomtypeRaw === 'twobedroom' ? (
        <FormattedMessage id="roomtypes.twobedroom" />
      ) : projectRoomtypeRaw === 'doublebedroom' ? (
        <FormattedMessage id="roomtypes.doublebedroom" />
      ) : projectRoomtypeRaw === 'shared_bedroom' ? (
        <FormattedMessage id="roomtypes.shared_bedroom" />
      ) : projectRoomtypeRaw === 'entire_accomodation' ? (
        <FormattedMessage id="roomtypes.entire_accomodation" />
      ) : projectRoomtypeRaw === 'camping' ? (
        <FormattedMessage id="roomtypes.camping" />
      ) : null;

    const richTitle = (
      <span>
        {richText(projectTitle, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
          longWordClass: css.longWord,
        })}{' '}
        • {ProjectRoomtype}
      </span>
    );

    const bookingTitle = (
      <FormattedMessage id="ListingPage.bookingTitle" values={{ title: richTitle }} />
    );
    const bookingSubTitle = intl.formatMessage({ id: 'ListingPage.bookingSubTitle' });

    const topbar = (
      <div id="topbar" className={css.topbar} style={{ position: 'fixed', width: '100vw', top: 0 }}>
        <TopbarContainer />
      </div>
    );

    if (showListingError && showListingError.status === 404) {
      // 404 listing not found

      return <NotFoundPage />;
    } else if (showListingError) {
      // Other error in fetching listing

      const errorTitle = intl.formatMessage({
        id: 'ListingPage.errorLoadingListingTitle',
      });

      return (
        <Page title={errorTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain className={css.pageRoot}>
              <p className={css.errorText}>
                <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>{/* <Footer /> */}</LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      const loadingTitle = intl.formatMessage({
        id: 'ListingPage.loadingListingTitle',
      });

      return (
        <Page title={loadingTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain className={css.pageRoot}>
              <div className={css.loader}>
                <img src={LoaderImage2} className={css.loaderImage2} width="100px"></img>

                <img src={LoaderImage1} className={css.loaderImage1} width="100px"></img>
                {/* <CircularProgress size={50} thickness={2} style={{ color: '#353535' }} /> */}
              </div>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>{/* <Footer /> */}</LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    }

    const handleViewPhotosClick = e => {
      // Stop event from bubbling up to prevent image click handler
      // trying to open the carousel as well.
      e.stopPropagation();
      this.setState({
        imageCarouselOpen: true,
      });
    };
    const authorAvailable = currentListing && currentListing.author;
    const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
    const isOwnListing =
      userAndListingAuthorAvailable && currentListing.author.id.uuid === currentUser.id.uuid;
    const showContactUser = authorAvailable && (!currentUser || (currentUser && !isOwnListing));

    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);

    // When user is banned or deleted the listing is also deleted.
    // Because listing can be never showed with banned or deleted user we don't have to provide
    // banned or deleted display names for the function
    const authorDisplayName = userDisplayNameAsString(ensuredAuthor, '');

    const { formattedPrice, priceTitle } = priceData(price, intl);

    const handleBookingSubmit = values => {
      const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        this.handleSubmit(values);
      }
    };

    const listingImages = (listing, variantName) =>
      (listing.images || [])
        .map(image => {
          const variants = image.attributes.variants;
          const variant = variants ? variants[variantName] : null;

          // deprecated
          // for backwards combatility only
          const sizes = image.attributes.sizes;
          const size = sizes ? sizes.find(i => i.name === variantName) : null;

          return variant || size;
        })
        .filter(variant => variant != null);

    const facebookImages = listingImages(currentListing, 'facebook');
    const twitterImages = listingImages(currentListing, 'twitter');
    const schemaImages = JSON.stringify(facebookImages.map(img => img.url));
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage(
      { id: 'ListingPage.schemaTitle' },
      { title, price: formattedPrice, siteTitle }
    );

    const hostLink = (
      <NamedLink
        className={css.authorNameLink}
        name="ListingPage"
        params={params}
        to={{ hash: '#host' }}
      >
        {authorDisplayName}
      </NamedLink>
    );

    const var_impact =
      cookies.get('language') === 'de' &&
        projectInformation.projectImpact_de !== 'Übersetzung hinzufügen' ? (
        <>{projectInformation.projectImpact_de}</>
      ) : (
        <>{projectInformation.projectImpact}</>
      );

    const var_accomodationDescription =
      cookies.get('language') === 'de' &&
        publicData.accomodationDescription_de !== 'Übersetzung hinzufügen' ? (
        <>{publicData.accomodationDescription_de}</>
      ) : (
        <>{publicData.accomodationDescription}</>
      );

    const var_houserules =
      cookies.get('language') === 'de' && publicData.houserules_de !== 'Übersetzung hinzufügen' ? (
        <>{publicData.houserules_de}</>
      ) : (
        <>{publicData.houserules}</>
      );

    const var_activities =
      cookies.get('language') === 'de' && publicData.activities_de !== 'Übersetzung hinzufügen' ? (
        <>{publicData.activities_de}</>
      ) : (
        <>{publicData.activities}</>
      );
    const var_arrival =
      cookies.get('language') === 'de' && publicData.arrival_de !== 'Übersetzung hinzufügen' ? (
        <>{publicData.arrival_de}</>
      ) : (
        <>{publicData.arrival}</>
      );

    const var_packlist =
      cookies.get('language') === 'de' && publicData.packlist_de !== 'Übersetzung hinzufügen' ? (
        <>{publicData.packlist_de}</>
      ) : (
        <>{publicData.packlist}</>
      );

    const characteristicsOptions = findOptionsForSelectFilter('characteristics', filterConfig);
    const selectedCharacteristics =
      publicData && publicData.characteristics ? publicData.characteristics : [];

    const checkCharacteristicsSelected = (characteristicsOptions, selectedCharacteristics) => {
      return characteristicsOptions.map(characteristicsOptions => ({
        key: characteristicsOptions.key,
        label: characteristicsOptions.label,
        isSelected: includes(selectedCharacteristics, characteristicsOptions.key),
      }));
    };
    const checkedCharacteristics = checkCharacteristicsSelected(
      characteristicsOptions,
      selectedCharacteristics
    );

    const languagesOptions = findOptionsForSelectFilter('languages', filterConfig);
    const selectedLanguages = publicData && publicData.languages ? publicData.languages : [];

    const checkLanguagesSelected = (languagesOptions, selectedLanguages) => {
      return languagesOptions.map(languagesOptions => ({
        key: languagesOptions.key,
        label: languagesOptions.label,
        isSelected: includes(selectedLanguages, languagesOptions.key),
      }));
    };
    const checkedLanguages = checkLanguagesSelected(languagesOptions, selectedLanguages);

    const labelOther =
      publicData.otherLanguages !== undefined &&
        cookies.get('language') === 'de' &&
        publicData.otherLanguages_de !== 'Übersetzung hinzufügen'
        ? ' • ' + publicData.otherLanguages_de
        : publicData.otherLanguages !== undefined
          ? ' • ' + publicData.otherLanguages
          : null;

    const Item = props => {
      const { label, isSelected } = props;
      const labelNew = label !== undefined ? <div>• {label}</div> : null;
      const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
      return (
        <>
          <span className={labelClass}>{labelNew}</span>
        </>
      );
    };

    const amenityOptions = findOptionsForSelectFilter('amenities', filterConfig);
    const categoryOptions = findOptionsForSelectFilter('category', filterConfig);
    const selectedCategory = publicData && publicData.category ? publicData.category : [];

    const checkCategorySelected = (categoryOptions, selectedCategory) => {
      return categoryOptions.map(categoryOptions => ({
        key: categoryOptions.key,
        label: categoryOptions.label,
        isSelected: includes(selectedCategory, categoryOptions.key),
      }));
    };
    const checkedCategorySelected = checkCategorySelected(categoryOptions, selectedCategory);

    const Category = props => {
      const { label, isSelected } = props;
      const labelNew =
        label !== undefined ? (
          <div className={css.bubble}>{label}</div>
        ) : // + ',\xa0'
          null;
      const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
      return (
        <>
          <span className={labelClass}>{labelNew}</span>
        </>
      );
    };

    const category =
      publicData && publicData.category ? (
        // <span>{categoryLabel(categoryOptions, publicData.category)}</span>
        <></>
      ) : null;

    const foodOptions = findOptionsForSelectFilter('food', filterConfig);
    const selectedFood = publicData && publicData.food ? publicData.food : [];

    const checkFoodSelected = (foodOptions, selectedFood) => {
      return foodOptions.map(foodOptions => ({
        key: foodOptions.key,
        label: foodOptions.label,
        isSelected: includes(selectedFood, foodOptions.key),
      }));
    };
    const checkedFoodSelected = checkFoodSelected(foodOptions, selectedFood);

    // const Food = props => {
    //   const { label, isSelected } = props;
    //   const labelNew =
    //     label !== undefined
    //       ? ' • ' + label
    //       :
    //         null;
    //   const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
    //   return (
    //     <>
    //       <div className={css.labelWrapper}>
    //         <span className={labelClass}>{labelNew}</span>
    //       </div>
    //     </>
    //   );
    // };

    const surroundingsOptions = findOptionsForSelectFilter('surroundings', filterConfig);
    // /* const selectedSurroundings =
    //   publicData && publicData.surroundings ? publicData.surroundings : [];

    // const checkSurroundingsSelected = (surroundingsOptions, selectedSurroundings) => {
    //   return surroundingsOptions.map(surroundingsOptions => ({
    //     key: surroundingsOptions.key,
    //     label: surroundingsOptions.label,
    //     isSelected: includes(selectedFood, surroundingsOptions.key),
    //   }));
    // };
    // const checkedSurroundingsSelected = checkFoodSelected(
    //   surroundingsOptions,
    //   selectedSurroundings
    // );

    // const Surroundings = props => {
    //   const { label, isSelected } = props;
    //   const labelNew = label !== undefined ? label + ',\xa0' : null;
    //   const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
    //   return (
    //     <>
    //       <div className={css.labelWrapper}>
    //         <span className={labelClass}>{label}</span>
    //       </div>
    //     </>
    //   );
    // }; */

    const MIN_LENGTH_FOR_LONG_WORDS_IN_DESCRIPTION = 20;

    const readMoreClick_1 = () => {
      var readMoreButton_1 = document.getElementById('readMoreButton_1');
      readMoreButton_1.style.opacity = '0';

      var description = document.getElementById('description');
      description.style.height = 'auto';
      description.style.overflow = 'scroll';
    };

    const firstClick = () => {
      this.setState({ firstToggle: 'first' });
    };
    const secondClick = () => {
      this.setState({ firstToggle: 'second' });
    };

    const thirdClick = () => {
      this.setState({ firstToggle: 'third' });
    };

    const secondToggleFirstClick = () => {
      this.setState({ secondToggle: 'first' });
    };
    const secondToggleSecondClick = () => {
      this.setState({ secondToggle: 'second' });
    };

    const secondToggleThirdClick = () => {
      this.setState({ secondToggle: 'third' });
    };
    const thirdToggleFirstClick = () => {
      this.setState({ thirdToggle: 'first' });
    };
    const thirdToggleSecondClick = () => {
      this.setState({ thirdToggle: 'second' });
    };

    const hasListings = listings.length > 0;

    // const categoryCodes = getCategoryCodes(config.locale);

    // const selectedCategory = publicData && publicData.category ? publicData.category : [];

    // const checkCategory = (categoryCodes, selectedCategory) => {
    //   return categoryCodes.map(categoryCodes => ({
    //     code: categoryCodes.code,
    //     name: categoryCodes.name,
    //     isSelected: includes(selectedCategory, categoryCodes.code),
    //   }));
    // };

    // const checkedCategory = checkCategory(categoryCodes, selectedCategory);

    // const Category = props => {
    //   const { label, isSelected } = props;
    //   const labelNew = label !== undefined ? label + ',\xa0' : null;
    //   const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
    //   return (
    //     <>
    //       <div className={css.geoLabelWrapper}>
    //         <span className={labelClass}>
    //           {label} <br />
    //         </span>
    //       </div>
    //     </>
    //   );
    // };

    const countryCodes = getCountryCodes(config.locale);

    const selectedCountry = publicData && publicData.country ? publicData.country : [];

    const checkCountry = (countryCodes, selectedCountry) => {
      return countryCodes.map(countryCodes => ({
        code: countryCodes.code,
        name: countryCodes.name,
        isSelected: includes(selectedCountry, countryCodes.code),
      }));
    };

    const checkedCountry = checkCountry(countryCodes, selectedCountry);

    const Country = props => {
      const { label, isSelected } = props;
      const labelNew = label !== undefined ? label + ',\xa0' : null;
      const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
      return (
        <>
          <div className={css.geoLabelWrapper}>
            <span className={labelClass}>
              {label} <br />
            </span>
          </div>
        </>
      );
    };

    var isMobile = false; //initiate as false
    // device detection
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      isMobile = true;
    }

    console.log(publicData.bedamount);

    const projectDetailsButtonMobile =
      isMobile === true ? (
        <TemporaryDrawer
          richTitle={richTitle}
          currentListing={currentListing}
          user={currentAuthor}
          params={params}
          projectInformation={projectInformation}
          handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          projectDetailsOpen={this.state.projectDetailsOpen}
        ></TemporaryDrawer>
      ) : null;

    const sidepanel =
      isMobile === true ? (
        <BookingPanel
          projectRoomtypeRaw={projectRoomtypeRaw}
          ProjectRoomtype={ProjectRoomtype}
          bedamount={publicData.bedamount}
          listing={currentListing}
          isOwnListing={isOwnListing}
          unitType={unitType}
          onSubmit={handleBookingSubmit}
          title={bookingTitle}
          subTitle={bookingSubTitle}
          authorDisplayName={authorDisplayName}
          onManageDisableScrolling={onManageDisableScrolling}
          timeSlots={timeSlots}
          fetchTimeSlotsError={fetchTimeSlotsError}
          onFetchTransactionLineItems={onFetchTransactionLineItems}
          lineItems={lineItems}
          fetchLineItemsInProgress={fetchLineItemsInProgress}
          fetchLineItemsError={fetchLineItemsError}
        />
      ) : (
        <Sticky>
          <div className={css.bookingPanel}>
            <div className={css.contactPanel}>
              <TemporaryDrawer
                richTitle={richTitle}
                currentListing={currentListing}
                user={currentAuthor}
                params={params}
                handleDrawerOpen={this.handleDrawerOpen}
                handleDrawerClose={this.handleDrawerClose}
                projectDetailsOpen={this.state.projectDetailsOpen}
                projectInformation={projectInformation}
              ></TemporaryDrawer>

              {/* <SectionAvatar user={currentAuthor} params={params} /> */}
            </div>
            <div className={css.bookingInnerPanel}>
              <BookingPanel
                projectRoomtypeRaw={projectRoomtypeRaw}
                ProjectRoomtype={ProjectRoomtype}
                bedamount={publicData.bedamount}
                listing={currentListing}
                isOwnListing={isOwnListing}
                unitType={unitType}
                onSubmit={handleBookingSubmit}
                title={bookingTitle}
                subTitle={bookingSubTitle}
                authorDisplayName={authorDisplayName}
                onManageDisableScrolling={onManageDisableScrolling}
                timeSlots={timeSlots}
                fetchTimeSlotsError={fetchTimeSlotsError}
                onFetchTransactionLineItems={onFetchTransactionLineItems}
                lineItems={lineItems}
                fetchLineItemsInProgress={fetchLineItemsInProgress}
                fetchLineItemsError={fetchLineItemsError}
              />
            </div>
          </div>
        </Sticky>
      );
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const checkDestinations = mediaQuery.matches ? (
      <NamedLink name="SearchPage" className={css.heroButtonCTA}>
        <FormattedMessage id="TopbarDesktop.destinationsCTA" />
      </NamedLink>
    ) : (
      <NamedLink name="SearchPage" className={css.heroButtonCTA}>
        <FormattedMessage id="TopbarDesktop.destinationsCTAshort" />
      </NamedLink>
    );
    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        author={authorDisplayName}
        contentType="website"
        description={description}
        facebookImages={facebookImages}
        twitterImages={twitterImages}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ItemPage',
          description: description,
          name: schemaTitle,
          image: schemaImages,
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            {topbar}
            {/* {checkDestinations} */}
          </LayoutWrapperTopbar>
          <LayoutWrapperMain className={css.pageRoot}>
            <div>
              <div className={css.contentContainer}>
                <div className={css.topContent}>
                  <div className={css.bubble_outer}>
                    {/* {category} */}

                    {checkedCategorySelected.map(categoryOptions => (
                      <Category
                        key={`${'ListingPage.characteristics'}.${categoryOptions.key}`}
                        label={categoryOptions.label}
                        isSelected={categoryOptions.isSelected}
                      />
                    ))}
                    {/* {checkedCategory.map(categoryCodes => (
                      <Category
                        key={`${'ListingPage.characteristics'}.${categoryCodes.code}`}
                        label={categoryCodes.name}
                        isSelected={categoryCodes.isSelected}
                      />
                    ))} */}
                    {/* <div className={css.bubble}>{publicData.accomodationtype}</div> */}
                  </div>
                  {/* <SectionBubblesMaybe options={uspOptions} publicData={publicData} /> */}

                  <SectionHeading
                    // priceTitle={priceTitle}
                    // formattedPrice={formattedPrice}
                    projectInformation={projectInformation}
                    richTitle={richTitle}
                    // category={category}
                    hostLink={hostLink}
                    showContactUser={showContactUser}
                    onContactUser={this.onContactUser}
                  />

                  <h3>
                    {publicData.city},{' '}
                    {checkedCountry.map(countryCodes => (
                      <Country
                        key={`${'ListingPage.characteristics'}.${countryCodes.code}`}
                        label={countryCodes.name}
                        isSelected={countryCodes.isSelected}
                      />
                    ))}
                  </h3>
                </div>
              </div>

              <SectionImages
                title={title}
                listing={currentListing}
                isOwnListing={isOwnListing}
                editParams={{
                  id: listingId.uuid,
                  slug: listingSlug,
                  type: listingType,
                  tab: listingTab,
                }}
                imageCarouselOpen={this.state.imageCarouselOpen}
                onImageCarouselClose={() => this.setState({ imageCarouselOpen: false })}
                handleViewPhotosClick={handleViewPhotosClick}
                onManageDisableScrolling={onManageDisableScrolling}
              />

              <div className={css.contentContainer}>
                <div className={css.mainContent}>
                  <h2 className={css.projectTeaser}>
                    <span style={{ color: '#1c7881' }}>
                      <FormattedMessage id="ProfileSettingsForm.projectImpactLabel" />
                    </span>
                    <br />
                    <span style={{ color: '#353535' }}>{var_impact}</span>
                  </h2>
                  {projectDetailsButtonMobile}
                  <div className={css.line} />

                  <div className={css.extras}>
                    <img
                      src={require('../../assets/icons/highlight.png')}
                      width="90px"
                      style={{ paddingRight: '30px' }}
                    ></img>
                    <p>
                      {' '}
                      {checkedCharacteristics.map(characteristicsOptions => (
                        <Item
                          key={`${'ListingPage.characteristics'}.${characteristicsOptions.key}`}
                          label={characteristicsOptions.label}
                          isSelected={characteristicsOptions.isSelected}
                        />
                      ))}
                    </p>
                  </div>
                  <div className={css.extras}>
                    <img
                      src={require('../../assets/icons/languages.png')}
                      width="90px"
                      style={{ paddingRight: '30px' }}
                    ></img>
                    <p>
                      {' '}
                      {checkedLanguages.map(languagesOptions => (
                        <Item
                          key={`${'ListingPage.languages'}.${languagesOptions.key}`}
                          label={languagesOptions.label}
                          isSelected={languagesOptions.isSelected}
                        />
                      ))}
                      {labelOther}
                    </p>
                  </div>

                  <div className={css.line} />
                  <div className={css.listingsContainer}>
                    {/* <p>Weitere Zimmer/Raumtypen verfügbar:</p> */}
                    {hasListings ? (
                      <div className={css.listings}>
                        {/* <h2 className={css.listingsTitle}>
                          <FormattedMessage
                            id="ProfilePage.listingsTitle"
                            values={{ count: listings.length }}
                          />
                        </h2> */}
                        <ul className={css.listings}>
                          {listings.map(l => (
                            <li className={css.listing} key={l.id.uuid}>
                              <ListingCardSmall listing={l} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <br />
                  </div>
                  <div className={css.line} />

                  <h2 className={css.featuresTitle}>
                    <FormattedMessage id="ListingPage.featuresTitle" />
                  </h2>

                  <div className={css.lowerMenu}>
                    <span
                      id="menuText"
                      className={
                        this.state.firstToggle === 'first' ? css.active : css.lowerMenuText
                      }
                      onClick={firstClick}
                    >
                      <span className={css.lowerMenuText}>
                        <FormattedMessage id="EditListingWizard.tabLabelCharacteristics" />
                      </span>
                    </span>

                    <span
                      id="menuText"
                      className={
                        this.state.firstToggle === 'second' ? css.active : css.lowerMenuText
                      }
                      onClick={secondClick}
                    >
                      <span className={css.lowerMenuText}>
                        <FormattedMessage id="EditListingFeaturesForm.featuresTitle" />
                      </span>
                    </span>

                    <span
                      id="menuText"
                      className={
                        this.state.firstToggle === 'third' ? css.active : css.lowerMenuText
                      }
                      onClick={thirdClick}
                    >
                      <FormattedMessage id="EditListingDescriptionForm.houserules" />
                    </span>
                  </div>

                  <div
                    className={
                      this.state.firstToggle === 'first' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.contentWrappers}> {var_accomodationDescription}</div>
                  </div>

                  <div
                    className={
                      this.state.firstToggle === 'second' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.contentWrappers}>
                      <SectionFeaturesMaybe options={amenityOptions} publicData={publicData} />
                    </div>
                  </div>

                  <div
                    className={
                      this.state.firstToggle === 'third' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.contentWrappers}>{var_houserules}</div>
                  </div>

                  <div className={css.line} />

                  <h2 className={css.featuresTitle}>
                    <FormattedMessage id="ListingPage.onsite" />
                  </h2>

                  <div className={css.lowerMenu}>
                    <span
                      id="menuText"
                      className={
                        this.state.secondToggle === 'first' ? css.active : css.lowerMenuText
                      }
                      onClick={secondToggleFirstClick}
                    >
                      <span className={css.lowerMenuText}>
                        <FormattedMessage id="EditListingOffersForm.foodTitle" />
                      </span>
                    </span>

                    <span
                      id="menuText"
                      className={
                        this.state.secondToggle === 'second' ? css.active : css.lowerMenuText
                      }
                      onClick={secondToggleSecondClick}
                    >
                      <span className={css.lowerMenuText}>
                        <FormattedMessage id="EditListingOffersForm.activitiesLabel" />
                      </span>
                    </span>

                    <span
                      id="menuText"
                      className={
                        this.state.secondToggle === 'third' ? css.active : css.lowerMenuText
                      }
                      onClick={secondToggleThirdClick}
                    >
                      <FormattedMessage id="ListingPage.surroundings" />
                    </span>
                  </div>

                  <div
                    className={
                      this.state.secondToggle === 'first' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.extras}>
                      <img
                        src={require('../../assets/icons/food.png')}
                        width="90px"
                        style={{ paddingRight: '30px' }}
                      ></img>
                      <p>
                        {' '}
                        {checkedFoodSelected.map(foodOptions => (
                          <Item
                            key={`${'ListingPage.characteristics'}.${foodOptions.key}`}
                            label={foodOptions.label}
                            isSelected={foodOptions.isSelected}
                          />
                        ))}
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      this.state.secondToggle === 'second' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.contentWrappers}>{var_activities}</div>
                  </div>

                  <div
                    className={
                      this.state.secondToggle === 'third' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.contentWrappers}>
                      <SectionSurroundingsMaybe
                        options={surroundingsOptions}
                        publicData={publicData}
                      />
                    </div>
                  </div>

                  <div className={css.line} />

                  <SectionMapMaybe
                    geolocation={geolocation}
                    publicData={publicData}
                    listingId={currentListing.id}
                  />

                  <div className={css.line} style={{ opacity: 0 }} />

                  <h2 className={css.featuresTitle}>
                    <FormattedMessage id="ListingPage.beforeItStarts" />
                  </h2>

                  <div className={css.lowerMenu}>
                    <span
                      id="menuText"
                      className={
                        this.state.thirdToggle === 'first' ? css.active : css.lowerMenuText
                      }
                      onClick={thirdToggleFirstClick}
                    >
                      <span className={css.lowerMenuText}>
                        <FormattedMessage id="ListingPage.arrival" />
                      </span>
                    </span>

                    <span
                      id="menuText"
                      className={
                        this.state.thirdToggle === 'second' ? css.active : css.lowerMenuText
                      }
                      onClick={thirdToggleSecondClick}
                    >
                      <span className={css.lowerMenuText}>
                        <FormattedMessage id="EditListingDescriptionForm.packlist" />
                      </span>
                    </span>
                  </div>

                  <div
                    className={
                      this.state.thirdToggle === 'first' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.contentWrappers}>{var_arrival}</div>
                  </div>

                  <div
                    className={
                      this.state.thirdToggle === 'second' ? css.firstToggleActive : css.firstToggle
                    }
                  >
                    <div className={css.contentWrappers}>{var_packlist}</div>
                  </div>

                  <div className={css.line} />

                  <div className={css.contentWrappers}>
                    <SectionReviews reviews={reviews} fetchReviewsError={fetchReviewsError} />
                  </div>

                  <SectionHostMaybe
                    title={title}
                    listing={currentListing}
                    authorDisplayName={authorDisplayName}
                    onContactUser={this.onContactUser}
                    isEnquiryModalOpen={isAuthenticated && this.state.enquiryModalOpen}
                    onCloseEnquiryModal={() => this.setState({ enquiryModalOpen: false })}
                    sendEnquiryError={sendEnquiryError}
                    sendEnquiryInProgress={sendEnquiryInProgress}
                    onSubmitEnquiry={this.onSubmitEnquiry}
                    currentUser={currentUser}
                    onManageDisableScrolling={onManageDisableScrolling}
                  />

                  {/* <div className={css.author}>
                    <FormattedMessage id="ListingPage.hostedBy" values={{ name: hostLink }} />
                    {showContactUser ? (
                      <span className={css.contactWrapper}>
                        <br />
                        <p>
                          Fragen? –{' '}
                          <InlineTextButton
                            rootClassName={css.contactLink}
                            onClick={this.onContactUser}
                          >
                            <FormattedMessage id="ListingPage.contactUser" />
                          </InlineTextButton>{' '}
                        </p>
                      </span>
                    ) : null}
                  </div> */}
                  <SectionDonateMaybe
                    title={title}
                    listing={currentListing}
                    projectInformation={projectInformation}
                  />

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>

                {sidepanel}
              </div>
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>{/* <Footer /> */}</LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ListingPageComponent.defaultProps = {
  unitType: config.bookingUnitType,
  currentUser: null,
  enquiryModalOpenForListingId: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  sendEnquiryError: null,
  filterConfig: config.custom.filters,
  lineItems: null,
  fetchLineItemsError: null,
  user: null,
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    userId: string.isRequired,
    id: string.isRequired,
    slug: string,
    variant: oneOf([LISTING_PAGE_DRAFT_VARIANT, LISTING_PAGE_PENDING_APPROVAL_VARIANT]),
  }).isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  getOwnListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  enquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  callSetInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  fetchReviewsError: propTypes.error,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  sendEnquiryInProgress: bool.isRequired,
  sendEnquiryError: propTypes.error,
  onSendEnquiry: func.isRequired,
  onInitializeCardPaymentData: func.isRequired,
  filterConfig: array,
  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  user: propTypes.user,

  listings: arrayOf(propTypes.listing).isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    enquiryModalOpenForListingId,
    userListingRefs,
    userId,
  } = state.ListingPage;

  const { currentUser } = state.user;

  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: 'ownListing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    scrollingDisabled: isScrollingDisabled(state),
    enquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    lineItems,
    fetchLineItemsInProgress,
    fetchLineItemsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    listings,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  callSetInitialValues: (setInitialValues, values, saveToSessionStorage) =>
    dispatch(setInitialValues(values, saveToSessionStorage)),
  onFetchTransactionLineItems: (bookingData, listingId, isOwnListing) =>
    dispatch(fetchTransactionLineItems(bookingData, listingId, isOwnListing)),
  onSendEnquiry: (listingId, message) => dispatch(sendEnquiry(listingId, message)),
  onInitializeCardPaymentData: () => dispatch(initializeCardPaymentData()),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ListingPageComponent);

ListingPage.setInitialValues = initialValues => setInitialValues(initialValues);
ListingPage.loadData = loadData;

export default ListingPage;

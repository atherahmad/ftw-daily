import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { parse } from '../../util/urlHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  Button,
  ManageListingCard,
  NamedLink,
  Page,
  PaginationLinks,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '../../containers';

import {
  closeListing,
  openListing,
  getOwnListingsById,
  queryOwnListings,
} from './ManageListingsPage.duck';
import css from './ManageListingsPage.css';

import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { pathByRouteName } from '../../util/routes';

import { ensureCurrentUser } from '../../util/data';

import Pencil from '../../assets/icons/pencil.png';
import Celebrate from '../../assets/icons/celebrate.png';
import Locked from '../../assets/icons/locked.png';

// Pagination page size might need to be dynamic on responsive page layouts
// Current design has max 3 columns 42 is divisible by 2 and 3
// So, there's enough cards to fill all columns on full pagination pages
const RESULT_PAGE_SIZE = 42;

export class ManageListingsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { listingMenuOpen: null };
    this.onToggleMenu = this.onToggleMenu.bind(this);

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  componentDidMount() {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    head.appendChild(script);
  }

  onToggleMenu(listing) {
    this.setState({ listingMenuOpen: listing });
  }

  handleLogout() {
    const { onLogout, history } = this.props;
    onLogout().then(() => {
      const path = pathByRouteName('LandingPage', routeConfiguration());

      // In production we ensure that data is really lost,
      // but in development mode we use stored values for debugging
      if (config.dev) {
        history.push(path);
      } else if (typeof window !== 'undefined') {
        window.location = path;
      }

      console.log('logged out'); // eslint-disable-line
    });
  }

  handleLink() {
    window.open('https://calendly.com/socialbnb-onboarding/60min?month=2021-01', '_blank');
  }

  render() {
    const {
      currentUser,

      closingListing,
      closingListingError,
      listings,
      onCloseListing,
      onOpenListing,
      openingListing,
      openingListingError,
      pagination,
      queryInProgress,
      queryListingsError,
      queryParams,
      scrollingDisabled,
      intl,
      onLogout,
    } = this.props;

    const userVerification = ensureCurrentUser(currentUser);

    const verification = ensureCurrentUser(userVerification.attributes.profile.protectedData);
    const partner = verification.type;

    const metadata = ensureCurrentUser(userVerification.attributes.profile.metadata);
    const verifiedPartner = metadata.verified;

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

    const loadingResults = (
      <h1 className={css.title}>
        <FormattedMessage id="ManageListingsPage.loadingOwnListings" />
      </h1>
    );

    const queryError = (
      <h1 className={css.title}>
        <FormattedMessage id="ManageListingsPage.queryError" />
      </h1>
    );

    const noResults =
      listingsAreLoaded && pagination.totalItems === 0 ? (
        <h1 className={css.title}>
          <FormattedMessage id="ManageListingsPage.noResults" />
        </h1>
      ) : null;

    const heading =
      listingsAreLoaded && pagination.totalItems > 0 ? (
        <>
          {/* <Button rootClassName={css.button} onClick={this.handleLogout}>
            <FormattedMessage id="LimitedAccessBanner.logout" />
          </Button> */}

          <h1 className={css.title}>
            <FormattedMessage
              id="ManageListingsPage.youHaveListings"
              values={{ count: pagination.totalItems }}
            />
          </h1>
          <NamedLink name="NewListingPage" className={css.createButton}>
            <FormattedMessage id="TopbarDesktop.createListing" />
          </NamedLink>
        </>
      ) : (
        <>
          <img className={css.image} src={Celebrate} width="150px"></img>

          <h1 className={css.title}>
            <FormattedMessage id="ManageListingPage.unlockedHeader" />
          </h1>
          <h3 className={css.subtitle}>
            <FormattedMessage id="ManageListingPage.unlockedSubHeader" />
          </h3>
          <NamedLink name="NewListingPage" className={css.createButton}>
            <FormattedMessage id="TopbarDesktop.createListing" />
          </NamedLink>
        </>
      );

    const page = queryParams ? queryParams.page : 1;
    const paginationLinks =
      listingsAreLoaded && pagination && pagination.totalPages > 1 ? (
        <PaginationLinks
          className={css.pagination}
          pageName="ManageListingsPage"
          pageSearchParams={{ page }}
          pagination={pagination}
        />
      ) : null;

    const listingMenuOpen = this.state.listingMenuOpen;
    const closingErrorListingId = !!closingListingError && closingListingError.listingId;
    const openingErrorListingId = !!openingListingError && openingListingError.listingId;

    const title = intl.formatMessage({ id: 'ManageListingsPage.title' });

    const panelWidth = 62.5;
    // Render hints for responsive image
    const renderSizes = [
      `(max-width: 767px) 100vw`,
      `(max-width: 1920px) ${panelWidth / 2}vw`,
      `${panelWidth / 3}vw`,
    ].join(', ');

    const content = queryListingsError ? (
      <div className={css.Wrapper}>
        <div className={css.listingPanel}>{queryError}</div>
      </div>
    ) : queryInProgress ? (
      <div className={css.Wrapper}>
        <div className={css.listingPanel}>{loadingResults}</div>
      </div>
    ) : partner === 'host' && listingsAreLoaded && pagination.totalItems > 0 ? (
      <div className={css.Wrapper}>
        <div className={css.listingPanel}>
          {heading}
          <div className={css.listingCards}>
            {listings.map(l => (
              <ManageListingCard
                className={css.listingCard}
                key={l.id.uuid}
                listing={l}
                isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
                actionsInProgressListingId={openingListing || closingListing}
                onToggleMenu={this.onToggleMenu}
                onCloseListing={onCloseListing}
                onOpenListing={onOpenListing}
                hasOpeningError={openingErrorListingId.uuid === l.id.uuid}
                hasClosingError={closingErrorListingId.uuid === l.id.uuid}
                renderSizes={renderSizes}
              />
            ))}
          </div>
          {paginationLinks}
        </div>
      </div>
    ) : partner === 'host' ? (
      <div className={css.Wrapper}>
        <div className={css.listingPanel}>
          {heading}
          <div className={css.listingCards}>
            {listings.map(l => (
              <ManageListingCard
                className={css.listingCard}
                key={l.id.uuid}
                listing={l}
                isMenuOpen={!!listingMenuOpen && listingMenuOpen.id.uuid === l.id.uuid}
                actionsInProgressListingId={openingListing || closingListing}
                onToggleMenu={this.onToggleMenu}
                onCloseListing={onCloseListing}
                onOpenListing={onOpenListing}
                hasOpeningError={openingErrorListingId.uuid === l.id.uuid}
                hasClosingError={closingErrorListingId.uuid === l.id.uuid}
                renderSizes={renderSizes}
              />
            ))}
          </div>
          {paginationLinks}
        </div>
      </div>
    ) : (
      <div className={css.Wrapper}>
        <div className={css.innerWrapper}></div>
      </div>
    );

    return (
      <Page title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <div style={{ width: '100vw', overflow: 'hidden' }}>
              <TopbarContainer currentPage="ManageListingsPage" />
              <UserNav partner={partner} selectedPageName="ManageListingsPage" />
            </div>
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>{content}</LayoutWrapperMain>
          <LayoutWrapperFooter>{/* <Footer /> */}</LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ManageListingsPageComponent.defaultProps = {
  currentUser: null,

  listings: [],
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  closingListingError: null,
  openingListing: null,
  openingListingError: null,
};

const { arrayOf, bool, func, object, shape, string } = PropTypes;

ManageListingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,

  closingListing: shape({ uuid: string.isRequired }),
  closingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  listings: arrayOf(propTypes.ownListing),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  openingListing: shape({ uuid: string.isRequired }),
  openingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: propTypes.error,
  queryParams: object,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,

  onLogout: func.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;

  const {
    currentPageResultIds,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  } = state.ManageListingsPage;
  const listings = getOwnListingsById(state, currentPageResultIds);
  return {
    currentUser,
    currentPageResultIds,
    listings,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled: isScrollingDisabled(state),
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseListing: listingId => dispatch(closeListing(listingId)),
  onOpenListing: listingId => dispatch(openListing(listingId)),
});

const ManageListingsPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ManageListingsPageComponent);

ManageListingsPage.loadData = (params, search) => {
  const queryParams = parse(search);
  const page = queryParams.page || 1;
  return queryOwnListings({
    ...queryParams,
    page,
    perPage: RESULT_PAGE_SIZE,
    include: ['images'],
    'fields.image': ['variants.landscape-crop', 'variants.landscape-crop2x'],
    'limit.images': 1,
  });
};

export default ManageListingsPage;

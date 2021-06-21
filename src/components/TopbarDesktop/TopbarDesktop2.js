import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import {
  Avatar,
  InlineTextButton,
  Logo,
  Menu,
  MenuLabel,
  MenuContent,
  MenuItem,
  NamedLink,
} from '../../components';
import { TopbarSearchForm } from '../../forms';

import css from './TopbarDesktop.css';

import user from './user.png';

import MenuDrawer from './MenuDrawer';

const TopbarDesktop = props => {
  const {
    state,
    className,
    currentUser,
    currentPage,
    rootClassName,
    currentUserHasListings,
    notificationCount,
    intl,
    isAuthenticated,
    onLogout,
    onSearchSubmit,
    initialSearchFormValues,
    onClickAbout,
    location,
  } = props;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  const classes = classNames(rootClassName || css.root, className);

  const mediaQuery = window.matchMedia('(min-width: 768px)');

  const search = (
    <TopbarSearchForm
      className={location.pathname === '/s' ? css.searchLink_active : css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  const becomePartner = mediaQuery.matches ? (
    <div
      className={
        location.pathname === '/' ||
        location.pathname === '/about' ||
        location.pathname === '/FAQ' ||
        location.pathname === '/Contact'
          ? css.becomePartnerWrapper
          : css.becomePartnerWrapper_hide
      }
    >
      <NamedLink
        className={location.pathname === '/I' ? css.active : css.becomePartnerLink}
        name="BecomeHostPage"
      >
        <span className={css.becomePartner}>
          <FormattedMessage id="TopbarDesktop.becomePartner" />
        </span>
        <svg viewBox="0 0 136 4" xmlns="http://www.w3.org/2000/svg" className={css.svg}>
          <path
            d="m0 21c17.3610982-.0489133 35.624815-1.9485328 52.9859132-1.9974461 27.9722351-.0788092 55.0418518 1.6930877 83.0140868 1.6142784"
            fill="none"
            stroke="#1c7881"
            stroke-linecap=""
            stroke-width="4.5px"
            transform="translate(0 -17)"
          ></path>
        </svg>
      </NamedLink>
    </div>
  ) : null;
  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;

  const inboxLink =
    authenticatedOnClientSide && mediaQuery.matches ? (
      <NamedLink
        className={css.inboxLink}
        name="InboxPage"
        params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}
      >
        <span className={css.inbox}>
          <FormattedMessage id="TopbarDesktop.inbox" />
          {notificationDot}
        </span>
        <svg viewBox="0 0 136 4" xmlns="http://www.w3.org/2000/svg" className={css.svg}>
          <path
            d="m0 21c17.3610982-.0489133 35.624815-1.9485328 52.9859132-1.9974461 27.9722351-.0788092 55.0418518 1.6930877 83.0140868 1.6142784"
            fill="none"
            stroke="#1c7881"
            stroke-linecap=""
            stroke-width="4.5px"
            transform="translate(0 -17)"
          ></path>
        </svg>
      </NamedLink>
    ) : null;

  const currentPageClass = page => {
    const isAccountSettingsPage =
      page === 'AccountSettingsPage' && ACCOUNT_SETTINGS_PAGES.includes(currentPage);
    return currentPage === page || isAccountSettingsPage ? css.currentPage : null;
  };

  const profileMenu =
    authenticatedOnClientSide && mediaQuery.matches ? (
      <Menu>
        <MenuLabel className={css.profileMenuLabel} isOpenClassName={css.profileMenuIsOpen}>
          <Avatar className={css.avatar} user={currentUser} disableProfileLink />
        </MenuLabel>
        <MenuContent className={css.profileMenuContent}>
          <MenuItem key="ManageListingsPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('ManageListingsPage'))}
              name="ManageListingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.yourListingsLink" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="ProfileSettingsPage">
            <NamedLink
              className={classNames(
                css.profileSettingsLink,
                currentPageClass('ProfileSettingsPage')
              )}
              name="ProfileSettingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.profileSettingsLink" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="AccountSettingsPage">
            <NamedLink
              className={classNames(css.yourListingsLink, currentPageClass('AccountSettingsPage'))}
              name="AccountSettingsPage"
            >
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.accountSettingsLink" />
            </NamedLink>
          </MenuItem>
          <MenuItem key="logout">
            <InlineTextButton rootClassName={css.logoutButton} onClick={onLogout}>
              <span className={css.menuItemBorder} />
              <FormattedMessage id="TopbarDesktop.logout" />
            </InlineTextButton>
          </MenuItem>
        </MenuContent>
      </Menu>
    ) : null;

  // const signupLink = isAuthenticatedOrJustHydrated ? null : (
  //   <NamedLink
  //     name="SignupPage"
  //     className={location.pathname === '/signup' ? css.active : css.signupLink}
  //   >
  //     <span className={css.signup}>
  //       <FormattedMessage id="TopbarDesktop.signup" />
  //     </span>
  //   </NamedLink>
  // );

  const loginLink =
    !isAuthenticatedOrJustHydrated && mediaQuery.matches ? (
      <NamedLink
        name="LoginPage"
        className={location.pathname === '/login' ? css.active : css.loginLink}
      >
        <img src={user} className={css.userIcon}></img>
        {/* <span className={css.login}>
        <FormattedMessage id="TopbarDesktop.login" />
      </span> */}
        <svg viewBox="0 0 136 4" xmlns="http://www.w3.org/2000/svg" className={css.svg}>
          <path
            d="m0 21c17.3610982-.0489133 35.624815-1.9485328 52.9859132-1.9974461 27.9722351-.0788092 55.0418518 1.6930877 83.0140868 1.6142784"
            fill="none"
            stroke="#1c7881"
            stroke-linecap=""
            stroke-width="4.5px"
            transform="translate(0 -17)"
          ></path>
        </svg>
      </NamedLink>
    ) : null;

  const aboutLink = (
    <NamedLink
      id="link"
      name="AboutPage"
      className={location.pathname === '/about' ? css.active : css.aboutLink}
    >
      <span className={css.about}>
        <FormattedMessage id="TopbarDesktop.about" />
      </span>
      <svg viewBox="0 0 136 4" xmlns="http://www.w3.org/2000/svg" className={css.svg}>
        <path
          d="m0 21c17.3610982-.0489133 35.624815-1.9485328 52.9859132-1.9974461 27.9722351-.0788092 55.0418518 1.6930877 83.0140868 1.6142784"
          fill="none"
          stroke="#1c7881"
          stroke-linecap=""
          stroke-width="4.5px"
          transform="translate(0 -17)"
        ></path>
      </svg>
    </NamedLink>
  );

  const FaqLink = (
    <NamedLink
      id="link"
      name="FaqPage"
      className={location.pathname === '/FAQ' && location.hash === '' ? css.active : css.aboutLink}
    >
      <span className={css.about}>
        <FormattedMessage id="TopbarDesktop.FAQ" />
      </span>
      <svg viewBox="0 0 136 4" xmlns="http://www.w3.org/2000/svg" className={css.svg}>
        <path
          d="m0 21c17.3610982-.0489133 35.624815-1.9485328 52.9859132-1.9974461 27.9722351-.0788092 55.0418518 1.6930877 83.0140868 1.6142784"
          fill="none"
          stroke="#1c7881"
          stroke-linecap=""
          stroke-width="4.5px"
          transform="translate(0 -17)"
        ></path>
      </svg>
    </NamedLink>
  );

  const ContactLink = (
    <NamedLink
      id="link"
      name="ContactPage"
      className={location.pathname === '/Contact' ? css.active : css.aboutLink}
    >
      <span className={css.about}>
        <FormattedMessage id="TopbarDesktop.Contact" />
      </span>
      <svg viewBox="0 0 136 4" xmlns="http://www.w3.org/2000/svg" className={css.svg}>
        <path
          d="m0 21c17.3610982-.0489133 35.624815-1.9485328 52.9859132-1.9974461 27.9722351-.0788092 55.0418518 1.6930877 83.0140868 1.6142784"
          fill="none"
          stroke="#1c7881"
          stroke-linecap=""
          stroke-width="4.5px"
          transform="translate(0 -17)"
        ></path>
      </svg>
    </NamedLink>
  );

  const destinationsLink = (
    <NamedLink
      name="SearchPage"
      className={location.pathname === '/s' ? css.active : css.aboutLink}
    >
      <span className={css.about}>
        <FormattedMessage id="TopbarDesktop.destinations" />
      </span>
      <svg viewBox="0 0 136 4" xmlns="http://www.w3.org/2000/svg" className={css.svg}>
        <path
          d="m0 21c17.3610982-.0489133 35.624815-1.9485328 52.9859132-1.9974461 27.9722351-.0788092 55.0418518 1.6930877 83.0140868 1.6142784"
          fill="none"
          stroke="#1c7881"
          stroke-linecap=""
          stroke-width="4.5px"
          transform="translate(0 -17)"
        ></path>
      </svg>
    </NamedLink>
  );

  const topbarAllMenu = mediaQuery.matches ? (
    <div
      className={
        (location.pathname === '/' && location.hash === '') ||
        (location.pathname === '/about' && location.hash === '') ||
        location.pathname === '/FAQ' ||
        location.hash === '#sectionOne' ||
        location.hash === '#sectionLast' ||
        location.hash === '/FAQ' ||
        location.pathname === '/Contact'
          ? css.firstLinks
          : css.firstLinks_hide
      }
    >
      {destinationsLink}
      {aboutLink}
      {FaqLink}
      {ContactLink}
      <div
        id="hide"
        style={{
          marginTop: '21px',
          display: 'inline-block',
          height: '30px',
          width: '1px',
          backgroundColor: 'lightgrey',
          marginLeft: '15px',
          marginRight: '15px',
        }}
      ></div>
    </div>
  ) : null;

  const checkDestinations =
    !isAuthenticatedOrJustHydrated && mediaQuery.matches ? (
      <div
        className={
          // (location.pathname === '/' && location.hash === '') ||
          // location.hash === '#sectionOne' ||
          // location.hash === '#sectionLast' ||
          // location.pathname === '/s' ||
          // location.pathname === '/l/'

          location.hash === '#sectionTwo' ||
          location.hash === '#sectionThree' ||
          location.hash === '#sectionFour' ||
          location.hash === '#sectionFive' ||
          location.hash === '#sectionSix' ||
          location.hash === '#sectionSeven'
            ? css.check
            : css.check_hide
        }
      >
        <NamedLink name="SearchPage" className={css.heroButton}>
          Check unsere Reiseziele
        </NamedLink>
      </div>
    ) : !isAuthenticatedOrJustHydrated ? (
      <div
        className={
          location.hash === '#sectionTwo' ||
          location.hash === '#sectionThree' ||
          location.hash === '#sectionFour' ||
          location.hash === '#sectionFive' ||
          location.hash === '#sectionSix' ||
          location.hash === '#sectionSeven'
            ? css.check
            : css.check_hide
        }
      >
        <NamedLink name="SearchPage" className={css.heroButton}>
          Reiseziele
        </NamedLink>
      </div>
    ) : null;

  return (
    <nav className={classes}>
      <NamedLink className={css.logoLink} name="LandingPage">
        <Logo
          format="desktop"
          className={css.logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink>
      {/* {destinationsLink}
      {aboutLink} */}

      <div className={css.searchOuter}>{search}</div>
      {/* <NamedLink
        className={location.pathname === '/I' ? css.active : css.createListingLink}
        name="NewListingPage"
      >
        <span className={css.createListing} style={{ color: '#eb7242' }}>
          + Unterstütze uns
        </span>
      </NamedLink> */}

      {becomePartner}

      {checkDestinations}

      {inboxLink}
      {profileMenu}
      {/* {signupLink} */}
      {loginLink}
      {/* {FaqLink}
      {ContactLink} */}

      <div
        style={{
          marginTop: '21px',
          height: '30px',
          width: '1px',
          backgroundColor: 'lightgrey',
          marginLeft: '15px',
          marginRight: '15px',
          float: 'left',
        }}
      ></div>
      {topbarAllMenu}

      <MenuDrawer
        props={props}
        authenticatedOnClientSide={authenticatedOnClientSide}
        currentUserHasListings={currentUserHasListings}
        notificationCount={notificationCount}
      ></MenuDrawer>
    </nav>
  );
};

const { bool, func, object, number, string } = PropTypes;

TopbarDesktop.defaultProps = {
  rootClassName: null,
  className: null,
  currentUser: null,
  currentPage: null,
  notificationCount: 0,
  initialSearchFormValues: {},
};

TopbarDesktop.propTypes = {
  rootClassName: string,
  className: string,
  currentUserHasListings: bool.isRequired,
  currentUser: propTypes.currentUser,
  currentPage: string,
  isAuthenticated: bool.isRequired,
  onLogout: func.isRequired,
  notificationCount: number,
  onSearchSubmit: func.isRequired,
  initialSearchFormValues: object,
  intl: intlShape.isRequired,
};

export default TopbarDesktop;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { propTypes } from '../../util/types';
import { Avatar, Logo, NamedLink } from '../../components';
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
  } = props;

  const [mounted, setMounted] = useState(false);
  const [sectionOne, setSectionOne] = useState(true);
  const [sectionTwo, setSectionTwo] = useState(false);

  useEffect(() => {
    //console.log(section);
    window.onscroll = function() {
      if (window.pageYOffset * 2 < window.innerHeight) {
        setSectionTwo(false);
        setSectionOne(true);
        //console.log('Scrolling ' + sectionOne);
      } else {
        setSectionOne(false);
        if (window.pageYOffset > window.innerHeight * 1.5) {
          setSectionTwo(true);
        } else {
          setSectionTwo(false);
        }
      }
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticatedOnClientSide = mounted && isAuthenticated;
  const isAuthenticatedOrJustHydrated = isAuthenticated || !mounted;

  const classes = classNames(rootClassName || css.root, className);

  const mediaQuery = window.matchMedia('(min-width: 768px)');

  const search = (
    <TopbarSearchForm
      className={window.location.pathname === '/s' ? css.searchLink_active : css.searchLink}
      desktopInputRoot={css.topbarSearchWithLeftPadding}
      onSubmit={onSearchSubmit}
      initialValues={initialSearchFormValues}
    />
  );

  const becomePartner =
    !isAuthenticatedOrJustHydrated && mediaQuery.matches ? (
      <div
        className={
          window.location.pathname === '/' ||
          window.location.pathname === '/about' ||
          window.location.pathname === '/FAQ' ||
          window.location.pathname === '/Contact'
            ? css.becomePartnerWrapper
            : css.becomePartnerWrapper_hide
        }
      >
        <NamedLink
          className={window.location.pathname === '/I' ? css.active : css.becomePartnerLink}
          name="BecomeHostPage"
        >
          <span className={css.becomePartner}>
            <FormattedMessage id="TopbarDesktop.becomePartner" />
          </span>
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
      </NamedLink>
    ) : null;

  const profileMenu =
    authenticatedOnClientSide && mediaQuery.matches ? (
      <NamedLink
        name="ProfileSettingsPage"
        className={
          window.location.pathname === '/profile-settings' ||
          window.location.pathname === '/listings' ||
          window.location.pathname === '/account/contact-details' ||
          window.location.pathname === '/account/change-password'
            ? css.active
            : css.signupLink
        }
      >
        <Avatar className={css.avatar} user={currentUser} disableProfileLink />
      </NamedLink>
    ) : null;

  const loginLink =
    !isAuthenticatedOrJustHydrated && mediaQuery.matches ? (
      <NamedLink
        name="LoginPage"
        className={window.location.pathname === '/login' ? css.active : css.loginLink}
      >
        <img src={user} className={css.userIcon}></img>
      </NamedLink>
    ) : null;

  const checkDestinations = mediaQuery.matches ? (
    <div
      className={
        /* window.location.pathname === '/l/:slug/:id' ||
        window.location.hash === '#sectionTwo' ||
        window.location.hash === '#sectionThree' ||
        window.location.hash === '#sectionFour' ||
        window.location.hash === '#sectionFive' ||
        window.location.hash === '#sectionSix' ||
        window.location.hash === '#sectionSeven'
          ? css.check
          : css.check_hide*/

        window.location.pathname === '/l/:slug/:id' ||
        ((window.location.pathname === '/' || window.location.pathname === '/about') && sectionTwo)
          ? css.check
          : css.check_hide
      }
    >
      <NamedLink name="SearchPage" className={css.heroButton}>
        <FormattedMessage id="TopbarDesktop.destinationsCTA" />
      </NamedLink>
    </div>
  ) : (
    <div
      className={
        /*window.location.hash === '#sectionTwo' ||
        window.location.hash === '#sectionThree' ||
        window.location.hash === '#sectionFour' ||
        window.location.hash === '#sectionFive' ||
        window.location.hash === '#sectionSix' ||
        window.location.hash === '#sectionSeven'
          ? css.check
          : css.check_hide*/
        window.location.pathname === '/l/:slug/:id' ||
        ((window.location.pathname === '/' || window.location.pathname === '/about') && sectionTwo)
          ? css.check
          : css.check_hide
      }
    >
      <NamedLink name="SearchPage" className={css.heroButton}>
        <FormattedMessage id="TopbarDesktop.destinationsCTAshort" />
      </NamedLink>
    </div>
  );

  return (
    <nav
      /*className={
        (window.location.pathname === '/' && window.location.hash === '#sectionZero') ||
        (window.location.pathname === '/about' && window.location.hash === '#sectionZero') ||
        (window.location.pathname === '/' && window.location.hash === '') ||
        (window.location.pathname === '/about' && window.location.hash === '')
          ? css.root
          : css.rootPaper
      } */

      className={
        (window.location.pathname === '/' || window.location.pathname === '/about') && sectionOne
          ? css.root
          : css.rootPaper
      }
    >
      <NamedLink className={css.logoLink} name="LandingPage">
        <Logo
          format="desktop"
          className={css.logo}
          alt={intl.formatMessage({ id: 'TopbarDesktop.logo' })}
        />
      </NamedLink>

      <div className={css.searchOuter}>{search}</div>

      {becomePartner}
      {checkDestinations}
      {inboxLink}
      {profileMenu}
      {loginLink}

      <div
        className={css.line}
        style={{
          float: 'left',
        }}
      ></div>

      <MenuDrawer
        props={props}
        authenticatedOnClientSide={authenticatedOnClientSide}
        currentUserHasListings={currentUserHasListings}
        notificationCount={notificationCount}
        onLogout={onLogout}
        intl={intl}
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

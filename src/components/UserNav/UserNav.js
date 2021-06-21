import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { ACCOUNT_SETTINGS_PAGES } from '../../routeConfiguration';
import { LinkTabNavHorizontal } from '../../components';

import css from './UserNav.css';
import { isBoolean } from 'lodash';

const UserNav = props => {
  const { className, rootClassName, selectedPageName, partner, projectInfoSubmitted } = props;
  const classes = classNames(rootClassName || css.root, className);

  const show = projectInfoSubmitted === false || undefined ? false : true;

  const tabs =
    partner === 'host'
      ? [
          {
            text: <FormattedMessage id="ManageListingsPage.profileSettings" />,
            selected: selectedPageName === 'ProfileSettingsPage',
            disabled: false,
            linkProps: {
              name: 'ProfileSettingsPage',
            },
          },
          {
            text: <FormattedMessage id="ManageListingsPage.yourListings" />,
            selected: selectedPageName === 'ManageListingsPage',
            linkProps: {
              name: 'ManageListingsPage',
            },
          },

          {
            text: <FormattedMessage id="ManageListingsPage.accountSettings" />,
            selected: ACCOUNT_SETTINGS_PAGES.includes(selectedPageName),
            disabled: false,
            linkProps: {
              name: 'ContactDetailsPage',
            },
          },
        ]
      : [
          {
            text: <FormattedMessage id="ManageListingsPage.profileSettings" />,
            selected: selectedPageName === 'ProfileSettingsPage',
            disabled: false,
            linkProps: {
              name: 'ProfileSettingsPage',
            },
          },

          {
            text: <FormattedMessage id="ManageListingsPage.accountSettings" />,
            selected: ACCOUNT_SETTINGS_PAGES.includes(selectedPageName),
            disabled: false,
            linkProps: {
              name: 'ContactDetailsPage',
            },
          },
        ];

  const usernav =
    partner === 'host' && show ? (
      <LinkTabNavHorizontal
        className={classes}
        tabRootClassName={css.tab}
        tabs={tabs}
        skin="dark"
      />
    ) : partner === 'traveler' ? (
      <LinkTabNavHorizontal
        className={classes}
        tabRootClassName={css.tab}
        tabs={tabs}
        skin="dark"
      />
    ) : null;

  return <> {usernav} </>;
};

UserNav.defaultProps = {
  className: null,
  rootClassName: null,
};

const { string, bool } = PropTypes;

UserNav.propTypes = {
  className: string,
  rootClassName: string,
  selectedPageName: string.isRequired,
  partner: bool.isRequired,
};

export default UserNav;

import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//import { gsap, TweenMax } from 'gsap/all';

import css from './TopbarDesktop.css';

import menuicon from './menu.png';

import closeicon from './close.png';

import selecticon from '../../assets/icons/select.png';

import searchSupport from './searchSupport.png';

import camera from './camera.png';

import { FormattedMessage, intlShape } from '../../util/reactIntl';
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

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const useStyles = makeStyles({
  paper: {
    /*     backgroundColor: 'transparent', */

    boxShadow: 'none',
    overflow: 'visible',
    padding: '0',
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },

  SelectRoot: {
    backgroundColor: 'green',
    borderBottom: '10px solid green',
  },

  SelectPaper: {
    backgroundColor: 'green',
    borderBottom: '10px solid green',
  },
});

const MenuDrawer = props => {
  const {
    authenticatedOnClientSide,
    currentUserHasListings,
    notificationCount,
    onLogout,
    intl,
  } = props;

  const classes = useStyles();

  const language = cookies.get('language') === 'en' ? 'English' : 'Deutsch';

  const languageOptions =
    cookies.get('language') === 'en' ? (
      <>
        <option value="Englisch">{intl.formatMessage({ id: 'languageSetting.english' })}</option>
        <option value="Deutsch">{intl.formatMessage({ id: 'languageSetting.german' })}</option>{' '}
      </>
    ) : (
      <>
        <option value="Deutsch">{intl.formatMessage({ id: 'languageSetting.german' })}</option>
        <option value="Englisch">{intl.formatMessage({ id: 'languageSetting.english' })}</option>
      </>
    );

  const [lang, setLang] = React.useState(language);

  const handleChange = event => {
    setLang(event.target.value);

    if (event.target.value === 'Englisch') {
      cookies.set('language', 'en', {
        // path: '/',
        maxAge: 60 * 60 * 24 * 90,
      });
      window.location.reload();
    } else {
      cookies.set('language', 'de', {
        // path: '/',
        maxAge: 60 * 60 * 24 * 90,
      });
      window.location.reload();
    }
  };

  const handleCookies_en = () => {
    cookies.set('language', 'en', {
      // path: '/',
      maxAge: 60 * 60 * 24 * 90,
    });

    window.location.reload();
  };

  const handleCookies_de = () => {
    cookies.set('language', 'de', {
      // path: '/',
      maxAge: 60 * 60 * 24 * 90,
    });

    window.location.reload();
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const profileMenu = authenticatedOnClientSide ? (
    <div className={css.HeaderWrapperRow}>
      <NamedLink name="ProfileSettingsPage">
        <h1 className={`${css.Header} ${css.Header1}`}>
          <FormattedMessage id="TopbarDesktop.ManageListingsPage" />
        </h1>
      </NamedLink>
    </div>
  ) : null;

  const notificationDot = notificationCount > 0 ? <div className={css.notificationDot} /> : null;
  const inboxLink = authenticatedOnClientSide ? (
    <div className={css.HeaderWrapperRow}>
      <NamedLink name="InboxPage" params={{ tab: currentUserHasListings ? 'sales' : 'orders' }}>
        <h1 className={`${css.Header} ${css.Header1}`}>
          <FormattedMessage id="TopbarDesktop.inbox" />
        </h1>
        <span className={css.inbox}>{notificationDot}</span>
      </NamedLink>
    </div>
  ) : null;

  const LoginButton = !authenticatedOnClientSide ? (
    <NamedLink id="anima" name="LoginPage" className={css.logInButton}>
      <FormattedMessage id="TopbarDesktop.registerLogin" />
    </NamedLink>
  ) : (
    <InlineTextButton className={css.logInButton} onClick={onLogout}>
      <span className={css.menuItemBorder} />
      <FormattedMessage id="TopbarDesktop.logout" />
    </InlineTextButton>
  );

  const line = authenticatedOnClientSide ? <div className={css.spacer}></div> : null;

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={css.drawer}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <FormControl>
        <Select
          native
          value={lang}
          onChange={handleChange}
          className={css.languageSelector}
          BackdropProps={{ classes: { root: css.SelectRoot } }}
          PaperProps={{ classes: { root: classes.SelectPaper } }}
          IconComponent={() => (
            <img
              src={selecticon}
              height="25px"
              width="30px"
              style={{ marginTop: '0px', marginLeft: '-24px', pointerEvents: 'none' }}
            ></img>
          )}
        >
          {languageOptions}
        </Select>
      </FormControl>

      <div
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className={css.closeButton}
      >
        {' '}
        <span style={{ paddingLeft: '15px' }} className={css.about}>
          <FormattedMessage id="close" />
        </span>
        <img src={closeicon} height="32px" width="40px" style={{ marginTop: '-2px' }}></img>
      </div>

      <div className={css.menuWrapper}>
        <div className={css.menuLeftWrapper}>
          {profileMenu}
          {inboxLink}
          {line}
          <div className={css.HeaderWrapperRow}>
            <NamedLink name="LandingPage">
              <h1 className={`${css.Header} ${css.Header1}`}>
                <FormattedMessage id="TopbarDesktop.start" />
              </h1>
            </NamedLink>
          </div>

          <div className={css.HeaderWrapperRow}>
            <NamedLink name="SearchPage">
              <h1 className={`${css.Header} ${css.Header2}`}>
                <FormattedMessage id="TopbarDesktop.destinations" />
              </h1>
            </NamedLink>
          </div>

          <div className={css.HeaderWrapperRow}>
            <NamedLink name="AboutPage">
              <h1 className={`${css.Header} ${css.Header3}`}>
                <FormattedMessage id="TopbarDesktop.about" />
              </h1>
            </NamedLink>
          </div>

          <div className={css.HeaderWrapperRow}>
            <NamedLink name="FaqPage">
              <h1 className={`${css.Header} ${css.Header4}`}>
                <FormattedMessage id="TopbarDesktop.FAQ" />
              </h1>
            </NamedLink>
          </div>
          <div className={css.HeaderWrapperRow}>
            <NamedLink name="ContactPage">
              <h1 className={`${css.Header} ${css.Header5}`}>
                <FormattedMessage id="TopbarDesktop.Contact" />
              </h1>
            </NamedLink>
          </div>

          <div className={css.HeaderWrapperRowLast}>
            <NamedLink name="BecomeHostPage">
              <h1 className={`${css.Header} ${css.Header6}`}>
                <FormattedMessage id="TopbarDesktop.becomePartner" />
              </h1>
            </NamedLink>
          </div>
        </div>

        <div className={css.menuRightWrapper}>
          {LoginButton}

          <h3 className={css.sideHeader}>
            <FormattedMessage id="TopbarDesktop.menuSideTitle" />
          </h3>
          <p className={css.sideText}>
            <FormattedMessage id="TopbarDesktop.menuSideText" />
          </p>
          <br />

          <img src={searchSupport} width="25%" className={css.image1}></img>
          <img src={camera} width="40%" className={css.image2}></img>
        </div>
      </div>

      <div onClick={toggleDrawer(anchor, true)} className={css.closeDrawerButton}>
        <div className={css.SwipeButton} float="left">
          <ExpandMoreIcon
            className={css.arrows}
            style={{ fill: '#fafafa', transform: 'translate(-50%, -50%) rotate(90deg)' }}
          />
        </div>
      </div>
      <div
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className={css.backgroundContainer}
      ></div>
    </div>
  );

  return (
    <div>
      {['right'].map(anchor => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)} className={css.openButton}>
            <span className={css.menuIconText}>Menu</span>
            <img src={menuicon} height="32px" width="40px" style={{ marginTop: '-2px' }}></img>
          </div>
          <Drawer
            BackdropProps={{ classes: { root: classes.root } }}
            PaperProps={{ classes: { root: classes.paper } }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default MenuDrawer;

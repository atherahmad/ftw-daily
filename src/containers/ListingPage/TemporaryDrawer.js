import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { IconSpinner } from '../../components';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//import { gsap, TweenMax } from 'gsap/all';

import css from './ListingPage.css';

import a from './a.png';
import closeicon from './close.png';
import projectImage from './projectImage.jpeg';

import { ResponsiveImage } from '../../components';

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
});

class TemporaryDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.onHandleLoad = this.onHandleLoad.bind(this);
  }

  onHandleLoad() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const {
      richTitle,
      currentListing,
      user,
      projectInformation,
      handleDrawerClose,
      handleDrawerOpen,
      projectDetailsOpen,
    } = this.props;
    const avatarUser = user;

    // const { publicData } = currentListing.attributes;

    // const title = '';
    // const image = '';

    // const address = publicData && publicData.location ? publicData.location.address : '';
    // console.log(publicData);

    const classes = {
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
    };

    // const [state, setState] = React.useState({
    //   top: false,
    //   left: false,
    //   bottom: false,
    //   right: false,
    // });

    // const toggleDrawer = (anchor, open) => event => {
    //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //     return;
    //   }
    //   if (state.right === true) {
    //     window.location.hash = '#projectdetails';
    //   } else {
    //     window.location.hash = '';
    //   }

    //   setState({ ...state, [anchor]: open });
    // };

    // if ((window.location.hash = '#projectdetails')) {
    //   setState({ ...state, right: true });
    // }

    const headerImage =
      user.profileImage !== undefined ? (
        <div className={css.projectImageContainer}>
          <IconSpinner className={`${this.state.loading ? css.show : css.hide} ${css.center}`} />
          <ResponsiveImage
            className={this.state.loading ? css.hide : css.show}
            rootClassName={css.avatarImage}
            alt={projectInformation.projectTitle}
            image={avatarUser.profileImage}
            onHandleLoad={this.onHandleLoad}
            variants={[
              'landscape-crop',
              'landscape-crop2x',
              'landscape-crop4x',
              'landscape-crop6x',
            ]}
          />
        </div>
      ) : null;

    const var_impact =
      cookies.get('language') === 'de' &&
        projectInformation.projectImpact_de !== 'Übersetzung hinzufügen' ? (
        <>{projectInformation.projectImpact_de}</>
      ) : (
        <>{projectInformation.projectImpact}</>
      );

    const var_description =
      cookies.get('language') === 'de' &&
        projectInformation.projectDescription_de !== 'Übersetzung hinzufügen' ? (
        <>{projectInformation.projectDescription_de}</>
      ) : (
        <>{projectInformation.projectDescription}</>
      );

    const list = anchor => (
      <div
        className={css.drawer}
        role="presentation"
        onClick={handleDrawerClose}
        onKeyDown={handleDrawerClose}
      >
        <div
          onClick={handleDrawerClose}
          // onKeyDown={toggleDrawer(anchor, false)}
          className={css.closeButton}
        >
          {' '}
          <span style={{ paddingLeft: '15px' }} className={css.about}>
            <FormattedMessage id="close" />
          </span>
          <img src={closeicon} height="32px" width="40px" style={{ marginTop: '4px' }}></img>
        </div>
        {headerImage}
        <div className={css.HeaderWrapper}>
          <div className={css.HeaderWrapperRow}>
            <div className={css.heading}>
              <h1 className={css.title}>{projectInformation.projectTitle}</h1>
            </div>
            <h1 id="anima" className={css.Header1}>
              {var_impact}
            </h1>
          </div>

          <p className={css.projectText}>{var_description}</p>
        </div>
        {/* <img src={a} height="100%" style={{ position: 'absolute', left: '0%' }}></img> */}

        <div onClick={handleDrawerClose} className={css.closeDrawerButton}>
          <div className={css.SwipeButton} float="left">
            <ExpandMoreIcon
              className={css.arrows}
              style={{ fill: '#fafafa', transform: 'translate(-50%, -50%) rotate(90deg)' }}
            />
          </div>
        </div>
        <div className={css.backgroundContainer}></div>

        {/* <div className={css.SwipeButtonContainer}>
        <div className={state.pos === 0 ? css.SwipeButton_disabled : css.SwipeButton} float="left">
          <ExpandMoreIcon
            className={css.arrows}
            style={{ fill: '#eb7472', transform: 'translate(-50%, -50%) rotate(90deg)' }}
          />
        </div>
        <div className={css.SwipeButton} float="right">
          <ExpandMoreIcon
            className={css.arrows}
            style={{ fill: '#eb7472', transform: 'translate(-50%, -50%) rotate(270deg)' }}
          />
        </div>
      </div> */}
      </div>
    );

    return (
      <div>
        {['right'].map(anchor => (
          <React.Fragment key={anchor}>
            <div onClick={handleDrawerOpen} className={css.openButton}>
              <h3 className={css.buttonText}>
                <FormattedMessage id="ListingPage.projectdetails" />

                <ExpandMoreIcon style={{ transform: 'rotate(270deg)' }} />
              </h3>{' '}
            </div>
            <Drawer
              BackdropProps={{ classes: { root: classes.root } }}
              PaperProps={{ classes: { root: classes.paper } }}
              anchor={anchor}
              open={projectDetailsOpen}
              onClose={handleDrawerClose}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default TemporaryDrawer;

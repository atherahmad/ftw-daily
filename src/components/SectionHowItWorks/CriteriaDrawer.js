import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import css from './SectionHowItWorks.css';

import { FormattedMessage, intlShape } from '../../util/reactIntl';

import Group from './images/grooup.png';

import Closeicon from '../../assets/icons/close.png';

import criteria1 from '../../assets/icons/criteria/cooperation.png';
import criteria2 from '../../assets/icons/criteria/transparence.png';
import criteria3 from '../../assets/icons/criteria/ecology.png';
import criteria4 from '../../assets/icons/criteria/teamwork.png';
import criteria5 from '../../assets/icons/criteria/emancipation.png';
import criteria6 from '../../assets/icons/criteria/checklist.png';

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

const CriteriaDrawer = props => {
  const { authenticatedOnClientSide, currentUserHasListings, notificationCount } = props;

  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });

    // const oldPath = window.location.hash;
    // if (anchor === 'right') {
    //   window.location.hash = 'criteriaDrawer';
    // } else {
    //   window.location.hash = oldPath;
    // }
  };

  const list = anchor => (
    <div
      className={css.drawer}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className={css.closeButton}
      >
        {' '}
        <span style={{ paddingLeft: '15px' }} className={css.about}>
          <FormattedMessage id="close" />
        </span>
        <img src={Closeicon} height="32px" width="40px" style={{ marginTop: '-2px' }}></img>
      </div>

      <div className={css.menuWrapper}>
        <div className={css.criteriaList}>
          <h2 className={css.item_Header}>
            <FormattedMessage id="criteria_header" />
          </h2>

          <br />
          <br />

          <div className={css.criteriaItemOuter}>
            <div className={css.criteriaIconWrapper}>
              <img src={criteria1} width="100%" style={{}}></img>
            </div>
            <div className={css.criteriaItemInner}>
              <h3 className={css.criteriaItem_Header}>
                <FormattedMessage id="criteria_header_1" />
              </h3>
              <p className={css.criteriaItem_Subtitle}>
                <FormattedMessage id="criteria_text_1" />
              </p>
            </div>
          </div>

          <div className={css.criteriaItemOuter}>
            <div className={css.criteriaIconWrapper}>
              <img src={criteria2} width="100%" style={{}}></img>
            </div>
            <div className={css.criteriaItemInner}>
              <h3 className={css.criteriaItem_Header}>
                <FormattedMessage id="criteria_header_2" />
              </h3>
              <p className={css.criteriaItem_Subtitle}>
                <FormattedMessage id="criteria_text_2" />
              </p>
            </div>
          </div>

          <div className={css.criteriaItemOuter}>
            <div className={css.criteriaIconWrapper}>
              <img src={criteria3} width="100%" style={{}}></img>
            </div>
            <div className={css.criteriaItemInner}>
              <h3 className={css.criteriaItem_Header}>
                <FormattedMessage id="criteria_header_3" />
              </h3>
              <p className={css.criteriaItem_Subtitle}>
                <FormattedMessage id="criteria_text_3" />
              </p>
            </div>
          </div>

          <div className={css.criteriaItemOuter}>
            <div className={css.criteriaIconWrapper}>
              <img src={criteria4} width="100%" style={{}}></img>
            </div>
            <div className={css.criteriaItemInner}>
              <h3 className={css.criteriaItem_Header}>
                <FormattedMessage id="criteria_header_4" />
              </h3>
              <p className={css.criteriaItem_Subtitle}>
                <FormattedMessage id="criteria_text_4" />
              </p>
            </div>
          </div>

          <div className={css.criteriaItemOuter}>
            <div className={css.criteriaIconWrapper}>
              <img src={criteria5} width="100%" style={{}}></img>
            </div>
            <div className={css.criteriaItemInner}>
              <h3 className={css.criteriaItem_Header}>
                <FormattedMessage id="criteria_header_5" />
              </h3>
              <p className={css.criteriaItem_Subtitle}>
                <FormattedMessage id="criteria_text_5" />
              </p>
            </div>
          </div>

          <div className={css.criteriaItemOuter}>
            <div className={css.criteriaIconWrapper}>
              <img src={criteria6} width="100%" style={{}}></img>
            </div>
            <div className={css.criteriaItemInner}>
              <h3 className={css.criteriaItem_Header}>
                <FormattedMessage id="criteria_header_6" />
              </h3>
              <p className={css.criteriaItem_Subtitle}>
                <FormattedMessage id="criteria_text_6" />
              </p>
            </div>
          </div>
          {/* criteria_header_1 */}
          {/* <img src={Group} width="90%"></img> */}
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
            <button className={css.itemButton}>
              <FormattedMessage id="sectionHow.button.three" />
            </button>
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

export default CriteriaDrawer;

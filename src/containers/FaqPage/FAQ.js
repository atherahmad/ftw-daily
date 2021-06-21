import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import css from './FAQPage.css';

import { FormattedMessage } from '../../util/reactIntl';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '1080px',
    margin: 'auto',
  },
  accordion: {
    boxShadow: 'none',
  },
  section: {
    borderBottom: '2px solid #353535',
    boxShadow: 'none',
    backgroundImage: "url('https://www.transparenttextures.com/patterns/groovepaper.png')",

    backgroundSize: '400px 240px',
    backgroundRepeat: 'repeat',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },

  secondaryDetails: {
    backgroundImage: "url('https://www.transparenttextures.com/patterns/groovepaper.png')",

    backgroundSize: '400px 240px',
    backgroundRepeat: 'repeat',
  },
}));

export default function ControlledAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const getQA = item => {
    return (
      <Accordion
        key={item}
        className={classes.accordion}
        expanded={expanded === 'panel' + item}
        onChange={handleChange('panel' + item)}
      >
        <AccordionSummary
          className={classes.section}
          expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
          aria-controls={'panel' + item + 'bh-content'}
          id={'panel' + item + 'bh-header'}
        >
          <span className={css.heading}>
            <FormattedMessage id={'faq.q' + item + '.q'} />
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <p>
            <FormattedMessage id={'faq.q' + item + '.a'} />
          </p>
        </AccordionDetails>
      </Accordion>
    );
  };
  let faq1 = [];
  for (let index = 1; index < 10; index++) {
    faq1.push(index);
  }
  let faq2 = [];
  for (let index = 10; index < 40; index++) {
    faq2.push(index);
  }
  let faq3 = [];
  for (let index = 41; index < 58; index++) {
    faq3.push(index);
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <br />
      <br />
      <h2 className={css.FAQheader}>
        <FormattedMessage id="faq.headline1" />
      </h2>

      <div className={classes.root}>{faq1.map(getQA)}</div>
      <br />
      <br />

      <h2 className={css.FAQheader}>
        <FormattedMessage id="faq.headline2" />
      </h2>

      <div className={classes.root}>{faq2.map(getQA)}</div>

      <br />
      <br />

      <h2 className={css.FAQheader}>
        <FormattedMessage id="faq.headline3" />
      </h2>
      <div className={classes.root}>{faq3.map(getQA)}</div>
    </div>
  );
}

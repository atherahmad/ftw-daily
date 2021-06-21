import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import css from './AboutPage.css';

import { FormattedMessage } from '../../util/reactIntl';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <br />
      <br />
      <h2 className={css.FAQheader}>Allgemein</h2>

      <div className={classes.root}>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>General settings</Typography>
            {/* <Typography className={classes.secondaryHeading}>
            <FormattedMessage id="ContactForm.go1" />
          </Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.secondaryDetails}>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Users</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Advanced settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <br />
      <br />

      <h2 className={css.FAQheader}>
        Für Reisende <span className={css.FAQsubheader}>vor der Buchung</span>
      </h2>

      <div className={classes.root}>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel11'}
          onChange={handleChange('panel11')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel11bh-content"
            id="panel11bh-header"
          >
            <Typography className={classes.heading}>General settings</Typography>
            {/* <Typography className={classes.secondaryHeading}>
            <FormattedMessage id="ContactForm.go1" />
          </Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.secondaryDetails}>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel12'}
          onChange={handleChange('panel12')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel12bh-content"
            id="panel12bh-header"
          >
            <Typography className={classes.heading}>Users</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel13'}
          onChange={handleChange('panel13')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel13bh-content"
            id="panel13bh-header"
          >
            <Typography className={classes.heading}>Advanced settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel14'}
          onChange={handleChange('panel14')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel14bh-content"
            id="panel14bh-header"
          >
            <Typography className={classes.heading}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <br />
      <br />

      <h2 className={css.FAQheader}>
        Für Reisende <span className={css.FAQsubheader}>nach der Buchung</span>
      </h2>

      <div className={classes.root}>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel21'}
          onChange={handleChange('panel21')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel21bh-content"
            id="panel21bh-header"
          >
            <Typography className={classes.heading}>General settings</Typography>
            {/* <Typography className={classes.secondaryHeading}>
            <FormattedMessage id="ContactForm.go1" />
          </Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.secondaryDetails}>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel22'}
          onChange={handleChange('panel22')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel22bh-content"
            id="panel22bh-header"
          >
            <Typography className={classes.heading}>Users</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel23'}
          onChange={handleChange('panel23')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel23bh-content"
            id="panel23bh-header"
          >
            <Typography className={classes.heading}>Advanced settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel24'}
          onChange={handleChange('panel24')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel14bh-content"
            id="panel24bh-header"
          >
            <Typography className={classes.heading}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>

      <br />
      <br />
      <h2 className={css.FAQheader}>Für Hilfsorganisationen</h2>

      <div className={classes.root}>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel31'}
          onChange={handleChange('panel31')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel31bh-content"
            id="panel31bh-header"
          >
            <Typography className={classes.heading}>General settings</Typography>
            {/* <Typography className={classes.secondaryHeading}>
            <FormattedMessage id="ContactForm.go1" />
          </Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.secondaryDetails}>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
              maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel32'}
          onChange={handleChange('panel32')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel32bh-content"
            id="panel32bh-header"
          >
            <Typography className={classes.heading}>Users</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
              diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel33'}
          onChange={handleChange('panel33')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel33bh-content"
            id="panel33bh-header"
          >
            <Typography className={classes.heading}>Advanced settings</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          className={classes.accordion}
          expanded={expanded === 'panel34'}
          onChange={handleChange('panel34')}
        >
          <AccordionSummary
            className={classes.section}
            expandIcon={<ExpandMoreIcon style={{ fill: '#353535' }} />}
            aria-controls="panel34bh-content"
            id="panel34bh-header"
          >
            <Typography className={classes.heading}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
              eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import css from './BecomeHostPage1.css';
import { InlineWidget } from 'react-calendly';
import { FormattedMessage } from '../../util/reactIntl';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
  head.appendChild(script);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <InlineWidget url="https://calendly.com/socialbnb-onboarding/60min" />
        </DialogContentText>
      </DialogContent>

      {/* onClose={handleClose}
aria-labelledby="simple-dialog-title"
open={open}
maxWidth="xl"
style={{ minWidth: '80vw', margin: 0 }}
>
<DialogContent>
  <InlineWidget
    style={{ width: '80vw', margin: 0 }}
    url="https://calendly.com/socialbnb-onboarding"
  />
</DialogContent> */}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <div className={css.heroButton} onClick={handleClickOpen}>
        <FormattedMessage id="becomeHost.page2.button" />
      </div>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}

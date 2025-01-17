/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button } from '..';
import MapModalInMobile from './MapModalInMobile';
import css from './ModalInMobileExample.css';

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling MapModalInMobile - currently:', componentId, scrollingDisabled);
};

const MapModalInMobileWrapper = props => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div style={{ margin: '1rem' }}>Wrapper text before ModalInMobile</div>
      <MapModalInMobile
        {...props}
        onClose={() => {
          setOpen(false);
          console.log('Closing modal');
        }}
        isModalOpenOnMobile={isOpen}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div style={{ margin: '1rem' }}>Some content inside ModalInMobile component</div>
      </MapModalInMobile>
      <div style={{ margin: '1rem' }}>
        <Button onClick={handleOpen} className={css.visibleOnMobileLayout}>
          Open
        </Button>
      </div>
    </div>
  );
};

export const Empty = {
  component: MapModalInMobileWrapper,
  useDefaultWrapperStyles: false,
  description: 'Modal feature is visible if window’s width is less than 400px.',
  props: {
    id: 'ExampleMapModalInMobile',
    showAsModalMaxWidth: 400,
  },
};

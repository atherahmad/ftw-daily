/* eslint-disable no-console */
import React, { useState } from 'react';
import { Button } from '..';
import MapModal from './MapModal';

const onManageDisableScrolling = (componentId, scrollingDisabled = true) => {
  // We are just checking the value for now
  console.log('Toggling Modal - scrollingDisabled currently:', componentId, scrollingDisabled);
};

const MapModalWrapper = props => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <div style={{ margin: '1rem' }}>Wrapper text before Modal</div>

      <MapModal
        {...props}
        isOpen={isOpen}
        onClose={() => {
          setOpen(false);
          console.log('Closing modal');
        }}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div style={{ margin: '1rem' }}>Some content inside Modal component</div>
      </MapModal>

      <div style={{ margin: '1rem' }}>
        <Button onClick={handleOpen}>Open</Button>
      </div>
    </div>
  );
};

export const OldMapModal = {
  component: ModalWrapper,
  useDefaultWrapperStyles: false,
  props: {
    id: 'OldMapModal',
  },
};

export const MapModalWithPortal = {
  component: MapModalWrapper,
  useDefaultWrapperStyles: false,
  props: {
    id: 'MapModalWithPortal',
    usePortal: true,
  },
};

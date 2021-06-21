import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import MapModal from './MapModal';

describe('MapModal', () => {
  it('no extra classes when window is missing', () => {
    const props = {
      id: 'TestModal',
      className: 'test-class-from-props',
      isOpen: false,
      onClose: v => v,
      onManageDisableScrolling: v => v,
    };

    const tree = renderDeep(<MapModal {...props}>Content</MapModal>);
    expect(tree).toMatchSnapshot();
  });
});

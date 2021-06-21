import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import MapModalInMobile from './MapModalInMobile';

describe('MapModalInMobile', () => {
  it('no extra classes when window is missing', () => {
    const props = {
      id: 'TestMapModalInMobile',
      className: 'test-class-from-props',
      isModalOpenOnMobile: false,
      onManageDisableScrolling: v => v,
    };

    const tree = renderDeep(<MapModalInMobile {...props}>Content</MapModalInMobile>);
    expect(tree).toMatchSnapshot();
  });
});

// NOTE: renderdeep doesn't work due to map integration
import React from 'react';
import { renderShallow } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import { FindLocationForm } from './FindLocationForm';

const noop = () => null;

describe('FindLocationForm', () => {
  it('matches snapshot', () => {
    const tree = renderShallow(
      <FindLocationFormComponent
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={noop}
        saveActionMsg="Save location"
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});

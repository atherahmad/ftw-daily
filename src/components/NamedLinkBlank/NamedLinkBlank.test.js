import React from 'react';
import { renderShallow, renderDeep } from '../../util/test-helpers';
import NamedLinkBlank, { NamedLinkBlankComponent } from './NamedLinkBlank';

describe('NamedLinkBlankComponent', () => {
  it('should mark the link as active if the current URL matches', () => {
    const activeClassName = 'my-active-class';
    const landingPageProps = {
      name: 'LandingPage',
      activeClassName,
      match: { url: '/' },
    };
    const searchPageProps = {
      name: 'SearchPage',
      activeClassName,
      match: { url: '/' },
    };
    const tree = renderDeep(
      <div>
        <NamedLinkBlankComponent {...landingPageProps}>link to a</NamedLinkBlankComponent>
        <NamedLinkBlankComponent {...searchPageProps}>link to b</NamedLinkBlankComponent>
      </div>
    );

    const aLink = tree.children[0];
    const bLink = tree.children[1];
    expect(aLink.type).toEqual('a');
    expect(bLink.type).toEqual('a');
    expect(aLink.props.className).toEqual(activeClassName);
    expect(bLink.props.className).toEqual('');
  });
});

describe('NamedLinkBlank', () => {
  it('should contain correct link', () => {
    const id = 12;
    const tree = renderDeep(
      <NamedLinkBlank name="ListingPageCanonical" params={{ id }}>
        to ListingPage
      </NamedLinkBlank>
    );
    expect(tree.type).toEqual('a');
    expect(tree.props.href).toEqual(`/l/${id}`);
    expect(tree.children).toEqual(['to ListingPage']);
  });
});

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { ListingCard, PaginationLinks } from '../../components';
import css from './SearchResultsPanel.css';
import { FormattedMessage } from '../../util/reactIntl';

import { groupedByCoordinates, reducedToArray } from '../SearchMap/SearchMap.helpers.js';

import Cards from './Cards';

const SearchResultsPanel = props => {
  const {
    className,
    rootClassName,
    listings,
    pagination,
    search,
    setActiveListing,
    listingsAreLoaded,
    resultsCount,
    sortByComponent,
    searchInProgress,
  } = props;
  const classes = classNames(rootClassName || css.root, className);

  const hasNoResult = listingsAreLoaded && resultsCount === 0;

  const paginationLinks =
    pagination && pagination.totalPages > 1 ? (
      <PaginationLinks
        className={css.pagination}
        pageName="SearchPage"
        pageSearchParams={search}
        pagination={pagination}
      />
    ) : null;

  // Panel width relative to the viewport
  const panelMediumWidth = 50;
  const panelLargeWidth = 62.5;
  const cardRenderSizes = [
    '(max-width: 767px) 100vw',
    `(max-width: 1023px) ${panelMediumWidth}vw`,
    `(max-width: 1920px) ${panelLargeWidth / 2}vw`,
    `${panelLargeWidth / 3}vw`,
  ].join(', ');

  const listingArraysInLocations = reducedToArray(groupedByCoordinates(listings));

  return (
    <div className={classes}>
      <div className={css.searchOptions}>
        {searchInProgress ? (
          <div className={css.searchResultSummary}>
            <div className={css.resultsFound}>
              <FormattedMessage id="SearchFiltersPrimary.loadingResults" />
            </div>
          </div>
        ) : null}
        {listingsAreLoaded ? (
          <div className={css.searchResultSummary}>
            <span className={css.resultsFound}>
              <FormattedMessage
                id="SearchFiltersPrimary.foundResults"
                values={{ count: resultsCount }}
              />
            </span>
          </div>
        ) : null}
        {sortByComponent}
      </div>
      {hasNoResult ? (
        <div className={css.noSearchResults}>
          <FormattedMessage id="SearchFiltersPrimary.noResults" />
        </div>
      ) : null}
      <div className={css.listingCards}>
        {// listings.map(l => (
        listingArraysInLocations.reverse().map((l, index) => (
          <div key={index}>
            {l.length === 1 ? (
              <ListingCard
                className={css.listingCard}
                key={l[0].id.uuid}
                listing={l[0]}
                renderSizes={cardRenderSizes}
                setActiveListing={setActiveListing}
              />
            ) : (
              // <MDBContainer>
              //   <MDBCarousel activeItem={1} length={3} slide={true} showControls={true} showIndicators={true} multiItem>
              //     <MDBCarouselInner>
              //     <MDBRow>
              <Cards array={l} setActiveListing={setActiveListing} />
            )
            // <Carousel className='col-8'>
            //   {
            //     l.map((item, index) => {
            //       return (
            //         // <MDBCarouselItem itemId={index+1}>
            //         <Carousel.Item>
            //           <img
            //             className="d-block w-auto"
            //             src="https://i.stack.imgur.com/WeyM8.jpg"
            //             alt="First slide"

            //           />
            //           <Carousel.Caption>
            //             <ListingCard
            //               className={css.listingCard}
            //               key={item.id.uuid}
            //               listing={item}
            //               renderSizes={cardRenderSizes}
            //               setActiveListing={setActiveListing}
            //             />
            //           </Carousel.Caption>
            //         </Carousel.Item>
            //         // </MDBCarouselItem>
            //       )

            //     })
            //   }

            //   {/* </MDBRow>
            //     </MDBCarouselInner>
            //   </MDBCarousel>
            // </MDBContainer> */}
            // </Carousel>
            }
          </div>
        ))}
        {props.children}
      </div>
      {paginationLinks}
    </div>
  );
};

SearchResultsPanel.defaultProps = {
  children: null,
  className: null,
  listings: [],
  pagination: null,
  rootClassName: null,
  search: null,
};

const { array, node, object, string } = PropTypes;

SearchResultsPanel.propTypes = {
  children: node,
  className: string,
  listings: array,
  pagination: propTypes.pagination,
  rootClassName: string,
  search: object,
};

export default SearchResultsPanel;

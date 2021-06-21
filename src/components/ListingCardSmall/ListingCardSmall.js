import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import { lazyLoadWithDimensions } from '../../util/contextHelpers';
import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, propTypes } from '../../util/types';
import { formatMoney } from '../../util/currency';
import { ensureListing, ensureUser } from '../../util/data';
import { richText } from '../../util/richText';
import { createSlug } from '../../util/urlHelpers';
import config from '../../config';
import { NamedLinkBlank, ResponsiveImage } from '../../components';

import css from './ListingCardSmall.css';
var crg = require('country-reverse-geocoding').country_reverse_geocoding();

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

class ListingImage extends Component {
  render() {
    return <ResponsiveImage {...this.props} />;
  }
}
const LazyImage = lazyLoadWithDimensions(ListingImage, { loadAfterInitialRendering: 3000 });

export const ListingCardSmallComponent = props => {
  const { className, rootClassName, intl, listing, renderSizes, setActiveListing } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price } = currentListing.attributes;
  const slug = createSlug(title);
  const author = ensureUser(listing.author);
  const authorName = author.attributes.profile.displayName;

  const firstImage =
    currentListing.images && currentListing.images.length > 0 ? currentListing.images[0] : null;

  const { formattedPrice, priceTitle } = priceData(price, intl);

  const unitType = config.bookingUnitType;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;

  const unitTranslationKey = isNightly
    ? 'ListingCard.perNight'
    : isDaily
    ? 'ListingCard.perDay'
    : 'ListingCard.perUnit';

  const projectTitle = title.split(' • ')[0];

  const projectRoomtypeRaw = title.split(' • ')[1];

  const ProjectRoomtype =
    projectRoomtypeRaw === 'singlebedroom' ? (
      <FormattedMessage id="roomtypes.singlebedroom" />
    ) : projectRoomtypeRaw === 'twobedroom' ? (
      <FormattedMessage id="roomtypes.twobedroom" />
    ) : projectRoomtypeRaw === 'doublebedroom' ? (
      <FormattedMessage id="roomtypes.doublebedroom" />
    ) : projectRoomtypeRaw === 'shared_bedroom' ? (
      <FormattedMessage id="roomtypes.shared_bedroom" />
    ) : projectRoomtypeRaw === 'entire_accomodation' ? (
      <FormattedMessage id="roomtypes.entire_accomodation" />
    ) : projectRoomtypeRaw === 'camping' ? (
      <FormattedMessage id="roomtypes.camping" />
    ) : null;

  const pricePer =
    projectRoomtypeRaw === 'shared_bedroom' ? (
      <FormattedMessage id="ListingCard.pricePerBed" />
    ) : projectRoomtypeRaw === 'singlebedroom' ? (
      <FormattedMessage id="ListingCard.pricePerRoom" />
    ) : projectRoomtypeRaw === 'twobedroom' ? (
      <FormattedMessage id="ListingCard.pricePerRoom" />
    ) : projectRoomtypeRaw === 'doublebedroom' ? (
      <FormattedMessage id="ListingCard.pricePerRoom" />
    ) : (
      ''
    );

  const ProjectRoomtypeIcon =
    projectRoomtypeRaw === 'singlebedroom' ? (
      <img
        src={require('../../assets/icons/roomtypes/onebedroom.png')}
        width="auto"
        height="50px"
        style={{ paddingRight: '20px', paddingLeft: '10px' }}
      ></img>
    ) : projectRoomtypeRaw === 'twobedroom' ? (
      <img
        src={require('../../assets/icons/roomtypes/twobedroom.png')}
        width="auto"
        height="50px"
        style={{ paddingRight: '20px', paddingLeft: '10px' }}
      ></img>
    ) : projectRoomtypeRaw === 'doublebedroom' ? (
      <img
        src={require('../../assets/icons/roomtypes/doublebedroom.png')}
        width="auto"
        height="50px"
        style={{ paddingRight: '20px', paddingLeft: '10px' }}
      ></img>
    ) : projectRoomtypeRaw === 'shared_bedroom' ? (
      <img
        src={require('../../assets/icons/roomtypes/shared_bedroom.png')}
        width="auto"
        height="50px"
        style={{ paddingRight: '20px', paddingLeft: '10px' }}
      ></img>
    ) : projectRoomtypeRaw === 'entire_accomodation' ? (
      <img
        src={require('../../assets/icons/roomtypes/entire_accomodation.png')}
        width="auto"
        height="50px"
        style={{ paddingRight: '20px', paddingLeft: '10px' }}
      ></img>
    ) : projectRoomtypeRaw === 'camping' ? (
      <img
        src={require('../../assets/icons/roomtypes/camping.png')}
        width="auto"
        height="50px"
        style={{ paddingRight: '20px', paddingLeft: '10px' }}
      ></img>
    ) : null;

  return (
    <NamedLinkBlank className={classes} name="ListingPage" params={{ id, slug }}>
      <div className={css.info}>
        {ProjectRoomtypeIcon}

        <div className={css.mainInfo}>
          <div className={css.title}>
            <span style={{ fontWeight: '200', color: '#353535' }}>{ProjectRoomtype} </span>
            <br />
          </div>

          <p className={css.price_wrapper}>
            {/* <span style={{ fontWeight: 100, color: '#353535' }}>ab</span>{' '} */}
            <span className={css.priceValue} title={priceTitle}>
              {formattedPrice}
            </span>
            <span style={{ fontWeight: 100, color: '#353535' }}>
              /<FormattedMessage id="Slider.night" /> {pricePer}
            </span>
          </p>
        </div>
      </div>
    </NamedLinkBlank>
  );
};

ListingCardSmallComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  setActiveListing: () => null,
};

ListingCardSmallComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardSmallComponent);

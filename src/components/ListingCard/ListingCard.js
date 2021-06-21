import React, { Component } from 'react';
import { string, func, array } from 'prop-types';
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

import css from './ListingCard.css';

import includes from 'lodash/includes';
import { findOptionsForSelectFilter } from '../../util/search';

import getCountryCodes from '../../translations/countryCodes';
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

export const ListingCardComponent = props => {
  const {
    className,
    rootClassName,
    intl,
    listing,
    renderSizes,
    setActiveListing,
    filterConfig,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureListing(listing);
  const id = currentListing.id.uuid;
  const { title = '', price, publicData } = currentListing.attributes;
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

  const countryCodes = getCountryCodes(config.locale);

  const selectedCountry = publicData && publicData.country ? publicData.country : [];

  const checkCountry = (countryCodes, selectedCountry) => {
    return countryCodes.map(countryCodes => ({
      code: countryCodes.code,
      name: countryCodes.name,
      isSelected: includes(selectedCountry, countryCodes.code),
    }));
  };

  const checkedCountry = checkCountry(countryCodes, selectedCountry);

  const Country = props => {
    const { label, isSelected } = props;
    const labelNew = label !== undefined ? label + ',\xa0' : null;
    const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
    return (
      <>
        <div className={css.labelWrapper}>
          <span className={labelClass}>
            {label} <br />
          </span>
        </div>
      </>
    );
  };
  
  const categoryOptions = findOptionsForSelectFilter('category', filterConfig);

  const selectedCategory = publicData && publicData.category ? publicData.category : [];

  const checkCategorySelected = (categoryOptions, selectedCategory) => {
    return categoryOptions.map(categoryOptions => ({
      key: categoryOptions.key,
      label: categoryOptions.label,
      isSelected: includes(selectedCategory, categoryOptions.key),
    }));
  };
  const checkedCategorySelected = checkCategorySelected(categoryOptions, selectedCategory);

  const Category = props => {
    const { label, isSelected } = props;

    const labelNew =
      label !== undefined ? (
        <span className={css.labelText}>{label}</span>
      ) : // + ',\xa0'
      null;
    const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
    return (
      <>
        <span className={labelClass}>{labelNew}</span>
      </>
    );
  };

  const roomtypeOptions = findOptionsForSelectFilter('roomtype', filterConfig);

  const selectedRoomtype = publicData && publicData.roomtype ? publicData.roomtype : [];

  const checkRoomtypeSelected = (roomtypeOptions, selectedRoomtype) => {
    return roomtypeOptions.map(roomtypeOptions => ({
      key: roomtypeOptions.key,
      label: roomtypeOptions.label,
      isSelected: includes(selectedRoomtype, roomtypeOptions.key),
    }));
  };
  const checkedRoomtypeSelected = checkRoomtypeSelected(roomtypeOptions, selectedRoomtype);

  const Roomtype = props => {
    const { label, isSelected } = props;

    const labelNew =
      label !== undefined ? (
        <span className={css.labelTextRoomtype}>{label}</span>
      ) : // + ',\xa0'
      null;
    const labelClass = isSelected ? css.selectedLabel : css.notSelectedLabel;
    return (
      <>
        <span className={labelClass}>{labelNew}</span>
      </>
    );
  };

  let handle = null;

  const mouseOver = () => {
    // handle = setTimeout(() => {
    //   setActiveListing(currentListing.id);
    // }, 2000);
  };

  const mouseLeave = () => {
    // setActiveListing(null);
    // if (handle) {
    //   clearTimeout(handle);
    //   handle = undefined;
    // }
  };
  return (
    <NamedLinkBlank className={classes} name="ListingPage" params={{ id, slug }}>
      <div
        className={css.threeToTwoWrapper}
        onMouseEnter={mouseOver}
        onMouseLeave={mouseLeave}
        // onMouseEnter={() => setActiveListing(currentListing.id)}
        // onMouseLeave={() => setActiveListing(null)}
      >
        <div className={css.aspectWrapper}>
          <LazyImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={['landscape-crop', 'landscape-crop2x']}
            sizes={renderSizes}
          />
        </div>
      </div>
      {/* <div className={css.info}>
        <div className={css.mainInfo}>
          <div className={css.title}>
            {richText(title, {
              longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
              longWordClass: css.longWord,
            })}
          </div>
          <div className={css.authorInfo}>
            <FormattedMessage id="ListingCard.hostedBy" values={{ authorName }} />
          </div>
        </div>

        <div className={css.price}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id={unitTranslationKey} />
          </div>
        </div>
      </div> */}
      <div className={css.info} onMouseEnter={mouseOver} onMouseLeave={mouseLeave}>
        <div className={css.mainInfo}>
          <div className={css.title}>
            <p style={{ marginTop: 0, marginBottom: 0 }}>{ProjectRoomtype} </p>

            <h1 title={projectTitle} className={css.titleText}>
              {/* {richText(projectTitle, {
                longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
                longWordClass: css.longWord,
              })} */
              projectTitle.length >= 24 ?
              projectTitle.slice(0,24)+"..."
              : 
              projectTitle
              }
            </h1>
            {/* {' '}
            •  */}
          </div>
          <p className={css.location}>
            {publicData.city},{' '}
            {checkedCountry.map(countryCodes => (
              <Country
                key={`${'ListingPage.characteristics'}.${countryCodes.code}`}
                label={countryCodes.name}
                isSelected={countryCodes.isSelected}
              />
            ))}
          </p>
          <div>
            {checkedCategorySelected.map(categoryOptions => (
              <Category
                key={`${'ListingPage.characteristics'}.${categoryOptions.key}`}
                label={categoryOptions.label}
                isSelected={categoryOptions.isSelected}
              />
            ))}
          </div>
          <div className={css.roomtype_wrapper}>
            {checkedRoomtypeSelected.map(roomtypeOptions => (
              <Roomtype
                key={`${'ListingPage.characteristics'}.${roomtypeOptions.key}`}
                label={roomtypeOptions.label}
                isSelected={roomtypeOptions.isSelected}
              />
            ))}
          </div>

          <p className={css.price_wrapper}>
            {/* <span style={{ fontWeight: 100, color: '#353535' }}>ab</span>{' '} */}
            <span className={css.priceValue} title={priceTitle}>
              {formattedPrice}
            </span>
            <span style={{ fontWeight: 100, color: '#353535' }}>/Nacht</span>
          </p>
        </div>
      </div>
    </NamedLinkBlank>
  );
};

ListingCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  renderSizes: null,
  filterConfig: config.custom.filters,

  setActiveListing: () => null,
};

ListingCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
  listing: propTypes.listing.isRequired,
  filterConfig: array,

  // Responsive image sizes hint
  renderSizes: string,

  setActiveListing: func,
};

export default injectIntl(ListingCardComponent);

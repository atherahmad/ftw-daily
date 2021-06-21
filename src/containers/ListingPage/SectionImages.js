import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { ResponsiveImage, Modal, ImageCarousel } from '../../components';
import ActionBarMaybe from './ActionBarMaybe';

import css from './ListingPage.css';

const SectionImages = props => {
  const {
    title,
    listing,
    isOwnListing,
    editParams,
    handleViewPhotosClick,
    imageCarouselOpen,
    onImageCarouselClose,
    onManageDisableScrolling,
  } = props;

  const hasImages = listing.images && listing.images.length > 0;
  const firstImage = hasImages ? listing.images[0] : null;
  const secondImage = hasImages ? listing.images[1] : null;
  const thirdImage = hasImages ? listing.images[2] : null;
  const fourthImage = hasImages ? listing.images[3] : null;

  // Action bar is wrapped with a div that prevents the click events
  // to the parent that would otherwise open the image carousel
  const actionBar = listing.id ? (
    <div onClick={e => e.stopPropagation()}>
      <ActionBarMaybe isOwnListing={isOwnListing} listing={listing} editParams={editParams} />
    </div>
  ) : null;

  const viewPhotosButton = hasImages ? (
    <button className={css.viewPhotos} onClick={handleViewPhotosClick}>
      <FormattedMessage
        id="ListingPage.viewImagesButton"
        values={{ count: listing.images.length }}
      />
    </button>
  ) : null;

  return (
    <div className={css.sectionImages}>
      <div className={css.threeToTwoWrapper}>
        <div className={css.aspectWrapper} onClick={handleViewPhotosClick}>
          {actionBar}

          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            variants={[
              'landscape-crop',
              'landscape-crop2x',
              'landscape-crop4x',
              'landscape-crop6x',
            ]}
          />

          <div className={css.smallImages}>
            <ResponsiveImage
              rootClassName={css.rootForImage1}
              alt={title}
              image={secondImage}
              variants={[
                'landscape-crop',
                'landscape-crop2x',
                'landscape-crop4x',
                'landscape-crop6x',
              ]}
            />
            <ResponsiveImage
              rootClassName={css.rootForImage2}
              alt={title}
              image={thirdImage}
              variants={[
                'landscape-crop',
                'landscape-crop2x',
                'landscape-crop4x',
                'landscape-crop6x',
              ]}
            />
            <div className={css.photosButtonWrapper}>
              {viewPhotosButton}
              {/* <div
                style={{
                  top: '0',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}
              ></div> */}
              <ResponsiveImage
                rootClassName={css.rootForImage3}
                alt={title}
                image={fourthImage}
                variants={[
                  'landscape-crop',
                  'landscape-crop2x',
                  'landscape-crop4x',
                  'landscape-crop6x',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        id="ListingPage.imageCarousel"
        scrollLayerClassName={css.carouselModalScrollLayer}
        containerClassName={css.carouselModalContainer}
        lightCloseButton
        isOpen={imageCarouselOpen}
        onClose={onImageCarouselClose}
        usePortal
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <ImageCarousel images={listing.images} />
      </Modal>
    </div>
  );
};

export default SectionImages;

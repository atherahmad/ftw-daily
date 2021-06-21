import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { LINE_ITEM_UNITS, propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemUnitsMaybe = props => {
  const { transaction, unitType, seats, projectRoomtypeRaw } = props;

  // if (unitType !== LINE_ITEM_UNITS) {
  //   return null;
  // }

  // const unitPurchase = transaction.attributes.lineItems.find(
  //   item => item.code === unitType && !item.reversal
  // );

  // if (!unitPurchase) {
  //   throw new Error(`LineItemUnitsMaybe: lineItem (${unitType}) missing`);
  // }

  // const quantity = unitPurchase.quantity;
  const quantity = seats;

  const seatsLabel =
    projectRoomtypeRaw === 'singlebedroom' ? (
      <FormattedMessage id="CheckoutPage_transactionPage.singlebedroom" />
    ) : projectRoomtypeRaw === 'twobedroom' ? (
      <FormattedMessage id="CheckoutPage_transactionPage.twobedroom" />
    ) : projectRoomtypeRaw === 'doublebedroom' ? (
      <FormattedMessage id="CheckoutPage_transactionPage.doublebedroom" />
    ) : projectRoomtypeRaw === 'shared_bedroom' ? (
      <FormattedMessage id="CheckoutPage_transactionPage.shared_bedroom" />
    ) : projectRoomtypeRaw === 'entire_accomodation' ? (
      <FormattedMessage id="CheckoutPage_transactionPage.entire_accomodation" />
    ) : (
      <FormattedMessage id="CheckoutPage_transactionPage.camping" />
    );
  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>{seatsLabel}</span>
      <span className={css.itemValue}>
        {quantity}x{/* <FormattedMessage id="BookingBreakdown.quantity" values={{ quantity }} /> */}
      </span>
    </div>
  );
};

LineItemUnitsMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
};

export default LineItemUnitsMaybe;

import React, { useState } from 'react';
import Paypal from './Paypal';

function PaypalCheckout() {
  // Declare a new state variable, which we'll call "count"
  const [checkout, setCheckout] = useState(false);

  return (
    <div>
      {checkout ? (
        <Paypal></Paypal>
      ) : (
        <button onClick={() => setCheckout(true)}>Paypal Checkout</button>
      )}
    </div>
  );
}

export default PaypalCheckout;

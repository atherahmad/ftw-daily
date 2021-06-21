import React, { useRef, useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

export default function Paypal(props) {
  const { amount, transactionData } = props;
  const [ButtonRender, setButtonRender] = useState(false);
  console.log('tdata: ' + transactionData);

  const formattedAmount = (amount / 100) * 0.15;
  console.log('Amount: ' + amount);
  console.log('FormattedAmm: ' + formattedAmount);
  console.log('Amount sent: ' + formattedAmount.toFixed(2));

  const paypal = useRef();

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const initialOptions = {
    'client-id': 'ASY98dv_CoKeCP0kCk99qe6Q0ZPEY7Tk3zbDpCzJY5D6DasDPwM_0QDSEl6wvk2XPwY1AsRrKje-PeTB',
    //'client-id': 'sb',
    currency: 'USD',
    intent: 'capture',
  };
  useEffect(() => {
    setButtonRender(true);
    //console.log(JSON.stringify(transactionData));
    /*(async () => {
      await sleep(1000);
      window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: 'CAPTURE',

              purchase_units: [
                {
                  //description: `Socialbnb Booking: , Transaction id:${transactionData.listing.id.uuid},
                  //             accommodation name: ${transactionData.listing.attributes.title},
                  //           Start date: ${transactionData.bookingDates.bookingStart},
                  //                   Ende date:${transactionData.bookingDates.bookingEnd}`,
                  amount: {
                    currency_code: 'USD',
                    value: formattedAmount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            props.payPalSucsses(order);
          },
          onError: err => {
            console.log(err);
          },
        })
        .render(paypal.current);
    })();*/
  }, []);
  //sb-vhfj95499545@personal.example.com
  //N]=r37^8

  function createOrder(data, actions, err) {
    console.log('Transaction ' + transactionData.bookingDates.bookingStart.getDate());
    return actions.order
      .create({
        intent: 'CAPTURE',

        purchase_units: [
          {
            //`Socialbnb Booking: Transaction id:${transactionData.listing.id.uuid},
            description: `Socialbnb Booking: Transaction id:${transactionData.listing.id.uuid}`,
            //`${
            //  transactionData.listing.attributes.title
            //}: ${transactionData.bookingDates.bookingStart.getDate()}/${transactionData.bookingDates.bookingStart.getMonth()}
            //-${transactionData.bookingDates.bookingEnd.getDate()}/${transactionData.bookingDates.bookingEnd.getMonth()}`,
            // Start date: ${transactionData.bookingDates.bookingStart},
            // Ende date:${transactionData.bookingDates.bookingEnd}`,

            amount: {
              currency_code: 'USD',
              value: formattedAmount.toFixed(2),
            },
          },
        ],
      })
      .then(order => {
        console.log('The order: ? ' + order);
        return order;
      })
      .catch(err => {
        console.log(err);
      });
  }
  function approvedInt(data, actions) {
    actions.order.capture().then(e => {
      console.log(e);
      props.payPalSucsses(e);
    });
  }

  return (
    <PayPalScriptProvider options={initialOptions} deferLoading={false}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={approvedInt}
        style={{ layout: 'vertical' }}
      />
    </PayPalScriptProvider>
  );

  /*return (
    <div>
      <div ref={paypal}></div>
    </div>
  );*/
}

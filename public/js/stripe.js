/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  // 1) Get checkout session from API
  const stripe = Stripe(
    'pk_test_51MYkVQIsMsAGEtsptKTeoYCnHrBYLRw0R17Eh1ccTUHPY8l4NzhWRJyIC9oQWMe0IFF0juuhtyv44OfyZlnPwQ0b00ylKvQGIF'
  );
  try {
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form  + change credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

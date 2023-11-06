import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '30s', target: 30 },
    { duration: '1m', target: 30 },
  ],
};

export const signInResponseErrors = new Counter('Errors_signInResponse');
export const signOutResponseErrors = new Counter('Errors_signOutResponse');
export const paysafeCurrentProviderResponseErrors = new Counter('Errors_paysafeCurrentProviderResponse');
export const paysafeErrorCodesResponseErrors = new Counter('Errors_paysafeErrorCodesResponse');
export const paysafePaymentMethodsResponseErrors = new Counter('Errors_paysafePaymentMethodsResponse');
export const paymentMethodsOptionsResponseErrors = new Counter('Errors_paymentMethodsOptionsResponse');
export const paymentMethodsResponseErrors = new Counter('Errors_paymentMethodsResponse');
export const createPaymentExistingOptionsResponseErrors = new Counter('Errors_createPaymentExistingOptionsResponse');
export const createPaymentExistingResponseErrors = new Counter('Errors_createPaymentExistingResponse');
export const paypalProcessPaymentOptionsResponseErrors = new Counter('Errors_paypalProcessPaymentOptionsResponse');
export const paypalProcessPaymentResponseErrors = new Counter('Errors_paypalProcessPaymentResponse');

export default () => {
  const baseURL = 'https://api.load01.prizepicks.com';

  const userEmail = `hammertime+${__VU + 0}@prizepicks.com`;
  const userPassword = '1password;';

  const logPrefix = `[${userEmail}](${__ITER})`;

  let userLogin = {
    user: {
      email: userEmail,
      password: userPassword,
      remember_me: false
    }
  };

  // Sign in request
  let signInResponse = http.post(`${baseURL}/users/sign_in`, JSON.stringify(userLogin), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!check(signInResponse, {
    'logged in successfully': (resp) => resp.status === 200
  })) {
    signInResponseErrors.add(1);
  }

  sleep(1);

  // 9. paysafe/paypal/process_payment - OPTIONS
  let paypalProcessPaymentOptionsResponse = http.options(`${baseURL}/paysafe/paypal/process_payment`);
  if (!check(paypalProcessPaymentOptionsResponse, {
    'paypal process payment options successfully': (resp) => resp.status === 200
  })) {
    paypalProcessPaymentOptionsResponseErrors.add(1);
  }

  sleep(1);

  // 10. paysafe/paypal/process_payment - POST method
  let paypalProcessPaymentPayload = {
    // Add the required payload for this endpoint
  };
  let paypalProcessPaymentResponse = http.post(`${baseURL}/paysafe/paypal/process_payment`, JSON.stringify(paypalProcessPaymentPayload), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!check(paypalProcessPaymentResponse, {
    'paypal process payment successfully': (resp) => resp.status === 200
  })) {
    paypalProcessPaymentResponseErrors.add(1);
  }

  sleep(1);

  

  // Sign out request
  let signOutResponse = http.del(`${baseURL}/users/sign_out`);
  if (!check(signOutResponse, {
    'logged out successfully': (resp) => resp.status === 204
  })) {
    signOutResponseErrors.add(1);
  }

  sleep(1);
};

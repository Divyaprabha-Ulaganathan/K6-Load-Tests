import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '30s', target: 30 },
    { duration: '1m', target: 30},
  ],
};

export const signInResponseErrors = new Counter('Errors_signInResponse');
export const signOutResponseErrors = new Counter('Errors_signOutResponse');
export const paysafeCurrentProviderResponseErrors = new Counter('Errors_paysafeCurrentProviderResponse');
export const paysafeErrorCodesResponseErrors = new Counter('Errors_paysafeErrorCodesResponse');
export const paymentMethodsOptionsResponseErrors = new Counter('Errors_paymentMethodsOptionsResponse');
export const paymentMethodsResponseErrors = new Counter('Errors_paymentMethodsResponse');
export const createPaymentOptionsResponseErrors = new Counter('Errors_createPaymentOptionsResponse');
export const createPaymentResponseErrors = new Counter('Errors_createPaymentResponse');

export default () => {
  const baseURL = 'https://api.load01.prizepicks.com/';

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

  // 10. paysafe/current_provider - GET method
  let paysafeCurrentProviderResponse = http.get(`${baseURL}/paysafe/current_provider`);
  if (!check(paysafeCurrentProviderResponse, {
    'fetched paysafe current provider successfully': (resp) => resp.status === 200
  })) {
    paysafeCurrentProviderResponseErrors.add(1);
  }

  sleep(1);

  // 11. paysafe/error_codes - GET method
  let paysafeErrorCodesResponse = http.get(`${baseURL}/paysafe/error_codes`);
  if (!check(paysafeErrorCodesResponse, {
    'fetched paysafe error codes successfully': (resp) => resp.status === 200
  })) {
    paysafeErrorCodesResponseErrors.add(1);
  }

  sleep(1);

  // 12. paysafe/payment_methods - OPTIONS
  let paymentMethodsOptionsResponse = http.options(`${baseURL}/paysafe/payment_methods`);
  if (!check(paymentMethodsOptionsResponse, {
    'payment methods options successfully': (resp) => resp.status === 200
  })) {
    
   paymentMethodsOptionsResponseErrors.add(1);
  }

  //sleep(1);

  // 13. paysafe/payment_methods - GET method
  let paymentMethodsResponse = http.get(`${baseURL}/paysafe/payment_methods`);
  if (!check(paymentMethodsResponse, {
    'fetched payment methods successfully': (resp) => resp.status === 200
  })) {
    
    paymentMethodsResponseErrors.add(1);
  }

  sleep(1);

  // 14. aeropay/create_payment - OPTIONS
  let createPaymentOptionsResponse = http.options(`${baseURL}/aeropay/create_payment`);
  if (!check(createPaymentOptionsResponse, {
   'create payment options successfully': (resp) => resp.status === 200
  })) {
   
   createPaymentOptionsResponseErrors.add(1);
  }

  sleep(1);

  // 15. aeropay/create_payment - POST method
  
    let createPaymentPayload = {

    };
    

  let createPaymentResponse = http.post(`${baseURL}/aeropay/create_payment`, JSON.stringify(createPaymentPayload), {
    headers: {

      'Accept': 'application/json',
      'Content-Type': 'application/json',

    }
  });
  if (!check(createPaymentResponse, {
    'create payment successfully': (resp) => resp.status === 200
  })) {
    
    createPaymentResponseErrors.add(1);
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

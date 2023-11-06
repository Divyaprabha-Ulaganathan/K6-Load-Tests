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
export const paymentMethodsResponseErrors = new Counter('Errors_paymentMethodsResponse');
export const createPaymentExistingResponseErrors = new Counter('Errors_createPaymentExistingResponse');

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


  // 1. paysafe/current_provider - GET method
  let paysafeCurrentProviderResponse = http.get(`${baseURL}/paysafe/current_provider`);
  if (!check(paysafeCurrentProviderResponse, {
    'fetched paysafe current provider successfully': (resp) => resp.status === 200
  })) {
    paysafeCurrentProviderResponseErrors.add(1);
  }

  sleep(1);

  // 2. paysafe/error_codes - GET method
  let paysafeErrorCodesResponse = http.get(`${baseURL}/paysafe/error_codes`);
  if (!check(paysafeErrorCodesResponse, {
    'fetched paysafe error codes successfully': (resp) => resp.status === 200
  })) {
    paysafeErrorCodesResponseErrors.add(1);
  }

  sleep(1);

  // 3. paysafe/payment_methods - GET method
  let paysafePaymentMethodsResponse = http.get(`${baseURL}/paysafe/payment_methods`);
  if (!check(paysafePaymentMethodsResponse, {
    'fetched paysafe payment methods successfully': (resp) => resp.status === 200
  })) {
    paysafePaymentMethodsResponseErrors.add(1);
  }

  sleep(1);

  

  // 5. paymentmethods - GET method

  let paymentMethodsResponse = http.get('https://api.test.paysafe.com/paymenthub/v1/paymentmethods?currencyCode=USD');
  if (!check(paymentMethodsResponse, {
    'fetched payment methods successfully': (resp) => resp.status === 200
  })) {
   paymentMethodsResponseErrors.add(1);
  }

 sleep(1);

   6.// singleusepaymenthandles - POST method
    //Add the required payload for this endpoint
    let createPaymentPayload = {
      accountId: 1002453790,
     amount: 1000,
     billingDetails: {
        country: "US",
        zip: "27519"
      },
      card: {
        cvv: "123"
     },
      currencyCode: "USD",
      deviceFingerprinting: {
        threatMetrixSessionId: "0c4bee07-d36c-4a4a-a0aa-d28022b3885d"
      },
      merchantRefNum: "2a31967e-2b09-4220-be69-25445d42f5a4",
      paymentHandleTokenFrom: "SCLBCOWsvIIVwUlx",
      paymentType: "CARD",
      profile: {
        firstName: "Divi",
        lastName: "Eli",
        email: "divyaprabha.ulaganathan+withdrawl@prizepicks.com"
      },
     returnLinks: [
        {
         rel: "default",
         href: "https://hosted.test.paysafe.com/js/v1/latest/payment-handle-result.html"
        }
     ],
      singleUseCustomerToken: "SPQNAntiPsVfrYa1",
      transactionType: "PAYMENT"
   };
    
  
  let createPaymentResponse = http.post('https://hosted.test.paysafe.com/paymenthub/v1/singleusepaymenthandles', JSON.stringify(createPaymentPayload), {
    headers: {
      'Content-Type': 'application/json',
   }
  });
  if (!check(createPaymentResponse, {
   'create payment successfully': (resp) => resp.status === 200
  })) {
   createPaymentExistingResponseErrors.add(1);
  }

  sleep(1);

 // 8. paysafe/create_payment_existing - POST method
   let createPaymentExistingPayload = {
    amount: 1000,
    singleUseToken: "SCpo16PnUFG4ALzK",
    location: {
      lat: 35.8188162,
      long: -78.8792149,
      validLocation: true,
      mastercardAllowed: false
    },
    merchantRefNum: "2a31967e-2b09-4220-be69-25445d42f5a4"
  };

  let createPaymentExistingResponse = http.post(`${baseURL}/paysafe/create_payment_existing`, JSON.stringify(createPaymentExistingPayload), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!check(createPaymentExistingResponse, {
    'create payment existing successfully': (resp) => resp.status === 200
  })) {
    createPaymentExistingResponseErrors.add(1);
  }

  sleep(1);


//Sign out request
  let signOutResponse = http.del(`${baseURL}/users/sign_out`);
  if (!check(signOutResponse, {
    'logged out successfully': (resp) => resp.status === 204
  })) {
    signOutResponseErrors.add(1);
  }

  sleep(1);
};
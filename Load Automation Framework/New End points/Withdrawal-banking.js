import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';



export const options = {
  stages: [
    { duration: '30s', target: 300 },
    { duration: '2m', target: 300 },
  ],
};

export const signInResponseErrors = new Counter('Errors_signInResponse');
export const signOutResponseErrors = new Counter('Errors_signOutResponse');
export const paysafeCurrentProviderResponseErrors = new Counter('Errors_paysafeCurrentProviderResponse');
export const paysafeErrorCodesResponseErrors = new Counter('Errors_paysafeErrorCodesResponse');
export const withdrawalMethodsResponseErrors = new Counter('Errors_withdrawalMethodsResponse');
export const currentuserResponseErrors = new Counter('Errors_currentuserResponse');
export const sendCodeResponseErrors = new Counter('Errors_sendCodeResponse');
export const validateCodeResponseErrors = new Counter('Errors_validateCodeResponse');
export const createWithdrawalOptionsResponseErrors = new Counter('Errors_createWithdrawalOptionsResponse');
export const createWithdrawalResponseErrors = new Counter('Errors_createWithdrawalResponse');

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

  // 3. paysafe/withdrawal/withdrawal_methods - POST method
  let withdrawalMethodsPayload = {
    // Add the required payload for this endpoint
  };
  let withdrawalMethodsResponse = http.post(`${baseURL}/paysafe/withdrawal/withdrawal_methods`, JSON.stringify(withdrawalMethodsPayload), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!check(withdrawalMethodsResponse, {
    'fetched withdrawal methods successfully': (resp) => resp.status === 200
  })) {
    withdrawalMethodsResponseErrors.add(1);
  }

  
  sleep(1);

  // 4. users/current - GET
  let currentuserResponse = http.get(`${baseURL}/users/current`);
  if (!check(currentuserResponse, {
    'fetched current user successfully': (resp) => resp.status === 200
  })) {
    currentuserResponseErrors.add(1);
  }


  sleep(1);

  // 5. paysafe/withdrawal/send_code - POST method
  let sendCodePayload = {
    // Add the required payload for this endpoint
  };
  let sendCodeResponse = http.post(`${baseURL}/paysafe/withdrawal/send_code`, JSON.stringify(sendCodePayload), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!check(sendCodeResponse, {
    'send withdrawal code successfully': (resp) => resp.status === 200
  })) {
    sendCodeResponseErrors.add(1);
  }

 
  sleep(1);

  // 6. paysafe/withdrawal/validate_code - OPTIONS
  let validateCodeOptionsResponse = http.options(`${baseURL}/paysafe/withdrawal/validate_code`);
  if (!check(validateCodeOptionsResponse, {
    'validate withdrawal code options successfully': (resp) => resp.status === 200
  })) {
    validateCodeResponseErrors.add(1);
  }

 
  sleep(1);

  // 7. paysafe/withdrawal/validate_code - POST method
  let validateCodePayload = {
    // Add the required payload for this endpoint
  };
  let validateCodeResponse = http.post(`${baseURL}/paysafe/withdrawal/validate_code`, JSON.stringify(validateCodePayload), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!check(validateCodeResponse, {
    'validate withdrawal code successfully': (resp) => resp.status === 200
  })) {
    validateCodeResponseErrors.add(1);
  }

 
  sleep(1);

  // 8. paysafe/withdrawal/create_withdrawal - OPTIONS
  let createWithdrawalOptionsResponse = http.options(`${baseURL}/paysafe/withdrawal/create_withdrawal`);
  if (!check(createWithdrawalOptionsResponse, {
    'create withdrawal options successfully': (resp) => resp.status === 200
  })) {
    createWithdrawalOptionsResponseErrors.add(1);
  }



  sleep(1);

  // 9. paysafe/withdrawal/create_withdrawal - POST method
  let createWithdrawalPayload = {
    // Add the required payload for this endpoint
  };
  let createWithdrawalResponse = http.post(`${baseURL}/paysafe/withdrawal/create_withdrawal`, JSON.stringify(createWithdrawalPayload), {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  if (!check(createWithdrawalResponse, {
    'create withdrawal successfully': (resp) => resp.status === 200
  })) {
    createWithdrawalResponseErrors.add(1);
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

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
export const currentProviderResponseErrors = new Counter('Errors_currentProviderResponse');
export const errorCodesResponseErrors = new Counter('Errors_errorCodesResponse');
export const withdrawalMethodsResponseErrors = new Counter('Errors_withdrawalMethodsResponse');
export const currentUserResponseErrors = new Counter('Errors_currentUserResponse');
export const withdrawalRequestsResponseErrors = new Counter('Errors_withdrawalRequestsResponse');

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

  const currentProviderResponse = http.get(`${baseURL}/paysafe/current_provider`);
  if (!check(currentProviderResponse, {
    'fetched current provider successfully': (resp) => resp.status === 200
  })) {
    currentProviderResponseErrors.add(1);
  }

  sleep(1);

  const errorCodesResponse = http.get(`${baseURL}/paysafe/error_codes`);
  if (!check(errorCodesResponse, {
    'fetched error codes successfully': (resp) => resp.status === 200
  })) {
    errorCodesResponseErrors.add(1);
  }

  sleep(1);

  let withdrawalMethodsPayload = {
    // Add your payload for withdrawal methods POST request here
  };

  const withdrawalMethodsResponse = http.post(`${baseURL}/paysafe/withdrawal/withdrawal_methods`, JSON.stringify(withdrawalMethodsPayload), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  if (!check(withdrawalMethodsResponse, {
    'withdrawal methods posted successfully': (resp) => resp.status === 200
  })) {
    withdrawalMethodsResponseErrors.add(1);
  }

  sleep(1);

  const currentUserResponse = http.get(`${baseURL}/users/current`);
  if (!check(currentUserResponse, {
    'fetched current user successfully': (resp) => resp.status === 200
  })) {
    currentUserResponseErrors.add(1);
  }

  sleep(1);

  const withdrawalRequestsResponse = http.get(`${baseURL}/paysafe/withdrawal/withdrawal_requests`);
  if (!check(withdrawalRequestsResponse, {
    'fetched withdrawal requests successfully': (resp) => resp.status === 200
  })) {
    withdrawalRequestsResponseErrors.add(1);
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

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
export const withdrawalStatusResponseErrors = new Counter('Errors_withdrawalStatusResponse');
export const paypalWithdrawalErrors = new Counter('Errors_paypalWithdrawal');


export default () => {
  const baseURL = 'https://api.load01.prizepicks.com';
  const merchantRefNum = '8d86cf83-cc50-4562-b88a-d0a4ee248373';

  // Sign in request
  const userEmail = `hammertime+${__VU + 0}@prizepicks.com`;
  const userPassword = '1password;';
  const userLogin = {
    user: {
      email: userEmail,
      password: userPassword,
      remember_me: false
    }
  };
  
  const signInResponse = http.post(`${baseURL}/users/sign_in`, JSON.stringify(userLogin), {
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

  // Withdrawal Status request
  const withdrawalStatusResponse = http.get(`${baseURL}/paysafe/withdrawal/withdrawal_status?merchantRefNum=${merchantRefNum}`);
  if (!check(withdrawalStatusResponse, {
    'fetched withdrawal status successfully': (resp) => resp.status === 200
  })) {
    withdrawalStatusResponseErrors.add(1);
  }

  sleep(1);
  
  
  
   

  // Sign out request
  const signOutResponse = http.del(`${baseURL}/users/sign_out`);
  if (!check(signOutResponse, {
    'logged out successfully': (resp) => resp.status === 204
  })) {
    signOutResponseErrors.add(1);
  }

  sleep(1);
};

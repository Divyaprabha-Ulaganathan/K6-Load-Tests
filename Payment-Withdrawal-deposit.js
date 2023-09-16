import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '30s', target: 100 },
    { duration: '2m', target: 100 },
  ],
};

export const signInResponseErrors = new Counter('Errors_signInResponse');
export const leaguesResponseErrors = new Counter('Errors_leaguesResponse');
export const entriesResponseErrors = new Counter('Errors_entriesResponse');
export const promotionsResponseErrors = new Counter('Errors_promotionsResponse');
export const currentuserResponseErrors = new Counter('Errors_currentuserResponse');
export const projectionsResponseErrors = new Counter('Errors_projectionsResponse');
export const pickResponseErrors = new Counter('Errors_pickResponseErrors');
export const signOutResponse = new Counter('Errors_signOutResponse');
export const withdrawalRequestErrors = new Counter('Errors_withdrawalRequest');
export const depositRequestErrors = new Counter('Errors_depositRequest');

export default () => {
  const baseURL = 'https://api.load01.prizepicks.com';

  const userEmail = `hammertime+${__VU}@prizepicks.com`;
  const userPassword = '1password;';

  const logPrefix = `[${userEmail}](${__ITER})`;

  let userLogin = {
    user: {
      email: userEmail,
      password: userPassword,
      remember_me: false,
    },
  };

  let signInResponse = http.post(`${baseURL}/users/sign_in`, JSON.stringify(userLogin), {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!check(signInResponse, {
    'logged in successfully': (resp) => resp.status === 200,
  })) {
    signInResponseErrors.add(1);
  }

  sleep(1);

  const loopCount = 5;
  for (let i = 0; i < loopCount; i++) {
    const leaguesResponse = http.get(`${baseURL}/leagues`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!check(leaguesResponse, {
      'fetched leagues successfully': (resp) => resp.status === 200,
    })) {
      leaguesResponseErrors.add(1);
    }

    sleep(0.5);

    // Add withdrawal request function here
    makeWithdrawalRequest(baseURL, userEmail, userPassword, logPrefix);

    // Add deposit request function here
    makeDeposit(baseURL, userEmail, userPassword, logPrefix);

    sleep(0.5);
  }

  function makeWithdrawalRequest(baseURL, userEmail, userPassword, logPrefix) {
    const withdrawalResponse = http.get(`${baseURL}/payments/withdrawal_requests`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log(`${logPrefix}~ Withdrawal Response: ${withdrawalResponse.status}`);

    if (!check(withdrawalResponse, {
      'withdrawal request successful': (resp) => resp.status === 200,
    })) {
      withdrawalRequestErrors.add(1);
      console.error(`Failed to make a withdrawal request: ${withdrawalResponse.status}`);
    }
  }

  function makeDeposit(baseURL, userEmail, userPassword, logPrefix) {
    const depositResponse = http.get(`${baseURL}/payments/deposit`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log(`${logPrefix}~ Deposit Response: ${depositResponse.status}`);

    if (!check(depositResponse, {
      'deposit request successful': (resp) => resp.status === 200,
    })) {
      depositRequestErrors.add(1);
      console.error(`Failed to make a deposit request: ${depositResponse.status}`);
    }
  }

  const signOutResponse = http.del(`${baseURL}/users/sign_out`, {
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!check(signOutResponse, {
    'logged out successfully': (resp) => resp.status === 204,
  })) {
    signOutResponseErrors.add(1);
  }

  sleep(1);
};

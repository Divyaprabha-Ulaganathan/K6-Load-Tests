import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '10s', target: 1 }, // Start with 1 VU for 10 seconds
    { duration: '10s', target: 100 }, // Increase to 100 VUs for 10 seconds
    { duration: '10s', target: 1 }, // Drop back to 1 VU for 10 seconds
  ],
};

export const signInResponseErrors = new Counter('Errors_signInResponse');
export const leaguesResponseErrors = new Counter('Errors_leaguesResponse');
export const signOutResponse = new Counter('Errors_signOutResponse');
export const withdrawalRequestErrors = new Counter('Errors_withdrawalRequest');
export const depositRequestErrors = new Counter('Errors_depositRequest');
export const paymentStatusErrors = new Counter('Errors_paymentStatus');

export default () => {
  const baseURL = 'https://api.load01.prizepicks.com';

  

  const userEmail = `hammertime+${__VU + 0}@prizepicks.com`;
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
    'Logged in successfully': (resp) => resp.status === 200,
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

    //makeWithdrawal(baseURL, userEmail, userPassword, logPrefix);

    makeWithdrawalRequest(baseURL, userEmail, userPassword, logPrefix);

    lookupPaymentStatus(baseURL, userEmail, userPassword, logPrefix);

    makeDeposit(baseURL, userEmail, userPassword, logPrefix);

    sleep(0.5);
  }

  //function makeWithdrawal(baseURL, userEmail, userPassword, logPrefix) {
   // const withdrawalResponse = http.get(`${baseURL}/payments/withdrawal`, {
    //  headers: {
       // 'Accept': 'application/json',
     // },
   // });
  
   // console.log(`${logPrefix}~ Withdrawal Response: ${withdrawalResponse.status}`);
  
   // if (!check(withdrawalResponse, {
   //   'Withdrawal request successful': (resp) => resp.status === 200,
   // })) {
   //   withdrawalRequestErrors.add(1);
   //   console.error(`Failed to make a withdrawal request: ${withdrawalResponse.status}`);
   // }
 // }

  function makeWithdrawalRequest(baseURL, userEmail, userPassword, logPrefix) {
    const withdrawalResponse = http.get(`${baseURL}/payments/withdrawal_requests`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log(`${logPrefix}~ Withdrawal Response: ${withdrawalResponse.status}`);

    if (!check(withdrawalResponse, {
        'Withdrawal request response successful': (resp) => resp.status === 200,
    })) {
      withdrawalRequestErrors.add(1);
      console.error(`Failed to make a withdrawal request: ${withdrawalResponse.status}`);
    }
  }

  function lookupPaymentStatus(baseURL, userEmail, userPassword, logPrefix) {
    const paymentStatusResponse = http.get(`${baseURL}/payments/lookup_payment_status`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log(`${logPrefix}~ Payment Status Response: ${paymentStatusResponse.status}`);

    if (!check(paymentStatusResponse, {
        'Payment status lookup successful': (resp) => resp.status === 200,
    })) {
      paymentStatusErrors.add(1);
      console.error(`Failed to lookup payment status: ${paymentStatusResponse.status}`);
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
     'Fetched Deposit request successful': (resp) => resp.status === 200,
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

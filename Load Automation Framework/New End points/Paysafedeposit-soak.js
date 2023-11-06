import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export let options = {
  vus: 10,             // Number of virtual users
  duration: '2h',      // Duration of the soak test (1 hour in this example)
};

// Define the base URL
const baseUrl = 'https://api.load01.prizepicks.com';

export const signInResponseErrors = new Counter('Errors_signInResponse');
export const leaguesResponseErrors = new Counter('Errors_leaguesResponse');
export const signOutResponse = new Counter('Errors_signOutResponse');

export default () => {
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

    let signInResponse = http.post(`${baseUrl}/users/sign_in`, JSON.stringify(userLogin), {
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
      const leaguesResponse = http.get(`${baseUrl}/leagues`, {
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
    }

// Define the endpoint for deposit
const depositEndpoint = '/paysafe/create_payment_existing';

// Define the request function for deposit
function postDepositRequest() {
  const requestBody = {
    amount: 10000,
    singleUseToken: "SCYQWLr6wsMlFchc",
    merchantRefNum: "f7e240d6-bc23-4c60-900c-59fbc0cb958c",
    location: {
      lat: 35.8188433,
      long: -78.8790995,
      validLocation: true,
      mastercardAllowed: false,
      state: "North Carolina"
    }
  };

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return http.post(`${baseUrl}${depositEndpoint}`, JSON.stringify(requestBody), params);
}

//export default function () {
  // Loop for the duration of the test
  for (let i = 0; i < 60; i++) { // 60 iterations, simulating a request every minute for 1 hour
    let response = postDepositRequest();

    check(response, {
      'Status is 200': (r) => r.status === 200,
      // Add additional checks if needed
    });

    // Sleep for a short duration (e.g., 60 seconds) between deposit attempts
    sleep(60);
  }
}

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const baseUrl = 'https://api.load01.prizepicks.com';

export const options = {
  vus: 50,
  duration: '1m',
};

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

    // Define the deposit endpoints
    const depositEndpoints = [
      '/deposit',
      '/paysafe/current_provider',
      '/paysafe/error_codes',
      '/paysafe/payment_methods',
      '/paysafe/create_payment_existing',
      '/deposit-confirmation-page',
      '/aeropay/create_payment', 
    ];

    for (const endpoint of depositEndpoints) {
      if (endpoint.includes('Post')) {
        const requestBody = {
          amount: 10000,
          singleUseToken: 'SCYQWLr6wsMlFchc',
          merchantRefNum: 'f7e240d6-bc23-4c60-900c-59fbc0cb958c',
          location: {
            lat: 35.8188433,
            long: -78.8790995,
            validLocation: true,
            mastercardAllowed: false,
            state: 'North Carolina',
          },
        };
        const response = http.post(`${baseUrl}${endpoint}`, JSON.stringify(requestBody), {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(`Response for ${endpoint}:`, response.status, response.body);
        check(response, {
          'Deposit is successful': (r) => r.status === 200,
        });
      } else {
        const response = http.get(`${baseUrl}${endpoint}`);
        check(response, {
          'Paysafe deposit': (r) => r.status === 200,
        });
      }
    }

    const signOutResponse = http.del(`${baseUrl}/users/sign_out`, {
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
}

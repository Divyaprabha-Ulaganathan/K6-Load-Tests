import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

const baseUrl = 'https://api.load01.prizepicks.com';

export const options = {
  stages: [
    //{ duration: '1m', target: 10 },
    //{ duration: '2m', target: 50 },
    { duration: '60s', target: 2 },
  ],
  thresholds: {
    'Errors_signInResponse': ['rate<0.01'],
    'Errors_leaguesResponse': ['rate<0.02'],
    'http_req_failed{endpoint:/deposit}': ['rate<0.005'],
    'http_req_failed{endpoint:/paysafe/current_provider}': ['rate<0.005'],
    'http_req_failed{endpoint:/paysafe/error_codes}': ['rate<0.005'],
    'http_req_failed{endpoint:/paysafe/payment_methods}': ['rate<0.005'],
    'http_req_failed{endpoint:/paysafe/create_payment_existing}': ['rate<0.005'],
    'http_req_failed{endpoint:/paysafe/create_payment_new}': ['rate<0.005'],  // New threshold
    'http_req_failed{endpoint:/deposit-confirmation-page}': ['rate<0.005'],
    'Errors_signOutResponse': ['rate<0.01'],
  },
};

export const signInResponseErrors = new Counter('Errors_signInResponse');
export const leaguesResponseErrors = new Counter('Errors_leaguesResponse');
export const signOutResponseErrors = new Counter('Errors_signOutResponse');

function printThreshold(endpoint, threshold) {
  console.log(`Threshold for ${endpoint}: ${threshold}`);
}

export default () => {
    const userEmail = `loadtest+${__VU}@prizepicks.com`;
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

    const depositEndpoints = [
      '/deposit',
      '/paysafe/current_provider',
      '/paysafe/error_codes',
      '/paysafe/payment_methods',
      '/paysafe/create_payment_existing',
      '/paysafe/create_payment_new', // New endpoint added
      '/deposit-confirmation-page',
    ];

    for (const endpoint of depositEndpoints) {
      if (endpoint.includes('Post')) {
        const requestBody = {
          "amount": 2500,
        "bankAccountId": "22610",
        "merchantRefNum": "be6bcccd-ea6d-4132-9c14-f5ba187216cb",
        "location": {
            "lat": 35.8188444,
            "long": -78.8790833,
            "validLocation": true,
            "mastercardAllowed": false,
            "state": "North Carolina",
            "stateAbbreviation": "NC",
            "f2pOnly": false
          },
        };
        const response = http.post(`${baseUrl}${endpoint}`, JSON.stringify(requestBody), {
          headers: {
            'API_KEY': '0b92f9ab74191888b8effaf9ad0e842',
            'USER_ID': '5904836',       
           'Cookie':'_prizepicks_session=JQn6YQzR5VawMcl0GW7yqaWwz2eFuyjZ0S4AvIq01S7lTg3uLnxpUi9c0U14lVkZnuUo8ui7PVPf2U5J1wxh%2Bjrv6EBupdXzy8XDoSyjYF%2FeuNyYcqCjqcAsB0jcH08LNiiK17iAT9LOqxa3ttOsqXzJraR1NP9duefjkNUa1F0wpWjLLkShk8aPs0Zq35zwdw%2F3pkBzf%2F0z4YtJOikNq1J8jCW1YG9pGc%2BpBVz%2F9p2GVruAIB2QFqmB3mT8H%2F0KYguGbD2Yybh7CNrfWdRYQNlVbUYQSh8q%2BAMrJxr64xyrV1eui5jGRSJnXiC%2Bu9ZLEkWezBmcAeCosWgz3eKTSojQhVyiBmQQLugRdx0f%2BAw8V328Pt6KLi1MMRoEhbDunSh0miQfIVur%2B9wn4oga4wqanvCy05K6XjP7872Z1vFf0hYlyvcXfosmhmWWUeYirJppOrkPWrN7XAW%2FfRyyBFZdES9DnrGAKhV%2FcLFZndCuOWkKHOGSpxyu1goN29n5%2FZvktuduu6e8AhaZMw%3D%3D--W4h%2FulgmngkqHmp%2B--VRZc1ezvkzZMUOHI%2FKX6zw%3D%3D; remember_user_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IlcxczFPVEEwT0RNMlhTd2lKREpoSkRBMEpDNXFaamRGTjJaRVVteHNlbEl6YjNCNWFVOXhNRTlsWkRoaE1XVm1ZelpoWTJWalpqTTVPVFU1Tm1ZeU1Ua3hPRFptTnpZeE5TSXNJakUyT1RjMU9UQTVNRFF1TURJME1ERXpPQ0pkIiwiZXhwIjoiMjAyMy0xMS0wMVQwMTowMTo0NC4wMjRaIiwicHVyIjoiY29va2llLnJlbWVtYmVyX3VzZXJfdG9rZW4ifX0%3D--19592df57d4cf14368eee8adaa1b9bd97cd93c26',
            'content-type': 'application/json',
          
          },
        });

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

    // Printing the thresholds
   // printThreshold('/paysafe/create_payment_new', 'rate<0.005');
}

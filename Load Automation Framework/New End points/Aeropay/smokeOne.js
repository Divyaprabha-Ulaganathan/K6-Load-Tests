import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // Adjust based on desired VU ramp-up
    { duration: '1m', target: 10 }
  ],
};

export const homepageErrors = new Counter('Errors_homepage');
export const currentUserErrors = new Counter('Errors_currentUser');
export const verifyLocationErrors = new Counter('Errors_verifyLocation');
export const createPaymentErrors = new Counter('Errors_createPayment');

function fetchGET(url, checks, errorCounter) {
  const response = http.get(url);
  if (!check(response, checks)) {
    errorCounter.add(1);
  }
}

function sendPOST(url, payload, checks, errorCounter) {
  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN_HERE'  // Uncomment and replace if needed.
  };
  const response = http.post(url, JSON.stringify(payload), { headers });
  if (!check(response, checks)) {
    errorCounter.add(1);
  }
}

export default function() {
  fetchGET('https://load01.prizepicks.com/', {
    'Homepage body contains "PrizePicks"': (r) => r.body.includes('PrizePicks'),
  }, homepageErrors);
  sleep(1);

  fetchGET('https://api.load01.prizepicks.com/users/current', {
    'Response contains user data': (r) => r.json().hasOwnProperty('userId'),
  }, currentUserErrors);
  sleep(1);

  fetchGET('https://api.load01.prizepicks.com/geo/verify_location?lat=35.8188548&lng=-78.8792646', {
    'Location is valid': (r) => r.json().validLocation === true,
  }, verifyLocationErrors);
  sleep(1);

  const payload = {
    "amount": 10000,
    "bankAccountId": "22612",
    "merchantRefNum": "84ec2419-6ee2-49ec-8929-8e10b7553e1a",
    "location": {
      "lat": 35.8188548,
      "long": -78.8792646,
      "validLocation": true,
      "mastercardAllowed": false,
      "state": "North Carolina",
      "stateAbbreviation": "NC",
      "f2pOnly": false
    }
  };
  
  sendPOST('https://api.load01.prizepicks.com/aeropay/create_payment', payload, {
    'Posted successfully': (r) => r.status === 200,
    'Payment deposited successfully': (r) => r.json().message === "Payment deposited successfully",
  }, createPaymentErrors);
  sleep(1);
}

import http from 'k6/http';
import { check,sleep } from 'k6';

// Define the base URL
const baseURL = 'https://api.load01.prizepicks.com';

export let options = {
    vus: 10,  // Number of virtual users (simulated users)
    duration: '30s'  // Duration of the test
};

// Function to sign in
function signIn() {
    const userEmail = `hammertime+${__VU + 0}@prizepicks.com`;
    const userPassword = '1password;';

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

    check(signInResponse, { 'logged in successfully': (resp) => resp.status === 200 });

    sleep(1);
}

export default function () {
    // Call the sign-in function
    signIn();

    // Define the URL and request payload for the payment endpoint
    const paymentURL = `${baseURL}/aeropay/create_payment`;
    const payload = JSON.stringify({
        "amount": 1000,
        "bankAccountId": "22610",
        "location": {
            "lat": 35.8188768,
            "long": -78.8792728,
            "validLocation": true,
            "mastercardAllowed": false
        },
        "merchantRefNum": "e9067caf-864f-408d-955e-24b73b1ce81c"
    });

    // Set request headers (if required)
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    // Send the POST request for payment
    const response = http.post(paymentURL, payload, { headers });

    // Add a check for response status code 200
    check(response, { 'status is 200': r => r.status === 200 });

    // Log the response (optional)
    console.log(`Response status code: ${response.status}`);

    sleep(1);
}

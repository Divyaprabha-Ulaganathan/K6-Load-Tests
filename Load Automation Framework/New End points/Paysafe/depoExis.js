import { sleep, group, check } from 'k6';
import http from 'k6/http';
import { Counter } from 'k6/metrics';

export const options = {
    stages: [
        { duration: '1m', target: 100 },
        { duration: '5m', target: 100 },
        { duration: '2m', target: 200 },
        { duration: '5m', target: 200 },
        { duration: '2m', target: 0 },
    ],
};

const baseURL = 'https://api.load01.prizepicks.com';
const userEmail = `hammertime+${__VU + 0}@prizepicks.com`;
const userPassword = '1password;';
let signInResponseErrors = new Counter('login_errors');

function signIn() {
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

    check(signInResponse, {
        'logged in successfully': (resp) => resp.status === 200
    }) || signInResponseErrors.add(1);
}

function createPayment() {
    const payload = {
        "amount": 1000,
        "singleUseToken": "SCIu8NPy478Vv4gX",
        "merchantRefNum": "f6bb6f61-c1e6-4b2e-a7b7-04e857929b36",
        "location": {
            "lat": 35.8187933,
            "long": -78.8791574,
            "validLocation": true,
            "mastercardAllowed": false,
            "state": "North Carolina",
            "stateAbbreviation": "NC",
            "f2pOnly": false
        }
    };

    const response = http.post(`${baseURL}/paysafe/create_payment_existing`, JSON.stringify(payload), {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    check(response, {
        'payment created successfully': (resp) => resp.status === 200
    });
}

export default function () {
    signIn();
    createPayment();

    group('Scenario 1', function () {
        const urls1 = [
            'https://load01.prizepicks.com/',
            'https://load01.prizepicks.com/deposit',  // Added this new endpoint
            'https://hosted.paysafe.com/js/v1/latest/paysafe.min.js',
            'https://api.load01.prizepicks.com/users/current',
            'https://api.load01.prizepicks.com/promotions'
        ];
        
        urls1.forEach(url => {
            let response = http.get(url);
            check(response, {
                [`${url}: status is 200`]: (r) => r.status === 200,
            });
        });
    });
    
    group('Scenario 2 (Page 2)', function () {
        const urls2 = [
            'https://api.load01.prizepicks.com/paysafe/current_provider',
            'https://api.load01.prizepicks.com/paysafe/error_codes',
            'https://api.load01.prizepicks.com/paysafe/payment_methods',
            'https://api.load01.prizepicks.com/geo/verify_location?lat=35.8187933&lng=-78.8791574',
            'https://api.load01.prizepicks.com/paysafe/create_payment_existing'
        ];
        
        urls2.forEach(url => {
            let response = http.get(url);
            check(response, {
                [`${url}: status is 200`]: (r) => r.status === 200,
            });
        });
    });

    sleep(1);  // Optional: simulating user think-time
}

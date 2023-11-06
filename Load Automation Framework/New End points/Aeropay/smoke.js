
import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,
    duration: '1m',
};

let headers = {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer YOUR_TOKEN_HERE'  // Uncomment and replace if needed.
};

function fetchURL(url, validation = null) {
    let response = http.get(url);
    let checks = {
        'status is 200': (r) => r.status === 200,
    };

    if (validation) {
        checks = { checks, validation }; // Properly merging the checks
    }

    check(response, checks);
}

function sendPOST(url, payload) {
    let response = http.post(url, JSON.stringify(payload), { headers: headers });
    
    console.log(`POST status for ${url}: ${response.status}`);
    console.log(`Response for ${url}: ${response.body}`);
    
    let isSuccess = response.json().message === "Payment deposited successfully";
    check(response, {
        'Posted successfully': (r) => r.status === 200,
        'Payment deposited successfully': (r) => isSuccess,
    });
    
    if(isSuccess) {
        console.log('Payment deposited successfully');
    } else {
        console.error(`Unexpected message for ${url}.`);
    }
}

function userThinkTime(seconds) {
    sleep(seconds);
}

export default function() {
    fetchURL('https://load01.prizepicks.com/', {
        'Homepage body contains "PrizePicks"': (r) => r.body.includes('PrizePicks'),
    });
    userThinkTime(1);

    fetchURL('https://api.load01.prizepicks.com/users/current', {
        'Response contains user data': (r) => r.json().hasOwnProperty('userId') // Assuming the response returns a userId
    });
    userThinkTime(1);

    fetchURL('https://api.load01.prizepicks.com/geo/verify_location?lat=35.8188548&lng=-78.8792646', {
        'Location is valid': (r) => r.json().validLocation === true, // Adjust based on actual response structure
    });
    userThinkTime(1);

    let payload = {
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

    sendPOST('https://api.load01.prizepicks.com/aeropay/create_payment', payload);
    userThinkTime(1);
}


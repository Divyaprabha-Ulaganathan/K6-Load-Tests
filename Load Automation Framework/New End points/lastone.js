// import necessary module
import http from "k6/http";
import { check, sleep } from 'k6';

export let options = {
    vus: 1, // number of virtual users
    duration: '60s', // duration of the test
};

export default () => {
    // define URL and payload
    const url = "https://api.load01.prizepicks.com/aeropay/create_payment";

    const payload = JSON.stringify({
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
        }
    });

    const params = {
        headers: {
            'API_KEY': '0b92f9ab74191888b8effaf9ad0e842',
            'USER_ID': '5904836',       
           'Cookie':'_prizepicks_session=JQn6YQzR5VawMcl0GW7yqaWwz2eFuyjZ0S4AvIq01S7lTg3uLnxpUi9c0U14lVkZnuUo8ui7PVPf2U5J1wxh%2Bjrv6EBupdXzy8XDoSyjYF%2FeuNyYcqCjqcAsB0jcH08LNiiK17iAT9LOqxa3ttOsqXzJraR1NP9duefjkNUa1F0wpWjLLkShk8aPs0Zq35zwdw%2F3pkBzf%2F0z4YtJOikNq1J8jCW1YG9pGc%2BpBVz%2F9p2GVruAIB2QFqmB3mT8H%2F0KYguGbD2Yybh7CNrfWdRYQNlVbUYQSh8q%2BAMrJxr64xyrV1eui5jGRSJnXiC%2Bu9ZLEkWezBmcAeCosWgz3eKTSojQhVyiBmQQLugRdx0f%2BAw8V328Pt6KLi1MMRoEhbDunSh0miQfIVur%2B9wn4oga4wqanvCy05K6XjP7872Z1vFf0hYlyvcXfosmhmWWUeYirJppOrkPWrN7XAW%2FfRyyBFZdES9DnrGAKhV%2FcLFZndCuOWkKHOGSpxyu1goN29n5%2FZvktuduu6e8AhaZMw%3D%3D--W4h%2FulgmngkqHmp%2B--VRZc1ezvkzZMUOHI%2FKX6zw%3D%3D; remember_user_token=eyJfcmFpbHMiOnsibWVzc2FnZSI6IlcxczFPVEEwT0RNMlhTd2lKREpoSkRBMEpDNXFaamRGTjJaRVVteHNlbEl6YjNCNWFVOXhNRTlsWkRoaE1XVm1ZelpoWTJWalpqTTVPVFU1Tm1ZeU1Ua3hPRFptTnpZeE5TSXNJakUyT1RjMU9UQTVNRFF1TURJME1ERXpPQ0pkIiwiZXhwIjoiMjAyMy0xMS0wMVQwMTowMTo0NC4wMjRaIiwicHVyIjoiY29va2llLnJlbWVtYmVyX3VzZXJfdG9rZW4ifX0%3D--19592df57d4cf14368eee8adaa1b9bd97cd93c26',
            'content-type': 'application/json',
          
        }
    };

    // send a post request and save response as a variable
    const res = http.post(url, payload, params);
   // console.log(`Request Body: ${payload}`);
    console.log(`Response Status: ${res.status}`);
   // console.log(`Response Body: ${res.body}`);
    check(res, {
        "Created Aeropay Payment Successfully": (res) => res.status == 200,
    });

    sleep(21.5);
}

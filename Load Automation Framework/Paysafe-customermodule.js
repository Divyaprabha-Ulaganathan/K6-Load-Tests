import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 10, // Number of Virtual Users
  duration: '30s', // Duration of the test
};

const BASE_URL = 'https://api.load01.prizepicks.com/paysafe/'; 



// Define requests
const requests = [
  {
    name: 'Create a Customer with paymentHandleToken',
    method: 'POST',
    url: '/paymenthub/v1/customers',
    body: JSON.stringify({
      merchantCustomerId: '{{$guid}}',
      paymentHandleTokenFrom: '{{token}}',
      locale: 'en_US',
      firstName: '{{$randomFirstName}}',
      lastName: '{{$randomLastName}}',
      dateOfBirth: {
        day: 11,
        month: 11,
        year: 1990,
      },
      email: '{{$randomEmail}}',
      phone: '{{$randomPhoneNumber}}',
    }),
  },
  {
    name: 'GET Customer by customerId',
    method: 'GET',
    url: '/paymenthub/v1/customers/{{customerId}}',
  },
  {
    name: 'GET Customer Payment Handle',
    method: 'GET',
    url: '/paymenthub/v1/customers/{{customerId}}/paymenthandles/{{paymenthandleid}}',
  },
  {
    name: 'GET Customer by Merchant Customer ID',
    method: 'GET',
    url: '/paymenthub/v1/customers?merchantCustomerId={{merchantCustomerId}}&fields=paymenthandles',
  },
  {
    name: 'Create SingleUserCustomerToken TEST',
    method: 'POST',
    url: '/paymenthub/v1/customers/{{customerId}}/singleusecustomertokens',
    body: JSON.stringify({}),
  },
  {
    name: 'Create Mutli-Use Token From SingleUse',
    method: 'POST',
    url: '/paymenthub/v1/customers/{{customerId}}/paymenthandles',
    body: JSON.stringify({
      paymentHandleTokenFrom: '{{token}}',
      billingDetails: {
        billingDetailsId: '{{billingDetailsId}}',
      },
    }),
  },
  {
    name: 'GET customerId by Subcomponents PROD',
    method: 'GET',
    url: '/paymenthub/v1/customers/{{customerId}}?fields=paymenthandles,addresses',
  },
  {
    name: 'GET customerId by Subcomponents PaymentHandles',
    method: 'GET',
    url: '/paymenthub/v1/customers/{{customerId}}?fields=paymenthandles',
  },
  {
    name: 'GET customerId by Subcomponents Addresses',
    method: 'GET',
    url: '/paymenthub/v1/customers/{{customerId}}?fields=addresses,paymenthandles',
  },
  {
    name: 'Update a Customer',
    method: 'PUT',
    url: '/paymenthub/v1/customers/{{customerId}}',
    body: JSON.stringify({
      merchantCustomerId: 'UpdateTestq00003',
      locale: 'fr_CA',
    }),
  },
  {
    name: 'Customers/Customer Payment Handles/Update a Customer Payment Handle',
    method: 'PUT',
    url: '/paymenthub/v1/customers/{{customerId}}/paymenthandles/{{paymenthandleid}}',
    body: JSON.stringify({
      merchantRefNum: '{{$guid}}',
      card: {
        cardExpiry: {
          month: '8',
          year: '2028',
        },
        cvv: '346',
      },
    }),
  },
  {
    name: 'DELETE PaymentHandles from Profile',
    method: 'DELETE',
    url: '/paymenthub/v1/customers/{{customerId}}/paymenthandles/dc6af33f-f06c-48fc-87df-d979ac5b272a',
  },
  {
    name: 'DELETE adresses from Profile',
    method: 'DELETE',
    url: '/paymenthub/v1/customers/{{customerId}}/addresses/{{billingDetailsId}}',
  },
  {
    name: 'DELETE a Customer Profile',
    method: 'DELETE',
    url: '/paymenthub/v1/customers/{{customerId}}',
  },
  {
    name: 'Create a Customer Address',
    method: 'POST',
    url: '/paymenthub/v1/customers/{{customerId}}/addresses',
    body: JSON.stringify({
      street: '{{$randomStreetAddress}}',
      city: 'Atlanta',
      zip: '30328',
      country: 'US',
      state: 'GA',
    }),
  },
  {
    name: 'Add Card to existing Customer',
    method: 'POST',
    url: '/paymenthub/v1/customers/{{customerId}}/cards',
    body: JSON.stringify({
      cardNum: '4111111111111111',
      accountId: '1002370290',
      cardExpiry: {
        month: 12,
        year: 2029,
      },
      nickName: 'John Corporate Card',
      merchantRefNum: 'MC123',
      holderName: 'John Smith',
      billingAddressId: '209e365e-11f3-4470-8bbf-22178d04c040',
      defaultCardIndicator: false,
    }),
  },
  {
    name: 'GET Customer Address',
    method: 'GET',
    url: '/paymenthub/v1/customers/{{customerId}}/addresses/b936d5db-1bbf-4678-a592-71b75f14c03e',
  },
  {
    name: 'Update a Customer Address',
    method: 'PUT',
    url: '/paymenthub/v1/customers/{{customerId}}/addresses/{{billingDetailsId}}',
    body: JSON.stringify({
      nickName: 'Home',
      street: '302 Bld',
      street2: 'Unit 201',
      city: 'Montreal',
      zip: 'H5H 2N2',
      country: 'CA',
      state: 'QC',
      phone: '647-788-3901',
      defaultShippingAddressIndicator: true,
    }),
  },
];

// Define scenarios
export let createCustomerScenario = {
  executor: 'shared-iterations',
  vus: 5,
  iterations: 10,
  maxDuration: '10s',
  exec: 'createCustomerRequests',
};

export let updateCustomerScenario = {
  executor: 'shared-iterations',
  vus: 5,
  iterations: 10,
  maxDuration: '10s',
  exec: 'updateCustomerRequests',
};

// Create customer requests
export function createCustomerRequests() {
  for (const request of createCustomerRequests) {
    let response = http.request(
      request.method,
      `${BASE_URL}${request.url}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: request.body,
      },
    );

    check(response, {
      'status is 200': (r) => r.status === 200,
    });

    sleep(1); // Adjust as needed to control the request rate
  }
}

// Update customer requests
export function updateCustomerRequests() {
  for (const request of updateCustomerRequests) {
    let response = http.request(
      request.method,
      `${BASE_URL}${request.url}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: request.body,
      },
    );

    check(response, {
      'status is 200': (r) => r.status === 200,
    });

    sleep(1); // Adjust as needed to control the request rate
  }
}

export default function () {
  for (const request of requests) {
    let response = http.request(
      request.method,
      `${BASE_URL}${request.url}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: request.body,
      },
    );

    check(response, {
      'status is 200': (r) => r.status === 200,
    });

    sleep(1); // Adjust as needed to control the request rate
  }
}  


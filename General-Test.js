import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

export const options = {
  stages: [
    { duration: '30s', target: 3000 },
    { duration: '2m', target: 3000 },
  ],
};

export const signInResponseErrors      = new Counter('Errors_signInResponse');
export const leaguesResponseErrors     = new Counter('Errors_leaguesResponse');
export const entriesResponseErrors     = new Counter('Errors_entriesResponse');
export const promotionsResponseErrors  = new Counter('Errors_promotionsResponse');
export const currentuserResponseErrors = new Counter('Errors_currentuserResponse');
export const projectionsResponseErrors = new Counter('Errors_projectionsResponse');
export const pickResponseErrors        = new Counter('Errors_pickResponseErrors');
export const signOutResponse           = new Counter('Errors_signOutResponse');

export default () => {
  const baseURL = 'https://api.load01.prizepicks.com';

  const userEmail = 'hammertime+${__VU + 0}@prizepicks.com';
  const userPassword = '1password;';

  const logPrefix = `[${userEmail}](${__ITER})`

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

  // const signInResponse = http.post(`${baseURL}/users/sign_in`,
  //   JSON.stringify({
  //     user: {
  //       email: userEmail,
  //       password: userPassword,
  //       remember_me: false
  //     }
  //   }), {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   }
  // );

  if (!check(signInResponse, {
    'logged in successfully': (resp) => resp.status === 200
  })) {
    signInResponseErrors.add(1);
  }
  // console.log(`${logPrefix}? LoggedIn: ${signInResponse.status}`);

  sleep(1);

  const loopCount = 5;
  for (let i = 0; i < loopCount; i++) {
    const leaguesResponse = http.get(`${baseURL}/leagues`);
    if (!check(leaguesResponse, {
      'fetched leagues successfully': (resp) => resp.status === 200
    })) {
      leaguesResponse.add(1);
    }

    // console.log(`${logPrefix}? Leagues: ${leaguesResponse.status}`);

    sleep(0.5);

    const entriesResponse = http.get(`${baseURL}/v1/entries`);
    if (!check(entriesResponse, {
      'fetched entries successfully': (resp) => resp.status === 200
    })) {
      entriesResponseErrors.add(1);
    }
    // console.log(`${logPrefix}? Entries: ${entriesResponse.status}`);

    sleep(0.5);

    const promotionsResponse = http.get(`${baseURL}/projections`);
    if (!check(promotionsResponse, {
      'fetched promotions successfully': (resp) => resp.status === 200
    })) {
      promotionsResponseErrors.add(1);
    }
    // console.log(`${logPrefix}? Promotions: ${promotionsResponse.status}`);

    sleep(0.5);

    const currentuserResponse = http.get(`${baseURL}/users/current`);
    if (!check(currentuserResponse, {
      'fetched currentuser successfully': (resp) => resp.status === 200
    })) {
      currentuserResponseErrors.add(1);
    }
    // console.log(`${logPrefix}? Currentuser: ${currentuserResponse.status}`);

    sleep(0.5);

    let projectionsResponse = http.get(`${baseURL}/projections`);
    if (!check(projectionsResponse, {
      'fetched projections successfully': (resp) => resp.status === 200
    })) {
      projectionsResponseErrors.add(1);
    }
    // console.log(`${logPrefix}? Projections: ${projectionsResponse.status}`);

    let projections = JSON.parse(projectionsResponse.body).data;
    let playerData = JSON.parse(projectionsResponse.body).included;

    // Ensure we have at least two projections to pick
    if (projections.length < 2) {
      console.error("Not enough projections to pick from!");
      return;
    }

    const uniqueProjections = [];
    const checkedIndices = new Set();

    while (uniqueProjections.length < 2 && checkedIndices.size < projections.length) {
        const randomIndex = Math.floor(Math.random() * projections.length);
        if (checkedIndices.has(randomIndex)) {
            continue;
        }

        checkedIndices.add(randomIndex);

        // Finds a unique projection
        const item = projections[randomIndex];


        // Finds the player metadata for the projection
        const player = playerData.find(i => i.type === "new_player" && item.relationships.new_player.data.id === i.id);

        // Creates a new hydrated obj to store and ref
        const hydratedProjection = { projection: item, player}


        if (player.attributes.team && player.attributes.team_name && !uniqueProjections.find(i => i.player.attributes.team === player.attributes.team && i.player.attributes.team_name === player.attributes.team_name)) {
            uniqueProjections.push(hydratedProjection);
        }
    }

    let randomWord1 = Math.random() < 0.5 ? "under" : "over";
    let randomWord2 = Math.random() < 0.5 ? "under" : "over";
    let randomCents = Math.random() < 0.5 ? 500 : 501;

    // console.log(`${logPrefix}~ Selected Picks: ${randomProjectionId1}|${randomWord1} ${randomProjectionId2}|${randomWord2} @ randomCents: ${randomCents}`);
    // makeDeposit()


    let picksPayload = {
      "lat": 33.9863355,
      "lng": -83.6837431,
      "new_wager": {
        "amount_bet_cents": randomCents,
        "pick_protection": false,  // Note: JavaScript uses lowercase for boolean values
        "picks": [
          {
            "projection_id": uniqueProjections[0].projection.id,
            "wager_type": randomWord1
          },
          {
            "projection_id": uniqueProjections[1].projection.id,
            "wager_type": randomWord2
          }
        ]
      }
    };

    let pickResponse = http.post(`${baseURL}/wagers`, JSON.stringify(picksPayload), {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // console.log(`${logPrefix}? Picks: ${pickResponse.status}`);

    // console.log(` - Response Headers: ${JSON.stringify(pickResponse.headers)}`);
    // console.log(` - Response Body: ${pickResponse.body}`);


    if (!check(pickResponse, {
        'pick made successfully': (resp) => resp.status === 200
    })) {
      pickResponseErrors.add(1);
      console.error(`Failed to make a pick: ${pickResponse.status} - ${pickResponse.body}`);

      if (pickResponse.status === 406) {
        console.log('failed post', picksPayload)
      }

      if (pickResponse.status === 0) {
        console.error(`reponse: ${JSON.stringify(pickResponse, null, 4)}`);
        console.log('failed picks', uniqueProjections)
      }
    }


    sleep(0.5);
  }

  // const signOutResponse = http.del(`${baseURL}/users/sign_out`);
  // if (!check(signOutResponse, {
  //   'logged out successfully': (resp) => resp.status === 204
  // })) {
  //   signOutResponseErrors.add(1);
  // }
  // // console.log(`${logPrefix}? Signout: ${signOutResponse.status}`);

  // sleep(1);
};

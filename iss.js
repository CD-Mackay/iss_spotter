const request = require('request');
//Makes a single API request to retrieve user's IP address.
//Input: a callback (passed either error or IP string)
//returns, via callback, error if any or IP address as a string
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statuscode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip);
    }
  });
};

///// Fetch Coordinate by IP function, not working

const fetchCoordByIp = function(ip, callback) {
  const results = {};
  let url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`StatusCode ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }
    let lat = JSON.parse(body).latitude;
    let long = JSON.parse(body).longitude;
    results['latitude'] = lat;
    results['longitude'] = long;
    // console.log(results);
    callback(null, results);
  });

};

// Find passes function
const fetchISSFlyOverTimes = function (results, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${results.latitude}&lon=${results.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times`));
      return;
    }
  let data = JSON.parse(body).response;
    callback(null, data);
    
  })
};



const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordByIp(ip, (error, location) => {
      if (error) {
        callback(error, null);

      }
      fetchISSFlyOverTimes(location, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, nextPasses);
      })
    })
  })

}

module.exports = { nextISSTimesForMyLocation };















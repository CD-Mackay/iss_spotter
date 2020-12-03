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
      let data = JSON.parse(body);
      callback(null, data.ip);
    }
  });
};

///// Fetch Coordinate by IP function, not working

let ip = "135.23.139.34";
const fetchCoordByIp = function(ip, callback) {
  let results = {};
  let url = `https://freegeoip.app/json/135.23.139.34`;
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
  request("http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON", (error, response, body) => {
    let data = JSON.parse(body);
    console.log(data);
    
  })
}

module.exports = { fetchMyIP, fetchCoordByIp, fetchISSFlyOverTimes };















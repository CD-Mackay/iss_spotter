const request = require('request-promise-native');
const fetchMyIp = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
}

const fetchISSFlyOverTimes = function(body) {
  const results = {};
  results["latitude"] = JSON.parse(body).latitude;
  results["longitude"] = JSON.parse(body).longitude;
   return request(`http://api.open-notify.org/iss-pass.json?lat=${results.latitude}&lon=${results.longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  })
}

module.exports = { nextISSTimesForMyLocation };
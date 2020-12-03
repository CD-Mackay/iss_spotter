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
})
}

module.exports = { fetchMyIP };
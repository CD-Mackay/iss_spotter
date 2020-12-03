const { fetchMyIP, fetchCoordByIp, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Return IP: ", ip);
  return ip;
});




fetchCoordByIp("135.23.139.34", (error, data) => {
  if (error) {
    console.log("It didn't work: ", error);
    return;
  }
  console.log('It worked! Returned Coords: ', data);
  
});




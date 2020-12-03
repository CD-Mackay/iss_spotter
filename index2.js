const { nextISSTimesForMyLocation } = require('./iss_promised');
const printPassTimes = function(nextPasses) {
  for (let pass of nextPasses) {
    let passTime = new Date(0);
    passTime.setUTCSeconds(pass.risetime);
    console.log(`Come see the ISS at ${passTime} for a whopping ${pass.duration} seconds!`)
  }
}
nextISSTimesForMyLocation()
.then((nextPasses) => {
  printPassTimes(nextPasses)
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});
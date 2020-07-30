const request = require('request-promise-native');
const key = 'at_r9bOCxgND7wIttpqknFuHsOrS5Ijg';
const fetchMyIP = function() {
  // use request to fetch IP address from JSON API
  return request(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=8.8.8.8`);

};

const fetchCoordsByIP = function(body) {
  const IP = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${IP}`);
};

const fetchISSFlyOverTimes  = function (coordinates){
  const {latitude, longitude} = JSON.parse(coordinates).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((times) => {
    const {response} = JSON.parse(times);
    console.log(response)
    return response;
  });
}
module.exports = {nextISSTimesForMyLocation};
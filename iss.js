const request = require('request');
const key = 'at_r9bOCxgND7wIttpqknFuHsOrS5Ijg';
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://geo.ipify.org/api/v1?apiKey=' + key + '&ipAddress=8.8.8.8', (error, response, body) => {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
    
  }
)};

const fetchMyCoordsByIP = function(string, callback) {
  request('https://ipvigilante.com/8.8.8.8', (error, response, body) => {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });
    
  }
)};

const fetchISSFlyOverTimes = function(coords, callback) {
  request('http://api.open-notify.org/iss-pass.json?lat=' + coords['latitude'] + '&lon=' + coords['longitude'], (error, response, body) => {
    if (error) return callback(error,null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const res = JSON.parse(body).response;
    callback(null, res);
    
  }
)};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
      if (error) {
        return callback(error, null);
      }
      fetchMyCoordsByIP(ip,(error, loc)=>{
        if (error) {
          return callback(error, null);
        
        }
        fetchISSFlyOverTimes(loc,(error,data)=>{
          if (error) {
            return callback(error, null);
          }
  
          callback(null, data);
          
      });
    });
  });
}


module.exports = { nextISSTimesForMyLocation};


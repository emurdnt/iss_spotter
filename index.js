const { fetchMyIP,fetchMyCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
  // fetchMyCoordsByIP(ip,(error, data)=>{
  //   console.log(error);
  //   console.log(data);
  // });
});


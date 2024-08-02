// const { FuzzedDataProvider } = require('@jazzer.js/core');
// const axios = require('axios');

// function testLoginWithFuzzedData(data) {
//   const fuzz = new FuzzedDataProvider(data);
//   const username = fuzz.consumeString(20);  // allows longer username
//   const password = fuzz.consumeString(30);  // allows longer pwd

//   return axios.post('http://localhost:5001/api/users/login', { username, password })
//     .then(response => {
//       if (response.status !== 200 && response.status !== 401) {
//         throw new Error(`Unexpected status code: ${response.status}`);
//       }
//       if (response.data && typeof response.data !== 'object') {
//         throw new Error('Response data is not an object');
//       }
//     })
//     .catch(error => {
//       // console.error('Error in login request:', error.message);
//       console.error(`Login error for username "${username}":`, error.response ? error.response.data : error.message);
//     });
// }

// module.exports = { testLoginWithFuzzedData };







const axios = require('axios');

async function testLoginWithFuzzedData(fuzz) {
  const username = fuzz.consumeString(20);
  const password = fuzz.consumeString(30);

  try {
    const response = await axios.post('https://memora-backend-2eebe428f36a.herokuapp.com/api/users/login', { username, password }, {
      validateStatus: function (status) {
        return status >= 200 && status < 500; // dont throw error
      }
    });
    
    if (response.status === 200) {
      console.log(`Login successful: Username "${username}"`);
    } else if (response.status === 401) {
      console.log(`Login failed (expected): Username "${username}"`);
    } else {
      console.error(`Unexpected status code: ${response.status} for username "${username}"`);
    }

    if (response.data && typeof response.data !== 'object') {
      console.error(`Invalid response data type for username "${username}"`);
    }
  } catch (error) {
    console.error(`Login error for username "${username}":`, error.response ? error.response.data : error.message);
  }
}

module.exports = { testLoginWithFuzzedData };
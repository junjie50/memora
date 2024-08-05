// const { FuzzedDataProvider } = require('@jazzer.js/core');
// const axios = require('axios');

// function testRegisterWithFuzzedData(data) {
//   const fuzz = new FuzzedDataProvider(data);
//   const formData = {
//     username: fuzz.consumeString(15),
//     title: fuzz.consumeString(5),
//     firstName: fuzz.consumeString(20),
//     lastName: fuzz.consumeString(20),
//     phoneNumber: fuzz.consumeString(15),
//     email: fuzz.consumeString(30),
//     password: fuzz.consumeString(20),
//     address: fuzz.consumeString(50)
//   };

//   return axios.post('http://localhost:5001/api/users', formData, {
//     validateStatus: function (status) {
//       return status >= 200 && status < 500; // do not throw error
//     }
//   })
//   .then(response => {
//     if (response.status === 201) {
//       console.log('Registration successful (expected for valid data)');
//     } else if (response.status === 400) {
//       console.log('Registration failed (expected for invalid data)');
//     } else {
//       throw new Error(`Unexpected status code: ${response.status}`);
//     }

//     // check response structure
//     if (response.data && typeof response.data !== 'object') {
//       throw new Error('Response data is not an object');
//     }

//     // check error messages contains sensitive information
//     if (response.status === 400 && response.data.message) {
//       if (response.data.message.includes('SQL') || response.data.message.includes('database')) {
//         throw new Error('Error message contains sensitive information');
//       }
//     }
//   })
//   .catch(error => {
//     // console.error('Error in register request:', error.message);
//     console.error(`Register error for username "${formData.username}":`, error.response ? error.response.data : error.message);
//   });
// }

// module.exports = { testRegisterWithFuzzedData };





const axios = require('axios');

async function testRegisterWithFuzzedData(fuzz) {
  const formData = {
    username: fuzz.consumeString(15),
    title: fuzz.consumeString(5),
    firstName: fuzz.consumeString(20),
    lastName: fuzz.consumeString(20),
    phoneNumber: fuzz.consumeString(15),
    email: fuzz.consumeString(30),
    password: fuzz.consumeString(20),
    address: fuzz.consumeString(50)
  };

  try {
    const response = await axios.post('https://memora-backend-2eebe428f36a.herokuapp.com/api/users', formData, {
      validateStatus: function (status) {
        return status >= 200 && status < 500; // dont throw error
      }
    });

    if (response.status === 201) {
      console.log(`Registration successful: Username "${formData.username}"`);
    } else if (response.status === 400) {
      console.log(`Registration failed (expected): Username "${formData.username}"`);
    } else {
      console.error(`Unexpected status code: ${response.status} for username "${formData.username}"`);
    }

    if (response.data && typeof response.data !== 'object') {
      console.error(`Invalid response data type for username "${formData.username}"`);
    }

    if (response.status === 400 && response.data.message) {
      if (response.data.message.includes('SQL') || response.data.message.includes('database')) {
        console.error(`Error message contains sensitive information for username "${formData.username}"`);
      }
    }
  } catch (error) {
    console.error(`Register error for username "${formData.username}":`, error.response ? error.response.data : error.message);
  }
}

module.exports = { testRegisterWithFuzzedData };
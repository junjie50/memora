// api.js
const fetchHotels = async () => {
    try {
      const response = await fetch('https://api.example.com/hotels');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;  // Rethrowing the error is important for handling it in the component
    }
  };
  
  export { fetchHotels };
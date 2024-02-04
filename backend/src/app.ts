require('dotenv').config();
import * as express from 'express';
import axios from 'axios';
import * as bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || '';

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});


// Routes
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});



app.get('/hotels', async (req, res) => {
  try {
    let { location } = req.query;
    const radius = 5000; // 5km radius
    const type = 'restaurant'; // Limit results to lodging (hotels)
    if (!location) location = '45.46405081530584,9.187173128554566';
    const params ={
            key: API_KEY,
            location,
            radius,
            type,
            keyword: 'restaurants'
        };

    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params
    });

    const hotels = response.data.results;
    res.json(hotels);
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    res.status(500).json({ error: 'An error occurred while fetching hotel data' });
  }
});

app.get('/position', async (req, res) => {
  try {
    let address = req.query.address as string;
    if (!address) address = 'Roma';
    const params ={
        key: API_KEY,
        address
      };

    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params
    });

    const position = response.data.results;
    console.log(position);
    res.json(position);
  } catch (error) {
    console.error('BE:Error fetching position data:', error);
    res.status(500).json({ error: 'An error occurred while fetching position data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

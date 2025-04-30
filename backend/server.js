import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;
const ORS_API_KEY = 'API_KEY_HERE'; // 🔁 Replace with your key

app.use(cors());
app.use(express.json());

// 🔍 Geocode function using OpenStreetMap Nominatim
async function geocode(cityName) {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`);
  const data = await response.json();
  if (!data || data.length === 0) {
    throw new Error(`Could not find coordinates for "${cityName}"`);
  }
  return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
}

// 🧭 Handle routing request
app.post('/route', async (req, res) => {
  try {
    const { startCity, endCity } = req.body;
    console.log('Received cities:', startCity, endCity);

    const startCoordinates = await geocode(startCity);
    const endCoordinates = await geocode(endCity);

    console.log('Geocoded coords:', startCoordinates, endCoordinates);

    const orsRes = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
      method: 'POST',
      headers: {
        'Authorization': ORS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ coordinates: [startCoordinates, endCoordinates] })
    });

    if (!orsRes.ok) {
      const errorText = await orsRes.text();
      console.error('ORS Error:', orsRes.status, errorText);
      return res.status(orsRes.status).json({ error: errorText });
    }

    const routeData = await orsRes.json();
    res.json(routeData);
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

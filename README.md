# 🚗 Map Directions App (OpenLayers + OpenRouteService)

This is a simple web application that lets users input a **start city** and **end city** to get driving directions plotted on an interactive map. It uses **OpenLayers** for map rendering and **OpenRouteService (ORS)** for route data.

---

## 📦 Features

- Interactive map powered by **OpenLayers**
- City-to-city driving route using **ORS Directions API**
- Node.js backend proxy to handle ORS API requests and bypass CORS
- Easy to customize and extend

---

## 📸 Screenshot

![Map Screenshot](screenshot.png) <!-- Optional: Add your screenshot file -->

---

## 🛠️ Tech Stack

- **Frontend**: HTML, JavaScript, [OpenLayers](https://openlayers.org/)
- **Backend**: Node.js, Express
- **Routing API**: [OpenRouteService](https://openrouteservice.org/)

---

## 🚀 Setup Instructions

### 1. Clone the Repo


git clone https://github.com/GaneshDerkar18/map-routing-project.git
cd GaneshDerkar18/map-routing-project

### 2. Install dependencies
cd backend
npm install

add your key in .....
const ORS_API_KEY = 'YOUR_API_KEY';


run backend server
npm start


Open the Frontend

Open index.html in your browser 

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // serve HTML/CSS

// Fake database
let shipments = {
  "ABC123": {
    currentLocation: "Lagos, Nigeria",
    destination: "New York, USA",
    status: "In Transit"
  },
  "XYZ789": {
    currentLocation: "London, UK",
    destination: "Toronto, Canada",
    status: "Not Delivered"
  }
};

// Handle tracking
app.post('/track', (req, res) => {
  const { trackingNumber } = req.body;
  if (shipments[trackingNumber]) {
    // Redirect to tracking page
    res.json({ redirect: `/tracking.html?id=${trackingNumber}` });
  } else {
    res.json({ message: "Tracking ID not found." });
  }
});

// API to fetch details
app.get('/track/:id', (req, res) => {
  const id = req.params.id;
  if (shipments[id]) {
    res.json(shipments[id]);
  } else {
    res.json({ currentLocation: "Unknown", destination: "-", status: "Invalid Tracking ID" });
  }
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));

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

// ✅ Start server (Render-ready)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


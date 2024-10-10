const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Firebase
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com"
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const uploadRoutes = require('./routes/uploadRoutes');
const historyRoutes = require('./routes/historyRoutes');

// Use routes
app.use('/api', uploadRoutes);
app.use('/api', historyRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
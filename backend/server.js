require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const queueRoutes = require('./routes/queueRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const adminRoutes = require('./routes/adminRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();


connectDB();



app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://queue-ease-ueaf.vercel.app"],
    credentials: true, 
  })
);

app.use(helmet());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API" });
});

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/api/queue', queueRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stats', statsRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
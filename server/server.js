const express = require('express');
const cors = require('cors');
const { config, validateConfig, isDevelopment } = require('./config/config');
const chatRoutes = require('./routes/chat');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

// ✅ CORS: whitelist your deployed frontend + localhost
const allowedOrigins = [
  'https://gemini-chatbot-1-6zmb.onrender.com', // Render frontend
  'http://localhost:5173'                       // local Vite dev server
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

if (isDevelopment()) {
  console.log('Development mode: detailed logging enabled');
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api', chatRoutes);

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Server bootstrap
const startServer = async () => {
  try {
    validateConfig();
    
    const server = app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
      console.log(`Environment: ${config.server.nodeEnv}`);
      console.log(`Health check: http://localhost:${config.server.port}/health`);
    });

    const gracefulShutdown = (signal) => {
      console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
      server.close((err) => {
        if (err) {
          console.error('Error during server shutdown:', err);
          process.exit(1);
        }
        console.log('Server closed successfully');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;

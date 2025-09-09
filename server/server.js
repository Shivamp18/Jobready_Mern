
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const { ExpressPeerServer } = require('peer');


// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const forumRoutes = require('./routes/forum.routes');
const flashcardRoutes = require('./routes/flashcard.routes');
const feedbackRoutes = require('./routes/feedback.routes');

// Middleware
const { authenticateToken } = require('./middleware/auth.middleware');

// Config
dotenv.config();
console.log('Server CLIENT_URL:', process.env.CLIENT_URL);
console.log('Server MONGO_URI:', process.env.MONGO_URI);

const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const allowedOrigins = process.env.NODE_ENV === 'production' 
  ? process.env.CLIENT_URL 
  : [process.env.CLIENT_URL, 'http://localhost:3000']; // Allow local frontend during development

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"], // Added common methods
  credentials: true
};

const io = socketIo(server, {
  cors: corsOptions
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// General request logger
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));



  // Serve PeerJS server
// const peerServer = ExpressPeerServer(server, {
//   debug: true
// });
// app.use("/peerjs", peerServer);



// Socket.io connection
require('./utils/socket')(io);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/forum', authenticateToken, forumRoutes);
app.use('/api/flashcards', authenticateToken, flashcardRoutes);
app.use('/api/feedback', feedbackRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

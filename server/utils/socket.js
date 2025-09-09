module.exports = (io) => {
  // Store active users
  const activeUsers = {};

  const roomPeers = new Map(); 
  
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // User joins with their user ID
    socket.on('user_connected', (userId) => {
      activeUsers[socket.id] = userId;
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
      
      // Notify others that user is online
      socket.broadcast.emit('user_online', userId);
    });
    
    // Join a specific room (for forum topics or mock interviews)

    socket.on('join_room', (roomId, peerId) => {
      console.log(`Socket ${socket.id} with Peer ID ${peerId} joined room for peer signaling: ${roomId}`);

      // Initialize room if it doesn't exist
      if (!roomPeers.has(roomId)) {
        roomPeers.set(roomId, new Set());
      }

      // Get existing peers in the room
      const peersInRoom = roomPeers.get(roomId);

      // Notify the new user about existing peers
      if (peersInRoom.size > 0) {
        socket.emit('existing-users', Array.from(peersInRoom));
        console.log(`Emitted existing-users to ${peerId} in room ${roomId}:`, Array.from(peersInRoom));
      }

      // Notify other users in the room that a new user has connected
      socket.to(roomId).emit('user-connected', peerId);
      console.log(`Emitted user-connected to room ${roomId} for new peer: ${peerId}`);

      // Add the new peer to the room's set of peers
      peersInRoom.add(peerId);

      // Store peerId and roomId for this socket for disconnect handling
      socket.peerId = peerId;
      socket.roomId = roomId;
    });
    
    socket.on('join_code_room', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room for code collaboration: ${roomId}`);
    });

    
    // Send message in a room
    socket.on('send_message', (data) => {
      io.to(data.roomId).emit('receive_message', {
        sender: data.sender,
        message: data.message,
        timestamp: new Date()
      });
    });
    
    // Code collaboration events
    socket.on('code_change', (data) => {
      socket.to(data.roomId).emit('code_update', {
       code: data.code,
        // language: data.language,
        // userId: data.userId
    });
    });
    
    // Disconnect event
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      const userId = activeUsers[socket.id];
      if (userId) {
        console.log(`User ${userId} disconnected`);
        io.emit('user_offline', userId);
        delete activeUsers[socket.id];
      }

      // If a peer was connected, notify others in the room
      if (socket.peerId && socket.rooms) {
        socket.rooms.forEach(room => {
          if (room !== socket.id) { // Don't emit to self
            socket.to(room).emit('user-disconnected', socket.peerId);
            console.log(`Peer ${socket.peerId} disconnected from room ${room}`);
          }
        });
      }
    });
  });
};

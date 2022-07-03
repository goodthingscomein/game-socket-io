import { createServer } from 'http';
import { Server } from 'socket.io';
import SocketStore from './stores/sockets';
import PlayerStore from './stores/players';
import generateRandomPlayer from './scripts/generation/generateRandomPlayer';

const allSockets = new SocketStore();
const allPlayers = new PlayerStore();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('Client connected');

  /**
   * Setup the player
   * 1. Add their socket to the store
   * 2. Generate a random player
   * 3. Add new random player to the store
   * 4. Send the setup player message to the
   */
  const id = allSockets.addSocket(socket);
  const newPlayer = generateRandomPlayer();
  allPlayers.addPlayer(id, newPlayer);

  socket.emit('setup', { ...newPlayer, id });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(4000, () => {
  console.log('Server started!');
});

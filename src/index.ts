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

  if (!socket.handshake.headers['player-name'] || typeof socket.handshake.headers['player-name'] !== 'string') {
    socket.disconnect();
    return;
  }
  if (!socket.handshake.headers['player-class'] || typeof socket.handshake.headers['player-class'] !== 'string') {
    socket.disconnect();
    return;
  }

  /**
   * Setup the player
   * 1. Add their socket to the store
   * 2. Generate a random player
   * 3. Add new random player to the store
   */
  const id = allSockets.addSocket(socket);
  const newPlayer = generateRandomPlayer(
    socket.handshake.headers['player-name'],
    socket.handshake.headers['player-class']
  );
  allPlayers.addPlayer(id, newPlayer);
  const newPlayerDetails = {
    ...newPlayer,
    id,
  };

  /** Send this new player their setup data - allowing them to join the world */
  socket.emit('me:setup', newPlayerDetails);

  /** Send this new player all of the other players - allowing them to add them to their world */
  socket.emit('players:existing', allPlayers.getAllPlayers());

  /** Broadcast to everyone that this new player has joined */
  io.emit('player:joined', { ...newPlayer, id });

  socket.on('player:transform', (data) => {
    const movingPlayer = allPlayers.getPlayer(id);
    if (movingPlayer) {
      movingPlayer.position.copy(data.position);
      movingPlayer.rotation.copy(data.rotation);
    }
    io.emit('player:transform', { id, ...data });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    allSockets.removeSocket(id);
    allPlayers.removePlayer(id);
  });
});

httpServer.listen(4000, () => {
  console.log('Server started!');
});

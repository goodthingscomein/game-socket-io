import type { Socket } from 'socket.io';
import generateID from '../scripts/generation/generateID';

class SocketStore {
  connectedSockets: Map<number, Socket>;

  constructor() {
    this.connectedSockets = new Map<number, Socket>();
  }

  /**
   * Handle the creation and removal of stored sockets
   */
  addSocket(socket: Socket) {
    const newID = generateID();
    this.connectedSockets.set(newID, socket);
    return newID;
  }
  removeSocket(id: number) {
    if (this.connectedSockets.has(id)) {
      this.connectedSockets.delete(id);
    }
  }
}

export default SocketStore;

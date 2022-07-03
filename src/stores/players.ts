import type { ColorRepresentation, Vector3 } from 'three';

class PlayerStore {
  connectedPlayers: Map<number, Player>;

  constructor() {
    this.connectedPlayers = new Map<number, Player>();
  }

  /**
   * Handle the creation and removal of stored players
   */
  addPlayer(id: number, newPlayer: Player) {
    this.connectedPlayers.set(id, newPlayer);
  }
  removePlayer(id: number) {
    if (this.connectedPlayers.has(id)) {
      this.connectedPlayers.delete(id);
    }
  }

  /**
   * Handle the updates of player transforms
   */
  setPlayerPosition(id: number, newPos: Vector3) {
    const player = this.connectedPlayers.get(id);
    if (!player) return;
    player.position.copy(newPos);
  }
  setPlayerRotationY(id: number, newRotY: number) {
    const player = this.connectedPlayers.get(id);
    if (!player) return;
    player.rotationY = newRotY;
  }
  setPlayerTransform(id: number, newPos: Vector3, newRotY: number) {
    const player = this.connectedPlayers.get(id);
    if (!player) return;
    player.position.copy(newPos);
    player.rotationY = newRotY;
  }
}

export default PlayerStore;

type Player = {
  color: ColorRepresentation;
  position: Vector3;
  rotationY: number;
};

import type { ColorRepresentation, Vector3, Euler } from 'three';

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
  getPlayer(id: number) {
    return this.connectedPlayers.get(id);
  }
  getAllPlayers() {
    return [...this.connectedPlayers.entries()];
  }

  /**
   * Handle the updates of player transforms
   */
  setPlayerPosition(id: number, newPos: Vector3) {
    const player = this.connectedPlayers.get(id);
    if (!player) return;
    player.position.copy(newPos);
  }
  setPlayerRotationY(id: number, newRot: Euler) {
    const player = this.connectedPlayers.get(id);
    if (!player) return;
    player.rotation = newRot;
  }
  setPlayerTransform(id: number, newPos: Vector3, newRot: Euler) {
    const player = this.connectedPlayers.get(id);
    if (!player) return;
    player.position.copy(newPos);
    player.rotation = newRot;
  }
}

export default PlayerStore;

type Player = {
  playerName: string;
  playerClass: string;
  color: ColorRepresentation;
  position: Vector3;
  rotation: Euler;
};

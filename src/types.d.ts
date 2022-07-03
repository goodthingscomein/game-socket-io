import type { ColorRepresentation, Vector3 } from 'three';

declare global {
  type Player = {
    color: ColorRepresentation;
    position: Vector3;
    rotationY: number;
  };
}

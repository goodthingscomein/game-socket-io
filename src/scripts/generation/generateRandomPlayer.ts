import { type ColorRepresentation, Vector3 } from 'three';

export default function generateRandomPlayer(): Player {
  return {
    color: generateRandomHexColor(),
    position: new Vector3(0, 1, 0),
    rotationY: 0,
  };
}

function generateRandomHexColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

type Player = {
  color: ColorRepresentation;
  position: Vector3;
  rotationY: number;
};

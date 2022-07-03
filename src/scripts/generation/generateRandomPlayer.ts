import { type ColorRepresentation, Vector3, Euler } from 'three';

export default function generateRandomPlayer(): Player {
  return {
    color: generateRandomHexColor(),
    position: new Vector3(0, 1, 0),
    rotation: new Euler(0, 0, 0),
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
  rotation: Euler;
};

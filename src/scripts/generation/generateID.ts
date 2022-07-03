let nextID = 1;

export default function generateID() {
  const newID = nextID;
  nextID++;
  return newID;
}

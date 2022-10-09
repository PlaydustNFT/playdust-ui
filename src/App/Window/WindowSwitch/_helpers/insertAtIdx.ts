function insertAtIdx<T>(list: T[], addition: T, index: number) {
  return [...list.slice(0, index), addition, ...list.slice(index)];
}

export default insertAtIdx;

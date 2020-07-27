export const updateObjectById = (array, object) => {
  const index = array.findIndex((element) => element._id === object._id);
  const element = { ...array[index], ...object };
  return [...array.slice(0, index), ...[element], ...array.slice(index + 1)];
};

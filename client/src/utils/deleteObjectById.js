export const deleteObjectById = (array, id) => {
  const index = array.findIndex((element) => element._id === id);
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

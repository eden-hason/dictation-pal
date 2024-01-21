export const getDocsData = (querySnapshot) => {
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const shuffleArray = (array) => {
  const _array = Array.from(array);

  for (let i = _array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [_array[i], _array[j]] = [_array[j], _array[i]];
  }

  return _array;
};

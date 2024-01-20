export const getDocsData = (querySnapshot) => {
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

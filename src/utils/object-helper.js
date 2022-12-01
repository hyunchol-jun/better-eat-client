export const convertPreferenceObjectIntoArray = (preferenceObject) => {
  const outputArray = [];

  for (const key in preferenceObject)
    if (preferenceObject[key]) outputArray.push(key);

  return outputArray;
};

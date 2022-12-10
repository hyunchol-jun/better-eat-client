import { Diets, Cuisines, Intolerances } from "../interfaces";

export const convertPreferenceObjectIntoArray = (
  preferenceObject: Diets | Cuisines | Intolerances
) => {
  const outputArray: string[] = [];

  for (const key in preferenceObject)
    if (preferenceObject[key]) outputArray.push(key);

  return outputArray;
};

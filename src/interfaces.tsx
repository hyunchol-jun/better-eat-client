export interface Diets {
  Ketogenic: boolean;
  Vegetarian: boolean;
  "Lacto-Vegetarian": boolean;
  "Ovo-Vegetarian": boolean;
  Vegan: boolean;
  Pescetarian: boolean;
  Paleo: boolean;
  Primal: boolean;
}

export interface Cuisines {
  African: boolean;
  American: boolean;
  British: boolean;
  Cajun: boolean;
  Caribbean: boolean;
  Chinese: boolean;
  European: boolean;
  French: boolean;
  German: boolean;
  Greek: boolean;
  Indian: boolean;
  Irish: boolean;
  Italian: boolean;
  Japanese: boolean;
  Jewish: boolean;
  Korean: boolean;
  "Latin American": boolean;
  Mediterranean: boolean;
  Mexican: boolean;
  "Middle Eastern": boolean;
  Nordic: boolean;
  Southern: boolean;
  Spanish: boolean;
  Thai: boolean;
  Vietnamese: boolean;
}

export interface Intolerances {
  Dairy: boolean;
  Egg: boolean;
  Gluten: boolean;
  Grain: boolean;
  Peanut: boolean;
  Seafood: boolean;
  Sesame: boolean;
  Shellfish: boolean;
  Soy: boolean;
  Sulfite: boolean;
  "Tree Nut": boolean;
  Wheat: boolean;
}

export interface Recipe {
  id: number;
  image: string;
  title: string;
  cuisines: string[];
  diets: string[];
  extendedIngredients: {}[];
  readyInMinutes: number;
  instructions: string;
}

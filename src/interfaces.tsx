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

export interface Ingredient {
  id: number;
  name: string;
  original: string;
}

export interface Recipe {
  id: number;
  image: string;
  title: string;
  cuisines: string[];
  diets: string[];
  extendedIngredients: Ingredient[];
  readyInMinutes: number;
  ready_min?: number;
  instructions: string;
}

export interface GroceryItem {
  checked: boolean;
  created_at: string;
  id: number;
  item_name: string;
  user_id: number;
}

export interface Headers {
  headers: {
    Authorization: string;
  };
  data?: {
    id: number;
  };
}

import axios from "axios";

const BASE_URL = "https://api.spoonacular.com/recipes/";
const SEARCH_PATH = "complexSearch";
const INFO_PATH = "/information";
const RANDOM_PATH = "random";
const API_KEY_PATH = "?apiKey=";
const QUERY_PATH = "&query=";
const INSTRUCTION_PATH = "&instructionRequired=true";
const DIET_PATH = "&diet=";
const CUISINE_PATH = "&cuisine=";
const INTOLERANCES_PATH = "&intolerances=";
const PAGE_NUMBER_PATH = "&offset=";
// const MAXTIME_PATH = "&maxReadyTime=";
const NUMBER_PATH = "&number=20";
const TAGS_PATH = "&tags=";

const SIGNUP_PATH = "signup";
const LOGIN_PATH = "login";
const USERS_PATH = "users";
const RECIPES_PATH = "/recipes";
const CHECK_RECIPES_PATH = "/checkRecipes";
const GROCERIES_PATH = "/groceries";
const INVENTORIES_PATH = "/inventories";
const CHECK_PATH = "/check";

const {
    REACT_APP_API_KEY,
    REACT_APP_BACKEND_URL,
} = process.env;

const logError = (error) => {
    console.log(error);
};

export const getRecipesList = (searchQuery, diets, cuisines, intolerances, currentOffset, callback) => {
    let FULL_PATH = BASE_URL + SEARCH_PATH
                    + API_KEY_PATH + REACT_APP_API_KEY
                    + QUERY_PATH + searchQuery
                    + INSTRUCTION_PATH + NUMBER_PATH
                    + PAGE_NUMBER_PATH + currentOffset;

    if (diets.length > 0) {
        FULL_PATH += DIET_PATH + diets.join().toLowerCase();
    }

    if (cuisines.length > 0) {
        FULL_PATH += CUISINE_PATH + cuisines.join().toLowerCase();
    }

    if (intolerances.length > 0) {
        FULL_PATH += INTOLERANCES_PATH + intolerances.join().toLowerCase();
    }

    console.log(FULL_PATH)
    axios.get(FULL_PATH).then(callback)
    .catch(logError);
};

export const getRecipesListRandomly = (diets, cuisines, intolerances, callback) => {
    let FULL_PATH = BASE_URL + RANDOM_PATH
                    + API_KEY_PATH + REACT_APP_API_KEY
                    + NUMBER_PATH;
    
    if (diets.length + cuisines.length + intolerances.length > 0)
        FULL_PATH += TAGS_PATH;

    FULL_PATH += diets.join().toLowerCase();
    if (diets.length > 0 && cuisines.length > 0) FULL_PATH += ",";
    FULL_PATH += cuisines.join().toLowerCase();
    if (cuisines.length > 0 && intolerances.length > 0) FULL_PATH += ",";
    FULL_PATH += intolerances.join().toLowerCase();

    console.log(FULL_PATH)
    axios.get(FULL_PATH).then(callback)
    .catch(logError);
}

export const getRecipeDetail = (recipeId, callback, errorCallback) => {
    const FULL_PATH = BASE_URL + recipeId + INFO_PATH + API_KEY_PATH + REACT_APP_API_KEY;
    axios.get(FULL_PATH).then(callback)
    .catch(errorCallback);
}

export const requestSignup = (formValues, callback, errorCallback) => {
    axios.post(REACT_APP_BACKEND_URL + SIGNUP_PATH, formValues).then(callback)
    .catch(errorCallback);
}

export const requestLogin = (formValues, callback, errorCallback) => {
    axios.post(REACT_APP_BACKEND_URL + LOGIN_PATH, formValues).then(callback)
    .catch(errorCallback);
}

export const appendRecipeToUser = (recipeData, headers, callback, errorCallback) => {
    axios.post(REACT_APP_BACKEND_URL 
                + USERS_PATH 
                + RECIPES_PATH, 
            recipeData, headers)
        .then(callback)
        .catch(errorCallback);
}

export const getAllUserRecipes = (headers, callback) => {
    axios.get(REACT_APP_BACKEND_URL
                + USERS_PATH
                + RECIPES_PATH, headers)
        .then(callback)
        .catch(logError);
}

export const getUserRecipeDetail = (recipeId, headers, callback, errorCallback) => {
    axios.get(REACT_APP_BACKEND_URL
                + USERS_PATH
                + RECIPES_PATH + "/" + recipeId, headers)
        .then(callback)
        .catch(errorCallback);
}

export const checkIfIngredientsAreInStock = (ingredientsArray, headers, callback, errorCallback) => {
    axios.post(REACT_APP_BACKEND_URL
                + USERS_PATH
                + INVENTORIES_PATH
                + CHECK_PATH, ingredientsArray, headers)
        .then(callback)
        .catch(errorCallback);
}

export const removeUserRecipe = (recipeId, headers, callback, errorCallback) => {
    axios.delete(REACT_APP_BACKEND_URL
                + USERS_PATH
                + RECIPES_PATH + "/" + recipeId, headers)
        .then(callback)
        .catch(errorCallback);
}

export const checkUserRecipe = (recipeId, headers, callback, errorCallback) => {
    axios.get(REACT_APP_BACKEND_URL
                + USERS_PATH
                + CHECK_RECIPES_PATH + "/" + recipeId, headers)
        .then(callback)
        .catch(errorCallback);
}

export const appendGroceryItemToUser = (itemData, headers, callback, errorCallback) => {
    axios.post(REACT_APP_BACKEND_URL
                + USERS_PATH
                + GROCERIES_PATH,
                itemData, headers)
        .then(callback)
        .catch(errorCallback);
}

export const getAllUserGroceryItems = (headers, callback) => {
    axios.get(REACT_APP_BACKEND_URL
                + USERS_PATH
                + GROCERIES_PATH,
                headers)
        .then(callback)
        .catch(logError);
}

export const removeGroceryItemFromUser = (headers, callback) => {
    axios.delete(REACT_APP_BACKEND_URL
                    + USERS_PATH
                    + GROCERIES_PATH,
                    headers)
        .then(callback)
        .catch(logError);
}

export const appendInventoryItemToUser = (itemData, headers, callback, errorCallback) => {
    axios.post(REACT_APP_BACKEND_URL
                + USERS_PATH
                + INVENTORIES_PATH,
                itemData, headers)
        .then(callback)
        .catch(errorCallback);
}

export const getAllUserInventoryItems = (headers, callback) => {
    axios.get(REACT_APP_BACKEND_URL
                + USERS_PATH
                + INVENTORIES_PATH,
                headers)
        .then(callback)
        .catch(logError);
}

export const removeInventoryItemFromUser = (headers, callback) => {
    axios.delete(REACT_APP_BACKEND_URL
                    + USERS_PATH
                    + INVENTORIES_PATH,
                    headers)
        .then(callback)
        .catch(logError);
}
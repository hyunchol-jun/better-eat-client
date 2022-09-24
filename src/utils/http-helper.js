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
const MAXTIME_PATH = "maxReadyTime=";

const {
    REACT_APP_API_KEY,
    REACT_APP_BACKEND_URL,
    REACT_APP_SIGNUP_PATH,
    REACT_APP_LOGIN_PATH,
    REACT_APP_USERS_PATH,
    REACT_APP_RECIPES_PATH,
    REACT_APP_GROCERIES_PATH
} = process.env;

const logError = (error) => {
    console.log(error);
};

export const getRecipesList = (searchQuery, diets, cuisines, intolerances, callback) => {
    let FULL_PATH = BASE_URL + SEARCH_PATH
                    + API_KEY_PATH + REACT_APP_API_KEY
                    + QUERY_PATH + searchQuery
                    + INSTRUCTION_PATH;

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

export const getRecipeDetail = (recipeId, callback) => {
    const FULL_PATH = BASE_URL + recipeId + INFO_PATH + API_KEY_PATH + REACT_APP_API_KEY;
    axios.get(FULL_PATH).then(callback)
    .catch(logError);
}

export const requestSignup = (formValues, callback) => {
    axios.post(REACT_APP_BACKEND_URL + REACT_APP_SIGNUP_PATH, formValues).then(callback)
    .catch(logError);
}

export const requestLogin = (formValues, callback) => {
    axios.post(REACT_APP_BACKEND_URL + REACT_APP_LOGIN_PATH, formValues).then(callback)
    .catch(logError);
}

export const appendRecipeToUser = (recipeData, headers, callback) => {
    axios.post(REACT_APP_BACKEND_URL 
                + REACT_APP_USERS_PATH 
                + REACT_APP_RECIPES_PATH, 
            recipeData, headers)
        .then(callback)
        .catch(logError);
}

export const getAllUserRecipes = (headers, callback) => {
    axios.get(REACT_APP_BACKEND_URL
                + REACT_APP_USERS_PATH
                + REACT_APP_RECIPES_PATH, headers)
        .then(callback)
        .catch(logError);
}

export const appendGroceryItemToUser = (itemData, headers, callback) => {
    axios.post(REACT_APP_BACKEND_URL
                + REACT_APP_USERS_PATH
                + REACT_APP_GROCERIES_PATH,
                itemData, headers)
        .then(callback)
        .catch(logError);
}

export const getAllUserGroceryItems = (headers, callback) => {
    axios.get(REACT_APP_BACKEND_URL
                + REACT_APP_USERS_PATH
                + REACT_APP_GROCERIES_PATH,
                headers)
        .then(callback)
        .catch(logError);
}

export const removeGroceryItemFromUser = (headers, callback) => {
    axios.delete(REACT_APP_BACKEND_URL
                    + REACT_APP_USERS_PATH
                    + REACT_APP_GROCERIES_PATH,
                    headers)
        .then(callback)
        .catch(logError);
}
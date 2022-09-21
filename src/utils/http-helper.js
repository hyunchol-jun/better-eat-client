import axios from "axios";

const BASE_URL = "https://api.edamam.com/api/recipes/v2";
const TYPE_PATH = "?type=public";
const SEARCH_PATH = "&q=";
const APP_ID_PATH = "&app_id=";
const API_KEY_PATH = "&app_key=";
const DIET_PATH = "&diet=";
const HEALTH_PATH = "&health=";

const {REACT_APP_APP_ID, REACT_APP_API_KEY} = process.env;

const logError = (error) => {
    console.log(error);
}

export const getRecipesList = (searchQuery, diets, healths, callback) => {
    let FULL_PATH = BASE_URL + TYPE_PATH
                    + SEARCH_PATH + searchQuery
                    + APP_ID_PATH + REACT_APP_APP_ID
                    + API_KEY_PATH + REACT_APP_API_KEY;

    diets.forEach(diet => {
        FULL_PATH += (DIET_PATH + diet);
    });

    healths.forEach(health => {
        FULL_PATH += (HEALTH_PATH + health);
    });

    axios.get(FULL_PATH).then(callback)
    .catch(logError);
}
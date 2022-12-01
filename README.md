# BetterEat Front-end

BetterEat is a web application that helps users to cook more and eat healther by suggesting new recipes based on their diets and/or food preferences. Users can also manage thier meal plans with stored information such as recipes, inventory and grocery lists.

You can visit the live website at http://better-eat.hyuncholjun.com/.

The recipe data is obtained from [Spoonacular API](https://spoonacular.com/food-api).

## Tech stack

- React
- React-router-dom
- Sass
- Styled-components
- Axios

## Authentication

BetterEat uses an email address for the user ID for the website. It doesn't need to be a valid email address as long as it's in the email format and unique(not duplicate to the one already exist.) The server doesn't store the password, instead it stores the hash with the [bcrypt](https://www.npmjs.com/package/bcrypt) library.

## Pages

### Home page

Users can set their food preference such as diet, cuisine, intolerance and search recipes based on it. The settings will be stored in the browser's local storage and will persist unless the user deletes the storage.
Once set, every time the user visits the website it will recommend random recipes based on the set preference. Users can aslo search recipes with the keywords such as ingredient names.

### My recipes

All the recipes that the user has saved will appear in this page.

### Recipe detail

When the user clicks one of the recipe cards they will enter the detail page. Here they can save/delete the recipe as well as see the information about the recipe.
The ingredients on this page are buttons and when clicked will save the item to the Grocery list page.

### Grocery list

All the grocery items the user has saved will appear on this page. Users can also manually type in grocery items and as long as the item is unigue(checked by MySQL unique constraint), the items will be added.
Checked-off items will be deleted from the server when the user leaves the page.

### Inventory list

Here, users can add/delete items. All items are associated with a search recipe button next to it, so that the user can search recipes with the item as a keyword.
When users browse through recipes 'In Stock' badge will appear next to the ingredient item in the recipe if the user happens to have the item in their inventory list.

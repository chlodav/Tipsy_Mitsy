import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const drink = response.data.drinks[0];
    const recipe = drink.strInstructions;
    const drinkName = drink.strDrink;
    const drinkImage = drink.strDrinkThumb;
    const drinkIngr = [];
    for (let i = 1; i <= 15; i++) {
      const ing = drink[`strIngredient${i}`];
      if (ing) drinkIngr.push(ing);
    }
    res.render("index.ejs", {
      drink,
      recipe,
      drinkName,
      drinkImage,
      drinkIngr,
      error: null,
    });
  } catch (error) {
    console.error(error.message);
    res.render("index.ejs", {
      drink: null,
      recipe: null,
      drinkName: null,
      drinkImage: null,
      drinkIngr: null,
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

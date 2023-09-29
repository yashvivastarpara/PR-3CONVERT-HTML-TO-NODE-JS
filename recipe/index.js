const express = require("express");
const check = require("./middle");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let initialRecipe = [
  {
    name: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish.",
    preparationTime: "15 minutes",
    cookingTime: "15",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
    country: "India",
    veg: true,
    id: 1,
  },
];

app.get("/", (req, res) => {
  res.send("welcome to the recipe api.");
});

app.get("/recipe/all", (req, res) => {
  res.status(200).send(initialRecipe);
  console.log(initialRecipe);
});

app.get("index", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/add", (req, res) => {
  res.sendFile(__dirname + "/recipe.html");
});

app.get("/recipe/filter", (req, res) => {
  const { veg, sort, country } = req.query;

  let filteredRecipes = initialRecipe;

  if (veg == "true") {
    filteredRecipes = filteredRecipes.filter(
      (initialRecipe) => initialRecipe.veg === true
    );
  } else if (veg === "false") {
    filteredRecipes = filteredRecipes.filter(
      (initialRecipe) => initialRecipe.veg === false
    );
  }

  if (country) {
    filteredRecipes = filteredRecipes.filter(
      (initialRecipe) => initialRecipe.country === country
    );
  }
  if (sort === "lth") {
    filteredRecipes.sort((a, b) => a.name - b.name);
  } else if (sort === "htl") {
    filteredRecipes.sort((a, b) => b.name - a.name);
  }

  res.json(filteredRecipes);
});

const port = 8090;
app.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`);
});

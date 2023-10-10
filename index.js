import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let category = req.body.choice2; 
    let flags = req.body.choice;
    let type = req.body.choice3;
    if (category) {
      category = category.toString();
    } else {
      category = 'any'
    }
    if (flags) {
      flags = flags.toString();
    } else {
      flags = ''
    }
    if (type) {
      type =  type.toString();
    } else {
      type = ''
    }

    const response = await axios.get('https://v2.jokeapi.dev/joke/'+category+'?blacklistFlags='+flags+'&type='+type);
    const result = response.data;
    console.log(result);
    res.render("joke.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("joke.ejs", {
      error: "No jokes that match your criteria.",
    });
  }
});

/*app.post("/", (req, res) => {
  console.log(req.body.choice);
  console.log(req.body.choice2);
  console.log(req.body.choice3);
  res.render("index.ejs");
});*/

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
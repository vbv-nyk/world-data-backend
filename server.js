const express = require("express");
const bodyParser = require("body-parser");
const {
  getUsers,
  insertEC,
  insertGDP,
  insertHC,
  insertCovid,
  insertPopulation,
} = require("./queries");
const { insertCountries } = require("./queries");
const app = express();
const port = 3000;

app.use(express.json({ limit: "10mb" }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/*
insertCountries,
  insertCovid,
  insertEC,
  insertGDP,
  insertHC
  */
app.post("/insertCountries", insertCountries);
app.post("/insertEC", insertEC);
app.post("/insertCovid", insertCovid);
app.post("/insertGDP", insertGDP);
app.post("/insertHC", insertHC);
app.post("/insertPopulation", insertPopulation);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

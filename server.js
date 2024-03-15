const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./postgres-config");

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
app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/combined-data", async (req, res) => {
  try {
    const combinedData = await pool.query(`
      SELECT 
        c.country_id, 
        c.name AS country_name, 
        c.continent, 
        c.code,
        p.year AS population_year,
        p.total_population AS population_value,
        g.year AS gdp_year,
        g.value AS gdp_value,
        cov.date_recorded AS covid_date,
        cov.total_cases,
        cov.active_cases,
        cov.deaths,
        ei.unemp_rate,
        ei.inflat_rate,
        hc.health_exp
      FROM 
        country c
      LEFT JOIN 
        population p ON c.country_id = p.country_id
      LEFT JOIN 
        gdp g ON c.country_id = g.country_id
      LEFT JOIN 
        covid cov ON c.country_id = cov.country_id
      LEFT JOIN 
        economic_indicator ei ON c.country_id = ei.country_id
      LEFT JOIN 
        health_care hc ON c.country_id = hc.country_id
      Order by 1,5
    `);
    console.log(combinedData);
    res.json(combinedData.rows);
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

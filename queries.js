const { pool } = require("./postgres-config");

const insertCountries = (request, response) => {
  const countriesData = request.body; // Assuming the data is sent in the request body
  countriesData.forEach((country) => {
    const query = {
      text: "INSERT INTO Country(country_id, name, continent, code) VALUES($1, $2, $3, $4)",
      values: [country.id, country.name, country.continent, country.code],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log(`Inserted country with id ${country.id}`);
      }
    });
  });
  response.send({
    result: "Okay",
  });
};

const insertGDP = (request, response) => {
  const gdpData = request.body; // Assuming the data is sent in the request body
  gdpData.forEach((data) => {
    const query = {
      text: "INSERT INTO gdp(gdp_id, country_id, year, value) VALUES($1, $2, $3, $4)",
      values: [
        data.id,
        data.country_id,
        data.year,
        data.value, // Assuming the value is stored as a string and removing trailing spaces
      ],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error inserting GDP data:", error);
      } else {
        console.log(`Inserted GDP data for ${data.name} in ${data.year}`);
      }
    });
  });

  response.send({
    result: "Okay",
  });
};

const insertCovid = (request, response) => {
  const covidData = request.body; // Assuming the data is sent in the request body
  covidData.forEach((country, id) => {
    const query = {
      text: "INSERT INTO covid(covid_id, country_id, date_recorded, total_cases, active_cases, deaths) VALUES($1, $2, $3, $4, $5, $6)",
      values: [
        id,
        country.country_id,
        country.date,
        country.total_cases,
        country.active_cases,
        country.deaths.trim(), // Remove trailing spaces from deaths field
      ],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log(`Inserted data for ${country.country_name}`);
      }
    });
  });

  response.send({
    result: "Okay",
  });
};

const insertEC = (request, response) => {
  const ecData = request.body; // Assuming the data is sent in the request body
  Object.keys(ecData).forEach((id) => {
    const country = ecData[id];
    const query = {
      text: "INSERT INTO economic_indicator(economic_id, country_id, inflat_rate, unemp_rate) VALUES($1, $2, $3, $4)",
      values: [
        id,
        country.country_id,
        country.inflation_rate,
        country.unemployment_rate.trim(), // Remove trailing spaces from unemployment_rate field
      ],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error inserting economic data:", error);
      } else {
        console.log(`Inserted economic data for ${country.country_name}`);
      }
    });
  });

  response.send({
    result: "Okay",
  });
};

const insertHC = (request, response) => {
  const healthData = request.body; // Assuming the data is sent in the request body

  // Define a function to handle database queries
  const insertHealthData = async (data) => {
    const query = {
      text: "INSERT INTO health_care(health_id, country_id, health_exp) VALUES($1, $2, $3)",
      values: [
        data.id,
        data.country_id,
        data.value.trim(), // Assuming the value is stored as a string and removing trailing spaces
      ],
    };

    try {
      const result = await pool.query(query);
      console.log(`Inserted health data for ${data.name}`);
    } catch (error) {
      console.error("Error inserting health data:", error);
    }
  };

  // Use Promise.all to wait for all queries to complete
  Promise.all(healthData.map(insertHealthData))
    .then(() => {
      response.send({
        result: "Okay",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      response.status(500).send({
        result: "Error",
      });
    });
};

const insertPopulation = (request, response) => {
  const populationData = request.body; // Assuming the data is sent in the request body
  populationData.forEach((data) => {
    const query = {
      text: "INSERT INTO population(population_id, year, country_id, total_population, population_density) VALUES($1, $2, $3, $4, $5)",
      values: [
        data.population_id,
        data.year,
        data.country_id,
        data.population, // Remove commas from the population field
        data.population_density.trim(), // Remove trailing spaces from population_density field
      ],
    };

    pool.query(query, (error, result) => {
      if (error) {
        console.error("Error inserting population data:", error);
      } else {
        console.log(
          `Inserted population data for year ${data.year} in country ${data.country_id}`
        );
      }
    });
  });

  response.send({
    result: "Okay",
  });
};

module.exports = {
  insertCountries,
  insertCovid,
  insertEC,
  insertPopulation,
  insertGDP,
  insertHC,
};

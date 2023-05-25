function transform(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => item.id);
  }
  return obj.id;
}

function parcoursObj(data) {
  if (data.hasOwnProperty("function")) {
    const modifiedFunction = data["function"].map((fct) => ({
      ...fct,
      users: transform(fct["users"]),
      products: transform(fct["products"]),
      gsbpm: transform(fct["gsbpm"]),
    }));
    data["function"] = modifiedFunction;
  }
  if (data.hasOwnProperty("service")) {
    data["service"].forEach((svc) => parcoursObj(svc));
  }
  return data;
}

function transformFct(fct) {
  if (Array.isArray(fct)) {
    fct.forEach((obj) => parcoursObj(obj));
  }
  parcoursObj(fct);
}

const fs = require("fs");

// Read the file and parse the JSON
let data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

transformFct(data);

// Write the transformed data back into a file
fs.writeFileSync(
  "./tranformedData.json",
  JSON.stringify(data, null, 2),
  "utf8"
);

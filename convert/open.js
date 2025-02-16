const postmanToOpenApi = require("postman-to-openapi");
const postmanCollection = "./06_JOBSTER_API.postman_collection.json";
const outputFile = "./job.yml";

async function convertCollection() {
  try {
    const result = await postmanToOpenApi(postmanCollection, outputFile, {
      defaultTag: "General",
    });
    console.log("Conversion successful!");
  } catch (error) {
    console.error("Error during conversion:", error);
  }
}

convertCollection();

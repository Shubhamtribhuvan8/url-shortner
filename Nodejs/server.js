const axios = require("axios");
const dotenv=require("dotenv");
dotenv.config();
const APIKEY=process.env.API_KEY;
const headers = {
  "Content-Type": "application/json",
  apikey: "5c2ee3f8d06d471ebe0e581d45383037",
 };

const shorten = async (url) => {
  let endpoint = "https://api.rebrandly.com/v1/links";
  let linkRequest = {
    destination: url,
    domain: { fullName: "rebrand.ly" },
  };
  const apiCall = {
    method: "post",
    url: endpoint,
    data: linkRequest,
    headers: headers,
  };
  let apiResponse = await axios(apiCall);
  let link = apiResponse.data;
  return link.shortUrl;
};
module.exports={shorten}

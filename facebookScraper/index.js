// this scraper almost worked. But sadly the user-Agent still returns undefined which won't give that final needed link,
// and thus the scraper won't work. 

const defaultOptions = {
  headers: {
    "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0"
  },
  jar: true
};

const request = require("request-promise").defaults(defaultOptions);
const credentials = require("./credentials");
const fs = require("fs");

async function main() {
  const options = {
    method: "POST", 
    uri: "https://mobile.facebook.com/login/device-based/login/async/?refsrc=deprecated&lwv=100",
    form: {
      email: credentials.email,
      pass: credentials.pass,
    },
    simple: false,
    resolveWithFullResponse: true
  };

  try {
    const result = await request(options);
    console.log(result.headers.location);
    const homepage = await request.get(results.headers.location);
    writeFile(homepage);
  } catch(error) {
    console.error(error);
    console.error("ERROR");
  }
}

function wrtieFile(body){
  fs.writeFile("./test.html", body, function(err) {
    if (err) {
      console.error(err);
    }
    console.log("Html was saved")
  })
}

main();
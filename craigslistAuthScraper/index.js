const request = require("request-promise").defaults({jar: true});
const fs = require("fs");

async function main() {
  try {
    const html = await request.post("https://accounts.craigslist.org/login", {
      form: {
        inputEmailHandle: "rjkaz@comcast.net",
        inputPassword: "SurfacePro2020!"
      },
      headers: {
        Referer: "https://accounts.craigslist.org/login/home"
      },
      simple: false,
      followAllRedirects: true,
    
    });
    fs.writeFileSync("./login.html", html);

    const billingHtml = await request.get("")
    fs.writeFileSync("./billing.html")

  } catch (error) {
    console.error(error);
  }
  
}

main();
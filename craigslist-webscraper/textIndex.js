// first step is to import puppeteer 
const puppetter = require("puppeteer");
// now we make an async function 
async function main() {
  // first thing we need to do is tell puppetter to open the chromium browser
  const browser = await puppetter.launch({ headless: false });
  // the use of headdless:false means the browser will not be hidden from you
  // running it headless is better if you are running the scrapper from a server without a graphical interface
  //The next step is to open a new page or a new tab
  const page = await browser.newPage();
  await page.goto("https://www.google.com");


}

main();

// now running node testIndex.js in the temrinal will pull up google in the chromium edge browser
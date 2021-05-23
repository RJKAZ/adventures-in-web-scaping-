// having already downloaded the npm dependencies of Puppeteer and Cheerio, I have to bring them in
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// and now the main function which is async (meaning it has to return a promise)
// in the function, it uses a try/catch
// The try statement allows to define a block of code to be tested for errors while it is being executed
// The catch statement allows to define a block of code to be executed if an error occurs.

async function main() {
  try {
    // this I think is initializing the chromium edge browser
    const browser = await puppeteer.launch({ headless: false });
    // this is telling the browser to make a new page
    const page = await browser.newPage();
    await page.goto('http://forum.tabletpcreview.com/login/');
    await page.type('input#LoginControl.textCtrl', 'rjkaz@comcast.net');
    await page.type('input#ctrl_password.textCtrl', 'chinohki');
    await page.click('input.button.primary');
    await page.waitForNavigation();
  } catch (error) {
    console.log(error);
  }
}
// calling the function
main();

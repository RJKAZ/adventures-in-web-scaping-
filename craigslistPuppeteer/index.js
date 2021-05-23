const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://accounts.craigslist.org/login');
    await page.type('input#inputEmailHandle', 'rjkaz@comcast.net');
    await page.type('input#inputPassword', 'SurfacePro2020!'); // need to put my password in to make this work
    await page.click('button#login');
    await page.waitForNavigation();
    await page.goto(
      'https://accounts.craigslist.org/login/home?show_tab=drafts'
    );
    const content = await page.content();
    const $ = await cheerio.load(content);
    console.log($('body > article > section > fieldset > b').text());
  } catch (error) {
    console.error(error);
  }
}

main();

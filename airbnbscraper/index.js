const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const sample = {
  guests: 1,
  bedroom: 1,
  beds: 1,
  baths: 1,
  usdPerNight: 350,
};

async function scrapeHomesInIndexPage(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
}

scrapeHomesInIndexPage(
  'https://www.airbnb.com/s/Copenhagen/homes?refinement_paths%5B%5D=%2Fhomes&click_referer=t%3ASEE_ALL%7Csid%3A9ea0a18e-f8e0-4eec-8840-b5a4290dfd22%7Cst%3ASTOREFRONT_DESTINATION_GROUPINGS&title_type=HOMES_WITH_LOCATION&query=Copenhagen&allow_override%5B%5D=&s_tag=UrkEXloL&section_offset=7&items_offset=36'
);
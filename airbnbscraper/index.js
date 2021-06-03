const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const sample = {
  guests: 1,
  bedroom: 1,
  beds: 1,
  baths: 1,
  usdPerNight: 350,
};

let browser; 

async function scrapeHomesInIndexPage(url) {
  try {
    
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(html);

    const homes = $("[itemprop='url']").map((i, element) => "https://" +
    $(element).attr("content")
    ).get();
    return homes; 
  } catch (err) {
    console.error(err);
  }
}

async function scrapeDescriptionPage(url, page) {
 let roomText;
  try {
    // consider navigation to be finsihed when there are no more than 2 network connections for at least 500 ms
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.evaluate(() => document.body.innerHTML);
    const $ = await cheerio.load(html);

    const pricePerNight = $(
      "#FMP-target > div > div > div > div > div:nth-child(1) > div > div > div > div > div > div > div > div > div > div > div > span"
    ).text();

    roomText = $("#room").text();

    const guestsAllowed = returnMatches(roomText, /\d+ guest/);
    const bedrooms = returnMatches(roomText, /\d+ bedroom/);
    const baths = returnMatches(roomText, /\d+ bath/);
    const beds = returnMatches(roomText, /\d+ bed/);

    return { url, guestsAllowed, bedrooms, baths, beds, pricePerNight};
  } catch (err) {
    console.error(roomText);
    console.error(url);
    console.error(err);
  }
}

function returnMatches(roomText, regex) {
  const regExMatches = roomText.match(regex);
  let result = "N/A";
  if (regExMatches != null) {
    result = regExMatches[0];
  } else {
    throw `No regex matches found for: ${regex}`;
  }
  return result; 

}

async function main() {
  browser = await puppeteer.launch({ headless: false });
  const descriptionPage = await browser.newPage();
  const homes = await scrapeHomesInIndexPage(
    'https://www.airbnb.com/s/Copenhagen/homes?refinement_paths%5B%5D=%2Fhomes&click_referer=t%3ASEE_ALL%7Csid%3A9ea0a18e-f8e0-4eec-8840-b5a4290dfd22%7Cst%3ASTOREFRONT_DESTINATION_GROUPINGS&title_type=HOMES_WITH_LOCATION&query=Copenhagen&allow_override%5B%5D=&s_tag=UrkEXloL&section_offset=7&items_offset=36'
  );
  for(var i = 0; i < homes.length; i++) {
    const result = await scrapeDescriptionPage(homes[i], descriptionPage);
    console.log(result);
  }
  
}

main();



const puppetter = require("puppeteer");
const cheerio = require("cheerio");

async function scrapeListings(page) {
  await page.goto(
    "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof?"
  );
  const html = await page.content();
  const $ = cheerio.load(html);
  const listings = $(".result-info")
    .map((index, element) => {
      const titleElement = $(element).find(".result-title");
      const timeElement = $(element).find(".result-date");
      const title = $(titleElement).text();
      const url = $(titleElement).attr("href");
      const datePosted = new Date($(timeElement).attr("datetime"))
            return { title, url, datePosted, };
    })
    .get();
    return listings;
}
// forEach loops don't work well with Puppeteer, so use regular loop
async function scrapeJobDescriptions(listings, page) {
  for(var i = 0; i < listings.length; i++) {
    await page.goto(listings[i].url);
    const html = await page.content();
    const $ = cheerio.load(html);
    const jobDescription = $("#postingbody").text();
    const compensation = $("p.attrgroup > span:nth-child(1) > b").text()
    listings[i].jobDescription = jobDescription;
    listings[i].compensation = compensation;
    console.log(listings[i].jobDescription);
    console.log(listings[i].compensation);
    await sleep(1000); // 1 second sleep 
  }
}

// the sleep() function can be used anywhere as long as you use async/await 

async function sleep(miliseconds){
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}

async function main() {
  const browser = await puppetter.launch({ headless: false });
  const page = await browser.newPage();
  const listings = await scrapeListings(page);
  const listingsWithJobDescriptions = await scrapeJobDescriptions(
    listings, 
    page
  );
  console.log(listings);
}

main();


scrapeListings();
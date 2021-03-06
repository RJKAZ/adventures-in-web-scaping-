const puppetter = require("puppeteer"); 
const cheerio = require("cheerio");

async function main() {
  const browser = await puppetter.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof?"
    );
    const html = await page.content();
    const $ = cheerio.load(html);
   // $(".result-title").each((index, element) => console.log($(element).text()))
   // $(".result-title").each((index, element) => console.log($(element).attr("href")));

    const results = $(".result-info")
      .map((index, element) => {
        const titleElement = $(element).find(".result-title");
        const timeElement = $(element).find(".result-date");
        const hoodElement = $(element).find(".result-hood");
        const title = $(titleElement).text();
        const url = $(titleElement).attr("href");
        const datePosted = new Date($(timeElement).attr("datetime"))
        const hood = $(hoodElement)
          .text()
          .trim()
          .replace("(", "")
          .replace(")", "");
        return { title, url, datePosted, hood };
      })
        .get();
      console.log(results);
     // when using cheerio, you have to use a .get() when you use a map
}

main();
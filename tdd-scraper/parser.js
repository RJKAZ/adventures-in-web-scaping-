const cheerio = require("cheerio");


exports.listings = (html) => {
  const $ = cheerio.load(html);
  return $(".result-info")
    .map((index, element) => {
      const titleElement = $(element)
        .find(".result-title.hdrlnk")
        const title = titleElement.text();
        const url = titleElement.attr("href");
      return {title, url};

  }).get()
}

// npm run test
// As an alternative to scraping, what this scraper does is it saves the HTML locally and it parses the data in the local saved html file for the desired data. The point of this is to prevent getting banned by the site. 
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request-promise");
const RedditArticle = require("./RedditArticle");

async function scrapeReddit() {
  const html = await request.get("https://www.reddit.com");
  const $ = await cheerio.load(html);
  const titles = $("h3");

  titles.each(async (i, element) => {
    try {
      const title = $(element).text();
      console.log(title);
      const RedditArticle = new RedditArticle({
        title: title
      });
      await RedditArticle.save()

    } catch (err) {
      console.error(err);
    }
    
  });
}

scrapeReddit();

// the tutorial entailed saving the data to MongoDB MLab. 

// Sadly MLab is no more, and the process to use MongoDB Atlas is a bit different, so following this portion of the tutorial is kind of a no go. 
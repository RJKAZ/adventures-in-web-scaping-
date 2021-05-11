const parser = require("../parser");
const fs = require("fs");
let html;
let listings;

beforeAll(() => {
  html = fs.readFileSync("./test.html");
  listings = parser.listings(html);
})

it("should give the correct number of listings", () => {
  expect(listings.length).toBe(120);
})

it("should get correct url", () => {
  expect(listings[0].url).toBe(
    "https://newyork.craigslist.org/mnh/lss/d/new-york-finance-economics-accounting/7320209786.html");
})


it("should get correct title", () => {
  const listings = parser.listings(html);
  expect(listings[0].title).toBe("Finance Economics Accounting Tutor");
})


//TDD means "test driven development"
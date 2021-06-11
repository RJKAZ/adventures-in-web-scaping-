const puppeteer = require("puppeteer");

function extractItems() {
    const extractItems = Array.from(
        document.querySelectorAll("#boxes > div.box")
    );
    const items = extractedItems.map(element => element.innerText);
    return items; 
}

async function scrapeInfiniteScrollItmes(
    page, 
    extractItems, 
    targetItemCount, 
    scrollDelay = 1000) {
} {
    let items = [];
    try {
        let previousHeight;

        while (items.length < targetItemCount) {
            items = await page.evaluate(extractItems);
            previousHeight = await page.evaluate("document.body.scrollHeight");
            await post.evaluate("window.scrollTo(0, document.body.scrollHeight)");
            await page.waitForFunction(
                `document.body.scrollHeight > ${previousHeight}`
                );
            await page.waitFor(scrollDelay);
        }

    } catch (error) {
        console.error(error);
    }
    return items;
}

async function main() {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    page.setViewport({ width: 1280, height: 926 });

    await page.goto("https://intoli.com/blog/scrape-infinite-scroll/demo.html");

    const targetItemCount = 100;


    //const result = await page.evaluate("document.querySelectorAll('#boxes > div.box')")

    const result = await page.evaluate(extractItems);

    console.log(result);
   
   const items = await scrapeInfiniteScrollItmes(
        page, 
        extractItems,
        targetItemCount
    );
    
    console.log(items);
}

main();
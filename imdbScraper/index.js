const request = require("request-promise");
const cheerio = require("cheerio");




const sampleResult = {
    title: 'Army of the Dead',
    rank: 1,
    imdbRating: 8.4,
    descriptionUrl: "https://www.imdb.com/title/tt0993840/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=B5EBYHK9AK0FMTQR9TGA&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1",
    posterUrl: "https://www.imdb.com/title/tt0993840/mediaviewer/rm869125377/"
}

async function scrapeTitlesRanksAndRatings() {
    const result = await request.get("https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm");
    const $ = await cheerio.load(result);

    const movies = $("tr")
        .map((i, element) => {
            const title = $(element)
                .find("td.titleColumn > a")
                .text()
                

            const imdbRating = $(element)
                .find("td.ratingColumn.imdbRating")
                .text()
                .trim();
        return {title, imdbRating };
    })
    .get();
    console.log(movies);
}

scrapeTitlesRanksAndRatings();
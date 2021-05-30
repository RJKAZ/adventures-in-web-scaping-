const request = require("request-promise");
const regularRequest = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });



const sampleResult = {
    title: 'Army of the Dead',
    rank: 1,
    imdbRating: 8.4,
    descriptionUrl: "https://www.imdb.com/title/tt0993840/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=B5EBYHK9AK0FMTQR9TGA&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1",
    posterUrl: "https://www.imdb.com/title/tt0993840/mediaviewer/rm869125377/",
    posterImageUrl: "https://www.imdb.com/title/tt0993840/mediaviewer/rm869125377/"
}

async function scrapeTitlesRanksAndRatings() {
    const result = await request.get("https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm");
    const $ = await cheerio.load(result);

    const movies = $("tr")
        .map((i, element) => {
            const title = $(element)
                .find("td.titleColumn > a")
                .text()
            const descriptionUrl =
                "https://www.imdb.com" +
                $(element)
                    .find("td.titleColumn > a")
                    .attr("href");
            const imdbRating = $(element)
                .find("td.ratingColumn.imdbRating")
                .text()
                .trim();
            return { title, imdbRating, velocity: i, descriptionUrl };
        })
        .get();
    return movies;
}

async function scrapePosterUrl(movies) {
    const moviesWithPosterUrls = await Promise.all(movies.map(async movie => {
        try {
            const html = await request.get(movie.descriptionUrl);
            const $ = await cheerio.load(html);
            movie.posterUrl = "https://www.imdb.com" + $("div.poster > a > img").attr("href");
            return movie;
        } catch (err) {
            //console.error(err);
        }
    })
    );
    return moviesWithPosterUrls;
}

async function scrapePosterImageUrl(movies) {
    for (var i = 0; i < movies.length; i++) {
        try {
            const posterImageUrl = await nightmare.goto(movies[i].posterUrl).evaluate(() => $(
                "#photo-container > div > div:nth-child(2) > div > div.pswp__scroll-wrap > div.pswp__container > div:nth-child(2) > div > img:nth-child(2)"
            ).attr("src")
           );
           movies[i].posterImageUrl = posterImageUrl;
           savePosterImageToDisk(movies[i]);
           console.log(movies[i]);

        } catch (err) {
            console.error(err);
        }
    }
    return movies;
}

async function savePosterImageToDisk(movie) {
    regularRequest.get(movie.posterImageUrl).pipe(fs.createWriteStream(`posters/${movie.rank}.png`));

}



async function main() {
    let movies = await scrapeTitlesRanksAndRatings()
    movies = await scrapePosterUrl(movies);
    movies = await scrapePosterImageUrl(movies);
    
}

main();
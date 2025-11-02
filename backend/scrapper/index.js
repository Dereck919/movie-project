import puppeteer from 'puppeteer'

async function scrapeFandango() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto('https://www.fandango.com/movies-in-theaters');

        await page.waitForSelector('.browse-movielist > li'); 

        const movies = await page.evaluate(() => {
            const movieElements = document.querySelectorAll('.browse-movielist > li');
            const movieData = [];

            movieElements.forEach(item => {
                const titleElement = item.querySelector('.poster-card--title');
                const title = titleElement ? titleElement.textContent.trim() : 'N/A';
                movieData.push({ title });
                const genreElement = item.querySelector('.sr-only');
                const genre = genreElement ? genreElement.textContent.trim() : 'N/A';
            });
            return movieData;
        });
        console.log(movies);
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await browser.close();
    }
}
scrapeFandango();

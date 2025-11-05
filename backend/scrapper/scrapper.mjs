import puppeteer from 'puppeteer'
import fs from 'fs'
import express from 'express'
import path from 'path'

//Get data from fandango
async function scrapeFandango() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultTimeout(60000); 
    try {
        await page.goto('https://www.fandango.com/san-diego_ca_movietimes');

        await page.waitForSelector('.fd-movie'); 

        const movies = await page.evaluate(() => {
            const movieElements = document.querySelectorAll('.fd-movie');
            const movieData = [];

        movieElements.forEach(movie => {
            const titleElement = movie.querySelector('.fd-movie__title');
            const title = titleElement ? titleElement.textContent.trim() : 'N/A';

            const infoElement = movie.querySelector('.fd-movie__rating-runtime');
            let rating = "N/A";
            let runtime = "N/A";
            let genre = [];

//Parse and format rating, genre, and runtime 
//TODO: Fix movies with a runtime rounded to the nearest hour do not display 
if (infoElement) {
    let text = infoElement.textContent.replace(/\s+/g, ' ').trim();
    const ratingMatch = text.match(/Rated:\s*([A-Za-z0-9\-]+)/i);
    if (ratingMatch) {
        rating = ratingMatch[1].trim();
        text = text.replace(ratingMatch[0], '').trim();
    }
    const runtimeMatch = text.match(/Runtime:\s*([0-9]+\s*(?:hr|h)?\s*[0-9]*\s*min?)/i);
    if (runtimeMatch) {
        runtime = runtimeMatch[1].trim();
        text = text.replace(runtimeMatch[0], '').trim();
    }
    genre = text.split(',').map(g => g.trim()).filter(g => g.length > 0);
}
    const imageElement = movie.querySelector('img');
    const image = imageElement ? imageElement.src : 'N/A';
    movieData.push({ title, rating, runtime, genre, image });
});
return movieData;
});

//Write to json file 
const jsonData = JSON.stringify(movies, null, 2);
    try {
        fs.writeFileSync('movies.json', jsonData, 'utf8');
        console.log('Data successfully written to movies.json');
            
    }catch (err) {
        console.error('Error writing file:', err);
    }
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await browser.close();
    }
}
//await scrapeFandango();



//API to access movie data 
const app = express();  
const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Server is listening on port ${PORT}`)
});


app.use(express.static(path.join(process.cwd())));
app.get('/movies', (req, res) => {
    const filePath = path.join(process.cwd(), 'movies.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
});

/*
The best way to access the data is at 'localhost:3000/movies.json'
You can also use 'localhost:3000/movies' but the formatting is all messed up so use the one above
Also a slow internet connection sometimes breaks the scrapping 
*/
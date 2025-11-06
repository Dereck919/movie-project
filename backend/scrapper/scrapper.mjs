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

        await page.waitForSelector('.shared-movie-showtimes'); 

        const movies = await page.evaluate(() => {
            const movieElements = document.querySelectorAll('.shared-movie-showtimes');
            const movieData = [];
            
        movieElements.forEach(movie => {
            //Title
            const titleElement = movie.querySelector('li.shared-movie-showtimes h3.shared-movie-showtimes__movie-title a');
            const title = titleElement ? titleElement.textContent.trim() : 'N/A';

            // Runtime
            const runtimeEl = movie.querySelector('p.shared-showtimes__movie-data');
            let runtime = 'N/A';
            if (runtimeEl) {
                const runtimeTextNode = Array.from(runtimeEl.childNodes)
                    .find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
                if (runtimeTextNode) runtime = runtimeTextNode.textContent.trim();
            }

            //Rating
            const ratingEl = movie.querySelector('data.shared-showtimes__movie-rating');
            const rating = ratingEl ? ratingEl.getAttribute('value') : ' ';
            
            //Image
            const imageElement = movie.querySelector('img');
            const image = imageElement ? imageElement.src : 'N/A';
    movieData.push({ title, runtime , rating , image });
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
await scrapeFandango();



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
Also a slow internet connection sometimes breaks the scrapping and not every movie has a runtime
or rating availible yet 
*/
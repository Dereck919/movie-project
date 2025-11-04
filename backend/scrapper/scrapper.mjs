import puppeteer from 'puppeteer'
import fs from 'fs'
import express from 'express'
import path from 'path'



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
                //Gets title
                const titleElement = movie.querySelector('.fd-movie__title');
                const title = titleElement ? titleElement.textContent.trim() : 'N/A';

                const runElement = movie.querySelector('.fd-movie__rating-runtime');
                const RatingRuntimeGenre = runElement ? runElement.textContent.trim() : 'N/A';
            

                //Gets link to image
                const imageElement = movie.querySelector('img');
                const image = imageElement ? imageElement.src : 'N/A';
                
                movieData.push({ title , RatingRuntimeGenre, image});
                
                //title, link, image,  runtime, rating, genre 
                
            
            });
            return movieData;
        });
        const jsonData = JSON.stringify(movies, null, 2);
        try {
            fs.writeFileSync('output.json', jsonData, 'utf8');
            console.log('Data successfully written to output.json');
    }   catch (err) {
        console.error('Error writing file:', err);
    }
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        await browser.close();
    }
}
await scrapeFandango();


//TODO: Fix API 
const app = express();  
const PORT = 3000;

app.get('/movies', (req, res) => {
    const file = path.join(__dirname, 'output.json');
    if (fs.existsSync(file)) {
        res.sendFile(file);
    } else {
        res.status(404).json({ error: 'No data found yet' });
    }
});


app.listen(PORT, ()=> {
    console.log('Server is running on ${PORT}')
});

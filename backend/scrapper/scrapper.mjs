import puppeteer from 'puppeteer'
import fs from 'fs'
import express from 'express'
import path from 'path'


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
                
                
                const linkElement = item.querySelector('a');
                const link = linkElement ? linkElement.href : 'N/A';

                const imageElement = item.querySelector('img');
                const image = imageElement ? imageElement.src : 'N/A';
                movieData.push({ title, link , image });
                
                
            
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

import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Read your JSON file
const data = JSON.parse(fs.readFileSync("./movies.json", "utf8"));

// Transform to match your table columns
const movies = data.map((item) => ({
  title: item.title,
  rating: item.rating,
  runtime: item.runtime,
  image_url: item.image,
}));

// Insert in batches of 1000 (Supabase limit)
const batchSize = 1000;
for (let i = 0; i < movies.length; i += batchSize) {
  const batch = movies.slice(i, i + batchSize);
  const { error } = await supabase.from("movies").insert(batch);

  if (error) {
    console.error(`Error at batch ${i}:`, error);
  } else {
    console.log(`Inserted ${i + batchSize} / ${movies.length}`);
  }
}

console.log("Done!");

import express from 'express';
import posts from './routes/posts.router.js';




const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/',posts);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`)
});
import express from 'express';
import cors from 'cors'
import 'dotenv/config';
import uploadRouter from './src/routes/upload.js';
import rewriteRouter from './src/routes/rewrite.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('OK'));

app.use('/api', uploadRouter);
app.use('/api', rewriteRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on Port:${PORT}`);
});

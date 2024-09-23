import express from 'express';
import messageRouter from './routes/messageRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', messageRouter);

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));

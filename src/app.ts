import express from 'express';
import { json } from 'body-parser';
import todoRoutes from './routes/todos';
import errorHandling from './middlewares/errorHandling'

const app = express();
app.use(json());
app.use('/todos', todoRoutes);
app.use(errorHandling);

export default app;

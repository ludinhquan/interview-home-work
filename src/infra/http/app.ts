import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import { routes } from '@/infra/http/routes'
import connectDb from '@/infra/database/mongodb'

const app = express();

const origin = { origin: '*' }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(helmet());
app.use(morgan('combined'));

app.use('/', routes);

(async () => {
  await connectDb();
  app.listen(process.env.PORT || 8080, () => {
    console.log(`[App]: Server listening on 8080`)
  })
})();

export { app };
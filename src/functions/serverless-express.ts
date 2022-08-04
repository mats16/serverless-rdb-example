import serverlessExpress from '@vendia/serverless-express';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.status(200).send({
    message: 'Hello workd!',
  });
});

export const handler = serverlessExpress({ app });
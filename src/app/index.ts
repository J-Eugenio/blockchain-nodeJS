import express, { Request, Response } from 'express';
import { Blockchain } from '../blockchain';

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

app.get('/blocks', (request:Request, response: Response) => {
  bc.addBlock('200U$')
  return response.json(bc.chain);
})

app.listen(HTTP_PORT, () => {
  console.log(`Server Running on port ${HTTP_PORT}!!!`)
})
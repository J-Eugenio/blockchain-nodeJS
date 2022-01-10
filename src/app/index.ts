import express, { Request, Response } from 'express';
import { Blockchain } from '../blockchain';

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();

app.use(express.json());

app.get('/blocks', (request:Request, response: Response) => {
  response.json(bc.chain);
});

app.post('/mine', (request:Request, response: Response) => {
  const { data } = request.body;

  if(!data){
    return response.status(400).json('Data not found')
  }
  
  const block = bc.addBlock(data);
  console.log(`New Block added: ${block.toString()}`);
  
  response.redirect('/blocks');
});

app.listen(HTTP_PORT, () => {
  console.log(`Server Running on port ${HTTP_PORT}!!!`)
})
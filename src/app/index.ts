import express, { Request, Response } from 'express';
import { Blockchain } from '../blockchain';
import { P2pServer } from './p2p-server';

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

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

  p2pServer.syncChain()

  response.redirect('/blocks');
});

app.listen(HTTP_PORT, () => {
  console.log(`Server Running on port ${HTTP_PORT}!!!`)
})
p2pServer.listen();
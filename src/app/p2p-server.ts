import Websocket from 'ws';
import { Blockchain } from '../blockchain';

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; 

class P2pServer {
  public blockchain: Blockchain;
  public socket: Array<Websocket> = [];

  constructor(blockchain: Blockchain){
    this.blockchain = blockchain;
    this.socket = [];
  }

  listen(){
    const server = new Websocket.Server({
      //@ts-ignore
      port: P2P_PORT
    });

    server.on('connection', socket => this.connectSocket(socket))
  }

  connectSocket(socket: Websocket) {
    this.socket.push(socket);
    console.log('Socket connected')
  }
}
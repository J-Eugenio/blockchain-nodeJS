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

  //Abre a conexao inicial na porta `P2P_PORT`
  listen(){
    const server = new Websocket.Server({
      //@ts-ignore
      port: P2P_PORT
    });
    server.on('connection', socket => this.connectSocket(socket))
    //Conecta todos os peers no array
    this.connectToPeers();

    console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`)
  }

  connectToPeers(){
    //ws://localhost:5001
    peers.forEach(peer => {
      const socket = new Websocket(peer);
      socket.on('open', () => {
        this.connectSocket(socket)
      });
    });
  }

  connectSocket(socket: Websocket) {
    //Empilha a nova conexao
    this.socket.push(socket);
    console.log('Socket connected')

    //Monitora os eventos, e caso tiver algum da um replace na maior chain
    this.messageHandler(socket);
    //Envia um evento com o chain da instancia
    this.sendChain(socket);
  }

  //Recebe um socket e envio um evento com o chain da instancia
  private sendChain(socket: Websocket){
    socket.send(JSON.stringify(this.blockchain.chain))
  }

  //Monitora os eventos, e caso tiver algum da um replace na maior chain
  messageHandler(socket: Websocket){
    socket.on('message', (message) => {
      //@ts-ignore
      const data = JSON.parse(message);
      //ReplaceChain - att a chain com a maior
      this.blockchain.replaceChain(data)
    })
  }

  //Metodo sync que sera executado nos mines dos blocos
  syncChain(){
    this.socket.forEach(socket => this.sendChain(socket))
  }


}

export { P2pServer }

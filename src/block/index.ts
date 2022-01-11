import SHA256 from 'crypto-js/sha256';
import { DIFFICULTY, MINE_RATE } from '../utils/config';

class Block {
  //Parametros existentes no bloco
  public timestamp: string;
  public lastHash: string;//Hash do ultimo bloco
  public hash: string;//Hash do bloco atual
  public data: string | Array<any>;//Data enviado no bloco - pode ser qualquer formato
  public nonce: number;//Provade trabalhado
  public difficulty: number
  

  constructor(
    timestamp: string, 
    lastHash: string, 
    hash: string, 
    data: string | Array<any>, 
    nonce: number,
    difficulty: number
  ){
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty || DIFFICULTY;
  }

  //Retorna os valores do blocos formatados
  toString(){
    return `Block =
            timestamp = ${this.timestamp}
            lastHash = ${this.lastHash.substring(0, 10)}
            hash = ${this.hash.substring(0, 10)}
            nonce = ${this.nonce}
            difficulty = ${this.difficulty}
            data = ${this.data}
            `;
  }

  //Criar o bloco inicial
  static genesis(){
    return new this(
      'Genesis time', 
      '----------', 
      '0000000000000000000000000000000000000000000000000000000000000000', 
      [], 
      0, 
      DIFFICULTY
    )
  }

  //Minera um bloco que e ligado ao bloco inicial
  static mineBlock(lastBlock: Block, data: string | Array<any>){

    let hash = '', timestamp: number;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;
    
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(String(timestamp), lastHash, data, nonce, difficulty)
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this(String(timestamp), lastHash, hash, data, nonce, difficulty)
  }

  //Cria o hash do bloco
  static hash(timestamp: string, lastHash: string, data: any, nonce: number, difficulty: number){
    return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString()
  }

  //Recebe um bloco e retorna o hash dele
  static blockHash(block: Block){
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  static adjustDifficulty(lastBlock: Block, currentTime: number){
    
    let { difficulty } = lastBlock;
    difficulty = Number(lastBlock.timestamp) + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
    return difficulty;
  }
}

export { Block }
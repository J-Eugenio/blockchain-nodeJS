import SHA256 from 'crypto-js/sha256';

class Block {
  public timestamp: string;
  public lastHash: string;
  public hash: string;
  public data: string | Array<any>;

  constructor(timestamp: string, lastHash: string, hash: string, data: string | Array<any>){
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString(){
    return `Block =
            timestamp = ${this.timestamp}
            lastHash = ${this.lastHash.substring(0, 10)}
            hash = ${this.hash.substring(0, 10)}
            data = ${this.data}
            `;
  }

  static genesis(){
    return new this('Genesis time', '----------', '00000000000000000000', [])
  }

  static mineBlock(lastBlock: any, data: string | Array<any>){

    const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const hash = Block.hash(String(timestamp), lastHash, data)

    return new this(String(timestamp), lastHash, hash, data)
  }

  static hash(timestamp: string, lastHash: string, data: any){
    return SHA256(`${timestamp}${lastHash}${data}`).toString()
  }

  static blockHash(block: Block){
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}

export { Block }
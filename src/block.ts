class Block {
  private timestamp: string;
  private lastHash: string;
  private hash: string;
  private data: string | Array<any>;

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
    const hash = 'a-fazer-hash';

    return new this(String(timestamp), lastHash, hash, data)
  }
}

export { Block }
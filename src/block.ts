class Block {
  private timestamp: Date;
  private lastHash: string;
  private hash: string;
  private data: string;

  constructor(timestamp: Date, lastHash: string, hash: string, data: string){
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  toString(){
    return `Block =
            timestamp = ${this.timestamp}
            lastHash = ${this.lastHash}
            hash = ${this.hash}
            data = ${this.data}
            `;
  }
}
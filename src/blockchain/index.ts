import { Block } from '../block';

class Blockchain {
  public chain:Array<Block>;

  constructor(){
    this.chain = [Block.genesis()];
  }

  addBlock(data: any){
    const lastBlock = this.chain.slice(-1)[0];
    const block = Block.mineBlock(lastBlock, data);
    this.chain.push(block);

    return block;
  }

}

export { Blockchain }
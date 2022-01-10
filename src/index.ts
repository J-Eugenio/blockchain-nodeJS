import {
  Block
} from './block';

const block = new Block(Date.now().toString(), '23132132132ASASAS','23132132132ASASAS', '100');
console.log(block.toString());
console.log(Block.genesis.toString());

const firstBlock = Block.mineBlock(Block.genesis(), '$500')
console.log(firstBlock.toString())

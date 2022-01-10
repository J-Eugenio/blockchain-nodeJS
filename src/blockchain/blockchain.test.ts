import { Block } from '../block';
import { Blockchain } from './';

describe('Blockchain', () => {
  let blockchain: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain;
  });

  it('starts witch genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'file.pdf';
    blockchain.addBlock(data);

    expect(blockchain.chain.slice(-1)[0].data).toEqual(data)
  });
})